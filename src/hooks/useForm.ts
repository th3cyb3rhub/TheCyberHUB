// Custom form handling hook with validation
// Works with or without zod - gracefully degrades when zod isn't installed

import { useState, useCallback, ChangeEvent, FormEvent } from 'react';

type ValidationError = {
    [key: string]: string;
};

type FormState<T> = {
    values: T;
    errors: ValidationError;
    touched: { [key: string]: boolean };
    isSubmitting: boolean;
    isValid: boolean;
};

type UseFormOptions<T> = {
    initialValues: T;
    onSubmit: (values: T) => Promise<void> | void;
    validate?: (values: T) => ValidationError;
    validateOnChange?: boolean;
    validateOnBlur?: boolean;
};

/**
 * Custom form hook for handling form state, validation, and submission
 * 
 * @example
 * const { values, errors, handleChange, handleSubmit, isSubmitting } = useForm({
 *     initialValues: { email: '', password: '' },
 *     onSubmit: async (values) => {
 *         await login(values);
 *     },
 *     validate: (values) => {
 *         const errors = {};
 *         if (!values.email) errors.email = 'Email is required';
 *         return errors;
 *     },
 * });
 */
export function useForm<T extends Record<string, unknown>>({
    initialValues,
    onSubmit,
    validate,
    validateOnChange = false,
    validateOnBlur = true,
}: UseFormOptions<T>) {
    const [state, setState] = useState<FormState<T>>({
        values: initialValues,
        errors: {},
        touched: {},
        isSubmitting: false,
        isValid: true,
    });

    const validateForm = useCallback((values: T): ValidationError => {
        if (!validate) return {};
        return validate(values);
    }, [validate]);

    const setFieldValue = useCallback((name: keyof T, value: unknown) => {
        setState((prev) => {
            const newValues = { ...prev.values, [name]: value };
            const errors = validateOnChange ? validateForm(newValues) : prev.errors;
            return {
                ...prev,
                values: newValues,
                errors,
                isValid: Object.keys(errors).length === 0,
            };
        });
    }, [validateForm, validateOnChange]);

    const setFieldError = useCallback((name: string, error: string) => {
        setState((prev) => ({
            ...prev,
            errors: { ...prev.errors, [name]: error },
            isValid: false,
        }));
    }, []);

    const clearFieldError = useCallback((name: string) => {
        setState((prev) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { [name]: _removed, ...restErrors } = prev.errors;
            return {
                ...prev,
                errors: restErrors,
                isValid: Object.keys(restErrors).length === 0,
            };
        });
    }, []);

    const handleChange = useCallback((
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setFieldValue(name as keyof T, newValue);
    }, [setFieldValue]);

    const handleBlur = useCallback((
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name } = e.target;
        setState((prev) => ({
            ...prev,
            touched: { ...prev.touched, [name]: true },
        }));

        if (validateOnBlur) {
            const errors = validateForm(state.values);
            setState((prev) => ({
                ...prev,
                errors,
                isValid: Object.keys(errors).length === 0,
            }));
        }
    }, [validateForm, validateOnBlur, state.values]);

    const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate all fields
        const errors = validateForm(state.values);
        const isValid = Object.keys(errors).length === 0;

        // Mark all fields as touched
        const touched = Object.keys(state.values).reduce(
            (acc, key) => ({ ...acc, [key]: true }),
            {}
        );

        setState((prev) => ({
            ...prev,
            errors,
            touched,
            isValid,
        }));

        if (!isValid) return;

        setState((prev) => ({ ...prev, isSubmitting: true }));

        try {
            await onSubmit(state.values);
        } catch (error) {
            console.error('Form submission error:', error);
            throw error;
        } finally {
            setState((prev) => ({ ...prev, isSubmitting: false }));
        }
    }, [state.values, validateForm, onSubmit]);

    const reset = useCallback(() => {
        setState({
            values: initialValues,
            errors: {},
            touched: {},
            isSubmitting: false,
            isValid: true,
        });
    }, [initialValues]);

    const setValues = useCallback((values: Partial<T>) => {
        setState((prev) => ({
            ...prev,
            values: { ...prev.values, ...values },
        }));
    }, []);

    return {
        values: state.values,
        errors: state.errors,
        touched: state.touched,
        isSubmitting: state.isSubmitting,
        isValid: state.isValid,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        setFieldError,
        clearFieldError,
        setValues,
        reset,
        getFieldProps: (name: keyof T) => ({
            name,
            value: state.values[name],
            onChange: handleChange,
            onBlur: handleBlur,
            error: state.touched[name as string] ? state.errors[name as string] : undefined,
        }),
    };
}

/**
 * Helper to create a validator from a Zod schema
 */
export function createZodValidator<T>(schema: { safeParse: (data: unknown) => { success: boolean; error?: { errors: Array<{ path: (string | number)[]; message: string }> } } }) {
    return (values: T): ValidationError => {
        const result = schema.safeParse(values);
        if (result.success) return {};
        
        const errors: ValidationError = {};
        result.error?.errors.forEach((err) => {
            const path = err.path.join('.');
            if (!errors[path]) {
                errors[path] = err.message;
            }
        });
        return errors;
    };
}

/**
 * Simple validation helpers
 */
export const validators = {
    required: (value: unknown, message = 'This field is required') => {
        if (value === undefined || value === null || value === '') {
            return message;
        }
        return undefined;
    },

    email: (value: string, message = 'Please enter a valid email') => {
        if (!value) return undefined;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            return message;
        }
        return undefined;
    },

    minLength: (min: number, message?: string) => (value: string) => {
        if (!value) return undefined;
        if (value.length < min) {
            return message || `Must be at least ${min} characters`;
        }
        return undefined;
    },

    maxLength: (max: number, message?: string) => (value: string) => {
        if (!value) return undefined;
        if (value.length > max) {
            return message || `Must be less than ${max} characters`;
        }
        return undefined;
    },

    pattern: (regex: RegExp, message: string) => (value: string) => {
        if (!value) return undefined;
        if (!regex.test(value)) {
            return message;
        }
        return undefined;
    },

    match: (otherValue: string, message = 'Values do not match') => (value: string) => {
        if (value !== otherValue) {
            return message;
        }
        return undefined;
    },

    url: (value: string, message = 'Please enter a valid URL') => {
        if (!value) return undefined;
        try {
            new URL(value);
            return undefined;
        } catch {
            return message;
        }
    },
};

/**
 * Compose multiple validators
 */
export function composeValidators(...validators: Array<(value: unknown) => string | undefined>) {
    return (value: unknown): string | undefined => {
        for (const validator of validators) {
            const error = validator(value);
            if (error) return error;
        }
        return undefined;
    };
}
