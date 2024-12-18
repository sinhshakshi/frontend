const fs = require("fs");

const baseUrl = "https://testdesk.in"; // Replace with your domain

// Static Names with Redirect Names
const staticNames = {
  "SSC CHSL": {
    displayName: "SSC CHSL 2024 Dest Typing test",
    redirectName: "ssc-chsl-typing-test",
  },
  "DSSSB": {
    displayName: "DSSSB JJA / SPA / PA English Typing Tests",
    redirectName: "dsssb-jja-spa-pa-english-typing-tests",
  },
  "Delhi Police": {
    displayName: "Delhi Police Typing Test",
    redirectName: "delhi-police-typing-test",
  },
  "Delhi High Court": {
    displayName: "Delhi High Court PA SPA Typing Test",
    redirectName: "delhi-high-court-pa-spa-typing-test",
  },
  "DRDO": {
    displayName: "DRDO Assistant Typing Course",
    redirectName: "drdo-assistant-typing-course",
  },
  "EPFO": {
    displayName: "EPFO Typing Skill Tests",
    redirectName: "epfo-typing-skill-tests",
  },
  "BSF": {
    displayName: "BSF (HCM) Typing Skill Tests",
    redirectName: "bsf-hcm-typing-skill-tests",
  },
  "SSC": {
    displayName: "SSC CGL 2024 Dest Typing test",
    redirectName: "ssc-cgl-typing-test",
  },
  "Supreme Court": {
    displayName: "Supreme Court JCA Typing Test",
    redirectName: "supreme-court-jca-typing-test",
  },
  "RRB": {
    displayName: "RRB NTPC / GDCE typing test (Railway typing)",
    redirectName: "rrb-ntpc-typing-test",
  },
};

// Static Routes
const staticRoutes = [
  "/", // Home Page
  "/typing-test-dest-results",
  "/ssc-typing-test/buy-now",
  "/choose-exam",
];

// Dynamic Routes from `staticNames`
const dynamicRoutes = Object.values(staticNames).map(
  (entry) => `/course-page/${entry.redirectName}`
);

// Combine Static and Dynamic Routes
const allRoutes = [...staticRoutes, ...dynamicRoutes];

// Generate XML Sitemap
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes
    .map((route) => {
      return `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
    })
    .join("")}
</urlset>`;

// Write Sitemap to Public Folder
fs.writeFileSync("./public/sitemap.xml", sitemap, "utf8");
console.log("Sitemap generated successfully!");
