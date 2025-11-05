import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, revenue, pain } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Option 1: ConvertKit Integration
    const convertkitApiKey = process.env.CONVERTKIT_API_KEY;
    const convertkitFormId = process.env.CONVERTKIT_FORM_ID;

    if (convertkitApiKey && convertkitFormId) {
      const response = await fetch(
        `https://api.convertkit.com/v3/forms/${convertkitFormId}/subscribe`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            api_key: convertkitApiKey,
            email,
            fields: {
              revenue,
              pain_point: pain,
              signup_date: new Date().toISOString(),
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error('ConvertKit subscription failed');
      }
    }

    // Option 2: Log to console for now (development)
    console.log('New signup:', { email, revenue, pain, timestamp: new Date().toISOString() });

    // Option 3: Save to database (future)
    // await db.subscribers.create({ email, revenue, pain });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}
