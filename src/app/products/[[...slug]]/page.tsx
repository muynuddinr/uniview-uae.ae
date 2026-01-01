// src/app/products/[[...slug]]/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import { NavigationHeader } from '../../components/products/NavigationHeader';
import { ItemsGrid } from '../../components/products/ItemsGrid';
import { ProductsGrid } from '../../components/products/ProductsGrid';
import { ProductDetail } from '../../components/products/ProductDetail';
import { EmptyState } from '../../components/products/EmptyState';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

// centralized helper for building base URL
function getBaseUrl() {
  // Use NEXT_PUBLIC_API_URL for internal API calls (inside Docker this is localhost:3000)
  // Fall back to NEXTAUTH_URL for external/client calls
  return process.env.NEXT_PUBLIC_API_URL || process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
}

async function safeFetchJson(url: string) {
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error('Fetch error:', url, err);
    return null;
  }
}

async function getAllCategories() {
  return safeFetchJson(`${getBaseUrl()}/api/admin/categories`);
}

async function getCategoryData(slug: string) {
  return safeFetchJson(`${getBaseUrl()}/api/admin/categories/${encodeURIComponent(slug)}`);
}

async function getSubcategoryData(subcategorySlug: string) {
  return safeFetchJson(`${getBaseUrl()}/api/admin/subcategories/${encodeURIComponent(subcategorySlug)}`);
}

async function getProductData(slug: string) {
  return safeFetchJson(`${getBaseUrl()}/api/admin/products/${encodeURIComponent(slug)}`);
}

// Dynamic metadata for better SEO
export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || [];
  const siteName = 'Uniview UAE';
  const baseUrl = getBaseUrl().replace(/\/$/, '');

  if (!slug || slug.length === 0) {
    return {
      title: `${siteName} — Products & Categories`,
      description: 'Explore product categories and solutions from Uniview UAE.',
      alternates: { canonical: `${baseUrl}/products` },
      openGraph: { title: `${siteName} — Products & Categories`, description: 'Explore product categories and solutions from Uniview UAE.', url: `${baseUrl}/products` }
    };
  }

  if (slug.length === 1) {
    const categorySlug = slug[0];
    const data = await getCategoryData(categorySlug);
    if (!data || !data.success || !data.category) return { title: 'Products' };
    const { category } = data;
    return {
      title: `${category.name} — ${siteName}`,
      description: category.description || `Browse products in ${category.name}`,
      alternates: { canonical: `${baseUrl}/products/${category.slug}` },
      openGraph: { title: `${category.name} — ${siteName}`, description: category.description || '', url: `${baseUrl}/products/${category.slug}` }
    };
  }

  if (slug.length === 2) {
    const [, secondSlug] = slug;
    const subData = await getSubcategoryData(secondSlug);
    if (subData && subData.success && subData.subcategory) {
      const sc = subData.subcategory;
      return {
        title: `${sc.name} — ${siteName}`,
        description: sc.description || `Browse products in ${sc.name}`,
        alternates: { canonical: `${baseUrl}/products/${slug.join('/')}` },
        openGraph: { title: `${sc.name} — ${siteName}`, description: sc.description || '', url: `${baseUrl}/products/${slug.join('/')}` }
      };
    }

    const prodData = await getProductData(secondSlug);
    if (prodData && prodData.success && prodData.product) {
      const p = prodData.product;
      return {
        title: `${p.name} — ${siteName}`,
        description: p.shortDescription || p.description || `${p.name} product details and specifications.`,
        alternates: { canonical: `${baseUrl}/products/${slug.join('/')}` },
        openGraph: { title: `${p.name} — ${siteName}`, description: p.shortDescription || '', url: `${baseUrl}/products/${slug.join('/')}` }
      };
    }

    return { title: 'Product' };
  }

  if (slug.length === 3) {
    const productSlug = slug[2];
    const prodData = await getProductData(productSlug);
    if (prodData && prodData.success && prodData.product) {
      const p = prodData.product;
      return {
        title: `${p.name} — ${siteName}`,
        description: p.shortDescription || p.description || `${p.name} product details and specifications.`,
        alternates: { canonical: `${baseUrl}/products/${slug.join('/')}` },
        openGraph: { title: `${p.name} — ${siteName}`, description: p.shortDescription || '', url: `${baseUrl}/products/${slug.join('/')}` }
      };
    }
    return { title: 'Product' };
  }

  return { title: 'Products' };
}

