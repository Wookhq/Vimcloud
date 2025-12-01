<script lang="ts">
  import { browser } from '$app/environment';
  import { PUBLIC_SUPABASE_PUBLISHABLE_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
  import { createBrowserClient } from '@supabase/ssr';
  import Funny from '$lib/funny/funny.svelte';
  import { page } from '$app/stores';
  import PageTemplate from '$lib/page_template/page_template.svelte';

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
      {#if session?.user}
        <p class="text-white text-2xl mb-4">
          Done! now please paste this into vimal and continue your action. [DO NOT SHARE.]
        </p>

        <div class="relative max-w-xs mx-auto mt-4 w-[320px]">
          <div class="bg-gray-900 text-white p-2 rounded-md text-sm">
            <div class="flex justify-between items-center mb-2">
              <button class="code bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1 rounded-md" data-clipboard-target="#code">
                Copy
              </button>
            </div>
            <div class="overflow-x-auto">
              <pre id="code" class="text-gray-300 text-sm">
<code>{refreshToken}</code>
              </pre>
            </div>
          </div>
        </div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.8/clipboard.min.js"></script>
        <script>
          new ClipboardJS('.code');
        </script>

        <button
          class="relative inline-flex items-center px-6 py-3 rounded-md font-bold text-white select-none"
          on:click={signOut}
        >
          <span class="absolute inset-0 -translate-y-[2px] rounded-md bg-[#303784]"></span>
          <span class="absolute inset-0 rounded-md bg-[#5865f2]"></span>
          <span class="relative">Sign out</span>
        </button>

      {:else}
        <h1 class="text-white mb-4 text-center">
          twin you are NOT signed in 🤣🤣🤣🤣🤣🤣🤣🤣🤣
        </h1>
        <button
          class="relative inline-flex items-center px-6 py-3 rounded-md font-bold text-white select-none"
          on:click={homePage}
        >
          <span class="absolute inset-0 -translate-y-[2px] rounded-md bg-[#303784]"></span>
          <span class="absolute inset-0 rounded-md bg-[#5865f2]"></span>
          <span class="relative">Go to Home Page</span>
        </button>
      {/if}
</PageTemplate>