// src/app/admin/dashboard/products/create/page.tsx

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProductForm from "../../../../components/admin/ProductForm";
import { ArrowLeft, Package, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { Category } from "@/types/category";
import { Subcategory } from "@/types/subcategory";

const CreateProductPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

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
        }
      } catch (err) {
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSuccess = () => {
    setSuccess("Product created successfully!");
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/admin/dashboard/products">
          <button className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create Product</h1>
          <p className="text-gray-600 mt-1">
            Add a new product to your inventory
          </p>
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
            <h3 className="text-lg font-semibold text-gray-900">Create New Product</h3>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Fill in the details to add a new product to your store
          </p>
        </div>
        <div className="p-6 pt-6">
          <ProductForm
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

export default CreateProductPage;