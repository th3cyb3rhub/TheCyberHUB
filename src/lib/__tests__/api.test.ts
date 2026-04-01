import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { tokenStore, fetchApi, API_URL } from '../api'

describe('tokenStore', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    it('returns null when no token is stored', () => {
        expect(tokenStore.get()).toBeNull()
    })

    it('stores and retrieves a token', () => {
        tokenStore.set('my-token-123')
        expect(tokenStore.get()).toBe('my-token-123')
    })

    it('removes a stored token', () => {
        tokenStore.set('my-token-123')
        tokenStore.remove()
        expect(tokenStore.get()).toBeNull()
    })

    it('overwrites an existing token', () => {
        tokenStore.set('old-token')
        tokenStore.set('new-token')
        expect(tokenStore.get()).toBe('new-token')
    })

    it('handles localStorage errors gracefully on get', () => {
        const spy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
            throw new Error('QuotaExceededError')
        })
        expect(tokenStore.get()).toBeNull()
        spy.mockRestore()
    })

    it('handles localStorage errors gracefully on set', () => {
        const spy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
            throw new Error('QuotaExceededError')
        })
        // Should not throw
        expect(() => tokenStore.set('token')).not.toThrow()
        spy.mockRestore()
    })

    it('handles localStorage errors gracefully on remove', () => {
        const spy = vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
            throw new Error('SecurityError')
        })
        expect(() => tokenStore.remove()).not.toThrow()
        spy.mockRestore()
    })
})

describe('fetchApi', () => {
    beforeEach(() => {
        localStorage.clear()
        vi.restoreAllMocks()
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('sends request with auth header when token exists', async () => {
        tokenStore.set('test-token')
        const mockResponse = { success: true, data: { id: 1 } }

        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: () => Promise.resolve(mockResponse),
        })

        const result = await fetchApi('/api/test')

        expect(global.fetch).toHaveBeenCalledWith(
            `${API_URL}/api/test`,
            expect.objectContaining({
                headers: expect.objectContaining({
                    'Authorization': 'Bearer test-token',
                    'Content-Type': 'application/json',
                }),
            })
        )
        expect(result).toEqual(mockResponse)
    })

    it('sends request without auth header when requireAuth is false', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: () => Promise.resolve({ data: 'public' }),
        })

        await fetchApi('/api/public', { requireAuth: false })

        const callHeaders = (global.fetch as ReturnType<typeof vi.fn>).mock.calls[0][1].headers
        expect(callHeaders).not.toHaveProperty('Authorization')
    })

    it('throws an error for non-ok responses', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
            status: 400,
            json: () => Promise.resolve({ message: 'Bad request' }),
        })

        await expect(fetchApi('/api/bad', { requireAuth: false })).rejects.toThrow('Bad request')
    })

    it('returns null for 204 No Content responses', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            status: 204,
            json: () => Promise.reject(new Error('No content')),
        })

        const result = await fetchApi('/api/delete-thing', { requireAuth: false })
        expect(result).toBeNull()
    })

    it('uses full URL when endpoint starts with http', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: () => Promise.resolve({}),
        })

        await fetchApi('https://external.api.com/data', { requireAuth: false })

        expect(global.fetch).toHaveBeenCalledWith(
            'https://external.api.com/data',
            expect.anything()
        )
    })

    it('attempts token refresh on 401 response', async () => {
        tokenStore.set('expired-token')
        localStorage.setItem('refreshToken', 'valid-refresh')

        let callCount = 0
        global.fetch = vi.fn().mockImplementation((url: string) => {
            if (url.includes('/auth/refresh')) {
                return Promise.resolve({
                    ok: true,
                    status: 200,
                    json: () => Promise.resolve({
                        accessToken: 'new-access-token',
                        refreshToken: 'new-refresh-token',
                    }),
                })
            }
            callCount++
            if (callCount === 1) {
                return Promise.resolve({
                    ok: false,
                    status: 401,
                    json: () => Promise.resolve({ message: 'Unauthorized' }),
                })
            }
            return Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve({ data: 'success' }),
            })
        })

        const result = await fetchApi('/api/protected')
        expect(result).toEqual({ data: 'success' })
        expect(tokenStore.get()).toBe('new-access-token')
    })
})
