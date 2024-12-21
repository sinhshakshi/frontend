const fs = require("fs");

const baseUrl = "https://testdesk.in"; // Replace with your domain

// Static Names with Redirect Names
const staticNames = {
  "SSC CHSL": {
    displayName: "SSC CHSL Typing Test",
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
    displayName: "EPFO Typing Tests",
    redirectName: "epfo-typing-skill-tests",
  },
  "BSF": {
    displayName: "BSF (HCM) Typing Tests",
    redirectName: "bsf-hcm-typing-skill-tests",
  },
  "SSC": {
    displayName: "SSC CGL Typing Test",
    redirectName: "ssc-cgl-typing-test",
  },
  "Supreme Court": {
    displayName: "Supreme Court JCA Typing Test",
    redirectName: "supreme-court-jca-typing-test",
  },
  "RRB": {
    displayName: "RRB NTPC / GDCE Typing Test (Railway Typing)",
    redirectName: "rrb-ntpc-typing-test",
  },
};

// Static Routes
const staticRoutes = [
  "/", // Home Page
  "/typing-test-dest-results",
  "/ssc-typing-test/buy-now",
  "/choose-exam",
  "/online-free-typing-test",
];

// Dynamic Routes from `staticNames`
const dynamicRoutes = Object.values(staticNames).map(
  (entry) => `/course-page/${entry.redirectName}`
);

// Typing Test Routes
const categories = [
  "ssc-cgl-typing-test-01",
  "ssc-cgl-typing-test-02",
  "ssc-cgl-typing-test-03",
  "ssc-cgl-typing-test-04",
  "ssc-cgl-typing-test-05",
  "rrb-typing-test-01",
  "rrb-typing-test-02",
  "rrb-typing-test-03",
  "rrb-typing-test-04",
  "rrb-typing-test-05",
  "ssc-chsl-typing-test-01",
  "ssc-chsl-typing-test-02",
  "ssc-chsl-typing-test-03",
  "ssc-chsl-typing-test-04",
  "ssc-chsl-typing-test-05",
];

const typingTestRoutes = categories.map(
  (testId) => `/online-free-typing-test/${testId}`
);

// Combine Static, Dynamic, and Typing Test Routes
const allRoutes = [...staticRoutes, ...dynamicRoutes, ...typingTestRoutes];

// Generate XML Sitemap
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${allRoutes
    .map((route) => {
      return `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>${baseUrl}/logo.png</image:loc>
      <image:caption>Testdesk Logo</image:caption>
    </image:image>
  </url>`;
    })
    .join("")}
</urlset>`;

// Write Sitemap to Public Folder
fs.writeFileSync("./public/sitemap.xml", sitemap, "utf8");
console.log("Sitemap generated successfully!");
