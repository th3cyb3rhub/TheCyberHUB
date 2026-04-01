'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { User } from 'lucide-react';
import { fetchApi } from '@/lib/api';

interface UserSuggestion {
    _id: string;
    username: string;
    avatar?: string;
}

interface MentionAutocompleteProps {
    query: string;
    position: { top: number; left: number };
    onSelect: (username: string) => void;
    onClose: () => void;
}

export function MentionAutocomplete({ query, position, onSelect, onClose }: MentionAutocompleteProps) {
    const [suggestions, setSuggestions] = useState<UserSuggestion[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            if (query.length < 1) {
                setSuggestions([]);
                return;
            }

            setLoading(true);
            try {
                const data = await fetchApi(`/api/users/search?q=${encodeURIComponent(query)}&limit=5`, { requireAuth: false });
                setSuggestions(data.data || []);
                setSelectedIndex(0);
            } catch (err) {
                console.error('Failed to fetch user suggestions:', err);
            } finally {
                setLoading(false);
            }
        };

        const debounce = setTimeout(fetchUsers, 200);
        return () => clearTimeout(debounce);
    }, [query]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (suggestions.length === 0) return;

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    setSelectedIndex((prev) => (prev + 1) % suggestions.length);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setSelectedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
                    break;
                case 'Enter':
                case 'Tab':
                    e.preventDefault();
                    if (suggestions[selectedIndex]) {
                        onSelect(suggestions[selectedIndex].username);
                    }
                    break;
                case 'Escape':
                    onClose();
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [suggestions, selectedIndex, onSelect, onClose]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    if (suggestions.length === 0 && !loading) return null;

    return (
        <div
            ref={containerRef}
            className="absolute z-50 w-64 bg-neutral-900 border border-white/10 rounded-lg shadow-xl overflow-hidden"
            style={{ top: position.top, left: position.left }}
        >
            {loading ? (
                <div className="px-4 py-3 text-sm text-gray-400">Searching...</div>
            ) : (
                <ul className="py-1">
                    {suggestions.map((user, index) => (
                        <li key={user._id}>
                            <button
                                onClick={() => onSelect(user.username)}
                                className={`w-full flex items-center gap-3 px-4 py-2 text-left transition-colors ${index === selectedIndex
                                        ? 'bg-orange-500/20 text-white'
                                        : 'text-gray-300 hover:bg-white/5'
                                    }`}
                            >
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                    {user.avatar ? (
                                        <Image src={user.avatar} alt={user.username} width={32} height={32} className="w-8 h-8 rounded-full" unoptimized />
                                    ) : (
                                        <User className="w-4 h-4 text-gray-400" />
                                    )}
                                </div>
                                <span className="text-sm font-medium truncate">@{user.username}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

interface MentionTextareaProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    rows?: number;
    maxLength?: number;
    className?: string;
}

export function MentionTextarea({
    value,
    onChange,
    placeholder,
    rows = 4,
    maxLength,
    className = '',
}: MentionTextareaProps) {
    const [showAutocomplete, setShowAutocomplete] = useState(false);
    const [mentionQuery, setMentionQuery] = useState('');
    const [autocompletePosition, setAutocompletePosition] = useState({ top: 0, left: 0 });
    const [mentionStartIndex, setMentionStartIndex] = useState(-1);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        const cursorPos = e.target.selectionStart;

        onChange(newValue);

        // Check for @ mention
        const textBeforeCursor = newValue.slice(0, cursorPos);
        const mentionMatch = textBeforeCursor.match(/@(\w*)$/);

        if (mentionMatch) {
            setMentionQuery(mentionMatch[1]);
            setMentionStartIndex(cursorPos - mentionMatch[0].length);
            setShowAutocomplete(true);

            // Calculate position
            if (textareaRef.current) {
                const rect = textareaRef.current.getBoundingClientRect();
                setAutocompletePosition({
                    top: rect.height + 4,
                    left: 0,
                });
            }
        } else {
            setShowAutocomplete(false);
            setMentionQuery('');
            setMentionStartIndex(-1);
        }
    };

    const handleSelectMention = (username: string) => {
        if (mentionStartIndex >= 0) {
            const before = value.slice(0, mentionStartIndex);
            const after = value.slice(mentionStartIndex + mentionQuery.length + 1);
            const newValue = `${before}@${username} ${after}`;
            onChange(newValue);
        }
        setShowAutocomplete(false);
        setMentionQuery('');
        setMentionStartIndex(-1);
        textareaRef.current?.focus();
    };

    return (
        <div className="relative">
            <textarea
                ref={textareaRef}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                rows={rows}
                maxLength={maxLength}
                className={className}
            />
            {showAutocomplete && (
                <MentionAutocomplete
                    query={mentionQuery}
                    position={autocompletePosition}
                    onSelect={handleSelectMention}
                    onClose={() => setShowAutocomplete(false)}
                />
            )}
        </div>
    );
}

// Utility to render mentions as links
export function renderMentions(content: string): React.ReactNode {
    const mentionRegex = /@([a-z0-9_]+)/gi;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = mentionRegex.exec(content)) !== null) {
        // Add text before the mention
        if (match.index > lastIndex) {
            parts.push(content.slice(lastIndex, match.index));
        }

        // Add the mention as a link
        const username = match[1];
        parts.push(
            <a
                key={match.index}
                href={`/user/${username}`}
                className="text-orange-400 hover:text-orange-300 hover:underline"
            >
                @{username}
            </a>
        );

        lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < content.length) {
        parts.push(content.slice(lastIndex));
    }

    return parts.length > 0 ? parts : content;
}
