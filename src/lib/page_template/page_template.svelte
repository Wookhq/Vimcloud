<script lang="ts">
    import Funny from "$lib/funny/funny.svelte";
</script>


<div class="bg-[url('/kivotos.jpg')] bg-cover bg-center h-screen w-full flex items-center justify-center">
  <img src="/Vimal.svg" alt="Vimal Cloud Logo" class="absolute top-8 left-8 w-32 h-auto" />

  <div class="relative w-full h-screen flex items-center justify-center">
    <div class="w-[426px] h-[190px] flex flex-col items-center justify-center bg-opacity-75">

      <img src="/Vimal_cloud.svg" alt="Vimal Cloud Logo" class="mb-4 w-100 h-auto" />

        <slot></slot>

        <div class="mb-10 flex"><Funny/></div>
        </div>
    </div>
</div>
