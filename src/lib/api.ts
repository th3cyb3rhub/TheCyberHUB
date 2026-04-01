export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface FetchOptions extends RequestInit {
    requireAuth?: boolean;
}

// Centralized token access — all token reads/writes go through here
export const tokenStore = {
    get: (): string | null => {
        if (typeof window === 'undefined') return null;
        try { return window.localStorage.getItem('token'); } catch { return null; }
    },
    set: (token: string): void => {
        if (typeof window === 'undefined') return;
        try { window.localStorage.setItem('token', token); } catch { /* quota/private */ }
    },
    remove: (): void => {
        if (typeof window === 'undefined') return;
        try { window.localStorage.removeItem('token'); } catch { /* ignore */ }
    },
};

/**
 * A wrapper around the native Web API fetch function that automatically handles
 * attaching the Authentication token if present, provides consistent error handling,
 * and attempts a single token refresh on 401 responses.
 */
export async function fetchApi(endpoint: string, options: FetchOptions = {}) {
    const { requireAuth = true, headers = {}, ...restOptions } = options;

    const buildHeaders = (): Record<string, string> => {
        const requestHeaders: Record<string, string> = {
            'Content-Type': 'application/json',
            ...(headers as Record<string, string>),
        };
        if (requireAuth) {
            const token = tokenStore.get();
            if (token) {
                requestHeaders['Authorization'] = `Bearer ${token}`;
            }
        }
        return requestHeaders;
    };

    const url = endpoint.startsWith('http') ? endpoint : `${API_URL}${endpoint}`;

    let response = await fetch(url, {
        headers: buildHeaders(),
        ...restOptions,
    });

    // Attempt token refresh on 401 (only once, only if auth was required)
    if (response.status === 401 && requireAuth) {
        const refreshed = await tryRefreshToken();
        if (refreshed) {
            response = await fetch(url, {
                headers: buildHeaders(),
                ...restOptions,
            });
        }
    }

    if (!response.ok) {
        let errorMessage = 'An error occurred while fetching data';
        try {
            const data = await response.json();
            errorMessage = data.message || data.error?.message || errorMessage;
        } catch {
            // Ignore JSON parsing errors
        }
        throw new Error(errorMessage);
    }

    try {
        if (response.status !== 204) {
            return await response.json();
        }
        return null;
    } catch {
        return null;
    }
}

// Token refresh — called automatically on 401, prevents concurrent refresh attempts
let refreshPromise: Promise<boolean> | null = null;

async function tryRefreshToken(): Promise<boolean> {
    if (refreshPromise) return refreshPromise;

    refreshPromise = (async () => {
        try {
            const refreshToken = typeof window !== 'undefined'
                ? window.localStorage.getItem('refreshToken')
                : null;

            if (!refreshToken) return false;

            const response = await fetch(`${API_URL}/api/auth/refresh`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken }),
            });

            if (!response.ok) return false;

            const data = await response.json();
            if (data.accessToken) {
                tokenStore.set(data.accessToken);
                if (data.refreshToken) {
                    try { window.localStorage.setItem('refreshToken', data.refreshToken); } catch { /* ignore */ }
                }
                return true;
            }
            return false;
        } catch {
            return false;
        } finally {
            refreshPromise = null;
        }
    })();

    return refreshPromise;
}

/**
 * Uploads a file to the S3 bucket via the backend /api/upload/media endpoint.
 * @param file The File object to upload
 * @param folder The destination folder in S3 (e.g. 'feed', 'blogs', 'mentorship')
 * @returns The S3 URL of the uploaded media
 */
export async function uploadFile(file: File, folder: string = 'misc'): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const token = tokenStore.get();

    const response = await fetch(`${API_URL}/api/upload/media`, {
        method: 'POST',
        headers: {
            // Do NOT set Content-Type to application/json or multipart/form-data here
            // Let the browser set it automatically with the correct boundary for FormData
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: formData,
    });

    if (!response.ok) {
        let errorMessage = 'Failed to upload file';
        try {
            const data = await response.json();
            errorMessage = data.message || data.error?.message || errorMessage;
        } catch { /* response body isn't JSON — use default message */ }
        throw new Error(errorMessage);
    }

    const data = await response.json();
    return data.data.url;
}

/**
 * Deletes a file from the S3 bucket using its URL.
 * @param url The S3 URL to delete
 */
export async function deleteFile(url: string): Promise<void> {
    if (!url) return;

    await fetchApi('/api/upload/media', {
        method: 'DELETE',
        body: JSON.stringify({ url }),
    });
}

