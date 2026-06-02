import { NextRequest, NextResponse } from 'next/server';
import { getPosts, createPost, generateSlug } from '@/lib/posts';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  const posts = await getPosts();
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, description, image } = body;

    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 });
    }

    const slug = generateSlug(title);
    const post = await createPost({
      title,
      description,
      image: image || '',
      slug,
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
