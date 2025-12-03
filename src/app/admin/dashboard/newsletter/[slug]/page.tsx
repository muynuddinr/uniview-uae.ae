'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Mail, Calendar, User, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { NewsletterSubscription } from '@/types/newsletter';

const NewsletterDetailPage: React.FC = () => {
  const [subscription, setSubscription] = useState<NewsletterSubscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  useEffect(() => {
    fetchSubscription();
  }, [slug]);

  const fetchSubscription = async () => {
    try {
      const response = await fetch(`/api/admin/newsletter/${slug}`, {
        method: 'GET',
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json();
        setSubscription(data.subscription);
      } else {
        setError('Failed to fetch newsletter subscription');
      }
    } catch (err) {
      setError('An error occurred while fetching the newsletter subscription');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (status: 'active' | 'inactive') => {
    setUpdating(true);
    try {
      const response = await fetch(`/api/admin/newsletter/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        setSubscription(prev => prev ? { ...prev, status } : null);
        setSuccess(`Subscription ${status === 'active' ? 'activated' : 'deactivated'}`);
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to update status');
      }
    } catch (err) {
      setError('An error occurred while updating the status');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this newsletter subscription?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/newsletter/${slug}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        router.push('/admin/dashboard/newsletter');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to delete newsletter subscription');
      }
    } catch (err) {
      setError('An error occurred while deleting the newsletter subscription');
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', label: 'Active' },
      inactive: { color: 'bg-red-100 text-red-800', label: 'Inactive' },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    return (
      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${config.color}`}>
        {config.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !subscription) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/dashboard/newsletter">
            <button className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Newsletter
            </button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Subscription Details</h1>
          </div>
        </div>
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error || 'Newsletter subscription not found'}</p>
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
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/admin/dashboard/newsletter">
          <button className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Newsletter
          </button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Subscription Details</h1>
          <p className="text-gray-600 mt-1">
            View and manage newsletter subscription
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subscription Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="bg-gradient-to-r from-blue-50 to-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center space-x-2">
                <Mail className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Subscription Information</h3>
                {getStatusBadge(subscription.status)}
              </div>
            </div>
            <div className="p-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-500">Email Address</label>
                  <a href={`mailto:${subscription.email}`} className="text-lg font-semibold text-blue-600 hover:underline block">
                    {subscription.email}
                  </a>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-500">Subscription Status</label>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(subscription.status)}
                    <span className="text-sm text-gray-600">
                      {subscription.status === 'active' ? 'Currently receiving emails' : 'Not receiving emails'}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-500">Subscribed Date</label>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(subscription.subscribedAt).toLocaleString()}</span>
                  </div>
                </div>
                {subscription.unsubscribedAt && (
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-gray-500">Unsubscribed Date</label>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(subscription.unsubscribedAt).toLocaleString()}</span>
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-500">Subscription ID</label>
                  <p className="text-sm font-mono text-gray-600 bg-gray-100 p-2 rounded">
                    {subscription.slug}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Sidebar */}
        <div className="space-y-6">
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900">Subscription Actions</h3>
            </div>
            <div className="p-6 space-y-3">
              <button
                onClick={() => updateStatus('active')}
                disabled={updating || subscription.status === 'active'}
                className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 w-full justify-start"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Activate Subscription
              </button>
              <button
                onClick={() => updateStatus('inactive')}
                disabled={updating || subscription.status === 'inactive'}
                className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 w-full justify-start"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Deactivate Subscription
              </button>
              <button
                onClick={handleDelete}
                className="inline-flex items-center justify-center rounded-md border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-700 shadow-sm hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 w-full justify-start"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Delete Subscription
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-6 space-y-3">
              <a href={`mailto:${subscription.email}`}>
                <button className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </button>
              </a>
              <button 
                onClick={fetchSubscription}
                className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 w-full justify-start"
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterDetailPage;