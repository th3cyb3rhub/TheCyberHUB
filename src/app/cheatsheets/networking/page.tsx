"use client"

import React, { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { Network, Search, Copy, Check, ChevronDown, ChevronRight } from 'lucide-react';

interface Command {
    command: string;
    description: string;
    example?: string;
}

interface Section {
    title: string;
    commands: Command[];
}

const sections: Section[] = [
    {
        title: 'Network Configuration',
        commands: [
            { command: 'ifconfig', description: 'Display network interface configuration', example: 'ifconfig eth0' },
            { command: 'ip addr', description: 'Show IP addresses (modern)', example: 'ip addr show' },
            { command: 'ip link', description: 'Show/manipulate network devices', example: 'ip link set eth0 up' },
            { command: 'ip route', description: 'Show/manipulate routing table', example: 'ip route show' },
            { command: 'hostname', description: 'Display or set system hostname', example: 'hostname -I' },
            { command: 'nmcli', description: 'NetworkManager CLI tool', example: 'nmcli device status' },
        ]
    },
    {
        title: 'DNS Tools',
        commands: [
            { command: 'nslookup', description: 'Query DNS servers', example: 'nslookup google.com' },
            { command: 'dig', description: 'DNS lookup utility', example: 'dig google.com A +short' },
            { command: 'host', description: 'DNS lookup utility', example: 'host -t MX google.com' },
            { command: 'whois', description: 'Domain registration info', example: 'whois example.com' },
            { command: 'resolvectl', description: 'Resolve DNS queries', example: 'resolvectl query google.com' },
        ]
    },
    {
        title: 'Network Diagnostics',
        commands: [
            { command: 'ping', description: 'Test network connectivity', example: 'ping -c 4 google.com' },
            { command: 'traceroute', description: 'Trace packet route', example: 'traceroute google.com' },
            { command: 'mtr', description: 'Network diagnostic tool', example: 'mtr google.com' },
            { command: 'netstat', description: 'Network statistics', example: 'netstat -tuln' },
            { command: 'ss', description: 'Socket statistics (modern)', example: 'ss -tuln' },
            { command: 'lsof -i', description: 'List open network files', example: 'lsof -i :80' },
        ]
    },
    {
        title: 'Port Scanning',
        commands: [
            { command: 'nmap', description: 'Network exploration tool', example: 'nmap -sV 192.168.1.1' },
            { command: 'nmap -sS', description: 'TCP SYN scan (stealth)', example: 'nmap -sS 192.168.1.1' },
            { command: 'nmap -sU', description: 'UDP scan', example: 'nmap -sU 192.168.1.1' },
            { command: 'nmap -O', description: 'OS detection', example: 'nmap -O 192.168.1.1' },
            { command: 'nmap -A', description: 'Aggressive scan', example: 'nmap -A 192.168.1.1' },
            { command: 'masscan', description: 'Fast port scanner', example: 'masscan -p1-65535 192.168.1.0/24' },
        ]
    },
    {
        title: 'Packet Analysis',
        commands: [
            { command: 'tcpdump', description: 'Capture network packets', example: 'tcpdump -i eth0 port 80' },
            { command: 'wireshark', description: 'GUI packet analyzer', example: 'wireshark &' },
            { command: 'tshark', description: 'CLI Wireshark', example: 'tshark -i eth0 -f "port 443"' },
            { command: 'tcpflow', description: 'Capture TCP connections', example: 'tcpflow -i eth0 port 80' },
        ]
    },
    {
        title: 'Network Transfer',
        commands: [
            { command: 'curl', description: 'Transfer data from URL', example: 'curl -I https://example.com' },
            { command: 'wget', description: 'Download files', example: 'wget https://example.com/file.zip' },
            { command: 'scp', description: 'Secure copy over SSH', example: 'scp file.txt user@host:/path/' },
            { command: 'rsync', description: 'Remote sync', example: 'rsync -avz src/ user@host:dest/' },
            { command: 'nc', description: 'Netcat - network Swiss army knife', example: 'nc -lvp 4444' },
        ]
    },
    {
        title: 'Firewall',
        commands: [
            { command: 'iptables -L', description: 'List firewall rules', example: 'iptables -L -n -v' },
            { command: 'iptables -A', description: 'Add firewall rule', example: 'iptables -A INPUT -p tcp --dport 22 -j ACCEPT' },
            { command: 'ufw status', description: 'UFW firewall status', example: 'ufw status verbose' },
            { command: 'ufw allow', description: 'Allow port/service', example: 'ufw allow 22/tcp' },
            { command: 'firewall-cmd', description: 'Firewalld CLI', example: 'firewall-cmd --list-all' },
        ]
    },
    {
        title: 'ARP & MAC',
        commands: [
            { command: 'arp -a', description: 'Display ARP table', example: 'arp -a' },
            { command: 'ip neigh', description: 'Show ARP cache (modern)', example: 'ip neigh show' },
            { command: 'arping', description: 'Send ARP requests', example: 'arping -I eth0 192.168.1.1' },
            { command: 'macchanger', description: 'Change MAC address', example: 'macchanger -r eth0' },
        ]
    },
];

const NetworkingCheatsheetPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 300);
    const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
    const [expandedSections, setExpandedSections] = useState<string[]>(sections.map(s => s.title));

    const copyToClipboard = async (text: string) => {
        await navigator.clipboard.writeText(text);
        setCopiedCommand(text);
        setTimeout(() => setCopiedCommand(null), 2000);
    };

    const toggleSection = (title: string) => {
        setExpandedSections(prev => 
            prev.includes(title) 
                ? prev.filter(t => t !== title)
                : [...prev, title]
        );
    };

    const filteredSections = sections.map(section => ({
        ...section,
        commands: section.commands.filter(cmd =>
            cmd.command.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            cmd.description.toLowerCase().includes(debouncedSearch.toLowerCase())
        )
    })).filter(section => section.commands.length > 0);

    return (
        <div className="min-h-screen bg-black">
            {/* Hero */}
            <section className="relative pt-32 pb-16 px-4 sm:px-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
                
                <div className="relative max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-white/10 bg-white/5">
                        <Network className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-gray-400">Cheatsheet</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
                        Networking <span className="text-orange-500">Commands</span>
                    </h1>

                    <p className="text-lg text-gray-400 max-w-xl mx-auto">
                        Essential networking commands for Linux system administration and security testing.
                    </p>
                </div>
            </section>

            {/* Search */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-8">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search commands..."
                        className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                    />
                </div>
            </section>

            {/* Commands */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
                <div className="space-y-4">
                    {filteredSections.map((section) => (
                        <div 
                            key={section.title}
                            className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden"
                        >
                            {/* Section Header */}
                            <button
                                onClick={() => toggleSection(section.title)}
                                className="w-full flex items-center justify-between p-4 text-left hover:bg-white/[0.02] transition-colors"
                            >
                                <h2 className="font-medium text-white">{section.title}</h2>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-500">{section.commands.length} commands</span>
                                    {expandedSections.includes(section.title) 
                                        ? <ChevronDown className="w-4 h-4 text-gray-400" />
                                        : <ChevronRight className="w-4 h-4 text-gray-400" />
                                    }
                                </div>
                            </button>

                            {/* Commands */}
                            {expandedSections.includes(section.title) && (
                                <div className="border-t border-white/5">
                                    {section.commands.map((cmd, index) => (
                                        <div 
                                            key={index}
                                            className="flex items-start justify-between p-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors group"
                                        >
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <code className="text-orange-400 font-mono text-sm">{cmd.command}</code>
                                                </div>
                                                <p className="text-sm text-gray-400">{cmd.description}</p>
                                                {cmd.example && (
                                                    <code className="block mt-2 text-xs text-gray-500 font-mono bg-white/5 px-2 py-1 rounded">
                                                        $ {cmd.example}
                                                    </code>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => copyToClipboard(cmd.example || cmd.command)}
                                                className="p-2 text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition-all"
                                            >
                                                {copiedCommand === (cmd.example || cmd.command) 
                                                    ? <Check className="w-4 h-4 text-green-400" />
                                                    : <Copy className="w-4 h-4" />
                                                }
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    {filteredSections.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No commands found matching your search.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default NetworkingCheatsheetPage;
