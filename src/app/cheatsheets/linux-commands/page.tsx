"use client"

import React, { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { Copy, Check, Search, Terminal } from 'lucide-react';
import CheatsheetPageLayout from '@/components/ui/CheatsheetPageLayout';

interface Command {
    command: string;
    description: string;
    category: string;
}

const LinuxCommandsCheatsheet = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 300);
    const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

    const commands: Command[] = [
        // System Info
        { command: 'uname -a', description: 'Display system information', category: 'System Info' },
        { command: 'whoami', description: 'Show current user', category: 'System Info' },
        { command: 'id', description: 'Display user and group IDs', category: 'System Info' },
        { command: 'hostname', description: 'Show system hostname', category: 'System Info' },
        { command: 'cat /etc/os-release', description: 'Show OS version', category: 'System Info' },

        // Network
        { command: 'ifconfig', description: 'Display network interfaces', category: 'Network' },
        { command: 'ip addr', description: 'Show IP addresses', category: 'Network' },
        { command: 'netstat -tulpn', description: 'Show listening ports', category: 'Network' },
        { command: 'ss -tulpn', description: 'Modern netstat alternative', category: 'Network' },
        { command: 'arp -a', description: 'Display ARP table', category: 'Network' },

        // File System
        { command: 'find / -perm -4000 2>/dev/null', description: 'Find SUID binaries', category: 'File System' },
        { command: 'find / -writable -type d 2>/dev/null', description: 'Find writable directories', category: 'File System' },
        { command: 'ls -la /etc/passwd', description: 'Check passwd file permissions', category: 'File System' },
        { command: 'cat /etc/crontab', description: 'View cron jobs', category: 'File System' },

        // Process
        { command: 'ps aux', description: 'List all running processes', category: 'Process' },
        { command: 'ps aux | grep root', description: 'Show root processes', category: 'Process' },
        { command: 'top -n 1', description: 'Display process snapshot', category: 'Process' },

        // Users
        { command: 'cat /etc/passwd', description: 'List all users', category: 'Users' },
        { command: 'cat /etc/shadow', description: 'View password hashes (requires root)', category: 'Users' },
        { command: 'sudo -l', description: 'List sudo privileges', category: 'Users' },
        { command: 'w', description: 'Show logged in users', category: 'Users' },
    ];

    const copyToClipboard = (cmd: string) => {
        navigator.clipboard.writeText(cmd);
        setCopiedCommand(cmd);
        setTimeout(() => setCopiedCommand(null), 2000);
    };

    const filteredCommands = commands.filter(cmd =>
        cmd.command.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        cmd.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        cmd.category.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    const categories = Array.from(new Set(commands.map(c => c.category)));

    return (
        <CheatsheetPageLayout
            title="Linux"
            highlightedWord="Commands"
            description="Essential Linux commands for pentesting and system administration."
            icon={Terminal}
        >
            {/* Search */}
            <div className="mb-8">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search commands..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                    />
                </div>
            </div>

            {/* Commands by Category */}
            {categories.map(category => {
                const categoryCommands = filteredCommands.filter(c => c.category === category);
                if (categoryCommands.length === 0) return null;

                return (
                    <div key={category} className="mb-8">
                        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                            {category}
                        </h2>
                        <div className="space-y-2">
                            {categoryCommands.map((cmd, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/[0.02] hover:border-white/20 transition-colors group"
                                >
                                    <div className="flex-1 min-w-0">
                                        <code className="text-orange-500 text-sm font-mono">
                                            {cmd.command}
                                        </code>
                                        <p className="text-sm text-gray-500 mt-0.5">
                                            {cmd.description}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(cmd.command)}
                                        className="ml-3 p-2 rounded-lg border border-white/10 hover:border-white/20 text-gray-400 hover:text-white transition-colors flex-shrink-0"
                                        title="Copy"
                                    >
                                        {copiedCommand === cmd.command ? (
                                            <Check className="w-4 h-4 text-green-500" />
                                        ) : (
                                            <Copy className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}

            {/* No results */}
            {filteredCommands.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500">No commands found matching your search.</p>
                </div>
            )}
        </CheatsheetPageLayout>
    );
};

export default LinuxCommandsCheatsheet;