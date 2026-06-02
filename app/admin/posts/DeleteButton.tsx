'use client';

import { useRouter } from 'next/navigation';

interface DeleteButtonProps {
  postId: string;
}

export default function DeleteButton({ postId }: DeleteButtonProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });
      router.refresh();
    } catch (error) {
      alert('Failed to delete post');
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 hover:text-red-900"
    >
      Delete
    </button>
  );
}
