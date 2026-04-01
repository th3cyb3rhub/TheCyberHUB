import { renderHook, act } from '@testing-library/react'
import { useDebounce } from '../useDebounce'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('useDebounce', () => {
    beforeEach(() => { vi.useFakeTimers() })
    afterEach(() => { vi.useRealTimers() })

    it('returns initial value immediately', () => {
        const { result } = renderHook(() => useDebounce('hello', 300))
        expect(result.current).toBe('hello')
    })

    it('debounces value changes', () => {
        const { result, rerender } = renderHook(
            ({ value }) => useDebounce(value, 300),
            { initialProps: { value: 'hello' } }
        )
        rerender({ value: 'world' })
        expect(result.current).toBe('hello')
        act(() => { vi.advanceTimersByTime(300) })
        expect(result.current).toBe('world')
    })

    it('resets timer on rapid changes', () => {
        const { result, rerender } = renderHook(
            ({ value }) => useDebounce(value, 300),
            { initialProps: { value: 'a' } }
        )
        rerender({ value: 'b' })
        act(() => { vi.advanceTimersByTime(200) })
        rerender({ value: 'c' })
        act(() => { vi.advanceTimersByTime(200) })
        expect(result.current).toBe('a')
        act(() => { vi.advanceTimersByTime(100) })
        expect(result.current).toBe('c')
    })

    it('uses default delay of 300ms', () => {
        const { result, rerender } = renderHook(
            ({ value }) => useDebounce(value),
            { initialProps: { value: 'initial' } }
        )
        rerender({ value: 'updated' })
        act(() => { vi.advanceTimersByTime(299) })
        expect(result.current).toBe('initial')
        act(() => { vi.advanceTimersByTime(1) })
        expect(result.current).toBe('updated')
    })

    it('works with non-string values', () => {
        const { result, rerender } = renderHook(
            ({ value }) => useDebounce(value, 100),
            { initialProps: { value: 42 } }
        )
        rerender({ value: 99 })
        expect(result.current).toBe(42)
        act(() => { vi.advanceTimersByTime(100) })
        expect(result.current).toBe(99)
    })

    it('works with object values', () => {
        const obj1 = { name: 'Alice' }
        const obj2 = { name: 'Bob' }
        const { result, rerender } = renderHook(
            ({ value }) => useDebounce(value, 200),
            { initialProps: { value: obj1 } }
        )
        rerender({ value: obj2 })
        expect(result.current).toBe(obj1)
        act(() => { vi.advanceTimersByTime(200) })
        expect(result.current).toBe(obj2)
    })
})
