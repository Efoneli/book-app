'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Book = {
  id: string;
  title: string;
  author: string;
};

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch('/api/books')
      .then(res => res.json())
      .then(data => setBooks(data));
  }, []);

  const handleDelete = async (id: string) => {
    await fetch(`/api/books/${id}`, { method: 'DELETE' });
    setBooks(books.filter(book => book.id !== id));
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">📚 Book List</h1>
      <Link href="/add" className="mb-6 inline-block text-blue-600 underline">
        ➕ Add a Book
      </Link>
      <ul className="space-y-4">
        {books.map(book => (
          <li key={book.id} className="border p-4 rounded shadow">
            <div className="font-semibold">{book.title}</div>
            <div className="text-sm text-gray-600">by {book.author}</div>
            <div className="mt-2 space-x-2">
              <Link href={`/edit/${book.id}`} className="text-blue-500 underline">
                Edit
              </Link>
              <button
                onClick={() => handleDelete(book.id)}
                className="text-red-500 underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
