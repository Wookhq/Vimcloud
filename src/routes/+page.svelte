<script lang="ts">
  import { onMount } from 'svelte';
  import { PUBLIC_SUPABASE_PUBLISHABLE_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
  import { createBrowserClient } from '@supabase/ssr';
  import Funny from '$lib/funny/funny.svelte';
  import PageTemplate from '$lib/page_template/page_template.svelte';

  export let data: { session: any };

  let supabase: ReturnType<typeof createBrowserClient> | null = null;
  let session = data.session;

  onMount(() => {
    supabase = createBrowserClient(
      PUBLIC_SUPABASE_URL,
      PUBLIC_SUPABASE_PUBLISHABLE_KEY,
      { global: { fetch } }
    );
  });

  const signInDiscord = async () => {
    if (!supabase) return;
    await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: { redirectTo: `${location.origin}/auth_success` }
    });
  };

  const signOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    location.reload();
  };

  const getAccessToken = () => {
    location.href = '/auth_success';
  };
</script>

<PageTemplate>
      {#if session?.user}
        <p class="text-white text-2xl mb-4 font-mono">
          Signed in as {session.user.email ?? session.user.id}
        </p>

        <button
          class="relative inline-flex items-center px-6 py-3 rounded-md font-bold text-white select-none"
          on:click={signOut}
        >
          <span class="absolute inset-0 -translate-y-[2px] rounded-md bg-[#303784]"></span>
          <span class="absolute inset-0 rounded-md bg-[#5865f2]"></span>
          <span class="relative">Sign out</span>
        </button>

        <button
          class="relative inline-flex items-center px-6 py-3 mt-3 rounded-md font-bold text-white select-none"
          on:click={getAccessToken}
        >
          <span class="absolute inset-0 -translate-y-[2px] rounded-md bg-[#303784]"></span>
          <span class="absolute inset-0 rounded-md bg-[#5865f2]"></span>
          <span class="relative">Get Access Token</span>
        </button>

      {:else}

        <p class="text-white text-2xl mb-4 font-mono">Create a Vimal Cloud account</p>

        <button
          class="relative inline-flex items-center px-6 py-3 rounded-md font-bold text-white select-none"
          on:click={signInDiscord}
        >
          <span class="absolute inset-0 -translate-y-[2px] rounded-md bg-[#303784]"></span>
          <span class="absolute inset-0 rounded-md bg-[#5865f2]"></span>

          <span class="relative flex items-center gap-3">
              <svg width="19" xmlns="http://www.w3.org/2000/svg" height="19" id="screenshot-8bfd0f72-8396-8073-8007-2eec739d000a" viewBox="613 1038 19 19" style="-webkit-print-color-adjust::exact" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1">
                <g id="shape-8bfd0f72-8396-8073-8007-2eec739d000a" style="fill:#000000" class="h-6 w-6 mr-2" width="800" height="800" preserveAspectRatio="xMidYMid" rx="0" ry="0">
                  <g id="shape-8bfd0f72-8396-8073-8007-2eec73a02329" style="display:none">
                    <g class="fills" id="fills-8bfd0f72-8396-8073-8007-2eec73a02329">
                      <rect rx="0" ry="0" x="613.0000000000001" y="1038" transform="matrix(1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000)" width="19" height="19" fill="none" style="fill:none">
                      </rect>
                    </g>
                  </g>
                  <g id="shape-8bfd0f72-8396-8073-8007-2eec73a2b43e">
                    <g class="fills" id="fills-8bfd0f72-8396-8073-8007-2eec73a2b43e">
                      <path d="M629.0948486328125,1041.3470458984375C627.8649291992188,1040.7716064453125,626.5498657226562,1040.353271484375,625.1749267578125,1040.115234375C625.006103515625,1040.4205322265625,624.808837890625,1040.8310546875,624.6727905273438,1041.15771484375C623.2113037109375,1040.93798828125,621.7632446289062,1040.93798828125,620.3285522460938,1041.15771484375C620.1925659179688,1040.8310546875,619.9909057617188,1040.4205322265625,619.8204956054688,1040.115234375C618.444091796875,1040.353271484375,617.1275634765625,1040.773193359375,615.8976440429688,1041.35009765625C613.4169311523438,1045.0987548828125,612.7444458007812,1048.75439453125,613.0806884765625,1052.3580322265625C614.7260131835938,1053.5867919921875,616.320556640625,1054.3331298828125,617.88818359375,1054.821533203125C618.2752685546875,1054.288818359375,618.6204833984375,1053.72265625,618.9178466796875,1053.1258544921875C618.3514404296875,1052.91064453125,617.8090209960938,1052.64501953125,617.2964477539062,1052.336669921875C617.4324340820312,1052.2359619140625,617.5654296875,1052.130615234375,617.6939086914062,1052.022216796875C620.8202514648438,1053.4844970703125,624.217041015625,1053.4844970703125,627.3059692382812,1052.022216796875C627.43603515625,1052.130615234375,627.5690307617188,1052.2359619140625,627.7034912109375,1052.336669921875C627.1893920898438,1052.646484375,626.6454467773438,1052.912109375,626.0791015625,1053.1273193359375C626.37646484375,1053.72265625,626.72021484375,1054.2904052734375,627.1087646484375,1054.8231201171875C628.6778564453125,1054.334716796875,630.2738647460938,1053.5882568359375,631.9192504882812,1052.3580322265625C632.3137817382812,1048.180419921875,631.2452392578125,1044.5584716796875,629.0948486328125,1041.3470458984375ZM619.3438110351562,1050.141845703125C618.4052734375,1050.141845703125,617.6356201171875,1049.265625,617.6356201171875,1048.19873046875C617.6356201171875,1047.1318359375,618.3888549804688,1046.254150390625,619.3438110351562,1046.254150390625C620.2987060546875,1046.254150390625,621.068359375,1047.13037109375,621.0518798828125,1048.19873046875C621.0533447265625,1049.265625,620.2987060546875,1050.141845703125,619.3438110351562,1050.141845703125ZM625.6561889648438,1050.141845703125C624.7177124023438,1050.141845703125,623.9480590820312,1049.265625,623.9480590820312,1048.19873046875C623.9480590820312,1047.1318359375,624.7012329101562,1046.254150390625,625.6561889648438,1046.254150390625C626.611083984375,1046.254150390625,627.3807373046875,1047.13037109375,627.3642578125,1048.19873046875C627.3642578125,1049.265625,626.611083984375,1050.141845703125,625.6561889648438,1050.141845703125Z" style="fill:#ffffff;fill-opacity:1">
                      </path>
                    </g>
                  </g>
                </g>
              </svg>            
            <span>Login / Create using Discord</span>
          </span>
        </button>

      {/if}
</PageTemplate>