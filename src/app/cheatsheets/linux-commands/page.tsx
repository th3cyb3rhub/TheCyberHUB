// app/cheatsheets/linux-commands/page.tsx
"use client"

import React, { useState } from 'react';
import {
    Terminal,
    Copy,
    Download,
    Share,
    Search,
    Eye,
    EyeOff,
    Star,
    ArrowLeft,
    Shield,
    Network,
    Lock,
    Key,
    Database,
    FileText,
    CheckCircle,
    AlertTriangle,
    Info,
    Zap
} from 'lucide-react';

interface Command {
    id: string;
    command: string;
    description: string;
    example?: string;
    syntax?: string;
    useCase: string;
    riskLevel: 'low' | 'medium' | 'high';
    category: string;
    tags: string[];
    explanation?: string;
}

const LinuxPentestingCheatsheet = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedRisk, setSelectedRisk] = useState('all');
    const [copiedCommand, setCopiedCommand] = useState('');
    const [showExplanations, setShowExplanations] = useState(true);
    const [favorites, setFavorites] = useState<string[]>([]);

    const commands: Command[] = [
        // System Information & Enumeration
        {
            id: 'uname-info',
            command: 'uname -a',
            description: 'Display complete system information',
            example: 'uname -a\n# Linux server01 5.4.0-74-generic #83-Ubuntu SMP x86_64 GNU/Linux',
            syntax: 'uname [OPTION]...',
            useCase: 'Initial system reconnaissance to identify OS version, kernel, and architecture',
            riskLevel: 'low',
            category: 'reconnaissance',
            tags: ['system', 'info', 'basic'],
            explanation: 'Essential first command to understand the target system. Reveals kernel version which may have known vulnerabilities.'
        },
        {
            id: 'whoami-check',
            command: 'whoami && id',
            description: 'Check current user identity and privileges',
            example: 'whoami && id\n# www-data\n# uid=33(www-data) gid=33(www-data) groups=33(www-data)',
            useCase: 'Verify current privilege level and group memberships',
            riskLevel: 'low',
            category: 'reconnaissance',
            tags: ['user', 'privileges', 'basic'],
            explanation: 'Combines user identification with detailed privilege information. Critical for understanding current access level.'
        },
        {
            id: 'ps-processes',
            command: 'ps aux | grep -v "\\[" | head -20',
            description: 'List running processes (excluding kernel threads)',
            example: 'ps aux | grep -v "\\[" | head -20',
            syntax: 'ps [options]',
            useCase: 'Identify running services and potential attack vectors',
            riskLevel: 'low',
            category: 'reconnaissance',
            tags: ['processes', 'services', 'enumeration'],
            explanation: 'Shows running processes which may reveal services, applications, or privilege escalation opportunities.'
        },
        {
            id: 'netstat-connections',
            command: 'netstat -tulpn 2>/dev/null | grep LISTEN',
            description: 'Show listening ports and associated processes',
            example: 'netstat -tulpn 2>/dev/null | grep LISTEN\n# tcp 0.0.0.0:22 LISTEN 1234/sshd\n# tcp 0.0.0.0:80 LISTEN 5678/apache2',
            syntax: 'netstat -tulpn',
            useCase: 'Network service enumeration and potential entry points',
            riskLevel: 'low',
            category: 'network',
            tags: ['network', 'ports', 'services'],
            explanation: 'Reveals open ports and services, essential for identifying attack surface and potential vulnerabilities.'
        },
        {
            id: 'ss-sockets',
            command: 'ss -tulpn | grep LISTEN',
            description: 'Modern alternative to netstat for socket information',
            example: 'ss -tulpn | grep LISTEN',
            syntax: 'ss [options]',
            useCase: 'Network enumeration on modern Linux systems',
            riskLevel: 'low',
            category: 'network',
            tags: ['network', 'sockets', 'modern'],
            explanation: 'Faster and more detailed than netstat. Preferred tool on newer systems for network enumeration.'
        },

        // File System Exploration
        {
            id: 'find-suid',
            command: 'find / -type f -perm -4000 2>/dev/null',
            description: 'Find SUID binaries for privilege escalation',
            example: 'find / -type f -perm -4000 2>/dev/null\n# /usr/bin/passwd\n# /usr/bin/sudo\n# /bin/ping',
            syntax: 'find [path] -type f -perm -4000',
            useCase: 'Identify potential privilege escalation vectors through SUID binaries',
            riskLevel: 'medium',
            category: 'privesc',
            tags: ['suid', 'privesc', 'binaries'],
            explanation: 'SUID binaries run with owner privileges. Misconfigured SUID binaries are common privilege escalation vectors.'
        },
        {
            id: 'find-sgid',
            command: 'find / -type f -perm -2000 2>/dev/null',
            description: 'Find SGID binaries and directories',
            example: 'find / -type f -perm -2000 2>/dev/null',
            syntax: 'find [path] -type f -perm -2000',
            useCase: 'Locate SGID files that might allow group privilege escalation',
            riskLevel: 'medium',
            category: 'privesc',
            tags: ['sgid', 'privesc', 'groups'],
            explanation: 'SGID files run with group privileges. Can be exploited for privilege escalation or information disclosure.'
        },
        {
            id: 'find-writable',
            command: 'find / -writable -type d 2>/dev/null | head -20',
            description: 'Find world-writable directories',
            example: 'find / -writable -type d 2>/dev/null | head -20\n# /tmp\n# /var/tmp\n# /dev/shm',
            syntax: 'find [path] -writable -type d',
            useCase: 'Identify directories where files can be written for persistence or exploitation',
            riskLevel: 'medium',
            category: 'reconnaissance',
            tags: ['writable', 'directories', 'persistence'],
            explanation: 'Writable directories can be used for file uploads, persistence mechanisms, or temporary exploit storage.'
        },
        {
            id: 'find-config',
            command: 'find /etc -name "*.conf" -readable 2>/dev/null | head -10',
            description: 'Find readable configuration files',
            example: 'find /etc -name "*.conf" -readable 2>/dev/null | head -10',
            syntax: 'find [path] -name "*.conf" -readable',
            useCase: 'Enumerate configuration files that might contain credentials or sensitive information',
            riskLevel: 'low',
            category: 'reconnaissance',
            tags: ['config', 'files', 'credentials'],
            explanation: 'Configuration files often contain passwords, API keys, or system information useful for further exploitation.'
        },

        // Network Reconnaissance
        {
            id: 'arp-table',
            command: 'arp -a || ip neigh show',
            description: 'Display ARP table to discover network hosts',
            example: 'arp -a\n# gateway (192.168.1.1) at aa:bb:cc:dd:ee:ff [ether] on eth0\n# server (192.168.1.100) at 11:22:33:44:55:66 [ether] on eth0',
            syntax: 'arp -a',
            useCase: 'Network discovery and lateral movement planning',
            riskLevel: 'low',
            category: 'network',
            tags: ['arp', 'network', 'discovery'],
            explanation: 'ARP table reveals recently communicated hosts, providing targets for lateral movement.'
        },
        {
            id: 'route-table',
            command: 'route -n || ip route show',
            description: 'Display routing table to understand network topology',
            example: 'route -n\n# 0.0.0.0 192.168.1.1 UG eth0\n# 192.168.1.0/24 0.0.0.0 U eth0',
            syntax: 'route -n',
            useCase: 'Understanding network layout for pivoting and lateral movement',
            riskLevel: 'low',
            category: 'network',
            tags: ['routing', 'network', 'topology'],
            explanation: 'Routing information reveals network segments and potential pivot points for lateral movement.'
        },
        {
            id: 'ping-sweep',
            command: 'for i in {1..254}; do timeout 1 ping -c1 192.168.1.$i 2>&1 | grep "64 bytes" | cut -d" " -f4 | cut -d":" -f1; done',
            description: 'Quick ping sweep of local subnet',
            example: 'for i in {1..254}; do timeout 1 ping -c1 192.168.1.$i 2>&1 | grep "64 bytes" | cut -d" " -f4 | cut -d":" -f1; done',
            syntax: 'for i in {1..254}; do ping -c1 [network].$i; done',
            useCase: 'Discover live hosts in the current network segment',
            riskLevel: 'medium',
            category: 'network',
            tags: ['ping', 'sweep', 'discovery'],
            explanation: 'Identifies active hosts in the network. May generate network traffic that could be detected by monitoring systems.'
        },

        // Privilege Escalation
        {
            id: 'sudo-check',
            command: 'sudo -l',
            description: 'List sudo privileges for current user',
            example: 'sudo -l\n# User www-data may run the following commands:\n# (root) NOPASSWD: /usr/bin/systemctl restart apache2',
            syntax: 'sudo -l',
            useCase: 'Identify commands that can be run with elevated privileges',
            riskLevel: 'low',
            category: 'privesc',
            tags: ['sudo', 'privileges', 'escalation'],
            explanation: 'Shows sudo permissions which are often misconfigured and can lead to privilege escalation.'
        },
        {
            id: 'crontab-enum',
            command: 'cat /etc/crontab && ls -la /etc/cron* && crontab -l 2>/dev/null',
            description: 'Enumerate scheduled tasks and cron jobs',
            example: 'cat /etc/crontab\n# */5 * * * * root /opt/backup.sh',
            syntax: 'cat /etc/crontab',
            useCase: 'Find scheduled tasks that might be exploitable or reveal system behavior',
            riskLevel: 'low',
            category: 'privesc',
            tags: ['cron', 'scheduled', 'tasks'],
            explanation: 'Cron jobs running as root with writable scripts are common privilege escalation vectors.'
        },
        {
            id: 'capabilities-check',
            command: 'getcap -r / 2>/dev/null | grep -v "Operation not permitted"',
            description: 'Find files with special capabilities',
            example: 'getcap -r / 2>/dev/null\n# /usr/bin/ping = cap_net_raw+ep\n# /usr/bin/python3.8 = cap_setuid+ep',
            syntax: 'getcap -r [path]',
            useCase: 'Identify binaries with dangerous capabilities for privilege escalation',
            riskLevel: 'medium',
            category: 'privesc',
            tags: ['capabilities', 'privesc', 'binaries'],
            explanation: 'Linux capabilities can grant specific privileges. Misconfigured capabilities can lead to privilege escalation.'
        },

        // Log Analysis
        {
            id: 'auth-logs',
            command: 'tail -f /var/log/auth.log 2>/dev/null || tail -f /var/log/secure 2>/dev/null',
            description: 'Monitor authentication logs in real-time',
            example: 'tail -f /var/log/auth.log',
            syntax: 'tail -f /var/log/auth.log',
            useCase: 'Monitor login attempts and authentication events',
            riskLevel: 'low',
            category: 'monitoring',
            tags: ['logs', 'auth', 'monitoring'],
            explanation: 'Authentication logs reveal login patterns, failed attempts, and potential detection of intrusion activities.'
        },
        {
            id: 'last-logins',
            command: 'last -a | head -20',
            description: 'Show recent user login history',
            example: 'last -a | head -20\n# root pts/0 192.168.1.100 Mon Jan 15 10:30 - 11:45 (01:15)\n# user1 tty1 Mon Jan 15 09:00 - 10:00 (01:00)',
            syntax: 'last -a',
            useCase: 'Analyze user access patterns and identify suspicious logins',
            riskLevel: 'low',
            category: 'monitoring',
            tags: ['logins', 'history', 'users'],
            explanation: 'Login history helps identify normal vs. suspicious access patterns and potential unauthorized access.'
        },

        // Persistence & Backdoors
        {
            id: 'ssh-keys',
            command: 'cat ~/.ssh/authorized_keys 2>/dev/null && find /home -name "authorized_keys" 2>/dev/null',
            description: 'Check SSH authorized keys for persistence',
            example: 'cat ~/.ssh/authorized_keys',
            syntax: 'cat ~/.ssh/authorized_keys',
            useCase: 'Verify SSH key-based access and identify potential backdoors',
            riskLevel: 'medium',
            category: 'persistence',
            tags: ['ssh', 'keys', 'backdoor'],
            explanation: 'SSH keys provide persistent access. Unauthorized keys in authorized_keys files indicate potential backdoors.'
        },
        {
            id: 'bashrc-check',
            command: 'find /home -name ".bashrc" -exec grep -l "alias\\|function" {} \\; 2>/dev/null',
            description: 'Check for suspicious aliases or functions in user profiles',
            example: 'find /home -name ".bashrc" -exec grep -l "alias\\|function" {} \\;',
            syntax: 'grep -l "alias" ~/.bashrc',
            useCase: 'Detect command aliases that might hide malicious activity',
            riskLevel: 'medium',
            category: 'persistence',
            tags: ['bashrc', 'aliases', 'persistence'],
            explanation: 'Malicious aliases can redirect commands to backdoors or hide attacker activities from system administrators.'
        },

        // Advanced Techniques
        {
            id: 'proc-analysis',
            command: 'ls -la /proc/*/exe 2>/dev/null | grep deleted',
            description: 'Find processes running deleted executables (potential fileless malware)',
            example: 'ls -la /proc/*/exe 2>/dev/null | grep deleted',
            syntax: 'ls -la /proc/*/exe',
            useCase: 'Detect processes running from deleted files (potential malware)',
            riskLevel: 'high',
            category: 'forensics',
            tags: ['processes', 'deleted', 'malware'],
            explanation: 'Processes running deleted executables often indicate malware or attempts to hide malicious code.'
        },
        {
            id: 'memory-strings',
            command: 'strings /proc/[PID]/maps | grep -E "password|key|secret" 2>/dev/null',
            description: 'Search process memory for sensitive strings',
            example: 'strings /proc/1234/maps | grep -i password',
            syntax: 'strings /proc/[PID]/maps',
            useCase: 'Extract sensitive information from process memory',
            riskLevel: 'high',
            category: 'extraction',
            tags: ['memory', 'strings', 'credentials'],
            explanation: 'Process memory may contain passwords, keys, or other sensitive data in plaintext.'
        },
        {
            id: 'lsof-network',
            command: 'lsof -i -P -n | grep LISTEN',
            description: 'List open files and network connections',
            example: 'lsof -i -P -n | grep LISTEN\n# sshd 1234 root 3u IPv4 12345 TCP *:22 (LISTEN)',
            syntax: 'lsof -i -P -n',
            useCase: 'Detailed network connection analysis and process identification',
            riskLevel: 'low',
            category: 'network',
            tags: ['lsof', 'network', 'files'],
            explanation: 'Provides detailed information about which processes are using network connections and files.'
        }
    ];

    const categories = [
        { id: 'all', name: 'All Commands', icon: <Terminal className="w-4 h-4" /> },
        { id: 'reconnaissance', name: 'Reconnaissance', icon: <Search className="w-4 h-4" /> },
        { id: 'network', name: 'Network', icon: <Network className="w-4 h-4" /> },
        { id: 'privesc', name: 'Privilege Escalation', icon: <Key className="w-4 h-4" /> },
        { id: 'persistence', name: 'Persistence', icon: <Lock className="w-4 h-4" /> },
        { id: 'monitoring', name: 'Monitoring', icon: <Eye className="w-4 h-4" /> },
        { id: 'forensics', name: 'Forensics', icon: <FileText className="w-4 h-4" /> },
        { id: 'extraction', name: 'Data Extraction', icon: <Database className="w-4 h-4" /> }
    ];

    const filteredCommands = commands.filter(cmd => {
        const matchesSearch = cmd.command.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cmd.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cmd.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCategory = selectedCategory === 'all' || cmd.category === selectedCategory;
        const matchesRisk = selectedRisk === 'all' || cmd.riskLevel === selectedRisk;

        return matchesSearch && matchesCategory && matchesRisk;
    });

    const copyToClipboard = async (text: string, commandId: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedCommand(commandId);
            setTimeout(() => setCopiedCommand(''), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    const toggleFavorite = (commandId: string) => {
        setFavorites(prev =>
            prev.includes(commandId)
                ? prev.filter(id => id !== commandId)
                : [...prev, commandId]
        );
    };

    const downloadCheatsheet = () => {
        const content = [
            '# Linux Pentesting Cheatsheet',
            '## The Ultimate Guide for Penetration Testers',
            '',
            'Generated from TheCyberHub.org',
            `Date: ${new Date().toLocaleDateString()}`,
            '',
            ...categories.slice(1).flatMap(category => {
                const categoryCommands = commands.filter(cmd => cmd.category === category.id);
                if (categoryCommands.length === 0) return [];

                return [
                    `## ${category.name}`,
                    '',
                    ...categoryCommands.map(cmd => [
                        `### ${cmd.description}`,
                        '```bash',
                        cmd.command,
                        '```',
                        `**Use Case:** ${cmd.useCase}`,
                        `**Risk Level:** ${cmd.riskLevel.toUpperCase()}`,
                        cmd.explanation ? `**Explanation:** ${cmd.explanation}` : '',
                        cmd.example ? '**Example Output:**\n```\n' + cmd.example + '\n```' : '',
                        ''
                    ].filter(Boolean).join('\n'))
                ];
            })
        ].join('\n');

        const blob = new Blob([content], { type: 'text/markdown' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'linux-commands-cheatsheet.md';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const getRiskColor = (risk: string) => {
        switch (risk) {
            case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
            default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        }
    };

    const getRiskIcon = (risk: string) => {
        switch (risk) {
            case 'low': return <CheckCircle className="w-4 h-4" />;
            case 'medium': return <AlertTriangle className="w-4 h-4" />;
            case 'high': return <Zap className="w-4 h-4" />;
            default: return <Info className="w-4 h-4" />;
        }
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="pt-20 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center space-x-4 mb-6">
                            <a
                                href="/cheatsheets"
                                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-200 group"
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-white" />
                            </a>
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/25">
                                    <Terminal className="h-6 w-6 text-black" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-white">Linux Pentesting Cheatsheet</h1>
                                    <p className="text-gray-400">Essential commands for penetration testing on Linux systems</p>
                                </div>
                            </div>
                        </div>

                        {/* Metadata */}
                        <div className="grid md:grid-cols-4 gap-4 mb-8">
                            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 text-center">
                                <div className="text-orange-400 font-bold text-2xl mb-1">{commands.length}</div>
                                <div className="text-gray-400 text-sm">Total Commands</div>
                            </div>
                            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 text-center">
                                <div className="text-orange-400 font-bold text-2xl mb-1">{categories.length - 1}</div>
                                <div className="text-gray-400 text-sm">Categories</div>
                            </div>
                            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 text-center">
                                <div className="text-orange-400 font-bold text-2xl mb-1">25K+</div>
                                <div className="text-gray-400 text-sm">Downloads</div>
                            </div>
                            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 text-center">
                                <div className="text-orange-400 font-bold text-2xl mb-1">4.9★</div>
                                <div className="text-gray-400 text-sm">Community Rating</div>
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="mb-8">
                        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                            <div className="grid lg:grid-cols-4 gap-4 mb-4">
                                {/* Search */}
                                <div className="lg:col-span-2 relative">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search commands, descriptions, or tags..."
                                        className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 outline-none"
                                    />
                                </div>

                                {/* Category Filter */}
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 outline-none"
                                >
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>

                                {/* Risk Filter */}
                                <select
                                    value={selectedRisk}
                                    onChange={(e) => setSelectedRisk(e.target.value)}
                                    className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 outline-none"
                                >
                                    <option value="all">All Risk Levels</option>
                                    <option value="low">Low Risk</option>
                                    <option value="medium">Medium Risk</option>
                                    <option value="high">High Risk</option>
                                </select>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                  <span className="text-gray-400">
                    Showing {filteredCommands.length} of {commands.length} commands
                  </span>
                                    <button
                                        onClick={() => setShowExplanations(!showExplanations)}
                                        className="flex items-center space-x-2 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-200 text-sm"
                                    >
                                        {showExplanations ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        <span>{showExplanations ? 'Hide' : 'Show'} Explanations</span>
                                    </button>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={downloadCheatsheet}
                                        className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-black font-semibold px-4 py-2 rounded-lg transition-all duration-200"
                                    >
                                        <Download className="w-4 h-4" />
                                        <span>Download PDF</span>
                                    </button>
                                    <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-200">
                                        <Share className="w-4 h-4 text-gray-400" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Commands Grid */}
                    <div className="space-y-6">
                        {filteredCommands.map((cmd) => (
                            <div key={cmd.id} className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden hover:border-orange-400/50 transition-all duration-300 group">
                                <div className="p-6">
                                    {/* Command Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <h3 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors">
                                                    {cmd.description}
                                                </h3>
                                                <span className={`text-xs px-2 py-1 rounded-full border flex items-center space-x-1 ${getRiskColor(cmd.riskLevel)}`}>
                          {getRiskIcon(cmd.riskLevel)}
                                                    <span>{cmd.riskLevel.toUpperCase()}</span>
                        </span>
                                                <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                          {categories.find(c => c.id === cmd.category)?.name}
                        </span>
                                            </div>
                                            <p className="text-gray-400 text-sm mb-3">{cmd.useCase}</p>
                                        </div>

                                        <div className="flex items-center space-x-2 ml-4">
                                            <button
                                                onClick={() => toggleFavorite(cmd.id)}
                                                className={`p-2 rounded-lg transition-all duration-200 ${
                                                    favorites.includes(cmd.id)
                                                        ? 'bg-orange-500 text-black'
                                                        : 'bg-gray-800 text-gray-400 hover:text-orange-400'
                                                }`}
                                                title="Add to favorites"
                                            >
                                                <Star className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => copyToClipboard(cmd.command, cmd.id)}
                                                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-200 group relative"
                                                title="Copy command"
                                            >
                                                <Copy className="w-4 h-4 text-gray-400 group-hover:text-white" />
                                                {copiedCommand === cmd.id && (
                                                    <div className="absolute -top-8 right-0 bg-green-500 text-black text-xs px-2 py-1 rounded">
                                                        Copied!
                                                    </div>
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Command */}
                                    <div className="mb-4">
                                        <div className="bg-gray-950 border border-gray-700 rounded-lg p-4 font-mono text-sm relative group">
                                            <div className="flex items-start justify-between">
                                                <code className="text-orange-400 leading-relaxed break-all">
                                                    {cmd.command}
                                                </code>
                                                <button
                                                    onClick={() => copyToClipboard(cmd.command, cmd.id)}
                                                    className="ml-4 p-1 opacity-0 group-hover:opacity-100 bg-gray-800 hover:bg-gray-700 rounded transition-all duration-200"
                                                >
                                                    <Copy className="w-3 h-3 text-gray-400" />
                                                </button>
                                            </div>

                                            {cmd.syntax && (
                                                <div className="mt-2 pt-2 border-t border-gray-800">
                                                    <span className="text-gray-500 text-xs">Syntax: </span>
                                                    <code className="text-gray-400 text-xs">{cmd.syntax}</code>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Explanation */}
                                    {showExplanations && cmd.explanation && (
                                        <div className="mb-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                                            <div className="flex items-start space-x-2">
                                                <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <h4 className="text-blue-400 font-medium text-sm mb-1">Explanation</h4>
                                                    <p className="text-gray-300 text-sm leading-relaxed">{cmd.explanation}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Example Output */}
                                    {cmd.example && (
                                        <div className="mb-4">
                                            <h4 className="text-gray-400 font-medium text-sm mb-2 flex items-center">
                                                <Terminal className="w-4 h-4 mr-2" />
                                                Example Output
                                            </h4>
                                            <div className="bg-gray-950 border border-gray-700 rounded-lg p-4">
                        <pre className="text-green-400 text-sm font-mono leading-relaxed whitespace-pre-wrap">
                          {cmd.example}
                        </pre>
                                            </div>
                                        </div>
                                    )}

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {cmd.tags.map((tag, index) => (
                                            <span key={index} className="text-xs bg-gray-800/50 text-gray-400 px-2 py-1 rounded border border-gray-700">
                        #{tag}
                      </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* No Results */}
                    {filteredCommands.length === 0 && (
                        <div className="text-center py-12">
                            <Terminal className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">No commands found</h3>
                            <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedCategory('all');
                                    setSelectedRisk('all');
                                }}
                                className="bg-orange-500 hover:bg-orange-600 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-200"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}

                    {/* Quick Reference Card */}
                    <div className="mt-16 bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-xl p-8">
                        <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                            <Shield className="w-6 h-6 text-orange-400 mr-2" />
                            Quick Reference Guide
                        </h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <h4 className="text-orange-400 font-semibold mb-3">Risk Levels</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center space-x-2">
                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                        <span className="text-green-400">Low:</span>
                                        <span className="text-gray-300">Safe reconnaissance</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <AlertTriangle className="w-4 h-4 text-yellow-400" />
                                        <span className="text-yellow-400">Medium:</span>
                                        <span className="text-gray-300">May generate logs</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Zap className="w-4 h-4 text-red-400" />
                                        <span className="text-red-400">High:</span>
                                        <span className="text-gray-300">Detectable/Dangerous</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-orange-400 font-semibold mb-3">Best Practices</h4>
                                <ul className="text-sm text-gray-300 space-y-1">
                                    <li>• Always check permissions first</li>
                                    <li>• Redirect errors to /dev/null</li>
                                    <li>• Use timeout for network commands</li>
                                    <li>• Document your findings</li>
                                    <li>• Clean up after testing</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-orange-400 font-semibold mb-3">Common Paths</h4>
                                <ul className="text-sm text-gray-300 space-y-1 font-mono">
                                    <li>• /etc/passwd - User accounts</li>
                                    <li>• /etc/shadow - Password hashes</li>
                                    <li>• /var/log/ - System logs</li>
                                    <li>• /tmp/ - Temporary files</li>
                                    <li>• /proc/ - Process information</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-orange-500/20">
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                                    Download Complete Guide
                                </button>
                                <a
                                    href="/cheatsheets"
                                    className="border border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 text-center"
                                >
                                    Browse More Cheatsheets
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Footer Info */}
                    <div className="mt-12 text-center text-gray-500 text-sm">
                        <p>
                            This cheatsheet is maintained by the TheCyberHub community.
                            Last updated: January 2025 •
                            <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors"> Report an issue</a> •
                            <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors"> Suggest improvements</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LinuxPentestingCheatsheet;