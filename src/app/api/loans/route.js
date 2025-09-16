import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'loans.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const loans = JSON.parse(fileContents);
    
    return NextResponse.json(loans);
  } catch (error) {
    console.error('Error reading loans data:', error);
    return NextResponse.json(
      { error: 'Failed to load loans data' },
      { status: 500 }
    );
  }
}