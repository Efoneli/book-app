import { NextResponse } from 'next/server';
import { books } from '@/lib/data';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  return NextResponse.json(books);
}

export async function POST(req: Request) {
  const { title, author } = await req.json();
  const newBook = { id: uuidv4(), title, author };
  books.push(newBook);
  return NextResponse.json(newBook, { status: 201 });
}
