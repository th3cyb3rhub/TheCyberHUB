"use client";

import React, { createContext, useContext, useEffect, useRef, useState, useCallback, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';
import { API_URL, fetchApi } from '@/lib/api';

export interface NotificationData {
    _id: string;
    type: string;
    title: string;
    message: string;
    link?: string;
    read: boolean;
    createdAt: string;
    actor?: {
        name: string;
        username: string;
        avatar?: string;
    };
}

interface NotificationContextValue {
    socket: Socket | null;
    connected: boolean;
    notifications: NotificationData[];
    unreadCount: number;
    markAsRead: (id: string) => Promise<void>;
    markAllAsRead: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextValue>({
    socket: null,
    connected: false,
    notifications: [],
    unreadCount: 0,
    markAsRead: async () => { },
    markAllAsRead: async () => { },
});

export const useNotificationSocket = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const { token, user } = useAuth();
    const { addToast } = useToast();
    const addToastRef = useRef(addToast);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [connected, setConnected] = useState(false);
    const [notifications, setNotifications] = useState<NotificationData[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);

    // Keep the ref up to date without triggering reconnects
    useEffect(() => {
        addToastRef.current = addToast;
    }, [addToast]);

    const fetchNotifications = useCallback(async () => {
        if (!token) return;
        try {
            const [data, unreadData] = await Promise.all([
                fetchApi('/api/notifications?limit=20'),
                fetchApi('/api/notifications/unread-count'),
            ]);
            if (data.success) setNotifications(data.data);
            if (unreadData.success) setUnreadCount(unreadData.data.count);
        } catch {
            // Silently fail — notification fetch is non-critical
        }
    }, [token]);

    const markAsRead = async (id: string) => {
        try {
            await fetchApi(`/api/notifications/${id}/read`, { method: 'PATCH' });
            setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch {
            // Silently fail
        }
    };

    const markAllAsRead = async () => {
        try {
            await fetchApi('/api/notifications/read-all', { method: 'PATCH' });
            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
            setUnreadCount(0);
        } catch {
            // Silently fail
        }
    };

    useEffect(() => {
        if (!token || !user) {
            if (socket) {
                socket.disconnect();
                setSocket(null);
                setConnected(false);
            }
            return;
        }

        // Initialize Socket.io connection with reconnection/heartbeat logic
        const newSocket = io(API_URL, {
            auth: { token },
            transports: ['websocket', 'polling'],
            reconnection: true,
            reconnectionAttempts: 10,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 30000,
            timeout: 20000,
        });

        // Fetch initial state
        fetchNotifications();

        const onConnect = () => {
            setConnected(true);
        };

        const onDisconnect = () => {
            setConnected(false);
        };

        const onConnectError = () => {
            setConnected(false);
        };

        const onNewNotification = (data: NotificationData) => {

            setNotifications(prev => [data, ...prev]);
            setUnreadCount(prev => prev + 1);

            // Show toast via ref to avoid stale closure
            addToastRef.current({
                title: data.title || 'New Notification',
                message: data.message || 'You have a new update.',
                variant: 'info'
            });
        };

        newSocket.on('connect', onConnect);
        newSocket.on('disconnect', onDisconnect);
        newSocket.on('connect_error', onConnectError);
        newSocket.on('newNotification', onNewNotification);

        setSocket(newSocket);

        // Cleanup: remove ALL event listeners and disconnect
        return () => {
            newSocket.off('connect', onConnect);
            newSocket.off('disconnect', onDisconnect);
            newSocket.off('connect_error', onConnectError);
            newSocket.off('newNotification', onNewNotification);
            newSocket.disconnect();
            setSocket(null);
            setConnected(false);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, user]);

    return (
        <NotificationContext.Provider value={{
            socket,
            connected,
            notifications,
            unreadCount,
            markAsRead,
            markAllAsRead
        }}>
            {children}
        </NotificationContext.Provider>
    );
};
