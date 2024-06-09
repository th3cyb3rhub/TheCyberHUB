export const codeReviewData = [
    {
        id: 1,
        title: "Javascript Vulnerable Code Review - Commond Injection",
        description: "Review and understand the vulnerable Javascript code.",
        hint: "Examine how the command variable, which comes from user input, is used directly in the exec function, leading to potential command injection.",
        code: `const express = require('express');
const app = express();
const port = 3000;

app.get('/api', (req, res) => {
    const { command } = req.query;
    const exec = require('child_process').exec;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log(stdout);
    });
    
    res.send('Command executed');
}

app.listen(port, () => {
    console.log(\`Server running on port \${port}\`);
});`,
        language: "javascript",
        tags: ["Javascript", "Code Review", "Cyber Security"],
        category: "Javascript",
        level: "Intermediate",

        solution: [
            "Understand the code and identify the potential security vulnerabilities.",
            "Identify the potential security risks and impacts of the code.",
            "Review the code and suggest the necessary security improvements.",
        ],
    },
    {
        id: 2,
        title: "Python Vulnerable Code Review - Command Injection",
        description: "Review and understand the vulnerable Python code.",
        hint: "Identify how user input (command) is used directly in a shell command.",
        code: `import os
    import sys
    import subprocess
    
    def execute_command(command):
        try:
            output = subprocess.check_output(command, shell=True)
        except subprocess.CalledProcessError as e:
            output = e.output
        return output
    
    def main():
        command = sys.argv[1]
        result = execute_command(command)
        print(result)
    
    if __name__ == "__main__":
        main()
        `,
        language: "python",
        tags: ["Python", "Code Review", "Cyber Security"],
        category: "Python",
        level: "Intermediate",
        solution: [
            "Understand the code and identify the potential security vulnerabilities.",
            "Identify the potential security risks and impacts of the code.",
            "Review the code and suggest the necessary security improvements.",
        ],
    },
    {
        id: 3,
        title: "Arbitrary File Read - Python Vulnerable Code Review",
        description: "Review and understand the vulnerable Python code.",
        hint: "Consider what could happen if the filename comes from an untrusted source.",
        code: `
    import sys
    
    def read_file(filename):
        try:
            with open(filename, 'r') as file:
                content = file.read()
            return content
        except Exception as e:
            return str(e)
    
    def main():
        filename = sys.argv[1]
        result = read_file(filename)
        print(result)
    
    if __name__ == "__main__":
        main()
        `,
        language: "python",
        tags: ["Python", "Code Review", "Cyber Security"],
        category: "Python",
        level: "Intermediate",
        solution: [
            "Understand the code and identify the potential security vulnerabilities.",
            "Identify the potential security risks and impacts of the code.",
            "Review the code and suggest the necessary security improvements, such as validating the file path and restricting access to certain directories.",
        ],
    },
    {
        id: 4,
        title: "SQL Injection - Python Vulnerable Code Review",
        description: "Review and understand the vulnerable Python code.",
        hint: "Check how the user_id is incorporated into the SQL query.",
        code: `
    import sqlite3
    import sys
    
    def get_user_info(user_id):
        conn = sqlite3.connect('example.db')
        cursor = conn.cursor()
        query = f"SELECT * FROM users WHERE id = {user_id}"
        cursor.execute(query)
        return cursor.fetchall()
    
    def main():
        user_id = sys.argv[1]
        result = get_user_info(user_id)
        print(result)
    
    if __name__ == "__main__":
        main()
        `,
        language: "python",
        tags: ["Python", "Code Review", "Cyber Security"],
        category: "Python",
        level: "Intermediate",
        solution: [
            "Understand the code and identify the potential security vulnerabilities.",
            "Identify the potential security risks and impacts of the code.",
            "Review the code and suggest the necessary security improvements, such as using parameterized queries to prevent SQL injection.",
        ],
    },
    {
        id: 5,
        title: "Command Injection - Python Vulnerable Code Review",
        description: "Review and understand the vulnerable Python code.",
        hint: "Look at how the path variable is used in the shell command.",
        code: `
    import os
    import sys
    
    def list_directory(path):
        try:
            command = f"ls {path}"
            output = os.popen(command).read()
            return output
        except Exception as e:
            return str(e)
    
    def main():
        path = sys.argv[1]
        result = list_directory(path)
        print(result)
    
    if __name__ == "__main__":
        main()
        `,
        language: "python",
        tags: ["Python", "Code Review", "Cyber Security"],
        category: "Python",
        level: "Intermediate",
        solution: [
            "Understand the code and identify the potential security vulnerabilities.",
            "Identify the potential security risks and impacts of the code.",
            "Review the code and suggest the necessary security improvements, such as sanitizing user input or using safer alternatives like the `os.listdir()` function.",
        ],
    },
    {
        id: 6,
        title: "Insecure Deserialization - Python Vulnerable Code Review",
        description: "Review and understand the vulnerable Python code.",
        hint: "Consider the risks of loading serialized data from an untrusted source.",
        code: `
    import pickle
    import sys
    
    def deserialize_data(data):
        try:
            return pickle.loads(data)
        except Exception as e:
            return str(e)
    
    def main():
        serialized_data = sys.argv[1]
        result = deserialize_data(serialized_data)
        print(result)
    
    if __name__ == "__main__":
        main()
        `,
        language: "python",
        tags: ["Python", "Code Review", "Cyber Security"],
        category: "Python",
        level: "Intermediate",
        solution: [
            "Understand the code and identify the potential security vulnerabilities.",
            "Identify the potential security risks and impacts of the code.",
            "Review the code and suggest the necessary security improvements, such as avoiding deserialization of untrusted data and using safer serialization formats.",
        ],
    },
    {
        id: 7,
        title: "Hardcoded Credentials - Python Vulnerable Code Review",
        description: "Review and understand the vulnerable Python code.",
        hint: "Evaluate the security risks of using hardcoded credentials.",
        code: `
    import sys
    
    def authenticate(user, password):
        if user == "admin" and password == "secret":
            return "Authenticated"
        else:
            return "Access Denied"
    
    def main():
        user = sys.argv[1]
        password = sys.argv[2]
        result = authenticate(user, password)
        print(result)
    
    if __name__ == "__main__":
        main()
        `,
        language: "python",
        tags: ["Python", "Code Review", "Cyber Security"],
        category: "Python",
        level: "Intermediate",
        solution: [
            "Understand the code and identify the potential security vulnerabilities.",
            "Identify the potential security risks and impacts of the code.",
            "Review the code and suggest the necessary security improvements, such as storing credentials securely using environment variables or secure vaults.",
        ],
    },
    {
        id: 8,
        title: "Path Traversal - Python Vulnerable Code Review",
        description: "Review and understand the vulnerable Python code.",
        hint: "Examine how the filename variable could be manipulated to access unauthorized files.",
        code: `
    import os
    import sys
    
    def safe_open(filename):
        base_directory = "/safe/dir"
        file_path = os.path.join(base_directory, filename)
        try:
            with open(file_path, 'r') as file:
                content = file.read()
            return content
        except Exception as e:
            return str(e)
    
    def main():
        filename = sys.argv[1]
        result = safe_open(filename)
        print(result)
    
    if __name__ == "__main__":
        main()
        `,
        language: "python",
        tags: ["Python", "Code Review", "Cyber Security"],
        category: "Python",
        level: "Intermediate",
        solution: [
            "Understand the code and identify the potential security vulnerabilities.",
            "Identify the potential security risks and impacts of the code.",
            "Review the code and suggest the necessary security improvements, such as validating and sanitizing file paths to prevent path traversal attacks.",
        ],
    },
];
