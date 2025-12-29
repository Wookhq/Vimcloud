<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	
	const dispatch = createEventDispatcher();
	let file: File | null = null;
	let dragging = false;

	function handleDrop(e: DragEvent) {
		e.preventDefault();
		dragging = false;
		const dropped = e.dataTransfer?.files?.[0];
		if (dropped) {
			file = dropped;
			dispatch('fileSelected', file);
		}
	}

	function handleSelect(e: Event) {
		const target = e.target as HTMLInputElement; // Fixed: Cast to HTMLInputElement
		file = target.files?.[0] ?? null;
		if (file) dispatch('fileSelected', file);
	}
</script>

<div
	role="button"
	tabindex="0"
	class="relative w-full aspect-video md:aspect-[2/1] rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-4 group overflow-hidden
		{dragging 
			? 'border-brand-primary bg-brand-primary/10 scale-[1.01] shadow-[0_0_30px_rgba(99,102,241,0.2)]' 
			: 'border-white/10 hover:border-white/30 hover:bg-white/5'}"
	on:dragover|preventDefault={() => (dragging = true)}
	on:dragleave={() => (dragging = false)}
	on:drop={handleDrop}
	on:click={() => document.getElementById('fileInput')?.click()}
	on:keydown={(e) => e.key === 'Enter' && document.getElementById('fileInput')?.click()}
>
	<!-- Decorative grid background -->
	<div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)] pointer-events-none"></div>

	{#if file}
		<div class="relative z-10 flex flex-col items-center animate-fade-in text-brand-primary">
			<svg class="w-16 h-16 mb-2 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
			<p class="font-bold text-lg text-white">{file.name}</p>
			<p class="text-xs text-gray-400 mt-1 uppercase tracking-wider">Ready to upload</p>
		</div>
	{:else}
		<div class="relative z-10 flex flex-col items-center text-gray-400 group-hover:text-white transition-colors duration-300">
			<div class="w-16 h-16 mb-4 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-primary/20 group-hover:scale-110 transition-all duration-300">
				<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
			</div>
			<p class="text-lg font-medium">Click to upload or drag & drop</p>
			<p class="text-sm opacity-50 mt-1">MP4, WEBM, MOV (Max 50MB)</p>
		</div>
	{/if}

	<input
		id="fileInput"
		type="file"
		class="hidden"
		on:change={handleSelect}
	/>
</div>
