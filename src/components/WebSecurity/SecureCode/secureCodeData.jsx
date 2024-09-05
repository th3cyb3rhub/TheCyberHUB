export const secureCodeData = [
    {
        title: "SQL Injection Prevention",
        vulnerableCode: `import sqlite3

# Connect to a SQLite database
connection = sqlite3.connect('example.db')
cursor = connection.cursor()

def get_user_by_username(username):
    # Vulnerable to SQL Injection
    query = f"SELECT * FROM users WHERE username = '{username}'"
    cursor.execute(query)
    return cursor.fetchall()

# Example usage
user_input = "' OR '1'='1"  # This input will bypass authentication
print(get_user_by_username(user_input))

# Close the connection
connection.close()`,
        isSecuredChecks: ["?"],
        secureCode: `import sqlite3

# Connect to a SQLite database
connection = sqlite3.connect('example.db')
cursor = connection.cursor()

def get_user_by_username(username):
    # Secure against SQL Injection
    query = "SELECT * FROM users WHERE username = ?"
    cursor.execute(query, (username,))
    return cursor.fetchall()

# Example usage
user_input = "' OR '1'='1"  # This input will be treated as a literal string
print(get_user_by_username(user_input))

# Close the connection
connection.close()`,
        explanation: `
The secure code prevents SQL injection by using parameterized queries:

1. Prepared Statement: 
   Instead of directly inserting the user input into the SQL query string, a placeholder (?) is used:
   \`query = "SELECT * FROM users WHERE username = ?"\`

2. Parameter Binding:
   The user input is passed as a separate parameter to the execute method:
   \`cursor.execute(query, (username,))\`

This approach ensures that the database treats the input as literal data, not as part of the SQL command.

Example of how it works:

Vulnerable:
user_input = "' OR '1'='1"
query = f"SELECT * FROM users WHERE username = '{user_input}'"
# Results in: SELECT * FROM users WHERE username = '' OR '1'='1'
# This always returns true, bypassing authentication

Secure:
user_input = "' OR '1'='1"
query = "SELECT * FROM users WHERE username = ?"
cursor.execute(query, (user_input,))
# The database receives:
#   SQL: SELECT * FROM users WHERE username = ?
#   Parameter: "' OR '1'='1"
# The input is treated as a literal string, not SQL code

This method effectively prevents SQL injection by separating the SQL code from the data, regardless of what characters are in the input.
    `,
    },
    {
        title: "Cross-Site Scripting (XSS) Prevention",
        vulnerableCode: `from flask import Flask, request, render_template_string

app = Flask(__name__)

@app.route("/")
def hello():
    name = request.args.get("name", "")
    # Vulnerable to XSS
    template = f"<h1>Hello {name}!</h1>"
    return render_template_string(template)

if __name__ == "__main__":
    app.run(debug=True)`,
        secureCode: `from flask import Flask, request, render_template_string
from markupsafe import escape

app = Flask(__name__)

@app.route("/")
def hello():
    name = request.args.get("name", "")
    # Secure against XSS
    template = "<h1>Hello {{ name }}!</h1>"
    return render_template_string(template, name=escape(name))

if __name__ == "__main__":
    app.run(debug=True)`,
    },
    {
        title: "Cross-Site Request Forgery (CSRF) Prevention",
        vulnerableCode: `from flask import Flask, request, render_template_string

app = Flask(__name__)

@app.route("/transfer", methods=["POST"])
def transfer_money():
    amount = request.form['amount']
    to_account = request.form['to']
    # Vulnerable to CSRF
    # Transfer money without any CSRF protection
    return f"Transferred {amount} to {to_account}"

if __name__ == "__main__":
    app.run(debug=True)
    `,
        secureCode: `from flask import Flask, request, render_template_string
from flask_wtf.csrf import CSRFProtect

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key'
csrf = CSRFProtect(app)

@app.route("/transfer", methods=["POST"])
@csrf.exempt
def transfer_money():
    amount = request.form['amount']
    to_account = request.form['to']
    # CSRF protection added
    return f"Transferred {amount} to {to_account}"

if __name__ == "__main__":
    app.run(debug=True)
    `,
    },
    {
        title: "Secure Password Hashing",
        vulnerableCode: `import hashlib

def hash_password(password):
    # Vulnerable: using MD5 for password hashing
    return hashlib.md5(password.encode()).hexdigest()

# Usage
password = "user_password"
hashed = hash_password(password)
print(f"Hashed password: {hashed}")
    `,
        secureCode: `import bcrypt

def hash_password(password):
    # Secure: using bcrypt for password hashing
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode(), salt)

# Usage
password = "user_password"
hashed = hash_password(password)
print(f"Hashed password: {hashed}")
    `,
    },
    {
        title: "Secure File Upload",
        vulnerableCode: `from flask import Flask, request

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part'
    file = request.files['file']
    # Vulnerable: saving file without checks
    file.save(file.filename)
    return 'File uploaded successfully'

if __name__ == '__main__':
    app.run(debug=True)
    `,
        secureCode: `import os
from flask import Flask, request
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = '/path/to/secure/location'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part'
    file = request.files['file']
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return 'File uploaded successfully'
    return 'Invalid file type'

if __name__ == '__main__':
    app.run(debug=True)
    `,
    },
    {
        title: "Secure Session Management",
        vulnerableCode: `from flask import Flask, session

app = Flask(__name__)
app.secret_key = 'very-secret-key'

@app.route('/login')
def login():
    # Vulnerable: weak session management
    session['user_id'] = 123
    return 'Logged in'

if __name__ == '__main__':
    app.run(debug=True)
    `,
        secureCode: `from flask import Flask, session
import secrets

app = Flask(__name__)
app.secret_key = secrets.token_hex(16)
app.config['SESSION_COOKIE_SECURE'] = True
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['PERMANENT_SESSION_LIFETIME'] = 3600  # 1 hour

@app.route('/login')
def login():
    # Secure: strong session management
    session['user_id'] = 123
    session.permanent = True
    return 'Logged in'

if __name__ == '__main__':
    app.run(debug=True)
    `,
    },
    {
        title: "Input Validation",
        vulnerableCode: `from flask import Flask, request

app = Flask(__name__)

@app.route('/process')
def process():
    # Vulnerable: no input validation
    age = request.args.get('age')
    return f'Processed age: {age}'

if __name__ == '__main__':
    app.run(debug=True)
    `,
        secureCode: `from flask import Flask, request

app = Flask(__name__)

@app.route('/process')
def process():
    # Secure: input validation
    age = request.args.get('age')
    try:
        age = int(age)
        if age < 0 or age > 150:
            return 'Invalid age', 400
        return f'Processed age: {age}'
    except ValueError:
        return 'Invalid input: age must be a number', 400

if __name__ == '__main__':
    app.run(debug=True)
    `,
    },
    {
        title: "Secure API Key Storage",
        vulnerableCode: `# config.py
API_KEY = 'my_secret_api_key'

# main.py
from config import API_KEY

def make_api_request():
    # Vulnerable: API key hardcoded
    headers = {'Authorization': f'Bearer {API_KEY}'}
    # Make API request...
    `,
        secureCode: `# main.py
import os
from dotenv import load_dotenv

load_dotenv()

def make_api_request():
    # Secure: API key loaded from environment variable
    api_key = os.getenv('API_KEY')
    if not api_key:
        raise ValueError("API key not found in environment variables")
    headers = {'Authorization': f'Bearer {api_key}'}
    # Make API request...
    `,
    },
    {
        title: "Secure Cookie Handling",
        vulnerableCode: `from flask import Flask, make_response

app = Flask(__name__)

@app.route('/set_cookie')
def set_cookie():
    resp = make_response('Cookie set')
    # Vulnerable: insecure cookie
    resp.set_cookie('user_id', '12345')
    return resp

if __name__ == '__main__':
    app.run(debug=True)
    `,
        secureCode: `from flask import Flask, make_response

app = Flask(__name__)

@app.route('/set_cookie')
def set_cookie():
    resp = make_response('Cookie set')
    # Secure: httponly and secure flags set
    resp.set_cookie('user_id', '12345', httponly=True, secure=True, samesite='Strict')
    return resp

if __name__ == '__main__':
    app.run(debug=True)
    `,
    },
    {
        title: "XML External Entity (XXE) Prevention",
        vulnerableCode: `import xml.etree.ElementTree as ET

def parse_xml(xml_string):
    # Vulnerable to XXE
    root = ET.fromstring(xml_string)
    return root.find('data').text

# Usage
xml_input = '''<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE foo [
<!ELEMENT foo ANY >
<!ENTITY xxe SYSTEM "file:///etc/passwd" >]>
<foo>&xxe;</foo>'''

result = parse_xml(xml_input)
print(result)
    `,
        secureCode: `from defusedxml import ElementTree as ET

def parse_xml(xml_string):
    # Secure against XXE
    root = ET.fromstring(xml_string)
    return root.find('data').text

# Usage
xml_input = '''<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE foo [
<!ELEMENT foo ANY >
<!ENTITY xxe SYSTEM "file:///etc/passwd" >]>
<foo>&xxe;</foo>'''

try:
    result = parse_xml(xml_input)
    print(result)
except ET.ParseError:
    print("XML parsing error: possibly malicious input")
    `,
    },
    {
        title: "Secure Random Number Generation",
        vulnerableCode: `import random

def generate_token():
    # Vulnerable: using weak random number generator
    return ''.join(random.choice('0123456789ABCDEF') for i in range(16))

print(generate_token())
    `,
        secureCode: `import secrets

def generate_token():
    # Secure: using cryptographically strong random number generator
    return secrets.token_hex(16)

print(generate_token())
    `,
    },
    {
        title: "Content Security Policy (CSP) Implementation",
        vulnerableCode: `from flask import Flask, render_template_string

app = Flask(__name__)

@app.route('/')
def index():
    # Vulnerable: no CSP headers
    return render_template_string("<h1>Welcome</h1><script>alert('XSS');</script>")

if __name__ == '__main__':
    app.run(debug=True)
    `,
        secureCode: `from flask import Flask, render_template_string

app = Flask(__name__)

@app.after_request
def add_security_headers(response):
    response.headers['Content-Security-Policy'] = "default-src 'self'; script-src 'self' https://trusted.cdn.com"
    return response

@app.route('/')
def index():
    # Secure: CSP headers added
    return render_template_string("<h1>Welcome</h1>")

if __name__ == '__main__':
    app.run(debug=True)
    `,
    },
];
