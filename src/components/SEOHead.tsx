
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'product' | 'article';
  price?: number;
  currency?: string;
  availability?: 'InStock' | 'OutOfStock';
  category?: string;
  brand?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Daxx Shop - Quality Gadgets, Fashion & Property | Uganda's Premier Online Store",
  description = "Shop premium gadgets, trendy fashion, stylish accessories, and quality properties at Daxx Shop Uganda. Best prices, fast delivery, and excellent customer service.",
  keywords = "Uganda online shop, gadgets Uganda, fashion Uganda, accessories Uganda, property Uganda",
  image = "https://daxx.shop/images/logo.png",
  url = "https://daxx.shop",
  type = 'website',
  price,
  currency = 'UGX',
  availability = 'InStock',
  category,
  brand = 'Daxx Shop'
}) => {
  const structuredData = type === 'product' && price ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": title,
    "description": description,
    "image": image,
    "brand": {
      "@type": "Brand",
      "name": brand
    },
    "category": category,
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": currency,
      "availability": `https://schema.org/${availability}`,
      "seller": {
        "@type": "Organization",
        "name": "Daxx Shop"
      }
    }
  } : null;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Daxx Shop" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
