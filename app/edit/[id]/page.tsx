'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Book } from '../../components/types'

export default function EditBookPage() {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    fetch('/api/books')
      .then(res => res.json())
      .then(data => {
        const book = data.find((b: Book) => b.id === id);
        if (book) {
          setTitle(book.title);
          setAuthor(book.author);
        }
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/books/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, author }),
      headers: { 'Content-Type': 'application/json' },
    });
    router.push('/');
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">✏️ Edit Book</h1>
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
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </main>
  );
}
