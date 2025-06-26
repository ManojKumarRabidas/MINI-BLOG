'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import '../../globals.css'; // Ensure you have a global CSS file for styles

export default function PostDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => res.json())
      .then(setPost);
  }, [id]);

  if (!post) return <div>Loading...</div>;

return (
  <div className="max-w-3xl mx-auto px-4 py-8">
    <button
      onClick={() => router.back()}
      className="mb-6 inline-flex items-center text-blue-600 hover:underline text-sm font-medium"
    >
      ⬅ Back to Posts
    </button>

    <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
    <p className="text-gray-700 leading-relaxed text-lg">{post.body}</p>
  </div>
);

}
