<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import { PUBLIC_SUPABASE_PUBLISHABLE_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
  import { createBrowserClient } from '@supabase/ssr';

  export let data: { session: any };

  let supabase: any;

  if (browser) {
    supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY, {
      global: { fetch }
    });
  }

  let session = data.session;

  async function signInDiscord() {
    if (!supabase) {
      console.error('supabase not initialized');
      return;
    }

    await supbase.auth.signInWithOAuth({
      provider: 'discord',
      options: { redirectTo: location.origin + '/auth_success' }
    });
  }

  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    location.reload();
  }

  onMount(() => {
    if (session?.user) {
      window.location.href = '/auth_success';
    }
  });
</script>

{#if session?.user}
  <h2>Signed in</h2>
  <p>Id: {session.user.id}</p>
  <p>Email: {session.user.email}</p>
  <p>User name: {session.user.user_metadata.name}</p>
  <button on:click={signOut}>Sign out</button>

  <p>DEBUG INFO (don’t share pls)</p>
  <p>{session.access_token}</p>
{:else}
  <h1>Sign in</h1>
  <button on:click={signInDiscord}>Sign in with Discord</button>
{/if}
