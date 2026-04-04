'use client'
/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useCallback } from 'react'
import { AlertTriangle } from 'lucide-react'

interface ConfirmDialogProps {
    open: boolean
    onConfirm: () => void
    onCancel: () => void
    title?: string
    description?: string
    confirmText?: string
    cancelText?: string
    variant?: 'danger' | 'warning' | 'info'
}

export function ConfirmDialog({
    open,
    onConfirm,
    onCancel,
    title = 'Are you sure?',
    description = 'This action cannot be undone.',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'danger',
}: ConfirmDialogProps) {
    if (!open) return null

    const variantStyles = {
        danger: 'bg-red-600 hover:bg-red-700',
        warning: 'bg-yellow-600 hover:bg-yellow-700',
        info: 'bg-blue-600 hover:bg-blue-700',
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
            <div className="relative bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 p-2 bg-red-500/10 rounded-full">
                        <AlertTriangle className="h-5 w-5 text-red-400" />
                    </div>
                    <div>
                        <h3 id="confirm-title" className="text-lg font-semibold text-white">{title}</h3>
                        <p className="mt-1 text-sm text-gray-400">{description}</p>
                    </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                    <button onClick={onCancel} className="px-4 py-2 text-sm rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors">
                        {cancelText}
                    </button>
                    <button onClick={onConfirm} className={`px-4 py-2 text-sm rounded-lg text-white transition-colors ${variantStyles[variant]}`}>
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    )
}

// Hook for easy usage
export function useConfirmDialog() {
    const [state, setState] = useState<{ open: boolean; resolve: ((value: boolean) => void) | null }>({
        open: false,
        resolve: null,
    })

    const confirm = useCallback(() => {
        return new Promise<boolean>((resolve) => {
            setState({ open: true, resolve })
        })
    }, [])

    const handleConfirm = useCallback(() => {
        state.resolve?.(true)
        setState({ open: false, resolve: null })
    }, [state.resolve])

    const handleCancel = useCallback(() => {
        state.resolve?.(false)
        setState({ open: false, resolve: null })
    }, [state.resolve])

    return { isOpen: state.open, confirm, onConfirm: handleConfirm, onCancel: handleCancel }
}
