'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Mail, Eye, Trash2, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { ContactSubmission } from '@/types/contact';

const ContactsPage: React.FC = () => {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/contacts', {
        method: 'GET',
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json();
        setContacts(data.contacts);
      } else {
        setError('Failed to fetch contact submissions');
      }
    } catch (err) {
      setError('An error occurred while fetching contact submissions');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this contact submission?')) {
      return;
    }

    setDeleteLoading(slug);
    try {
      const response = await fetch(`/api/admin/contacts/${slug}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setContacts(contacts.filter(contact => contact.slug !== slug));
        setSuccess('Contact submission deleted successfully');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to delete contact submission');
      }
    } catch (err) {
      setError('An error occurred while deleting the contact submission');
    } finally {
      setDeleteLoading(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      new: { color: 'bg-blue-100 text-blue-800', label: 'New' },
      read: { color: 'bg-green-100 text-green-800', label: 'Read' },
      replied: { color: 'bg-purple-100 text-purple-800', label: 'Replied' },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.new;
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contact Submissions</h1>
          <p className="text-gray-600 mt-1">
            Manage and view contact form submissions
          </p>
        </div>
        <button 
          className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          onClick={fetchContacts}
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

      {/* Contacts Table */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center space-x-2">
            <Mail className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Contact Submissions</h3>
            <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
              {contacts.length}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            View and manage all contact form submissions
          </p>
        </div>
        <div className="p-0">
          {contacts.length === 0 ? (
            <div className="text-center py-12">
              <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No contact submissions found
              </h3>
              <p className="text-gray-500">
                Contact form submissions will appear here
              </p>
            </div>
          ) : (
            <div className="overflow-hidden">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b bg-gray-50">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 font-semibold">Name</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 font-semibold">Email</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 font-semibold">Phone</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 font-semibold">Subject</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 font-semibold">Status</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 font-semibold">Date</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {contacts.map((contact) => (
                      <tr key={contact.id} className="border-b transition-colors hover:bg-gray-50 data-[state=selected]:bg-muted">
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                          <p className="font-medium text-gray-900">{contact.name}</p>
                        </td>
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                          <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                            {contact.email}
                          </a>
                        </td>
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                          <a href={`tel:${contact.phone}`} className="text-gray-600">
                            {contact.phone}
                          </a>
                        </td>
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                          <p className="text-gray-600 max-w-xs truncate">
                            {contact.subject}
                          </p>
                        </td>
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                          {getStatusBadge(contact.status)}
                        </td>
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                          <div className="text-sm text-gray-500">
                            {new Date(contact.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-right">
                          <div className="flex justify-end space-x-2">
                            <Link href={`/admin/dashboard/contacts/${contact.slug}`}>
                              <button className="inline-flex items-center justify-center rounded-md border border-blue-200 bg-white px-3 py-2 text-sm font-medium text-blue-700 shadow-sm hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                <Eye className="h-4 w-4" />
                              </button>
                            </Link>
                            <button 
                              className="inline-flex items-center justify-center rounded-md border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-700 shadow-sm hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
                              onClick={() => handleDelete(contact.slug)}
                              disabled={deleteLoading === contact.slug}
                            >
                              {deleteLoading === contact.slug ? (
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

export default ContactsPage;