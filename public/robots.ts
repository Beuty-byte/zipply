// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    // Убедитесь, что путь правильный
    sitemap: 'https://zipply.io/sitemap.xml',
  };
}