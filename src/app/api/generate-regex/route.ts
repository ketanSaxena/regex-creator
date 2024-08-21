import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongo';
import { Collection, Document } from 'mongodb';
import axios from 'axios';

interface RegexDocument extends Document {
  description: string;
  regex: string;
}

export async function POST(request: Request) {
  const { description } = await request.json();

  if (!description) {
    return NextResponse.json({ error: 'Description is required.' }, { status: 400 });
  }

  try {
    const db = await connectToDatabase();
    const collection: Collection<RegexDocument> = db.collection('regexes');

    // Check if the regex already exists in the database
    const regexPattern = new RegExp(description, 'i');
    const existing = await collection.findOne({ description: { $regex: regexPattern } });

    if (existing) {
      return NextResponse.json({ description, generated_regex: existing.regex });
    }

    // If not found in MongoDB, call the ChatGPT API to generate a new regex
    const generatedRegex = await generateRegexUsingChatGPT(description);

    if (!generatedRegex) {
      return NextResponse.json({ error: 'Failed to generate regex via ChatGPT.' }, { status: 500 });
    }

    // Store the generated regex in MongoDB
    await collection.insertOne({ description, regex: generatedRegex });

    return NextResponse.json({ description, generated_regex: generatedRegex });
  } catch (error) {
    console.error('Error handling request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Function to call the ChatGPT API to generate a regex
async function generateRegexUsingChatGPT(description: string): Promise<string | null> {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a regex generator.',
          },
          {
            role: 'user',
            content: `Generate a JS regex pattern for the following validation: ${description}`,
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const regex = response.data.choices[0]?.message?.content?.trim();
    return regex ? regex : null;
  } catch (error) {
    console.error('Error calling ChatGPT API:', error);
    return null;
  }
}
