'use client';

import React, { useEffect, useState } from 'react';
import { Users, Trash2, RefreshCw, CheckCircle, XCircle, Mail, Eye, ArrowLeft, Calendar } from 'lucide-react';
import { NewsletterSubscription } from '@/types/newsletter';

const NewsletterPage: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<NewsletterSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [viewingDetail, setViewingDetail] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<NewsletterSubscription | null>(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/newsletter', {
        method: 'GET',
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json();
        setSubscriptions(data.subscriptions);
      } else {
        setError('Failed to fetch newsletter subscriptions');
      }
    } catch (err) {
      setError('An error occurred while fetching newsletter subscriptions');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = (subscription: NewsletterSubscription) => {
    setSelectedSubscription(subscription);
    setViewingDetail(true);
  };

  const handleCancelDetail = () => {
    setViewingDetail(false);
    setSelectedSubscription(null);
    setError('');
    setSuccess('');
  };

  const updateStatus = async (status: 'active' | 'inactive') => {
    if (!selectedSubscription) return;

    setUpdating(true);
    try {
      const response = await fetch(`/api/admin/newsletter/${selectedSubscription.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        const updatedSubscription = { ...selectedSubscription, status };
        setSelectedSubscription(updatedSubscription);
        setSubscriptions(subscriptions.map(sub => 
          sub.slug === selectedSubscription.slug ? updatedSubscription : sub
        ));
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

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this newsletter subscription?')) {
      return;
    }

    setDeleteLoading(slug);
    try {
      const response = await fetch(`/api/admin/newsletter/${slug}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setSubscriptions(subscriptions.filter(sub => sub.slug !== slug));
        setSuccess('Newsletter subscription deleted successfully');
        if (viewingDetail && selectedSubscription?.slug === slug) {
          handleCancelDetail();
        }
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to delete newsletter subscription');
      }
    } catch (err) {
      setError('An error occurred while deleting the newsletter subscription');
    } finally {
      setDeleteLoading(null);
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

  // Detail View
  if (viewingDetail && selectedSubscription) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleCancelDetail}
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Newsletter
          </button>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Subscription Information */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="bg-gradient-to-r from-blue-50 to-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center space-x-2">
                  <Mail className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Subscription Information</h3>
                  {getStatusBadge(selectedSubscription.status)}
                </div>
              </div>
              <div className="p-6 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-gray-500">Email Address</label>
                    <a href={`mailto:${selectedSubscription.email}`} className="text-lg font-semibold text-blue-600 hover:underline block">
                      {selectedSubscription.email}
                    </a>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500">Subscription Status</label>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(selectedSubscription.status)}
                      <span className="text-sm text-gray-600">
                        {selectedSubscription.status === 'active' ? 'Currently receiving emails' : 'Not receiving emails'}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500">Subscribed Date</label>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(selectedSubscription.subscribedAt).toLocaleString()}</span>
                    </div>
                  </div>
                  {selectedSubscription.unsubscribedAt && (
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-gray-500">Unsubscribed Date</label>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(selectedSubscription.unsubscribedAt).toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500">Subscription ID</label>
                    <p className="text-sm font-mono text-gray-600 bg-gray-100 p-2 rounded">
                      {selectedSubscription.slug}
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
                  disabled={updating || selectedSubscription.status === 'active'}
                  className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 w-full justify-start"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Activate Subscription
                </button>
                <button
                  onClick={() => updateStatus('inactive')}
                  disabled={updating || selectedSubscription.status === 'inactive'}
                  className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 w-full justify-start"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Deactivate Subscription
                </button>
                <button
                  onClick={() => handleDelete(selectedSubscription.slug)}
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
                <a href={`mailto:${selectedSubscription.email}`}>
                  <button className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </button>
                </a>
                <button 
                  onClick={fetchSubscriptions}
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
  }

  // List View
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Newsletter Subscriptions</h1>
          <p className="text-gray-600 mt-1">
            Manage newsletter email subscriptions
          </p>
        </div>
        <button 
          className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          onClick={fetchSubscriptions}
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-lg bg-gradient-to-br from-blue-50 to-indigo-100 border-0 shadow-sm">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700 text-sm font-medium">Total Subscribers</p>
                <p className="text-3xl font-bold text-blue-900">
                  {subscriptions.length}
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-gradient-to-br from-green-50 to-emerald-100 border-0 shadow-sm">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-700 text-sm font-medium">Active</p>
                <p className="text-3xl font-bold text-green-900">
                  {subscriptions.filter(sub => sub.status === 'active').length}
                </p>
              </div>
              <Mail className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-gradient-to-br from-purple-50 to-violet-100 border-0 shadow-sm">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-700 text-sm font-medium">Inactive</p>
                <p className="text-3xl font-bold text-purple-900">
                  {subscriptions.filter(sub => sub.status === 'inactive').length}
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center space-x-2">
            <Users className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Newsletter Subscriptions</h3>
            <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
              {subscriptions.length}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Manage all newsletter email subscriptions
          </p>
        </div>
        <div className="p-0">
          {subscriptions.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No newsletter subscriptions found
              </h3>
              <p className="text-gray-500">
                Newsletter subscriptions will appear here
              </p>
            </div>
          ) : (
            <div className="overflow-hidden">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b bg-gray-50">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 font-semibold">Email</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 font-semibold">Status</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 font-semibold">Subscribed Date</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {subscriptions.map((subscription) => (
                      <tr key={subscription.id} className="border-b transition-colors hover:bg-gray-50 data-[state=selected]:bg-muted">
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                          <a href={`mailto:${subscription.email}`} className="text-blue-600 hover:underline font-medium">
                            {subscription.email}
                          </a>
                        </td>
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                          {getStatusBadge(subscription.status)}
                        </td>
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                          <div className="text-sm text-gray-500">
                            {new Date(subscription.subscribedAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-right">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => handleViewDetail(subscription)}
                              className="inline-flex items-center justify-center rounded-md border border-blue-200 bg-white px-3 py-2 text-sm font-medium text-blue-700 shadow-sm hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button 
                              className="inline-flex items-center justify-center rounded-md border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-700 shadow-sm hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
                              onClick={() => handleDelete(subscription.slug)}
                              disabled={deleteLoading === subscription.slug}
                            >
                              {deleteLoading === subscription.slug ? (
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

export default NewsletterPage;