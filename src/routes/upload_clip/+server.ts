import type { RequestHandler } from './$types';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY } from '$env/static/public';
import { createClient } from '@supabase/supabase-js';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const accessToken = formData.get('token') as string;

    if (!file || !accessToken) {
      return new Response(JSON.stringify({ error: 'file or token missing' }), { status: 400 });
    }

    const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY, {
      global: {
        fetch,
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    });

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
      return new Response(JSON.stringify({ error: 'invalid user' }), { status: 401 });
    }

    const userId = userData.user.id;
    const filePath = `${userId}/${file.name}`;

    const { data, error } = await supabase.storage
      .from('Agartha') // FIXED!!!
      .upload(filePath, file, { upsert: true });


    async function generateTemporaryUrl(bucketName: string, filePath: string, expiresInSeconds: number) {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .createSignedUrl(filePath, expiresInSeconds);

      if (error) {
        console.error('Error generating signed URL:', error.message);
        return null;
      }

      return data.signedUrl;
    }

    const tempurl = await generateTemporaryUrl('Agartha', filePath, 60 * 60); // 1 hour
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true, path: filePath, temporaryUrl: tempurl }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), { status: 500 });
  }
};
