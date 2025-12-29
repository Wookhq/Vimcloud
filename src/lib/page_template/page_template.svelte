<script lang="ts">
  import Funny from "$lib/funny/funny.svelte";
</script>

<div class="min-h-screen w-full relative overflow-hidden bg-bg-deep flex items-center justify-center p-4">
  <!-- Animated Background Elements -->
  <div class="fixed inset-0 z-0 opacity-40 pointer-events-none">
    <div class="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-primary/20 blur-[100px] animate-fade-in"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-brand-secondary/20 blur-[100px] animate-fade-in" style="animation-delay: 0.2s"></div>
  </div>

  <!-- Content Wrapper -->
  <div class="relative z-10 w-full max-w-md mx-auto flex flex-col items-center">
    
    <!-- Logo Area -->
    <div class="mb-12 animate-slide-up">
       <img src="/Vimal_cloud.svg" alt="Vimal Cloud Logo" class="h-16 w-auto drop-shadow-2xl" />
    </div>

    <!-- Main Slot -->
    <div class="w-full animate-slide-up" style="animation-delay: 0.1s">
      <slot></slot>
    </div>

    <!-- Footer / Funny -->
    <div class="mt-12 opacity-50 hover:opacity-100 transition-opacity duration-300">
      <Funny/>
    </div>

  </div>
</div>
