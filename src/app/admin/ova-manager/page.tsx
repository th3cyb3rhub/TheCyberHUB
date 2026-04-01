"use client"

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { fetchApi } from '@/lib/api';
import { HardDrive, Upload, Server, Play, Loader2, Info, Database, RefreshCw, Trash2, Edit2, Check, X, Square } from 'lucide-react';
import { ConfirmDialog, useConfirmDialog } from '@/components/ui/ConfirmDialog';

export default function OvaManagerPage() {
    const { token } = useAuth();

    // Upload State
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedKey, setUploadedKey] = useState<string>('');
    const [uploadError, setUploadError] = useState('');

    // Import Task State
    const [importTasks, setImportTasks] = useState<{ importTaskId: string; description?: string; status: string; statusMessage?: string; progress?: number; imageId?: string }[]>([]);
    const [isLoadingTasks, setIsLoadingTasks] = useState(true);
    const [isStartingImport, setIsStartingImport] = useState(false);

    // Launch State
    const [launchingAmiId, setLaunchingAmiId] = useState<string | null>(null);
    const [launchedInstances, setLaunchedInstances] = useState<Record<string, { privateIp: string, publicIp: string, instanceId: string }>>({});

    // S3 Object State
    const [s3Objects, setS3Objects] = useState<{ key: string; filename: string; size: number; lastModified: string }[]>([]);
    const [isLoadingS3, setIsLoadingS3] = useState(true);
    const [editingKey, setEditingKey] = useState<string | null>(null);
    const [newFilename, setNewFilename] = useState<string>('');
    const { isOpen: terminateConfirmOpen, confirm: showTerminateConfirm, onConfirm: onTerminateConfirm, onCancel: onTerminateCancel } = useConfirmDialog();
    const { isOpen: deleteConfirmOpen, confirm: showDeleteConfirm, onConfirm: onDeleteConfirm, onCancel: onDeleteCancel } = useConfirmDialog();
    const [pendingTerminateId, setPendingTerminateId] = useState<string>('');
    const [pendingDeleteKey, setPendingDeleteKey] = useState<string>('');

    // Fetch active import tasks
    const fetchTasks = async () => {
        try {
            const res = await fetchApi('/api/aws/imports');
            if (res && res.data) {
                setImportTasks(res.data);
            }
        } catch (error) {
            console.error("Failed to fetch import tasks", error);
        } finally {
            setIsLoadingTasks(false);
        }
    };

    // Fetch launched EC2 instances from AWS
    const fetchInstances = async () => {
        try {
            const res = await fetchApi('/api/aws/instances');
            if (res && res.data) {
                const map: Record<string, { privateIp: string, publicIp: string, instanceId: string }> = {};
                res.data.forEach((inst: { imageId?: string; state?: string; privateIp: string; publicIp?: string; instanceId: string }) => {
                    if (inst.imageId && inst.state !== 'terminated') {
                        map[inst.imageId] = {
                            privateIp: inst.privateIp,
                            publicIp: inst.publicIp || 'Pending Configuration',
                            instanceId: inst.instanceId
                        };
                    }
                });
                setLaunchedInstances(map);
            }
        } catch (error) {
            console.error("Failed to fetch instances", error);
        }
    };

    // Fetch S3 objects
    const fetchS3Objects = async () => {
        try {
            const res = await fetchApi('/api/aws/s3-objects');
            if (res && res.data) {
                setS3Objects(res.data);
            }
        } catch (error) {
            console.error("Failed to fetch S3 objects", error);
        } finally {
            setIsLoadingS3(false);
        }
    };

    // Poll every 10 seconds, but only if we have a token
    useEffect(() => {
        if (!token) return;

        fetchTasks();
        fetchS3Objects();
        fetchInstances();
        const interval = setInterval(() => {
            fetchTasks();
            fetchS3Objects();
            fetchInstances();
        }, 10000);
        return () => clearInterval(interval);
    }, [token]);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            setUploadProgress(0);
            setUploadedKey('');
            setUploadError('');
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setIsUploading(true);
        setUploadProgress(0);
        setUploadError('');

        try {
            // 1. Get Presigned URL
            const res = await fetchApi('/api/aws/presign', {
                method: 'POST',
                body: JSON.stringify({
                    filename: file.name,
                    contentType: file.type || 'application/octet-stream'
                })
            });

            if (!res || !res.data || !res.data.url) {
                throw new Error("Failed to get presigned URL");
            }

            const { url, key } = res.data;

            // 2. Upload directly to S3 via XMLHttpRequest to track progress
            await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('PUT', url, true);
                xhr.setRequestHeader('Content-Type', file.type || 'application/octet-stream');

                xhr.upload.onprogress = (e) => {
                    if (e.lengthComputable) {
                        const percentComplete = Math.round((e.loaded / e.total) * 100);
                        setUploadProgress(percentComplete);
                    }
                };

                xhr.onload = () => {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        setUploadedKey(key);
                        resolve(true);
                    } else {
                        reject(new Error(`S3 Upload failed: ${xhr.statusText}`));
                    }
                };

                xhr.onerror = () => reject(new Error("Network error during S3 upload"));
                xhr.send(file);
            });

        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'An unexpected error occurred during upload';
            setUploadError(message);
        } finally {
            setIsUploading(false);
        }
    };

    const handleStartImport = async (s3KeyToImport?: string) => {
        const key = s3KeyToImport || uploadedKey;
        if (!key) return;

        setIsStartingImport(true);
        try {
            await fetchApi('/api/aws/import-vm', {
                method: 'POST',
                body: JSON.stringify({
                    s3Key: key,
                    description: `OVA Import: ${key.split('/').pop()}`
                })
            });
            await fetchTasks();
            setUploadedKey('');
            setFile(null);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to start VM Import';
            alert(message);
        } finally {
            setIsStartingImport(false);
        }
    };

    const handleLaunchAmi = async (amiId: string) => {
        setLaunchingAmiId(amiId);
        try {
            const res = await fetchApi('/api/aws/launch-ami', {
                method: 'POST',
                body: JSON.stringify({ imageId: amiId })
            });

            if (res && res.data) {
                setLaunchedInstances(prev => ({
                    ...prev,
                    [amiId]: {
                        privateIp: res.data.privateIp,
                        publicIp: res.data.publicIp,
                        instanceId: res.data.instanceId
                    }
                }));

                // Fetch instances again to ensure sync
                setTimeout(fetchInstances, 2000);
            }
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to launch the AMI';
            alert(message);
        } finally {
            setLaunchingAmiId(null);
        }
    };

    const handleTerminateInstance = async (amiId: string, instanceId: string) => {
        setPendingTerminateId(instanceId);
        const confirmed = await showTerminateConfirm();
        if (!confirmed) return;

        try {
            await fetchApi('/api/aws/terminate-instance', {
                method: 'POST',
                body: JSON.stringify({ instanceId })
            });

            // Remove from local tracked state on success
            setLaunchedInstances(prev => {
                const next = { ...prev };
                delete next[amiId];
                return next;
            });
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to terminate instance';
            alert(message);
        }
    };

    const handleRename = async (oldKey: string) => {
        if (!newFilename || newFilename === oldKey.split('/').pop()) {
            setEditingKey(null);
            return;
        }

        try {
            const safeName = newFilename.replace(/[^a-zA-Z0-9.-]/g, '_');
            const newKey = `challenges/${safeName}`;

            await fetchApi('/api/aws/s3-objects', {
                method: 'PUT',
                body: JSON.stringify({ oldKey, newKey })
            });
            await fetchS3Objects();
            setEditingKey(null);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to rename file';
            alert(message);
        }
    };

    const handleDelete = async (key: string) => {
        setPendingDeleteKey(key);
        const confirmed = await showDeleteConfirm();
        if (!confirmed) return;

        try {
            await fetchApi('/api/aws/s3-objects', {
                method: 'DELETE',
                body: JSON.stringify({ key })
            });
            await fetchS3Objects();
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to delete file';
            alert(message);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 pt-28 pb-16">
            <div className="max-w-5xl mx-auto space-y-8">

                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                        <HardDrive className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">OVA Import Manager</h1>
                        <p className="text-sm text-gray-400">Directly upload massive OVA files to S3 and convert them to AMIs</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Upload Section */}
                    <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-6">
                        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                            <Upload className="w-5 h-5 text-orange-400" /> 1. Upload OVA to S3
                        </h2>

                        <div className="space-y-4">
                            <div className="relative">
                                <input
                                    type="file"
                                    accept=".ova,.vmdk"
                                    onChange={handleFileSelect}
                                    className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-orange-500/10 file:text-orange-400 hover:file:bg-orange-500/20 cursor-pointer border border-white/10 rounded-lg"
                                    disabled={isUploading}
                                />
                            </div>

                            {file && (
                                <div className="text-sm text-gray-400 flex justify-between">
                                    <span className="truncate max-w-[70%]">{file.name}</span>
                                    <span>{(file.size / (1024 * 1024 * 1024)).toFixed(2)} GB</span>
                                </div>
                            )}

                            {uploadError && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                                    {uploadError}
                                </div>
                            )}

                            {isUploading && (
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs text-orange-400">
                                        <span>Uploading to S3...</span>
                                        <span>{uploadProgress}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-orange-500 transition-all duration-300"
                                            style={{ width: `${uploadProgress}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            {uploadedKey && !isUploading && (
                                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg space-y-3">
                                    <p className="text-sm text-green-400 flex items-center gap-2">
                                        ✅ Upload Complete! S3 Key: <span className="font-mono text-xs">{uploadedKey.split('/').pop()}</span>
                                    </p>
                                    <button
                                        onClick={() => handleStartImport()}
                                        disabled={isStartingImport}
                                        className="w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                                    >
                                        {isStartingImport ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                                        Start VM Import Conversion
                                    </button>
                                </div>
                            )}

                            {!uploadedKey && (
                                <button
                                    onClick={handleUpload}
                                    disabled={!file || isUploading}
                                    className="w-full py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                                >
                                    {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                    Upload to S3
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Import Tasks Section */}
                    <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                                <Server className="w-5 h-5 text-orange-400" /> 2. Active Conversions
                            </h2>
                            <button onClick={fetchTasks} className="text-xs text-gray-400 hover:text-white">Refresh</button>
                        </div>

                        {isLoadingTasks ? (
                            <div className="flex justify-center py-8">
                                <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
                            </div>
                        ) : (
                            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                                {(() => {
                                    const activeTasks = importTasks.filter(t => t.status !== 'deleted');
                                    if (activeTasks.length === 0) {
                                        return <div className="text-center py-8 text-gray-500 text-sm">No active VM imports found.</div>;
                                    }
                                    return activeTasks.map((task) => (
                                        <div key={task.importTaskId} className="p-4 bg-white/5 border border-white/5 rounded-lg space-y-3">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <p className="text-sm font-medium text-white truncate max-w-[200px]" title={task.description}>
                                                        {task.description || 'OVA Import'}
                                                    </p>
                                                    <p className="text-xs text-gray-500 font-mono mt-1">{task.importTaskId}</p>
                                                </div>
                                                <span className={`px-2 py-1 rounded text-xs capitalize ${task.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                                                    task.status === 'active' ? 'bg-blue-500/20 text-blue-400' :
                                                        'bg-gray-500/20 text-gray-400'
                                                    }`}>
                                                    {task.status}
                                                </span>
                                            </div>

                                            {task.status === 'active' && (
                                                <div className="space-y-1">
                                                    <div className="flex justify-between text-xs text-gray-400">
                                                        <span>{task.statusMessage || 'Converting...'}</span>
                                                        <span>{task.progress}%</span>
                                                    </div>
                                                    <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-blue-500 transition-all duration-300"
                                                            style={{ width: `${task.progress}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {task.imageId && (
                                                <div className="pt-3 border-t border-white/5 space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs text-gray-400">AMI Available:</span>
                                                        <span className="text-xs font-mono text-green-400 bg-green-400/10 px-2 py-1 rounded">
                                                            {task.imageId}
                                                        </span>
                                                    </div>

                                                    {task.imageId && !launchedInstances[task.imageId] ? (
                                                        <button
                                                            onClick={() => task.imageId && handleLaunchAmi(task.imageId)}
                                                            disabled={launchingAmiId === task.imageId}
                                                            className="w-full py-1.5 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 rounded-lg transition-colors flex items-center justify-center gap-2 text-xs font-medium"
                                                        >
                                                            {launchingAmiId === task.imageId ? <Loader2 className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3" />}
                                                            Launch EC2 Instance
                                                        </button>
                                                    ) : (
                                                        <div className="p-3 bg-black/20 rounded-lg space-y-3 border border-white/5">
                                                            <div className="space-y-1.5 border-b border-white/10 pb-2">
                                                                <div className="flex justify-between text-xs">
                                                                    <span className="text-gray-400">Private IP:</span>
                                                                    <span className="text-blue-400 font-mono">{launchedInstances[task.imageId].privateIp}</span>
                                                                </div>
                                                                <div className="flex justify-between text-xs">
                                                                    <span className="text-gray-400">Public IP:</span>
                                                                    <span className="text-blue-400 font-mono">{launchedInstances[task.imageId].publicIp}</span>
                                                                </div>
                                                            </div>
                                                            <div className="text-[10px] text-gray-500 leading-tight">
                                                                * Access via SSH or Web. If Public IP is &quot;Pending&quot;, the AWS Subnet may not auto-assign public IPs, or it is booting. You can access it via VPN/Bastion Host using the Private IP.
                                                            </div>
                                                            <button
                                                                onClick={() => task.imageId && handleTerminateInstance(task.imageId, launchedInstances[task.imageId]?.instanceId)}
                                                                className="w-full py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg transition-colors flex items-center justify-center gap-2 text-xs font-medium"
                                                            >
                                                                <Square className="w-3 h-3" /> Terminate Instance
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ));
                                })()}
                            </div>
                        )}

                        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg flex gap-3 text-sm text-blue-400 items-start">
                            <Info className="w-4 h-4 shrink-0 mt-0.5" />
                            <p>Once conversion completes, click &quot;Launch EC2 Instance&quot; to instantly spin up the challenge server and grab its IP address.</p>
                        </div>
                    </div>

                    {/* Failed / History Section */}
                    {importTasks.some(t => t.status === 'deleted') && (
                        <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <Trash2 className="w-5 h-5 text-gray-500" /> Recent Failed Conversions
                                </h2>
                            </div>

                            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                                {importTasks.filter(t => t.status === 'deleted').map((task) => (
                                    <div key={task.importTaskId} className="p-4 bg-red-500/5 border border-red-500/10 rounded-lg space-y-2 opacity-80 hover:opacity-100 transition-opacity">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-gray-300 truncate max-w-[200px]" title={task.description}>
                                                    {task.description || 'OVA Import'}
                                                </p>
                                                <p className="text-xs text-gray-500 font-mono mt-1">{task.importTaskId}</p>
                                            </div>
                                            <span className="px-2 py-1 rounded text-[10px] uppercase bg-red-500/20 text-red-400 font-bold">
                                                Failed
                                            </span>
                                        </div>
                                        {task.statusMessage && (
                                            <div className="p-2 bg-black/40 rounded border border-red-500/10">
                                                <p className="text-[11px] text-red-400/90 font-mono leading-tight">
                                                    {task.statusMessage}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>

                {/* S3 File Browser Section */}
                <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-6 mt-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                            <Database className="w-5 h-5 text-orange-400" /> 3. Raw S3 Storage
                        </h2>
                        <button onClick={fetchS3Objects} className="text-xs text-gray-400 hover:text-white flex items-center gap-1">
                            <RefreshCw className="w-3 h-3" /> Refresh
                        </button>
                    </div>

                    {isLoadingS3 ? (
                        <div className="flex justify-center py-8">
                            <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
                        </div>
                    ) : s3Objects.length === 0 ? (
                        <div className="text-center py-8 text-gray-500 text-sm">
                            No files found in the S3 bucket.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-400 bg-black/20 border-b border-white/10 uppercase">
                                    <tr>
                                        <th className="px-4 py-3 font-medium">Filename</th>
                                        <th className="px-4 py-3 font-medium">Size</th>
                                        <th className="px-4 py-3 font-medium">Last Modified</th>
                                        <th className="px-4 py-3 font-medium text-right text-gray-500">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {s3Objects.map((obj) => (
                                        <tr key={obj.key} className="hover:bg-white/[0.02]">
                                            <td className="px-4 py-3 font-mono text-gray-300">
                                                {editingKey === obj.key ? (
                                                    <input
                                                        type="text"
                                                        value={newFilename}
                                                        onChange={(e) => setNewFilename(e.target.value)}
                                                        className="w-full bg-black/20 border border-white/10 rounded px-2 py-1 text-sm focus:outline-none focus:border-orange-500"
                                                        autoFocus
                                                    />
                                                ) : (
                                                    obj.filename
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-gray-400">
                                                {(obj.size / (1024 * 1024 * 1024)).toFixed(2)} GB
                                            </td>
                                            <td className="px-4 py-3 text-gray-400">
                                                {new Date(obj.lastModified).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-3 text-right space-x-2">
                                                {editingKey === obj.key ? (
                                                    <>
                                                        <button onClick={() => handleRename(obj.key)} className="p-1.5 text-green-400 hover:bg-green-400/10 rounded" title="Save">
                                                            <Check className="w-4 h-4" />
                                                        </button>
                                                        <button onClick={() => setEditingKey(null)} className="p-1.5 text-gray-400 hover:bg-white/10 rounded" title="Cancel">
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button
                                                            onClick={() => handleStartImport(obj.key)}
                                                            className="p-1.5 text-blue-400 hover:bg-blue-400/10 rounded"
                                                            title="Import as AMI"
                                                            disabled={isStartingImport}
                                                        >
                                                            {isStartingImport ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                                                        </button>
                                                        <button onClick={() => { setEditingKey(obj.key); setNewFilename(obj.filename); }} className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded" title="Rename">
                                                            <Edit2 className="w-4 h-4" />
                                                        </button>
                                                        <button onClick={() => handleDelete(obj.key)} className="p-1.5 text-red-400 hover:bg-red-400/10 rounded" title="Delete">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            <ConfirmDialog
                open={terminateConfirmOpen}
                onConfirm={onTerminateConfirm}
                onCancel={onTerminateCancel}
                title="Terminate instance?"
                description={`Are you sure you want to permanently terminate instance ${pendingTerminateId}?`}
                confirmText="Terminate"
                variant="danger"
            />

            <ConfirmDialog
                open={deleteConfirmOpen}
                onConfirm={onDeleteConfirm}
                onCancel={onDeleteCancel}
                title="Delete file?"
                description={`Are you sure you want to permanently delete ${pendingDeleteKey.split('/').pop()} from S3?`}
                confirmText="Delete"
                variant="danger"
            />
        </div>
    );
}
