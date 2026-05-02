// components/Breadcrumbs.tsx

const BASE_URL = 'https://compressor.io';

export default function Breadcrumbs({ items }: { items: Array<{ name: string; url: string }> }) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.name,
            item: `${BASE_URL}${item.url}`,
        })),
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
                {items.map((item, i) => (
                    <span key={i}>
            {i > 0 && <span className="mx-2">›</span>}
                        {i < items.length - 1 ? (
                            <a href={item.url} className="hover:text-blue-600">{item.name}</a>
                        ) : (
                            <span className="text-gray-800 font-medium">{item.name}</span>
                        )}
          </span>
                ))}
            </nav>
        </>
    );
}