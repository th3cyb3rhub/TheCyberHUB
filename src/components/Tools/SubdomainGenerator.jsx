import React, { useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
    max-width: 600px;
    margin: 120px auto 0;
    padding: 20px;
    font-family: Arial, sans-serif;
    background-color: #1e1e1e;
    color: #fff;
    min-height: calc(100vh - 120px);
`;

const Title = styled.h1`
    color: #fff;
    text-align: center;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #444;
    border-radius: 4px;
    background-color: #2c2c2c;
    color: #fff;
`;

const Button = styled.button`
    background-color: #4caf50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;

    &:hover {
        background-color: #45a049;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;
`;

const ResultArea = styled.textarea`
    width: 100%;
    height: 800px;
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #444;
    border-radius: 4px;
    resize: vertical;
    background-color: #2c2c2c;
    color: #fff;
`;

const SubdomainGenerator = () => {
    const [domain, setDomain] = useState("");
    const [result, setResult] = useState("");

    const subdomains = [
        // Basic services
        "www",
        "mail",
        "email",
        "webmail",
        "pop",
        "pop3",
        "imap",
        "smtp",
        "ftp",
        "sftp",

        // Administrative and control panels
        "admin",
        "administrator",
        "webadmin",
        "cpanel",
        "whm",
        "controlpanel",
        "manage",
        "management",
        "portal",
        "dashboard",

        // Development and testing
        "dev",
        "development",
        "developer",
        "test",
        "testing",
        "beta",
        "demo",
        "sandbox",
        "staging",
        "stage",
        "preprod",
        "uat",
        "qa",
        "preview",

        // API and web services
        "api",
        "api-docs",
        "developer",
        "dev-api",
        "api-dev",
        "ws",
        "webservice",
        "rest",
        "restapi",
        "graphql",
        "soap",
        "rpc",
        "json",
        "xml",
        "feeds",
        "rss",

        // Security and networking
        "vpn",
        "ssl",
        "firewall",
        "waf",
        "proxy",
        "gate",
        "gateway",
        "connect",
        "remote",
        "access",
        "login",
        "auth",
        "sso",
        "ldap",
        "radius",

        // Content management and blogs
        "cms",
        "blog",
        "wordpress",
        "wp",
        "joomla",
        "drupal",
        "moodle",
        "wiki",
        "confluence",
        "kb",
        "faq",
        "help",
        "support",
        "docs",

        // E-commerce
        "shop",
        "store",
        "ecommerce",
        "cart",
        "checkout",
        "catalog",
        "product",
        "order",
        "payment",
        "pay",
        "billing",
        "invoice",
        "transaction",

        // User management
        "user",
        "account",
        "profile",
        "member",
        "client",
        "customer",
        "crm",
        "hrm",
        "erp",

        // Communication and collaboration
        "chat",
        "im",
        "voip",
        "sip",
        "meet",
        "conference",
        "webinar",
        "live",
        "stream",
        "video",
        "audio",
        "voice",
        "podcast",

        // Infrastructure and hosting
        "ns1",
        "ns2",
        "ns3",
        "ns4",
        "dns",
        "nameserver",
        "host",
        "server",
        "vps",
        "cloud",
        "cdn",
        "loadbalancer",
        "lb",
        "cluster",
        "web",
        "app",
        "service",

        // Databases
        "db",
        "database",
        "sql",
        "mysql",
        "postgres",
        "oracle",
        "mongodb",
        "redis",
        "elastic",
        "solr",

        // File storage and sharing
        "files",
        "storage",
        "share",
        "backup",
        "archive",
        "data",
        "nas",
        "san",

        // Monitoring and analytics
        "monitor",
        "status",
        "health",
        "uptime",
        "analytics",
        "stats",
        "metrics",
        "logs",
        "logging",
        "trace",
        "tracking",

        // Version control and CI/CD
        "git",
        "svn",
        "repo",
        "ci",
        "cd",
        "jenkins",
        "build",
        "gitlab",
        "github",

        // Project management
        "jira",
        "project",
        "tasks",
        "planner",
        "roadmap",
        "sprint",
        "agile",
        "scrum",
        "kanban",

        // Marketing and SEO
        "seo",
        "analytics",
        "campaign",
        "newsletter",

        // Mobile
        "m",
        "mobile",
        "app",
        "ios",
        "android",
        "wap",

        // Localization
        "i18n",
        "l10n",
        "translate",
        "lang",

        // Events and calendars
        "events",
        "calendar",
        "schedule",
        "booking",
        "reservation",

        // Media
        "media",
        "img",
        "images",
        "video",
        "audio",
        "music",
        "podcast",
        "stream",

        // Forums and community
        "forum",
        "community",
        "discuss",
        "board",
        "feedback",

        // Education and training
        "learn",
        "course",
        "class",
        "training",
        "edu",
        "lms",

        // Jobs and careers
        "jobs",
        "careers",
        "hire",
        "recruiting",

        // Business functions
        "sales",
        "marketing",
        "finance",
        "hr",
        "legal",
        "it",
        "ops",
        "research",
        "support",
        "helpdesk",

        // Environment indicators
        "prod",
        "production",
        "staging",
        "dev",
        "local",
        "internal",
        "external",
        "public",
        "private",

        // Numeric prefixes (for load balancing or multiple servers)
        "1",
        "2",
        "3",
        "4",
        "5",
        "01",
        "02",
        "03",
        "04",
        "05",

        // Geographic and location-based
        "eu",
        "us",
        "uk",
        "de",
        "fr",
        "es",
        "it",
        "nl",
        "au",
        "ca",
        "jp",
        "cn",
        "in",
        "east",
        "west",
        "north",
        "south",
        "central",

        // Additional services and features
        "print",
        "fax",
        "scan",
        "wifi",
        "network",
        "intranet",
        "extranet",
        "lan",
        "wan",
        "telephony",
        "callcenter",
        "ticket",

        // More specific application names
        "wordpress",
        "magento",
        "prestashop",
        "opencart",
        "moodle",
        "mediawiki",
        "phpmyadmin",
        "webmin",
        "cpanel",
        "plesk",
        "whmcs",
        "zabbix",
        "nagios",
        "grafana",
        "kibana",

        // Cloud services
        "aws",
        "azure",
        "gcp",
        "cloudfront",
        "s3",
        "ec2",
        "rds",
        "lambda",
        "heroku",

        // Additional technical terms
        "soap",
        "ajax",
        "cors",
        "spa",
        "pwa",
        "iot",
        "blockchain",
        "crypto",
        "ml",
        "ai",

        // Protocols and standards
        "http",
        "https",
        "ftp",
        "sftp",
        "ssh",
        "telnet",
        "ldap",
        "imap",
        "smtp",
        "pop3",

        // Business and productivity tools
        "office",
        "excel",
        "word",
        "powerpoint",
        "outlook",
        "teams",
        "slack",
        "zoom",

        // Additional infrastructure and networking
        "router",
        "switch",
        "hub",
        "modem",
        "repeater",
        "bridge",
        "nat",

        // More security-related
        "antivirus",
        "malware",
        "phishing",
        "spam",
        "ips",
        "ids",
        "siem",

        // Additional development tools
        "npm",
        "yarn",
        "composer",
        "maven",
        "gradle",
        "docker",
        "kubernetes",
        "helm",

        // More specific business functions
        "accounting",
        "payroll",
        "inventory",
        "logistics",
        "procurement",
        "compliance",

        // Additional media and content types
        "ebook",
        "magazine",
        "newspaper",
        "game",
        "games",

        // More specific technologies
        "java",
        "php",
        "python",
        "ruby",
        "nodejs",
        "dotnet",
        "golang",
        "scala",
        "rust",

        // Additional services
        "newsletter",
        "subscribe",
        "unsubscribe",
        "rss",
        "atom",
        "sitemap",

        // More specific industries
        "healthcare",
        "finance",
        "banking",
        "insurance",
        "realestate",
        "travel",
        "hospitality",

        // Additional tools and services
        "translate",
        "converter",
        "calculator",
        "weather",

        // More specific content types
        "news",
        "press",
        "whitepaper",

        // Additional infrastructure components
        "balancer",
        "cache",
        "relay",
        "jump",
        "bastion",
        "edge",
        "origin",

        // More specific security measures
        "2fa",
        "mfa",
        "totp",
        "saml",
        "oauth",
        "openid",
        "kerberos",

        // Additional development environments
        "integration",
        "devops",
        "devsecops",
        "gitops",

        // More cloud-related terms
        "paas",
        "iaas",
        "saas",
        "faas",
        "serverless",
        "container",
        "pod",
        "node",

        // Additional data-related terms
        "etl",
        "olap",
        "oltp",
        "dwh",
        "datamart",
        "lake",
        "warehouse",
        "mining",

        // More specific marketing terms
        "lead",
        "funnel",
        "conversion",
        "retargeting",
        "affiliate",
        "partner",

        // Additional collaboration tools
        "wiki",
        "knowledgebase",
        "faq",

        // More specific e-commerce terms
        "wishlist",
        "review",
        "upsell",
        "crosssell",

        // Additional analytics and reporting terms
        "report",
        "dashboard",
        "kpi",
        "insight",
        "forecast",

        // More specific content delivery terms
        "assets",
        "static",
        "dynamic",
        "streaming",
        "vod",

        // Additional infrastructure management terms
        "orchestration",
        "provisioning",
        "scaling",
        "loadbalancing",
        "failover",

        // More specific database-related terms
        "sharding",
        "replication",
        "migration",

        // Additional security and compliance terms
        "gdpr",
        "hipaa",
        "pci",
        "sox",
        "iso27001",
        "ccpa",

        // More specific user management terms
        "rbac",
        "acl",
        "group",
        "role",
        "permission",

        // Additional testing-related terms
        "unit",
        "integration",
        "e2e",
        "performance",
        "load",
        "stress",
        "ab",

        // More specific version control terms
        "branch",
        "merge",
        "pull",
        "push",
        "tag",
        "release",

        // Additional project management terms
        "epic",
        "story",
        "bug",
        "issue",
        "milestone",
        "sprint",

        // More specific communication tools
        "webrtc",
        "jabber",
        "xmpp",
        "irc",
        "matrix",

        // Additional mobile-related terms
        "pwa",
        "responsive",
        "adaptive",
        "native",
        "hybrid",
        "cordova",

        // More specific content management terms
        "wysiwyg",
        "markdown",
        "latex",

        // More specific file and document management terms
        "dms",
        "ecm",
        "ocr",
        "pdf",

        // Additional customer service related terms
        "ticket",
        "chatbot",
        "selfservice",

        // More specific networking terms
        "dhcp",
        "vlan",
        "mpls",
        "bgp",
        "ospf",

        // Additional security testing terms
        "pentest",
        "vulnerability",
        "exploit",
        "fuzzing",
        "scan",
        "audit",

        // More specific data analysis terms
        "bi",
        "dataviz",
        "tableau",
        "powerbi",
        "qlik",
        "looker",

        // Additional DevOps tools
        "ansible",
        "puppet",
        "chef",
        "terraform",
        "packer",
        "vagrant",

        // More specific machine learning terms
        "ml",
        "ai",
        "dl",
        "nn",
        "cnn",
        "rnn",
        "nlp",
        "cv",
    ];

    const generateSubdomains = (e) => {
        e.preventDefault();
        if (domain) {
            const generatedSubdomains = subdomains.map((sub) => `${sub}.${domain}`);
            setResult(generatedSubdomains.join("\n"));
        } else {
            setResult("");
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(result).then(() => {
            toast.success("Subdomains copied to clipboard!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        });
    };

    return (
        <Container>
            <Title>Subdomain Generator</Title>
            <form onSubmit={generateSubdomains}>
                <Input
                    type="text"
                    placeholder="Enter domain (e.g., example.com)"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                />
                <ButtonContainer>
                    <Button type="submit">Generate Subdomains</Button>
                    {result.length > 0 && (
                        <Button type="button" onClick={copyToClipboard}>
                            Copy Results
                        </Button>
                    )}
                </ButtonContainer>
            </form>
            {result && <ResultArea value={result} readOnly placeholder="Generated subdomains will appear here" />}
            <ToastContainer />
        </Container>
    );
};

export default SubdomainGenerator;
