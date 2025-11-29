<script lang="ts">
    import { browser } from '$app/environment';
    import { PUBLIC_SUPABASE_PUBLISHABLE_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
    import { createBrowserClient } from '@supabase/ssr';


  export let data: { session: any };

  let supabase: any = undefined;
  if (browser) {
    supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY, {
      global: { fetch }
    });
  }

  const session = data.session;



  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    location.reload();
  }

</script>

{#if session?.user}
  <p>Done! now please paste this into vimal and continue your action.</p>
  <p>{session.access_token}</p>
  <button on:click={signOut}>Sign out</button>
{:else}
    <h1>twin you are NOT signed in 🤣🤣🤣🤣🤣🤣🤣🤣🤣</h1>
{/if}