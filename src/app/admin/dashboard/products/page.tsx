// src/app/admin/dashboard/products/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Package, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { Product } from "@/types/product";

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");
      
      const response = await fetch("/api/admin/products", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched products:", data.products); // Debug log
        setProducts(data.products || []);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to fetch products");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("An error occurred while fetching products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    function onSearch(e: Event) {
      const detail = (e as CustomEvent)?.detail || {};
      const term = (detail.searchTerm || "").toString();
      setSearchTerm(term);
    }

    window.addEventListener('admin-product-search', onSearch as EventListener);
    return () => window.removeEventListener('admin-product-search', onSearch as EventListener);
  }, []);

  const normalize = (text = "") => text.toLowerCase().trim().replace(/[-\s()\/]/g, "");
  const filteredProducts = searchTerm
    ? products.filter((p) => normalize(p.name).includes(searchTerm) || normalize(p.slug).includes(searchTerm))
    : products;

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      return;
    }

    setDeleteLoading(slug);
    try {
      const response = await fetch(`/api/admin/products/${slug}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        setProducts(products.filter((product) => product.slug !== slug));
        setSuccess("Product deleted successfully");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        const data = await response.json();
        setError(data.error || "Failed to delete product");
      }
    } catch (err) {
      setError("An error occurred while deleting the product");
    } finally {
      setDeleteLoading(null);
    }
  };

  const getCategoryName = (product: Product): string => {
    if (typeof product.categoryId === "object" && product.categoryId !== null) {
      return (product.categoryId as any).name || "Unknown Category";
    }
    return "Unknown Category";
  };

  const getSubcategoryName = (product: Product): string => {
    if (product.subcategoryId && typeof product.subcategoryId === "object") {
      return (product.subcategoryId as any).name || "None";
    }
    return "None";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">
            Manage your product inventory and organization
          </p>
        </div>
        <div className="flex space-x-2">
          <button 
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            onClick={fetchProducts}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <Link href="/admin/dashboard/products/create">
            <button className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </button>
          </Link>
        </div>
      </div>

      {/* Success and Error Messages */}
      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <div>
            <p className="text-green-800 font-medium">Success</p>
            <p className="text-green-700 text-sm">{success}</p>
          </div>
          <button
            onClick={() => setSuccess('')}
            className="ml-auto text-green-600 hover:text-green-800"
          >
            <XCircle className="h-5 w-5" />
          </button>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
          <XCircle className="h-5 w-5 text-red-600" />
          <div>
            <p className="text-red-800 font-medium">Error</p>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
          <button
            onClick={() => setError('')}
            className="ml-auto text-red-600 hover:text-red-800"
          >
            <XCircle className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Products Table */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center space-x-2">
            <Package className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">All Products</h3>
            <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
              {products.length}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Manage and organize your product inventory
          </p>
        </div>
        <div className="p-0">
          {products.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-500 mb-4">
                Get started by creating your first product
              </p>
              <Link href="/admin/dashboard/products/create">
                <button className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Create Product
                </button>
              </Link>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No products match your search
              </h3>
              <p className="text-gray-500 mb-4">
                Try a different keyword or clear the search to see all products
              </p>
            </div>
          ) : (
            <div className="overflow-hidden">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b bg-gray-50">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 font-semibold">Product</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 font-semibold">Price</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 font-semibold">Category</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 font-semibold">Subcategory</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 font-semibold">Stock</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="border-b transition-colors hover:bg-gray-50 data-[state=selected]:bg-muted">
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                          <div className="flex items-center space-x-3">
                            {product.mainImage ? (
                              <img
                                src={product.mainImage}
                                alt={product.name}
                                className="w-10 h-10 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Package className="h-5 w-5 text-blue-600" />
                              </div>
                            )}
                            <div>
                              <p className="font-medium text-gray-900">
                                {product.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {product.slug}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                          <span className="font-semibold text-green-600">
                            ${product.price.toFixed(2)}
                          </span>
                        </td>
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {getCategoryName(product)}
                          </span>
                        </td>
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {getSubcategoryName(product)}
                          </span>
                        </td>
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              product.inStock
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {product.inStock ? "In Stock" : "Out of Stock"}
                          </span>
                        </td>
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-right">
                          <div className="flex justify-end space-x-2">
                            <Link
                              href={`/admin/dashboard/products/${product.slug}/edit`}
                            >
                              <button
                                className="inline-flex items-center justify-center rounded-md border border-blue-200 bg-white px-3 py-2 text-sm font-medium text-blue-700 shadow-sm hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                            </Link>
                            <button
                              className="inline-flex items-center justify-center rounded-md border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-700 shadow-sm hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
                              onClick={() => handleDelete(product.slug)}
                              disabled={deleteLoading === product.slug}
                            >
                              {deleteLoading === product.slug ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-700"></div>
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;