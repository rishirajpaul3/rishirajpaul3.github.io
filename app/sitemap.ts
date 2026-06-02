export const dynamic = "force-static";

import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://rishirajpaul.com";
  const now = new Date();

  const staticRoutes = [
    { url: base,                     priority: 1.0  },
    { url: `${base}/about`,          priority: 0.9  },
    { url: `${base}/builds`,         priority: 0.9  },
    { url: `${base}/pulse`,          priority: 0.8  },
    { url: `${base}/blog`,           priority: 0.8  },
    { url: `${base}/case-studies`,   priority: 0.8  },
    { url: `${base}/how-to`,         priority: 0.7  },
    { url: `${base}/glossary`,       priority: 0.7  },
    { url: `${base}/compare`,        priority: 0.7  },
    { url: `${base}/log`,            priority: 0.6  },
  ];

  return staticRoutes.map(r => ({
    url: r.url,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: r.priority,
  }));
}
