# Contributing to TheCyberHub

Thank you for your interest in contributing to TheCyberHub! This document provides guidelines and setup instructions for contributors.

## Table of Contents
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Code Style](#code-style)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)

## Getting Started

TheCyberHub is a Next.js-based cybersecurity learning platform with tools, resources, and community features.

### Prerequisites
- Node.js 18+ and npm
- Git
- A code editor (VS Code recommended)

### Quick Start
```bash
# Clone the repository
git clone https://github.com/thecyberhub/TheCyberHub.git
cd TheCyberHub

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Development Setup

### Environment Variables

The application requires several environment variables. See `.env.example` for all available options.

#### Required Variables
```bash
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:5000

# AWS Lambda Tools (if using security tools)
NEXT_PUBLIC_SUBFINDER_API_URL=your_lambda_url
NEXT_PUBLIC_HEADER_ANALYZER_API_URL=your_lambda_url
NEXT_PUBLIC_SUB_TAKEOVER_API_URL=your_lambda_url
```

#### Optional Variables
```bash
# OAuth (for social login)
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_github_client_id
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id

# External APIs (for specific tools)
NEXT_PUBLIC_WHOIS_API_KEY=your_api_key
```

For detailed environment variable documentation, see `ALL_ENVIRONMENT_VARIABLES.md`.

### Backend Setup

TheCyberHub requires the `thecyberhub-core` backend API. See the [backend repository](https://github.com/thecyberhub/thecyberhub-core) for setup instructions.

## Project Structure

```
TheCyberHub/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── admin/        # Admin pages
│   │   ├── blog/         # Blog pages
│   │   ├── forums/       # Forum pages
│   │   ├── tools/        # Security tools
│   │   └── ...
│   ├── components/       # Reusable React components
│   ├── lib/              # Utility functions and API clients
│   ├── hooks/            # Custom React hooks
│   └── types/            # TypeScript type definitions
├── public/               # Static assets
└── ...
```

## Development Workflow

### Creating a New Feature

1. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow existing patterns
   - Add comments for complex logic

3. **Test your changes**
   ```bash
   npm run dev  # Test locally
   npm run build  # Ensure it builds
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

### Commit Message Convention

We follow conventional commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add JWT analyzer tool
fix: resolve header analyzer CORS issue
docs: update environment variables guide
```

## Code Style

### TypeScript/React Guidelines

- Use TypeScript for type safety
- Use functional components with hooks
- Follow React best practices
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

### Example Component
```typescript
interface ButtonProps {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ 
    label, 
    onClick, 
    variant = 'primary' 
}) => {
    return (
        <button 
            onClick={onClick}
            className={`btn btn-${variant}`}
        >
            {label}
        </button>
    );
};
```

### Styling
- Use Tailwind CSS for styling
- Follow existing design patterns
- Ensure responsive design (mobile-first)
- Use dark theme colors (project uses dark mode)

## Testing

### Running Tests
```bash
# Run all tests
npm test

# Run E2E tests
npm run test:e2e
```

### Writing Tests
- Add tests for new features
- Test edge cases and error handling
- Use descriptive test names

## Submitting Changes

### Pull Request Process

1. **Update documentation**
   - Update README if needed
   - Add comments to complex code
   - Update CONTRIBUTING.md if workflow changes

2. **Create Pull Request**
   - Use a clear, descriptive title
   - Describe what changes you made and why
   - Reference any related issues
   - Add screenshots for UI changes

3. **PR Template**
   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Code refactoring

   ## Testing
   - [ ] Tested locally
   - [ ] Added/updated tests
   - [ ] Builds successfully

   ## Screenshots (if applicable)
   Add screenshots here

   ## Related Issues
   Closes #123
   ```

4. **Code Review**
   - Address review comments
   - Make requested changes
   - Be open to feedback

### What to Avoid

❌ **Don't commit:**
- `.env.local` or any files with secrets
- `node_modules/` directory
- Build artifacts (`.next/`, `dist/`)
- Temporary files
- Personal IDE configurations
- Large binary files

❌ **Don't:**
- Make unrelated changes in one PR
- Commit commented-out code
- Leave console.log statements
- Break existing functionality

## Security

### Reporting Security Issues

If you discover a security vulnerability, please email security@thecyberhub.org instead of creating a public issue.

### Security Best Practices

- Never commit API keys or secrets
- Use environment variables for sensitive data
- Validate all user inputs
- Follow OWASP security guidelines
- Keep dependencies updated

## Getting Help

- **Discord**: Join our community server
- **GitHub Issues**: For bug reports and feature requests
- **Discussions**: For questions and general discussion

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## License

By contributing to TheCyberHub, you agree that your contributions will be licensed under the project's license.

---

Thank you for contributing to TheCyberHub! 🚀