export default async function ProductsPage({ params }: PageProps) {
  const { slug } = await params;
  // Handle base path: /products/
  if (!slug || slug.length === 0) {
    const data = await getAllCategories();
    
    if (!data || !data.success) {
      return (
        <>
          <Navbar />
          <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <EmptyState
                title="No categories found"
                message="Check back later for categories."
              />
            </div>
          </div>
          <Footer />
        </>
      );
    }

    const { categories } = data;

    return (
      <>
        <Navbar />
        <div className="bg-white">
          <NavigationHeader
            title="All Categories"
            description="Browse our product categories"
            backHref="/"
            backLabel="Back to Home"
            breadcrumbItems={[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' },
              { label: 'All Categories' }
            ]}
            productCount={categories.length}
            type="categories"
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ItemsGrid 
              items={categories} 
              baseHref="/products" 
              type="categories" 
              showCount={true}
            />
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Handle category page: /products/[category]
  if (slug.length === 1) {
    const categorySlug = slug[0];
    const data = await getCategoryData(categorySlug);

    if (!data || !data.success) notFound();

    const { category, hasSubcategories, subcategories, products } = data;

    if (hasSubcategories && subcategories.length > 0) {
      return (
        <>
          <Navbar />
          <div className="bg-white">
            <NavigationHeader
              title={category.name}
              description={category.description}
              backHref="/products"
              backLabel="Back to Products"
              breadcrumbItems={[
                { label: 'Home', href: '/' },
                { label: 'Products', href: '/products' },
                { label: category.name }
              ]}
              productCount={subcategories.length}
              type="subcategories"
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <ItemsGrid
                items={subcategories}
                baseHref={`/products/${category.slug}`}
                type="subcategories"
                showCount={true}
              />
            </div>
          </div>
          <Footer />
        </>
      );
    } else {
      return (
        <>
          <Navbar />
          <div className="bg-white">
            <NavigationHeader
              title={category.name}
              description={category.description}
              backHref="/products"
              backLabel="Back to Products"
              breadcrumbItems={[
                { label: 'Home', href: '/' },
                { label: 'Products', href: '/products' },
                { label: category.name }
              ]}
              productCount={products?.length || 0}
              type="products"
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {products && products.length > 0 ? (
                <ProductsGrid
                  products={products}
                  baseHref={`/products/${category.slug}`}
                />
              ) : (
                <EmptyState
                  title="No products found"
                  message="Check back later for new products in this category."
                />
              )}
            </div>
          </div>
          <Footer />
        </>
      );
    }
  }

  // Handle subcategory or product page: /products/[category]/[slug]
  if (slug.length === 2) {
    const [categorySlug, secondSlug] = slug;
    
    const subcategoryData = await getSubcategoryData(secondSlug);
    if (subcategoryData && subcategoryData.success) {
      const { subcategory, products } = subcategoryData;
      
      return (
        <>
          <Navbar />
          <div className="bg-white">
            <NavigationHeader
              title={subcategory.name}
              description={subcategory.description}
              backHref={`/products/${categorySlug}`}
              backLabel={`Back to ${subcategory.categoryId?.name || 'Category'}`}
              breadcrumbItems={[
                { label: 'Home', href: '/' },
                { label: 'Products', href: '/products' },
                {
                  label: subcategory.categoryId?.name || 'Category',
                  href: `/products/${categorySlug}`
                },
                { label: subcategory.name }
              ]}
              productCount={products?.length || 0}
              type="products"
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {products && products.length > 0 ? (
                <ProductsGrid
                  products={products}
                  baseHref={`/products/${categorySlug}/${secondSlug}`}
                />
              ) : (
                <EmptyState
                  title="No products found"
                  message="Check back later for new products in this subcategory."
                />
              )}
            </div>
          </div>
          <Footer />
        </>
      );
    } else {
      const productData = await getProductData(secondSlug);
      if (!productData || !productData.success) notFound();
      
      const { product } = productData;
      
      return (
        <>
          <Navbar />
          <div className="bg-white">
            <NavigationHeader
              title=""
              description=""
              backHref={`/products/${categorySlug}`}
              backLabel={`Back to ${product.categoryId?.name || 'Category'}`}
              breadcrumbItems={[
                { label: 'Home', href: '/' },
                { label: 'Products', href: '/products' },
                {
                  label: product.categoryId?.name || 'Category',
                  href: `/products/${categorySlug}`
                },
                { label: product.name }
              ]}
              showHero={false}
              hideBreadcrumbOnMobile={true}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ProductDetail
                product={product}
              />
            </div>
          </div>
          <Footer />
        </>
      );
    }
  }

  // Handle product detail with subcategory: /products/[category]/[subcategory]/[product]
  if (slug.length === 3) {
    const [categorySlug, subcategorySlug, productSlug] = slug;
    const productData = await getProductData(productSlug);
    
    if (!productData || !productData.success) notFound();
    
    const { product } = productData;
    
    return (
      <>
        <Navbar />
        <div className="bg-white">
          <NavigationHeader
            title=""
            description=""
            backHref={`/products/${categorySlug}/${subcategorySlug}`}
            backLabel={`Back to ${product.subcategoryId?.name || 'Subcategory'}`}
            breadcrumbItems={[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' },
              {
                label: product.categoryId?.name || 'Category',
                href: `/products/${categorySlug}`
              },
              {
                label: product.subcategoryId?.name || 'Subcategory',
                href: `/products/${categorySlug}/${subcategorySlug}`
              },
              { label: product.name }
            ]}
            showHero={false}
            hideBreadcrumbOnMobile={true}
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProductDetail
              product={product}
            />
          </div>
        </div>
        <Footer />
      </>
    );
  }

  notFound();
}