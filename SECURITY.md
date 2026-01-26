# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in TheCyberHub, please report it responsibly:

### How to Report

1. **Email**: Send details to security@thecyberhub.org
2. **Do NOT** create a public GitHub issue
3. **Include**:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### What to Expect

- **Acknowledgment**: Within 48 hours
- **Initial Assessment**: Within 7 days
- **Fix Timeline**: Depends on severity
- **Credit**: We'll credit you in the security advisory (if desired)

## Security Best Practices

### For Contributors

#### Environment Variables
- **Never commit** `.env.local` or files containing secrets
- Use `.env.example` for documentation only
- Store sensitive data in environment variables
- Use different credentials for dev/staging/production

#### API Keys and Secrets
- Rotate API keys regularly
- Use least-privilege access
- Never hardcode credentials in source code
- Use environment variables with `NEXT_PUBLIC_` prefix only for non-sensitive data

#### Code Security
- Validate all user inputs
- Sanitize data before rendering
- Use parameterized queries (prevent SQL injection)
- Implement proper authentication and authorization
- Follow OWASP Top 10 guidelines

### For Deployment

#### AWS Lambda Security
The project uses AWS Lambda for certain security tools. Protect these endpoints:

1. **API Gateway Configuration**
   ```yaml
   - Enable API keys
   - Set rate limiting (100 req/min recommended)
   - Configure CORS (allow only your domain)
   - Enable AWS WAF
   - Set up CloudWatch alarms
   ```

2. **Lambda Function Security**
   - Use environment variables for secrets
   - Implement request validation
   - Set appropriate IAM roles
   - Enable CloudWatch logging
   - Set reserved concurrency limits

3. **Monitoring**
   - Monitor for unusual traffic patterns
   - Set up billing alarms
   - Track error rates
   - Log all security events

#### External APIs

The project uses several external APIs. Secure them properly:

| Service | Security Measures |
|---------|-------------------|
| **ipapi.co** | No key required, rate-limited by IP |
| **API Ninjas** | API key required, rotate regularly |
| **SSL Labs** | Free service, rate-limited |
| **AWS Lambda** | Use environment variables, enable auth |

### Authentication

#### OAuth Configuration
- Use separate OAuth apps for dev/prod
- Restrict callback URLs
- Keep client secrets secure
- Rotate credentials periodically

#### Session Management
- Use secure, httpOnly cookies
- Implement CSRF protection
- Set appropriate session timeouts
- Validate tokens on every request

## Known Security Considerations

### Client-Side Tools
Many tools run entirely in the browser (JWT Analyzer, Encoder/Decoder, etc.). These are safe as they don't send data to servers.

### Server-Side Tools
Tools that require backend processing (Subfinder, Header Analyzer, Subdomain Takeover) use AWS Lambda. Ensure these are properly secured.

### Third-Party APIs
Some tools use external APIs (IP Lookup, WHOIS, SSL Checker). Be aware of:
- Rate limits
- Data privacy
- API key exposure
- Service availability

## Security Checklist

### Before Committing
- [ ] No secrets or API keys in code
- [ ] `.env.local` not committed
- [ ] User inputs validated
- [ ] SQL queries parameterized
- [ ] XSS prevention implemented
- [ ] CSRF tokens used where needed

### Before Deploying
- [ ] Environment variables set in hosting platform
- [ ] Different credentials for production
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Rate limiting enabled
- [ ] Monitoring and alerts set up
- [ ] Backup and recovery plan in place

### Regular Maintenance
- [ ] Update dependencies monthly
- [ ] Review security advisories
- [ ] Rotate API keys quarterly
- [ ] Audit access logs
- [ ] Test backup restoration
- [ ] Review and update security policies

## Dependency Security

### Automated Scanning
We use automated tools to scan for vulnerabilities:
- GitHub Dependabot
- npm audit
- Snyk (optional)

### Manual Review
- Review dependency updates before merging
- Check for known vulnerabilities
- Verify package authenticity
- Use lock files (`package-lock.json`)

### Updating Dependencies
```bash
# Check for vulnerabilities
npm audit

# Fix automatically (if possible)
npm audit fix

# Update specific package
npm update package-name

# Update all packages (carefully)
npm update
```

## Incident Response

### If a Security Breach Occurs

1. **Immediate Actions**
   - Contain the breach
   - Assess the impact
   - Notify affected users
   - Document everything

2. **Investigation**
   - Identify the vulnerability
   - Determine scope of breach
   - Review logs and access patterns
   - Identify affected data

3. **Remediation**
   - Fix the vulnerability
   - Rotate all credentials
   - Deploy security patches
   - Update security measures

4. **Post-Incident**
   - Conduct post-mortem
   - Update security policies
   - Improve monitoring
   - Share lessons learned

## Compliance

### Data Protection
- Follow GDPR guidelines (if applicable)
- Implement data minimization
- Provide data export/deletion
- Maintain audit logs

### Open Source Security
- Review all contributions
- Scan for malicious code
- Verify contributor identity
- Use signed commits (recommended)

## Resources

### Security Tools
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit)
- [Snyk](https://snyk.io/)
- [GitHub Security Advisories](https://github.com/advisories)

### Learning Resources
- [OWASP Cheat Sheets](https://cheatsheetseries.owasp.org/)
- [Web Security Academy](https://portswigger.net/web-security)
- [Security Headers](https://securityheaders.com/)

## Contact

- **Security Issues**: security@thecyberhub.org
- **General Questions**: GitHub Discussions
- **Community**: Discord Server

---

**Last Updated**: January 2026

Thank you for helping keep TheCyberHub secure! 🔒
