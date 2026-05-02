import { MetadataRoute } from 'next'
import { i18n } from '@/lib/i18n'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://zipply.com' // Замени на свой домен позже

    return i18n.locales.flatMap((locale) => [
        {
            url: `${baseUrl}/${locale}`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        }
    ])
}