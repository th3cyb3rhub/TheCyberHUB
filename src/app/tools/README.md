# Security Tools

## Currently Available (9 Tools)

All these tools work **100% client-side** - no backend required, no data sent to servers.

### 🔍 Reconnaissance & OSINT
1. **Google Dork** - Advanced Google search operators for security testing
   - Path: `/tools/google-dork`
   - Status: ✅ Fully Functional

### 🔐 Authentication & Tokens
2. **JWT Analyzer** - Decode and analyze JWT tokens for security issues
   - Path: `/tools/jwt-analyzer`
   - Status: ✅ Fully Functional
   - Features: Weak secret detection, security analysis, signature verification

3. **Password Generator** - Generate cryptographically secure passwords
   - Path: `/tools/password-generator`
   - Status: ✅ Fully Functional
   - Features: Customizable length, character sets, strength indicator

### 🔧 Utilities
4. **Encoder/Decoder** - Base64, URL, HTML, Hex, Binary, ROT13 encoding/decoding
   - Path: `/tools/encoder-decoder`
   - Status: ✅ Fully Functional

5. **Text Diff** - Compare two texts and find differences
   - Path: `/tools/text-diff`
   - Status: ✅ Fully Functional

6. **Hash Analyzer** - Identify hash types and analyze security
   - Path: `/tools/hash-analyzer`
   - Status: ✅ Fully Functional

### 🎯 Penetration Testing
7. **Reverse Shell Generator** - Generate reverse shell payloads
   - Path: `/tools/reverse-shell`
   - Status: ✅ Fully Functional
   - Shells: Bash, Python, PHP, Perl, Ruby, Netcat, PowerShell, Java

8. **XSS Payloads** - Collection of XSS payloads with encoder
   - Path: `/tools/xss-payloads`
   - Status: ✅ Fully Functional
   - Categories: Basic, Event handlers, Filter bypass, Polyglot, DOM-based

9. **SQL Injection Payloads** - SQLi payloads for different databases
   - Path: `/tools/sql-injection`
   - Status: ✅ Fully Functional
   - Databases: MySQL, PostgreSQL, MSSQL, Oracle, SQLite

---

## Coming Soon (10 Tools)

These tools require backend API setup and are currently hidden from production.

### Network & Infrastructure
- **Subdomain Finder** - Certificate Transparency lookup (requires AWS Lambda)
- **IP Lookup** - Geolocation and network info (requires IP API)
- **WHOIS Lookup** - Domain registration info (requires WHOIS API)
- **DNS Lookup** - DNS record queries (requires DNS API)
- **Port Scanner** - Port scanning info (educational only)

### Security Testing
- **Header Analyzer** - HTTP security headers analysis (requires backend)
- **CORS Tester** - CORS misconfiguration testing (requires backend)
- **SSL/TLS Checker** - SSL certificate analysis (requires backend)

### Vulnerability Research
- **CVE Search** - CVE database search (requires API integration)
- **Exploit-DB Search** - Exploit database search (requires API integration)

---

## For Developers

### To Enable Hidden Tools

1. Set up backend APIs (see `TOOLS_PRODUCTION_ANALYSIS.md`)
2. Configure environment variables in `.env.local`:
   ```bash
   NEXT_PUBLIC_SUBFINDER_API=your_lambda_url
   NEXT_PUBLIC_IP_LOOKUP_API=your_ip_api
   NEXT_PUBLIC_WHOIS_API=your_whois_api
   # ... etc
   ```
3. Uncomment tools in `src/app/tools/page.tsx`
4. Test thoroughly before deploying

### Adding New Tools

1. Create tool page: `src/app/tools/[tool-name]/page.tsx`
2. Use `ToolPageLayout` component for consistency
3. Add to tools array in `src/app/tools/page.tsx`
4. Test error handling and edge cases
5. Update this README

### Tool Development Guidelines

- **Client-side first**: Prefer client-side processing when possible
- **Error handling**: Always handle errors gracefully
- **Loading states**: Show loading indicators for async operations
- **Input validation**: Validate all user inputs
- **Security**: Never expose API keys or sensitive data
- **Accessibility**: Ensure tools are keyboard accessible
- **Mobile**: Test on mobile devices

---

## Security Notes

⚠️ **Important**: These tools are for educational and authorized security testing only.

- Always obtain proper authorization before testing
- Never use these tools on systems you don't own or have permission to test
- Some tools generate payloads that could be harmful if misused
- Users are responsible for their actions

---

## Support

For issues or feature requests:
1. Check `TOOLS_PRODUCTION_ANALYSIS.md` for known issues
2. Open an issue on GitHub
3. Contact the development team

Last Updated: January 2026
