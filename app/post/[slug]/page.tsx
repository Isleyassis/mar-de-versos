import { getPostBySlug, getPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Café Vida
            </Link>
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Back to Posts
            </Link>
          </div>
        </div>
      </nav>
      <main className="max-w-4xl mx-auto py-12 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <article className="bg-white rounded-lg shadow-md overflow-hidden">
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            )}
            <div className="p-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>
              <p className="text-sm text-gray-500 mb-8">
                {new Date(post.createdAt).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {post.description}
                </p>
              </div>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
