import { NextResponse } from 'next/server';
import { books } from '@/lib/data';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { title, author } = await req.json();
  const book = books.find((b) => b.id === params.id);
  if (book) {
    book.title = title;
    book.author = author;
    return NextResponse.json(book);
  }
  return NextResponse.json({ error: 'Book not found' }, { status: 404 });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const index = books.findIndex((b) => b.id === params.id);
  if (index !== -1) {
    books.splice(index, 1);
    return NextResponse.json({ message: 'Book deleted' });
  }
  return NextResponse.json({ error: 'Book not found' }, { status: 404 });
}
