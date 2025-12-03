// src/app/admin/dashboard/products/[slug]/edit/page.tsx

"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ProductForm from "../../../../../components/admin/ProductForm";
import { Product } from "@/types/product";
import { Category } from "@/types/category";
import { Subcategory } from "@/types/subcategory";
import { ArrowLeft, Package, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

const EditProductPage: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch product
        const productResponse = await fetch(`/api/admin/products/${slug}`, {
          method: "GET",
          credentials: "include",
        });

        if (productResponse.ok) {
          const productData = await productResponse.json();
          setProduct(productData.product);
        } else {
          setError("Failed to fetch product");
        }

        // Fetch categories
        const categoriesResponse = await fetch("/api/admin/categories", {
          method: "GET",
          credentials: "include",
        });

        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json();
          setCategories(categoriesData.categories || []);
        } else {
          setError("Failed to fetch categories");
        }

        // Fetch subcategories
        const subcategoriesResponse = await fetch("/api/admin/subcategories", {
          method: "GET",
          credentials: "include",
        });

        if (subcategoriesResponse.ok) {
          const subcategoriesData = await subcategoriesResponse.json();
          setSubcategories(subcategoriesData.subcategories || []);
        } else {
          console.error("Failed to fetch subcategories");
        }
      } catch (err) {
        setError("An error occurred while fetching data");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const handleSuccess = () => {
    setSuccess("Product updated successfully!");
    setTimeout(() => {
      router.push("/admin/dashboard/products");
    }, 1500);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/dashboard/products">
            <button className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
          </div>
        </div>
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error || "Product not found"}</p>
        </div>
        <button 
          onClick={() => router.back()}
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/admin/dashboard/products">
          <button className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
          <p className="text-gray-600 mt-1">Update product information</p>
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

      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-blue-50 to-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center space-x-2">
            <Package className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Edit Product</h3>
          </div>
          <p className="text-sm text-gray-600 mt-1">Update the product details</p>
        </div>
        <div className="p-6 pt-6">
          <ProductForm
            product={product}
            categories={categories}
            subcategories={subcategories}
            onSuccess={handleSuccess}
            setError={setError}
            setSuccess={setSuccess}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProductPage;