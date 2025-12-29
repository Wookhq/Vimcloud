<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";

  interface Props extends HTMLButtonAttributes {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
    size?: "sm" | "md" | "lg" | "icon";
    isLoading?: boolean;
    children?: import("svelte").Snippet;
  }

  let {
    class: className,
    variant = "primary",
    size = "md",
    isLoading = false,
    children,
    disabled,
    ...rest
  }: Props = $props();

  const variants = {
    primary: "bg-brand-primary text-white hover:bg-brand-primary/90 shadow-lg shadow-brand-primary/25",
    secondary: "bg-white/10 text-white hover:bg-white/15 border border-white/5",
    outline: "border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/10",
    ghost: "hover:bg-white/5 text-gray-300 hover:text-white",
    link: "text-brand-primary underline-offset-4 hover:underline",
  };

  const sizes = {
    sm: "h-9 px-3 text-xs",
    md: "h-11 px-6 text-sm",
    lg: "h-14 px-8 text-base",
    icon: "h-10 w-10",
  };

  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 active:scale-95 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 relative overflow-hidden";
</script>

<button
  class="{baseStyles} {variants[variant]} {sizes[size]} {className}"
  disabled={isLoading || disabled}
  {...rest}
>
  {#if isLoading}
    <div class="absolute inset-0 flex items-center justify-center bg-inherit">
      <svg class="h-5 w-5 animate-spin" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
      </svg>
    </div>
    <div class="invisible flex items-center gap-2">
      {@render children?.()}
    </div>
  {:else}
    <div class="flex items-center gap-2">
      {@render children?.()}
    </div>
  {/if}
</button>
