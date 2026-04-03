'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useDebounce } from '@/hooks/useDebounce';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { fetchApi, tokenStore } from '@/lib/api';
import {
    Loader2,
    Search,
    Users,
    Shield,
    ShieldCheck,
    ShieldAlert,
    Crown,
    Ban,
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    UserCog,
    ArrowLeft,
    Eye,
    AtSign,
    CalendarDays,
    Star,
    Award,
    CheckSquare,
    Square,
    Download,
} from 'lucide-react';
import Link from 'next/link';

interface User {
    _id: string;
    name: string;
    username: string;
    email: string;
    role: 'user' | 'moderator' | 'admin' | 'owner';
    isVerified: boolean;
    isActive: boolean;
    avatar?: string;
    createdAt: string;
    provider?: string;
    stats?: {
        eventsAttended: number;
        challengesSolved: number;
        points: number;
    };
    bookmarks?: {
        roadmaps: string[];
        cheatsheets: string[];
        tools: string[];
    };
}

interface Pagination {
    page: number;
    limit: number;
    total: number;
    pages: number;
}

const ROLE_CONFIG = {
    owner: { label: 'Owner', icon: Crown, color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
    admin: { label: 'Admin', icon: ShieldAlert, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
    moderator: { label: 'Mod', icon: ShieldCheck, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
    user: { label: 'User', icon: Shield, color: 'text-gray-400', bg: 'bg-white/5 border-white/10' },
};

const ROLES = ['user', 'moderator', 'admin', 'owner'] as const;

const AVAILABLE_BADGES = [
    { code: 'FIRST_SOLVE', name: 'First Blood (10 pts)' },
    { code: 'SOLVER_10', name: 'Problem Solver (50 pts)' },
    { code: 'SOLVER_50', name: 'Challenge Master (200 pts)' },
    { code: 'SOLVER_100', name: 'Elite Hacker (500 pts)' },
    { code: 'FIRST_BLOOD', name: 'Speed Demon (100 pts)' },
    { code: 'WEB_MASTER', name: 'Web Master (150 pts)' },
    { code: 'CRYPTO_MASTER', name: 'Crypto Master (150 pts)' },
    { code: 'FIRST_EVENT', name: 'Event Goer (10 pts)' },
    { code: 'EVENT_REGULAR', name: 'Regular Attendee (100 pts)' },
    { code: 'POINTS_100', name: 'Rising Star' },
    { code: 'POINTS_1000', name: 'Point Collector' },
    { code: 'POINTS_5000', name: 'Point Master' }
];

export default function AdminUsersPage() {
    const { user: currentUser, loading: authLoading } = useAuth();
    const { addToast } = useToast();

    const [users, setUsers] = useState<User[]>([]);
    const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, pages: 1 });
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 300);
    const [roleFilter, setRoleFilter] = useState<string>('');
    const [activeRoleEdit, setActiveRoleEdit] = useState<string | null>(null);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [confirmAction, setConfirmAction] = useState<{ type: 'ban' | 'role'; userId: string; username: string; detail: string } | null>(null);
    const [viewUser, setViewUser] = useState<User | null>(null);
    const [selectedBadge, setSelectedBadge] = useState<string>('');
    const [awardingBadge, setAwardingBadge] = useState<boolean>(false);

    // Bulk operations
    const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
    const [bulkMode, setBulkMode] = useState(false);
    const [bulkLoading, setBulkLoading] = useState(false);

    const token = tokenStore.get();

    const toggleUserSelection = (id: string) => {
        setSelectedUsers(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const selectAllUsers = () => {
        if (selectedUsers.size === users.length) {
            setSelectedUsers(new Set());
        } else {
            setSelectedUsers(new Set(users.map(u => u._id)));
        }
    };

    const handleBulkBan = async () => {
        if (selectedUsers.size === 0) return;
        setBulkLoading(true);
        try {
            const promises = Array.from(selectedUsers).map(id =>
                fetchApi(`/api/admin/users/${id}/status`, { method: 'PATCH' })
            );
            await Promise.all(promises);
            addToast({ variant: 'success', title: 'Bulk Action', message: `Toggled status for ${selectedUsers.size} users.` });
            setSelectedUsers(new Set());
            setBulkMode(false);
            fetchUsers(pagination.page);
        } catch {
            addToast({ variant: 'error', title: 'Error', message: 'Failed to complete bulk action.' });
        } finally {
            setBulkLoading(false);
        }
    };

    // CSV export
    const exportUsersCSV = () => {
        const header = ['Name', 'Username', 'Email', 'Role', 'Verified', 'Active', 'Joined'];
        const rows = users.map(u => [
            u.name,
            u.username,
            u.email,
            u.role,
            u.isVerified ? 'Yes' : 'No',
            u.isActive ? 'Yes' : 'No',
            new Date(u.createdAt).toLocaleDateString(),
        ]);
        const csv = [header, ...rows].map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `users-export-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };
    const canChangeRoles = currentUser?.role === 'admin' || currentUser?.role === 'owner';

    const fetchUsers = useCallback(async (page = 1) => {
        if (!token) return;
        try {
            setLoading(true);
            const params = new URLSearchParams({ page: String(page), limit: '20' });
            if (debouncedSearch) params.set('search', debouncedSearch);
            if (roleFilter) params.set('role', roleFilter);

            const data = await fetchApi(`/api/admin/users?${params}`);
            setUsers(data.data || []);
            setPagination(data.pagination || { page: 1, limit: 20, total: 0, pages: 1 });
        } catch (err) {
            console.error(err);
            addToast({ variant: 'error', title: 'Error', message: 'Failed to load users.' });
        } finally {
            setLoading(false);
        }
    }, [token, debouncedSearch, roleFilter, addToast]);

    useEffect(() => {
        if (!authLoading && currentUser) fetchUsers();
    }, [authLoading, currentUser, fetchUsers]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchUsers(1);
    };

    const handleRoleChange = async (userId: string, newRole: string) => {
        const userToChange = users.find(u => u._id === userId);
        setConfirmAction({ type: 'role', userId, username: userToChange?.username || 'user', detail: newRole });
    };

    const executeRoleChange = async () => {
        if (!confirmAction || confirmAction.type !== 'role') return;
        const { userId, detail: newRole } = confirmAction;
        setActionLoading(userId);
        try {
            const data = await fetchApi(`/api/admin/users/${userId}/role`, {
                method: 'PATCH',
                body: JSON.stringify({ role: newRole }),
            });
            setUsers(prev => prev.map(u => u._id === userId ? { ...u, ...data.data } : u));
            addToast({ variant: 'success', title: 'Role Updated', message: `Role changed to ${newRole}.` });
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Failed to update role.';
            addToast({ variant: 'error', title: 'Error', message });
        } finally {
            setActionLoading(null);
            setActiveRoleEdit(null);
            setConfirmAction(null);
        }
    };

    const handleToggleStatus = async (userId: string, currentlyActive: boolean) => {
        const userToChange = users.find(u => u._id === userId);
        setConfirmAction({ type: 'ban', userId, username: userToChange?.username || 'user', detail: currentlyActive ? 'ban' : 'unban' });
    };

    const executeToggleStatus = async () => {
        if (!confirmAction || confirmAction.type !== 'ban') return;
        const { userId } = confirmAction;
        setActionLoading(userId);
        try {
            const data = await fetchApi(`/api/admin/users/${userId}/status`, {
                method: 'PATCH',
            });
            setUsers(prev => prev.map(u => u._id === userId ? { ...u, ...data.data } : u));
            addToast({
                variant: 'success',
                title: confirmAction.detail === 'ban' ? 'User Banned' : 'User Unbanned',
                message: `User has been ${confirmAction.detail === 'ban' ? 'banned' : 'unbanned'}.`,
            });
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Failed to toggle status.';
            addToast({ variant: 'error', title: 'Error', message });
        } finally {
            setActionLoading(null);
            setConfirmAction(null);
        }
    };

    const handleAwardBadge = async (userId: string) => {
        if (!selectedBadge) return;
        setAwardingBadge(true);
        try {
            await fetchApi(`/api/admin/users/${userId}/badges`, {
                method: 'POST',
                body: JSON.stringify({ badgeCode: selectedBadge }),
            });
            addToast({ variant: 'success', title: 'Badge Awarded', message: `Successfully awarded badge to user!` });
            setSelectedBadge('');
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Error awarding badge';
            addToast({ variant: 'error', title: 'Error', message });
        } finally {
            setAwardingBadge(false);
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        );
    }

    if (!currentUser || (currentUser.role !== 'admin' && currentUser.role !== 'owner' && currentUser.role !== 'moderator')) {
        return (
            <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center text-white">
                Access Denied
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--color-background)] pt-24 pb-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <Link href="/admin" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                            <ArrowLeft className="w-5 h-5 text-gray-400" />
                        </Link>
                        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                            <Users className="w-5 h-5 text-orange-500" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">User Management</h1>
                            <p className="text-sm text-gray-500">{pagination.total} total users</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => { setBulkMode(!bulkMode); setSelectedUsers(new Set()); }}
                            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${bulkMode ? 'border-orange-500/50 bg-orange-500/10 text-orange-400' : 'border-white/10 bg-white/5 text-gray-400 hover:text-white'}`}
                        >
                            <CheckSquare className="w-3.5 h-3.5" />
                            Bulk Select
                        </button>
                        <button
                            onClick={exportUsersCSV}
                            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:text-white transition-colors"
                        >
                            <Download className="w-3.5 h-3.5" />
                            Export CSV
                        </button>
                    </div>
                </div>

                {/* Bulk Action Bar */}
                {bulkMode && selectedUsers.size > 0 && (
                    <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
                        <button onClick={selectAllUsers} className="text-xs text-orange-400 hover:text-orange-300">
                            {selectedUsers.size === users.length ? 'Deselect All' : 'Select All'}
                        </button>
                        <span className="text-xs text-gray-400">{selectedUsers.size} selected</span>
                        <div className="flex-1" />
                        <button
                            onClick={handleBulkBan}
                            disabled={bulkLoading}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                        >
                            {bulkLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Ban className="w-3 h-3" />}
                            Toggle Ban
                        </button>
                    </div>
                )}

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <form onSubmit={handleSearch} className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search by name, username, or email..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors"
                        />
                    </form>
                    <select
                        value={roleFilter}
                        onChange={e => { setRoleFilter(e.target.value); setTimeout(() => fetchUsers(1), 0); }}
                        className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-orange-500/50 transition-colors appearance-none cursor-pointer"
                    >
                        <option value="" className="bg-gray-900">All Roles</option>
                        {ROLES.map(r => (
                            <option key={r} value={r} className="bg-gray-900">{ROLE_CONFIG[r].label}</option>
                        ))}
                    </select>
                </div>

                {/* Confirmation Modal */}
                {confirmAction && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-background)]/60 backdrop-blur-sm" onClick={() => setConfirmAction(null)}>
                        <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 max-w-md w-full mx-4" role="dialog" aria-modal="true" aria-label="Confirm action" onClick={e => e.stopPropagation()}>
                            <h3 className="text-lg font-semibold text-white mb-2">
                                {confirmAction.type === 'ban'
                                    ? (confirmAction.detail === 'ban' ? 'Ban User' : 'Unban User')
                                    : 'Change Role'}
                            </h3>
                            <p className="text-sm text-gray-400 mb-6">
                                {confirmAction.type === 'ban'
                                    ? `Are you sure you want to ${confirmAction.detail} "${confirmAction.username}"?`
                                    : `Change "${confirmAction.username}" role to ${confirmAction.detail}?`}
                            </p>
                            <div className="flex gap-3 justify-end">
                                <button onClick={() => setConfirmAction(null)} className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">Cancel</button>
                                <button
                                    onClick={() => confirmAction.type === 'ban' ? executeToggleStatus() : executeRoleChange()}
                                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${confirmAction.type === 'ban' && confirmAction.detail === 'ban'
                                        ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                                        : 'bg-orange-500/20 text-orange-400 hover:bg-orange-500/30'
                                        }`}
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* User Details Modal */}
                {viewUser && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-background)]/60 backdrop-blur-sm p-4" onClick={() => setViewUser(null)}>
                        <div className="bg-gray-900 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" role="dialog" aria-modal="true" aria-label="User details" onClick={e => e.stopPropagation()}>
                            {/* Modal Header */}
                            <div className="p-6 border-b border-white/10 flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-2xl text-white font-bold shrink-0 shadow-lg shadow-orange-500/20">
                                        {viewUser.avatar ? (
                                            <Image src={viewUser.avatar} alt={viewUser.name} width={64} height={64} className="w-full h-full rounded-2xl object-cover" unoptimized />
                                        ) : (
                                            viewUser.name?.[0]?.toUpperCase() || '?'
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                            {viewUser.name}
                                            {viewUser.isVerified && <span title="Verified" className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-400" /></span>}
                                            {viewUser.isActive === false && <span title="Banned" className="flex items-center"><Ban className="w-4 h-4 text-red-500" /></span>}
                                        </h3>
                                        <div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
                                            <span className="flex items-center gap-1"><AtSign className="w-3 h-3" />{viewUser.username}</span>
                                            <span className="flex items-center gap-1"><CalendarDays className="w-3 h-3" />Joined {new Date(viewUser.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => setViewUser(null)} className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors" aria-label="Close user details">✕</button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6 space-y-6">
                                {/* Role & Status Badge */}
                                <div className="flex flex-wrap gap-2">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border ${ROLE_CONFIG[viewUser.role].bg} ${ROLE_CONFIG[viewUser.role].color}`}>
                                        {(() => { const RoleIcon = ROLE_CONFIG[viewUser.role].icon; return <RoleIcon className="w-4 h-4" />; })()}
                                        {ROLE_CONFIG[viewUser.role].label}
                                    </span>
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border ${viewUser.isActive !== false ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
                                        }`}>
                                        {viewUser.isActive !== false ? <CheckCircle className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                                        {viewUser.isActive !== false ? 'Active Account' : 'Banned Account'}
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border bg-white/5 border-white/10 text-gray-300">
                                        <Shield className="w-4 h-4 text-gray-400" />
                                        Provider: <span className="capitalize">{viewUser.provider || 'Local'}</span>
                                    </span>
                                </div>

                                {/* Contact Info */}
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wider">Contact</h4>
                                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                                        <span className="text-gray-300">{viewUser.email}</span>
                                        {viewUser.isVerified ? (
                                            <span className="text-xs text-blue-400 font-medium px-2 py-1 bg-blue-500/10 rounded-md">Verified</span>
                                        ) : (
                                            <span className="text-xs text-yellow-400 font-medium px-2 py-1 bg-yellow-500/10 rounded-md">Unverified</span>
                                        )}
                                    </div>
                                </div>

                                {/* Stats Grid */}
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wider">Platform Stats</h4>
                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="p-4 rounded-xl border border-white/10 bg-white/5 flex flex-col items-center justify-center text-center">
                                            <Award className="w-6 h-6 text-yellow-400 mb-2" />
                                            <span className="text-2xl font-bold text-white">{viewUser.stats?.points || 0}</span>
                                            <span className="text-xs text-gray-500 mt-1">Total Points</span>
                                        </div>
                                        <div className="p-4 rounded-xl border border-white/10 bg-white/5 flex flex-col items-center justify-center text-center">
                                            <CheckCircle className="w-6 h-6 text-green-400 mb-2" />
                                            <span className="text-2xl font-bold text-white">{viewUser.stats?.challengesSolved || 0}</span>
                                            <span className="text-xs text-gray-500 mt-1">Challenges Solved</span>
                                        </div>
                                        <div className="p-4 rounded-xl border border-white/10 bg-white/5 flex flex-col items-center justify-center text-center">
                                            <Star className="w-6 h-6 text-purple-400 mb-2" />
                                            <span className="text-2xl font-bold text-white">{viewUser.stats?.eventsAttended || 0}</span>
                                            <span className="text-xs text-gray-500 mt-1">Events Attended</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Award Badge (Admin Action) */}
                                {canChangeRoles && (
                                    <div className="border-t border-white/10 pt-6 mt-6">
                                        <h4 className="text-sm font-medium text-orange-400 mb-3 flex items-center gap-2">
                                            <Award className="w-4 h-4" /> Grant Badge (Admin Action)
                                        </h4>
                                        <div className="flex gap-3">
                                            <select
                                                value={selectedBadge}
                                                onChange={e => setSelectedBadge(e.target.value)}
                                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500/50"
                                            >
                                                <option value="" className="bg-gray-900 text-gray-400">Select Badge to Award...</option>
                                                {AVAILABLE_BADGES.map((b) => (
                                                    <option key={b.code} value={b.code} className="bg-gray-900">{b.name}</option>
                                                ))}
                                            </select>
                                            <button
                                                onClick={() => handleAwardBadge(viewUser._id)}
                                                disabled={!selectedBadge || awardingBadge}
                                                className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors flex items-center gap-2"
                                            >
                                                {awardingBadge ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Award'}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Bookmarks Summary */}
                                {viewUser.bookmarks && (
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wider">Bookmarks</h4>
                                        <div className="flex gap-2 text-sm">
                                            <span className="px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                                {viewUser.bookmarks.roadmaps?.length || 0} Roadmaps
                                            </span>
                                            <span className="px-3 py-1.5 rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20">
                                                {viewUser.bookmarks.cheatsheets?.length || 0} Cheatsheets
                                            </span>
                                            <span className="px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                                                {viewUser.bookmarks.tools?.length || 0} Tools
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Table */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                    </div>
                ) : users.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Users className="w-8 h-8 text-gray-600" />
                        </div>
                        <h3 className="text-xl font-medium text-white mb-2">No users found</h3>
                        <p className="text-gray-500">Try adjusting your search or filters.</p>
                    </div>
                ) : (
                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
                        {/* Desktop Table */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        {bulkMode && (
                                            <th className="px-3 py-4 w-10">
                                                <button onClick={selectAllUsers} className="text-gray-400 hover:text-orange-400 transition-colors">
                                                    {selectedUsers.size === users.length ? <CheckSquare className="w-4 h-4 text-orange-400" /> : <Square className="w-4 h-4" />}
                                                </button>
                                            </th>
                                        )}
                                        <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                        <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                        <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                                        <th className="text-right px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {users.map(u => {
                                        const roleInfo = ROLE_CONFIG[u.role];
                                        const RoleIcon = roleInfo.icon;
                                        const isSelf = currentUser.id === u._id;

                                        return (
                                            <tr key={u._id} className="hover:bg-white/[0.02] transition-colors">
                                                {bulkMode && (
                                                    <td className="px-3 py-4 w-10">
                                                        <button
                                                            onClick={() => toggleUserSelection(u._id)}
                                                            className="text-gray-400 hover:text-orange-400 transition-colors"
                                                        >
                                                            {selectedUsers.has(u._id) ? <CheckSquare className="w-4 h-4 text-orange-400" /> : <Square className="w-4 h-4" />}
                                                        </button>
                                                    </td>
                                                )}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-sm text-white font-medium shrink-0">
                                                            {u.name?.[0]?.toUpperCase() || '?'}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <div className="text-sm font-medium text-white truncate">
                                                                {u.name}
                                                                {isSelf && <span className="ml-2 text-xs text-orange-400">(you)</span>}
                                                            </div>
                                                            <div className="text-xs text-gray-500 truncate">@{u.username} · {u.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {activeRoleEdit === u._id ? (
                                                        <div className="flex items-center gap-1">
                                                            {ROLES.map(r => (
                                                                <button
                                                                    key={r}
                                                                    onClick={() => handleRoleChange(u._id, r)}
                                                                    disabled={actionLoading === u._id}
                                                                    className={`px-2 py-1 rounded text-xs font-medium border transition-colors ${u.role === r
                                                                        ? `${ROLE_CONFIG[r].bg} ${ROLE_CONFIG[r].color}`
                                                                        : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
                                                                        }`}
                                                                >
                                                                    {ROLE_CONFIG[r].label}
                                                                </button>
                                                            ))}
                                                            <button
                                                                onClick={() => setActiveRoleEdit(null)}
                                                                className="text-xs text-gray-500 hover:text-white ml-1"
                                                            >
                                                                ✕
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${roleInfo.bg} ${roleInfo.color}`}>
                                                            <RoleIcon className="w-3.5 h-3.5" />
                                                            {roleInfo.label}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        {u.isActive !== false ? (
                                                            <span className="inline-flex items-center gap-1 text-xs text-green-400">
                                                                <CheckCircle className="w-3.5 h-3.5" /> Active
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1 text-xs text-red-400">
                                                                <Ban className="w-3.5 h-3.5" /> Banned
                                                            </span>
                                                        )}
                                                        {u.isVerified && (
                                                            <span className="text-xs text-blue-400" title="Email verified">✓</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-xs text-gray-500">
                                                    {new Date(u.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => setViewUser(u)}
                                                            className="p-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-colors"
                                                            title="View Details"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </button>
                                                        {!isSelf && (
                                                            <>
                                                                {canChangeRoles && (
                                                                    <button
                                                                        onClick={() => setActiveRoleEdit(activeRoleEdit === u._id ? null : u._id)}
                                                                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                                                        title="Change Role"
                                                                    >
                                                                        <UserCog className="w-4 h-4" />
                                                                    </button>
                                                                )}
                                                                <button
                                                                    onClick={() => handleToggleStatus(u._id, u.isActive !== false)}
                                                                    disabled={actionLoading === u._id}
                                                                    className={`p-1.5 rounded-lg transition-colors ${u.isActive !== false
                                                                        ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400'
                                                                        : 'bg-green-500/10 hover:bg-green-500/20 text-green-400'
                                                                        }`}
                                                                    title={u.isActive !== false ? 'Ban User' : 'Unban User'}
                                                                >
                                                                    {actionLoading === u._id
                                                                        ? <Loader2 className="w-4 h-4 animate-spin" />
                                                                        : u.isActive !== false
                                                                            ? <Ban className="w-4 h-4" />
                                                                            : <CheckCircle className="w-4 h-4" />
                                                                    }
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="md:hidden divide-y divide-white/5">
                            {users.map(u => {
                                const roleInfo = ROLE_CONFIG[u.role];
                                const RoleIcon = roleInfo.icon;
                                const isSelf = currentUser.id === u._id;

                                return (
                                    <div key={u._id} className="p-4 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-sm text-white font-medium">
                                                    {u.name?.[0]?.toUpperCase() || '?'}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-white">
                                                        {u.name}
                                                        {isSelf && <span className="ml-2 text-xs text-orange-400">(you)</span>}
                                                    </div>
                                                    <div className="text-xs text-gray-500">@{u.username}</div>
                                                </div>
                                            </div>
                                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border ${roleInfo.bg} ${roleInfo.color}`}>
                                                <RoleIcon className="w-3 h-3" />
                                                {roleInfo.label}
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-2 mt-2">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => setViewUser(u)}
                                                    className="flex-1 py-2 text-xs font-medium text-blue-400 bg-blue-500/10 rounded-lg hover:bg-blue-500/20 transition-colors flex items-center justify-center gap-1.5"
                                                >
                                                    <Eye className="w-3.5 h-3.5" /> Details
                                                </button>
                                                {!isSelf && canChangeRoles && (
                                                    <button
                                                        onClick={() => setActiveRoleEdit(activeRoleEdit === u._id ? null : u._id)}
                                                        className="flex-1 py-2 text-xs font-medium text-gray-300 bg-white/5 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-1.5"
                                                    >
                                                        <UserCog className="w-3.5 h-3.5" /> Role
                                                    </button>
                                                )}
                                            </div>
                                            {!isSelf && (
                                                <button
                                                    onClick={() => handleToggleStatus(u._id, u.isActive !== false)}
                                                    disabled={actionLoading === u._id}
                                                    className={`w-full py-2 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5 ${u.isActive !== false
                                                        ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                                                        : 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                                                        }`}
                                                >
                                                    {u.isActive !== false ? <><Ban className="w-3.5 h-3.5" /> Ban Account</> : <><CheckCircle className="w-3.5 h-3.5" /> Unban Account</>}
                                                </button>
                                            )}
                                        </div>
                                        {activeRoleEdit === u._id && canChangeRoles && (
                                            <div className="flex flex-wrap gap-1">
                                                {ROLES.map(r => (
                                                    <button
                                                        key={r}
                                                        onClick={() => handleRoleChange(u._id, r)}
                                                        disabled={actionLoading === u._id}
                                                        className={`px-3 py-1.5 rounded text-xs font-medium border transition-colors ${u.role === r
                                                            ? `${ROLE_CONFIG[r].bg} ${ROLE_CONFIG[r].color}`
                                                            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                                                            }`}
                                                    >
                                                        {ROLE_CONFIG[r].label}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Pagination */}
                {pagination.pages > 1 && (
                    <div className="flex items-center justify-between mt-6">
                        <p className="text-sm text-gray-500">
                            Page {pagination.page} of {pagination.pages}
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => fetchUsers(pagination.page - 1)}
                                disabled={pagination.page <= 1}
                                className="p-2 rounded-lg bg-white/5 border border-white/10 text-white disabled:opacity-30 hover:bg-white/10 transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => fetchUsers(pagination.page + 1)}
                                disabled={pagination.page >= pagination.pages}
                                className="p-2 rounded-lg bg-white/5 border border-white/10 text-white disabled:opacity-30 hover:bg-white/10 transition-colors"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
