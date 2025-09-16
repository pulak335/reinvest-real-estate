import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Read the properties.json file from the public directory
    const filePath = path.join(process.cwd(), 'public', 'data', 'properties.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const properties = JSON.parse(fileContents);
    
    return NextResponse.json(properties);
  } catch (error) {
    console.error('Error reading properties file:', error);
    return NextResponse.json(
      { error: 'Failed to load properties' },
      { status: 500 }
    );
  }
}