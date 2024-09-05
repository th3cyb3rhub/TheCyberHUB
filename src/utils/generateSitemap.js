import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream, existsSync, mkdirSync } from "fs";
import axios from "axios";
import dotenv from "dotenv";
import path from "path";
import { encodeURL } from "src/components/Blogs/util.js";

dotenv.config();

const BASE_URL = process.env.BASE_URL || "https://www.thecyberhub.org";
const API_BASE_URL = process.env.API_BASE_URL || "https://api.thecyberhub.org";

async function fetchDynamicRoutes(endpoint) {
    try {
        const response = await axios.get(`${API_BASE_URL}${endpoint}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
        return [];
    }
}

async function generateSitemap() {
    const smStream = new SitemapStream({ hostname: BASE_URL });

    const publicDir = path.join(process.cwd(), "../../public");
    if (!existsSync(publicDir)) {
        mkdirSync(publicDir, { recursive: true });
    }

    const sitemapPath = path.join(publicDir, "sitemap.xml");
    const writeStream = createWriteStream(sitemapPath);

    writeStream.on("error", (error) => {
        console.error("Error writing sitemap:", error);
    });

    smStream.pipe(writeStream);

    // Manually added static routes
    const staticRoutes = [
        { url: "/", changefreq: "daily", priority: 1.0 },
        { url: "/about", changefreq: "weekly", priority: 0.8 },
        { url: "/community", changefreq: "weekly", priority: 0.7 },
        { url: "/interviewQuestions", changefreq: "weekly", priority: 0.7 },
        { url: "/jobs", changefreq: "weekly", priority: 0.7 },
        { url: "/login", changefreq: "weekly", priority: 0.5 },
        { url: "/quiz", changefreq: "weekly", priority: 0.7 },
        { url: "/support", changefreq: "weekly", priority: 0.7 },
        { url: "/aichat", changefreq: "weekly", priority: 0.7 },
        { url: "/contact", changefreq: "weekly", priority: 0.7 },
        { url: "/volunteer", changefreq: "weekly", priority: 0.7 },
        { url: "/opensec-projects", changefreq: "weekly", priority: 0.7 },
        { url: "/community-events", changefreq: "weekly", priority: 0.7 },
        { url: "/leaderboard", changefreq: "weekly", priority: 0.7 },
        { url: "/newleaderboard", changefreq: "weekly", priority: 0.7 },
        { url: "/resources/methodology", changefreq: "weekly", priority: 0.7 },
        { url: "/resources/checklist", changefreq: "weekly", priority: 0.7 },
        { url: "/resources/hacklist", changefreq: "weekly", priority: 0.7 },
        { url: "/resources/payloads", changefreq: "weekly", priority: 0.7 },
        { url: "/tools/reconage", changefreq: "weekly", priority: 0.7 },
        { url: "/tools/breachcheck", changefreq: "weekly", priority: 0.7 },
        { url: "/tools/revshell", changefreq: "weekly", priority: 0.7 },
        { url: "/tools/passgen", changefreq: "weekly", priority: 0.7 },
        { url: "/tools/encoder", changefreq: "weekly", priority: 0.7 },
        { url: "/tools/binexploits", changefreq: "weekly", priority: 0.7 },
        { url: "/tools/ipinfo", changefreq: "weekly", priority: 0.7 },
        { url: "/tools/subdomain-generator", changefreq: "weekly", priority: 0.7 },
        { url: "/tools/markdown-editor", changefreq: "weekly", priority: 0.7 },
        { url: "/terms-conditions", changefreq: "weekly", priority: 0.5 },
        { url: "/privacy-policy", changefreq: "weekly", priority: 0.5 },
        // Add more static routes as needed
    ];

    // Add static routes to sitemap
    staticRoutes.forEach((route) => smStream.write(route));

    const dynamicRouteConfigs = [{ endpoint: "/api/blogs/all", urlPrefix: "/blogs/" }];

    for (const config of dynamicRouteConfigs) {
        const items = await fetchDynamicRoutes(config.endpoint);
        items.forEach((blog) => {
            smStream.write({
                url: `${config.urlPrefix}${encodeURL(blog?.title)}-${blog?._id.slice(5, 10)}`,
                changefreq: "weekly",
                priority: 0.7,
            });
        });
    }

    smStream.end();

    try {
        await streamToPromise(smStream);
        console.log(`Sitemap created successfully at ${sitemapPath}`);
    } catch (error) {
        console.error("Error generating sitemap:", error);
    }
}

generateSitemap().catch(console.error);
