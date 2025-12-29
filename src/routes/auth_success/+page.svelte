

<script lang="ts">
  import { browser } from '$app/environment';
  import { PUBLIC_SUPABASE_PUBLISHABLE_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
  import { createBrowserClient } from '@supabase/ssr';
  import Funny from '$lib/funny/funny.svelte';
  import { page } from '$app/stores';
  import PageTemplate from '$lib/page_template/page_template.svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';

  // reactive state for supabase client & session
  let supabase: any = undefined;
  if (browser) {
    supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY, {
      global: { fetch }
    });
  }

  // derive session (if any) from page data
  let session = $page.data.session;

  // optionally get refreshToken if session exists
  let refreshToken = session?.refresh_token;

  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    location.reload();
  }

  const homePage = () => {
    location.href = '/';
  };
</script>

<PageTemplate>
  <Card class="flex flex-col items-center text-center space-y-6 max-w-lg">
      {#if session?.user}
        <div class="space-y-4 w-full">
          <div class="h-16 w-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
             <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
          
          <h2 class="text-2xl font-bold text-white">Authentication Successful</h2>
          
          <p class="text-gray-300">
            Paste this code into Vimal to continue. 
            <span class="block text-red-400 text-sm font-bold mt-1 uppercase tracking-wider">Do not share this token</span>
          </p>

          <div class="relative w-full text-left mt-4 group">
            <div class="bg-black/50 border border-white/10 rounded-xl p-4 font-mono text-sm text-gray-400 break-all relative group-hover:border-brand-primary/50 transition-colors">
              {refreshToken}
              
              <button class="code absolute top-2 right-2 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors" data-clipboard-text={refreshToken}>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
              </button>
            </div>
          </div>
        </div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.8/clipboard.min.js"></script>
        <script>
          new ClipboardJS('.code');
        </script>

        <Button variant="outline" class="w-full" onclick={signOut}>
          Sign out
        </Button>

      {:else}
        <div class="space-y-4">
             <div class="text-6xl">🤣🤣</div>
             <h1 class="text-xl font-bold text-white">
              Twin you are <span class="text-red-500">NOT</span> signed in
            </h1>
        </div>
        
        <Button variant="primary" class="w-full" onclick={homePage}>
          Go to Home Page
        </Button>
      {/if}
  </Card>
</PageTemplate>