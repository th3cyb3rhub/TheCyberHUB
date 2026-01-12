'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { SessionFormData } from '@/lib/mentorship/types';

interface SessionFormProps {
    mentorshipId: string;
    onSubmit: (data: SessionFormData) => Promise<void>;
    onClose: () => void;
    initialData?: Partial<SessionFormData>;
}

export function SessionForm({ mentorshipId, onSubmit, onClose, initialData }: SessionFormProps) {
    const [title, setTitle] = useState(initialData?.title || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [agenda, setAgenda] = useState(initialData?.agenda || '');
    const [date, setDate] = useState(initialData?.scheduledAt?.split('T')[0] || '');
    const [time, setTime] = useState(initialData?.scheduledAt?.split('T')[1]?.slice(0, 5) || '');
    const [duration, setDuration] = useState(initialData?.duration || 60);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validation
        if (!title.trim()) {
            setError('Title is required');
            return;
        }
        if (!date || !time) {
            setError('Date and time are required');
            return;
        }
        if (duration < 15 || duration > 120) {
            setError('Duration must be between 15 and 120 minutes');
            return;
        }

        const scheduledAt = new Date(`${date}T${time}`);
        if (scheduledAt <= new Date()) {
            setError('Session must be scheduled in the future');
            return;
        }

        setLoading(true);
        try {
            await onSubmit({
                mentorshipId,
                title: title.trim(),
                description: description.trim() || undefined,
                agenda: agenda.trim() || undefined,
                scheduledAt: scheduledAt.toISOString(),
                duration,
            });
            onClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to schedule session');
        } finally {
            setLoading(false);
        }
    };

    // Get minimum date (today)
    const today = new Date().toISOString().split('T')[0];

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-sm text-red-600">
                    {error}
                </div>
            )}

            {/* Title */}
            <div>
                <label className="block text-sm font-medium mb-1">
                    Title <span className="text-red-500">*</span>
                </label>
                <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Web Security Fundamentals"
                    maxLength={200}
                />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Date <span className="text-red-500">*</span>
                    </label>
                    <Input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        min={today}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Time <span className="text-red-500">*</span>
                    </label>
                    <Input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                </div>
            </div>

            {/* Duration */}
            <div>
                <label className="block text-sm font-medium mb-1">
                    Duration: {duration} minutes
                </label>
                <input
                    type="range"
                    min={15}
                    max={120}
                    step={15}
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>15 min</span>
                    <span>120 min</span>
                </div>
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description of the session..."
                    rows={2}
                    maxLength={1000}
                    className="w-full px-3 py-2 border rounded-md bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                />
            </div>

            {/* Agenda */}
            <div>
                <label className="block text-sm font-medium mb-1">Agenda</label>
                <textarea
                    value={agenda}
                    onChange={(e) => setAgenda(e.target.value)}
                    placeholder="Topics to cover, goals for the session..."
                    rows={3}
                    maxLength={2000}
                    className="w-full px-3 py-2 border rounded-md bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                />
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
                <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                    Cancel
                </Button>
                <Button type="submit" disabled={loading} className="flex-1">
                    {loading ? 'Scheduling...' : 'Schedule Session'}
                </Button>
            </div>
        </form>
    );
}
