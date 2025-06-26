'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAdminPosts,
  addAdminPost,
  updateAdminPost,
  deleteAdminPost,
} from '../../redux/adminPostsSlice';
import '../globals.css'; // Ensure you have a global CSS file for styles';
export default function Admin() {
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.adminPosts);
  const [form, setForm] = useState({ title: '', body: '', id: null });

  useEffect(() => { dispatch(fetchAdminPosts()); }, [dispatch]);

  const submit = () => {
    if (form.id) dispatch(updateAdminPost(form));
    else dispatch(addAdminPost(form));
    setForm({ title: '', body: '', id: null });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">🛠️ Admin Blog Manager</h2>

      {/* Form Section */}
      <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 mb-8">
        <input
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Body"
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
        />
        <button
          onClick={submit}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {form.id ? 'Update Post' : 'Create Post'}
        </button>
      </div>

      {/* Posts List */}
      <div className="space-y-6">
        {posts.map((p) => (
          <div
            key={p.id}
            className="bg-white shadow-sm border border-gray-200 rounded-lg p-5"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{p.title}</h3>
            <p className="text-gray-600 mb-4">{p.body}</p>
            <div className="space-x-3">
              <button
                onClick={() => setForm(p)}
                className="text-yellow-600 hover:underline font-medium"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => dispatch(deleteAdminPost(p.id))}
                className="text-red-600 hover:underline font-medium"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

}
