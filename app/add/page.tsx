'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AddBookPage() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/books', {
      method: 'POST',
      body: JSON.stringify({ title, author }),
      headers: { 'Content-Type': 'application/json' },
    });
    router.push('/');
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">➕ Add a New Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Book
        </button>
      </form>
    </main>
  );
}
