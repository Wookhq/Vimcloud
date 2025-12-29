<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: import("svelte").Snippet;
    hoverEffect?: boolean;
    compact?: boolean;
  }

  let {
    class: className,
    children,
    hoverEffect = false,
    compact = false,
    ...rest
  }: Props = $props();

  const hoverStyles = hoverEffect 
    ? "hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-brand-primary/5 hover:-translate-y-0.5 transition-all duration-300" 
    : "";
    
  const padding = compact ? "p-4" : "p-6 md:p-8";
</script>

<div
  class="glass-panel rounded-2xl w-full {padding} {hoverStyles} {className}"
  {...rest}
>
  {@render children?.()}
</div>
