import { render, screen, fireEvent } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ConfirmDialog, useConfirmDialog } from '../ConfirmDialog'

// Mock lucide-react
vi.mock('lucide-react', () => ({
    AlertTriangle: (props: Record<string, unknown>) => <span data-testid="alert-icon" {...props} />,
}))

describe('ConfirmDialog', () => {
    const defaultProps = {
        open: true,
        onConfirm: vi.fn(),
        onCancel: vi.fn(),
    }

    it('renders nothing when not open', () => {
        const { container } = render(
            <ConfirmDialog {...defaultProps} open={false} />
        )
        expect(container.innerHTML).toBe('')
    })

    it('renders dialog when open', () => {
        render(<ConfirmDialog {...defaultProps} />)
        expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('displays default title and description', () => {
        render(<ConfirmDialog {...defaultProps} />)
        expect(screen.getByText('Are you sure?')).toBeInTheDocument()
        expect(screen.getByText('This action cannot be undone.')).toBeInTheDocument()
    })

    it('displays custom title and description', () => {
        render(
            <ConfirmDialog
                {...defaultProps}
                title="Delete post?"
                description="This will remove the post permanently."
            />
        )
        expect(screen.getByText('Delete post?')).toBeInTheDocument()
        expect(screen.getByText('This will remove the post permanently.')).toBeInTheDocument()
    })

    it('displays custom button text', () => {
        render(
            <ConfirmDialog
                {...defaultProps}
                confirmText="Delete"
                cancelText="Keep"
            />
        )
        expect(screen.getByText('Delete')).toBeInTheDocument()
        expect(screen.getByText('Keep')).toBeInTheDocument()
    })

    it('calls onConfirm when confirm button is clicked', () => {
        const onConfirm = vi.fn()
        render(<ConfirmDialog {...defaultProps} onConfirm={onConfirm} />)

        fireEvent.click(screen.getByText('Confirm'))
        expect(onConfirm).toHaveBeenCalledTimes(1)
    })

    it('calls onCancel when cancel button is clicked', () => {
        const onCancel = vi.fn()
        render(<ConfirmDialog {...defaultProps} onCancel={onCancel} />)

        fireEvent.click(screen.getByText('Cancel'))
        expect(onCancel).toHaveBeenCalledTimes(1)
    })

    it('calls onCancel when backdrop is clicked', () => {
        const onCancel = vi.fn()
        render(<ConfirmDialog {...defaultProps} onCancel={onCancel} />)

        // The backdrop is the first fixed div inside the dialog
        const backdrop = screen.getByRole('dialog').querySelector('.bg-black\\/60')
        expect(backdrop).not.toBeNull()
        fireEvent.click(backdrop!)
        expect(onCancel).toHaveBeenCalledTimes(1)
    })

    it('has correct aria attributes', () => {
        render(<ConfirmDialog {...defaultProps} title="Test Dialog" />)

        const dialog = screen.getByRole('dialog')
        expect(dialog).toHaveAttribute('aria-modal', 'true')
        expect(dialog).toHaveAttribute('aria-labelledby', 'confirm-title')

        const title = screen.getByText('Test Dialog')
        expect(title).toHaveAttribute('id', 'confirm-title')
    })

    it('renders the alert icon', () => {
        render(<ConfirmDialog {...defaultProps} />)
        expect(screen.getByTestId('alert-icon')).toBeInTheDocument()
    })
})

describe('useConfirmDialog', () => {
    it('starts with dialog closed', () => {
        const { result } = renderHook(() => useConfirmDialog())
        expect(result.current.isOpen).toBe(false)
    })

    it('opens dialog when confirm is called', async () => {
        const { result } = renderHook(() => useConfirmDialog())

        // Start confirmation (returns a promise)
        act(() => {
            result.current.confirm()
        })

        expect(result.current.isOpen).toBe(true)
    })

    it('resolves with true when onConfirm is called', async () => {
        const { result } = renderHook(() => useConfirmDialog())

        let resolved: boolean | undefined
        act(() => {
            result.current.confirm().then((val) => { resolved = val })
        })

        expect(result.current.isOpen).toBe(true)

        act(() => {
            result.current.onConfirm()
        })

        expect(result.current.isOpen).toBe(false)
        // Allow microtask to flush
        await vi.waitFor(() => expect(resolved).toBe(true))
    })

    it('resolves with false when onCancel is called', async () => {
        const { result } = renderHook(() => useConfirmDialog())

        let resolved: boolean | undefined
        act(() => {
            result.current.confirm().then((val) => { resolved = val })
        })

        act(() => {
            result.current.onCancel()
        })

        expect(result.current.isOpen).toBe(false)
        await vi.waitFor(() => expect(resolved).toBe(false))
    })
})
