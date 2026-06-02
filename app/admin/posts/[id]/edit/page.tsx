'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Post } from '@/types/post';
import ImageUpload from '@/components/ImageUpload';

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/posts/${id}`);
        const data = await response.json();
        if (response.ok) {
          setPost(data);
          setTitle(data.title);
          setDescription(data.description);
          setImage(data.image || '');
        } else {
          setError('Post not found');
        }
      } catch (err) {
        setError('Failed to load post');
      } finally {
        setFetchLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, image }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update post');
      }

      router.push('/admin/posts');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update post');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  if (error && !post) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard" className="text-gray-700 hover:text-gray-900">
                Dashboard
              </Link>
              <span className="text-gray-300">/</span>
              <Link href="/admin/posts" className="text-gray-700 hover:text-gray-900">
                Posts
              </Link>
              <span className="text-gray-300">/</span>
              <h1 className="text-xl font-bold text-gray-900">Edit Post</h1>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-900">
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  placeholder="Enter post title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder:text-gray-500"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-900">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={4}
                  placeholder="Enter post description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder:text-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Image
                </label>
                <ImageUpload value={image} onChange={setImage} />
              </div>
              <div className="flex justify-end space-x-3">
                <Link
                  href="/admin/posts"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Updating...' : 'Update Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
