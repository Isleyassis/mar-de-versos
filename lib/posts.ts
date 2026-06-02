import { Post } from '@/types/post';
import fs from 'fs/promises';
import path from 'path';

const POSTS_FILE = path.join(process.cwd(), 'data', 'posts.json');

export async function getPosts(): Promise<Post[]> {
  try {
    const data = await fs.readFile(POSTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function getPostById(id: string): Promise<Post | null> {
  const posts = await getPosts();
  return posts.find(post => post.id === id) || null;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getPosts();
  return posts.find(post => post.slug === slug) || null;
}

export async function createPost(post: Omit<Post, 'id' | 'createdAt'>): Promise<Post> {
  const posts = await getPosts();
  const newPost: Post = {
    ...post,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  posts.push(newPost);
  await fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 2));
  return newPost;
}

export async function updatePost(id: string, updates: Partial<Omit<Post, 'id' | 'createdAt'>>): Promise<Post | null> {
  const posts = await getPosts();
  const index = posts.findIndex(post => post.id === id);
  if (index === -1) return null;
  
  posts[index] = { ...posts[index], ...updates };
  await fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 2));
  return posts[index];
}

export async function deletePost(id: string): Promise<boolean> {
  const posts = await getPosts();
  const filteredPosts = posts.filter(post => post.id !== id);
  if (filteredPosts.length === posts.length) return false;
  
  await fs.writeFile(POSTS_FILE, JSON.stringify(filteredPosts, null, 2));
  return true;
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '') // Remove all non-alphanumeric chars except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
    .trim();
}
