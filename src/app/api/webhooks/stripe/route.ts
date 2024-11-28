export async function POST(request: Request) {
  try {
    const text = await request.text();
    console.log('payload text from stripe', text);
    console.log('request.body from stripe', request.body);
    // Process the webhook payload
  } catch (error) {
    return new Response(`Webhook error: ${error}`, {
      status: 400,
    });
  }
  return new Response('Success!', {
    status: 200,
  });
}
