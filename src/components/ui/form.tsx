"use client"

import React, { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';
import { AlertCircle, Check, Eye, EyeOff } from 'lucide-react';

// ============================================
// Form Field Wrapper
// ============================================

interface FormFieldProps {
    label?: string;
    error?: string;
    hint?: string;
    required?: boolean;
    children: React.ReactNode;
    className?: string;
}

export function FormField({ label, error, hint, required, children, className = '' }: FormFieldProps) {
    return (
        <div className={`space-y-1.5 ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-300">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            {children}
            {error && (
                <p className="text-sm text-red-400 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    {error}
                </p>
            )}
            {hint && !error && (
                <p className="text-xs text-gray-500">{hint}</p>
            )}
        </div>
    );
}

// ============================================
// Text Input
// ============================================

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className = '', error, leftIcon, rightIcon, ...props }, ref) => {
        return (
            <div className="relative">
                {leftIcon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        {leftIcon}
                    </div>
                )}
                <input
                    ref={ref}
                    className={`
                        w-full px-4 py-2.5 bg-white/5 border rounded-xl text-white placeholder:text-gray-600
                        focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${leftIcon ? 'pl-10' : ''}
                        ${rightIcon ? 'pr-10' : ''}
                        ${error 
                            ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' 
                            : 'border-white/10 focus:border-orange-500 focus:ring-orange-500/20'
                        }
                        ${className}
                    `}
                    {...props}
                />
                {rightIcon && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                        {rightIcon}
                    </div>
                )}
            </div>
        );
    }
);
Input.displayName = 'Input';

// ============================================
// Password Input
// ============================================

interface PasswordInputProps extends Omit<InputProps, 'type'> {
    showStrength?: boolean;
    strength?: 'weak' | 'medium' | 'strong';
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ showStrength, strength, ...props }, ref) => {
        const [showPassword, setShowPassword] = React.useState(false);

        return (
            <div className="space-y-2">
                <div className="relative">
                    <Input
                        ref={ref}
                        type={showPassword ? 'text' : 'password'}
                        rightIcon={
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="p-2.5 hover:text-white transition-colors"
                                tabIndex={-1}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        }
                        {...props}
                    />
                </div>
                {showStrength && strength && (
                    <div className="flex gap-1">
                        <div className={`h-1 flex-1 rounded-full ${
                            strength === 'weak' ? 'bg-red-500' :
                            strength === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`} />
                        <div className={`h-1 flex-1 rounded-full ${
                            strength === 'medium' || strength === 'strong' ? 
                            (strength === 'medium' ? 'bg-yellow-500' : 'bg-green-500') : 'bg-white/10'
                        }`} />
                        <div className={`h-1 flex-1 rounded-full ${
                            strength === 'strong' ? 'bg-green-500' : 'bg-white/10'
                        }`} />
                    </div>
                )}
            </div>
        );
    }
);
PasswordInput.displayName = 'PasswordInput';

// ============================================
// Textarea
// ============================================

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: boolean;
    showCount?: boolean;
    maxLength?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className = '', error, showCount, maxLength, value, ...props }, ref) => {
        const charCount = typeof value === 'string' ? value.length : 0;

        return (
            <div className="relative">
                <textarea
                    ref={ref}
                    value={value}
                    maxLength={maxLength}
                    className={`
                        w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder:text-gray-600
                        focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all resize-none
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${error 
                            ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' 
                            : 'border-white/10 focus:border-orange-500 focus:ring-orange-500/20'
                        }
                        ${className}
                    `}
                    {...props}
                />
                {showCount && maxLength && (
                    <div className={`absolute bottom-2 right-2 text-xs ${
                        charCount > maxLength * 0.9 ? 'text-orange-400' : 'text-gray-500'
                    }`}>
                        {charCount}/{maxLength}
                    </div>
                )}
            </div>
        );
    }
);
Textarea.displayName = 'Textarea';

// ============================================
// Select
// ============================================

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    error?: boolean;
    options: Array<{ value: string; label: string; disabled?: boolean }>;
    placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ className = '', error, options, placeholder, ...props }, ref) => {
        return (
            <select
                ref={ref}
                className={`
                    w-full px-4 py-2.5 bg-white/5 border rounded-xl text-white
                    focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${error 
                        ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' 
                        : 'border-white/10 focus:border-orange-500 focus:ring-orange-500/20'
                    }
                    ${className}
                `}
                {...props}
            >
                {placeholder && (
                    <option value="" disabled className="bg-gray-900">
                        {placeholder}
                    </option>
                )}
                {options.map((option) => (
                    <option 
                        key={option.value} 
                        value={option.value} 
                        disabled={option.disabled}
                        className="bg-gray-900"
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        );
    }
);
Select.displayName = 'Select';

// ============================================
// Checkbox
// ============================================

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string;
    error?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className = '', label, error, ...props }, ref) => {
        return (
            <label className={`flex items-start gap-3 cursor-pointer ${className}`}>
                <div className="relative mt-0.5">
                    <input
                        ref={ref}
                        type="checkbox"
                        className="sr-only peer"
                        {...props}
                    />
                    <div className={`
                        w-5 h-5 border rounded-md transition-all
                        peer-checked:bg-orange-500 peer-checked:border-orange-500
                        peer-focus:ring-2 peer-focus:ring-orange-500/20
                        ${error ? 'border-red-500/50' : 'border-white/20'}
                    `}>
                        <Check className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity m-0.5" />
                    </div>
                </div>
                {label && (
                    <span className="text-sm text-gray-300">{label}</span>
                )}
            </label>
        );
    }
);
Checkbox.displayName = 'Checkbox';

// ============================================
// Submit Button
// ============================================

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    loadingText?: string;
}

export function SubmitButton({ 
    children, 
    loading, 
    loadingText = 'Processing...', 
    disabled,
    className = '',
    ...props 
}: SubmitButtonProps) {
    return (
        <button
            type="submit"
            disabled={disabled || loading}
            className={`
                w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 
                hover:from-orange-600 hover:to-orange-700
                text-white font-medium rounded-xl transition-all
                disabled:opacity-50 disabled:cursor-not-allowed
                focus:outline-none focus:ring-2 focus:ring-orange-500/50
                ${className}
            `}
            {...props}
        >
            {loading ? (
                <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {loadingText}
                </span>
            ) : children}
        </button>
    );
}

// ============================================
// Form Error Alert
// ============================================

interface FormErrorAlertProps {
    message?: string;
    onDismiss?: () => void;
}

export function FormErrorAlert({ message, onDismiss }: FormErrorAlertProps) {
    if (!message) return null;

    return (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
                <p className="text-sm text-red-400">{message}</p>
            </div>
            {onDismiss && (
                <button
                    type="button"
                    onClick={onDismiss}
                    className="text-red-400 hover:text-red-300 transition-colors"
                >
                    ×
                </button>
            )}
        </div>
    );
}

// ============================================
// Form Success Alert
// ============================================

interface FormSuccessAlertProps {
    message?: string;
    onDismiss?: () => void;
}

export function FormSuccessAlert({ message, onDismiss }: FormSuccessAlertProps) {
    if (!message) return null;

    return (
        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-start gap-3">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
                <p className="text-sm text-green-400">{message}</p>
            </div>
            {onDismiss && (
                <button
                    type="button"
                    onClick={onDismiss}
                    className="text-green-400 hover:text-green-300 transition-colors"
                >
                    ×
                </button>
            )}
        </div>
    );
}
