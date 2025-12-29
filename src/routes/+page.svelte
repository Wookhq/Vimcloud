<script lang="ts">
  import { onMount } from 'svelte';
  import { PUBLIC_SUPABASE_PUBLISHABLE_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
  import { createBrowserClient } from '@supabase/ssr';
  import PageTemplate from '$lib/page_template/page_template.svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';

  export let data: { session: any };

  let supabase: ReturnType<typeof createBrowserClient> | null = null;
  let session = data.session;
  let isLoading = false;

  onMount(() => {
    supabase = createBrowserClient(
      PUBLIC_SUPABASE_URL,
      PUBLIC_SUPABASE_PUBLISHABLE_KEY,
      { global: { fetch } }
    );
  });

  const signInDiscord = async () => {
    if (!supabase) return;
    isLoading = true;
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'discord',
        options: { redirectTo: `${location.origin}/auth_success` }
      });
    } catch (e) {
      console.error(e);
      isLoading = false;
    }
  };

  const signOut = async () => {
    if (!supabase) return;
    isLoading = true;
    await supabase.auth.signOut();
    location.reload();
  };

  const getAccessToken = () => {
    location.href = '/auth_success';
  };
</script>

<PageTemplate>
  <Card class="flex flex-col items-center text-center space-y-6">
    {#if session?.user}
      <div class="space-y-2">
        <div class="h-20 w-20 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary mx-auto flex items-center justify-center text-3xl font-bold">
          {session.user.email?.[0].toUpperCase() ?? 'U'}
        </div>
        <div>
           <p class="text-sm text-gray-400 font-medium uppercase tracking-wider">Welcome back</p>
           <p class="text-white text-xl font-bold truncate max-w-[250px] mx-auto">
            {session.user.email ?? 'User'}
          </p>
        </div>
      </div>

      <div class="w-full space-y-3 pt-4">
        <Button variant="outline" class="w-full" onclick={signOut} {isLoading}>
          Sign out
        </Button>
        <Button variant="secondary" class="w-full" onclick={getAccessToken}>
          Get Access Token
        </Button>
      </div>

    {:else}
      <div class="space-y-2 pb-4">
        <h1 class="text-3xl font-bold text-white tracking-tight">
          Welcome to <span class="text-gradient">Vimcloud</span>
        </h1>
        <p class="text-gray-400">
          Sign in to manage your clips and share them with the world.
        </p>
      </div>

      <Button variant="primary" size="lg" class="w-full group" onclick={signInDiscord} {isLoading}>
        <svg class="w-5 h-5 mr-2 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
           <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
        Continue with Discord
      </Button>
    {/if}
  </Card>
</PageTemplate>