<script lang="ts">
  import PageTemplate from "$lib/page_template/page_template.svelte";
  import Upload from "$lib/upload/upload.svelte";
  import Card from "$lib/components/ui/Card.svelte";

  let status = '';
  export let data: { session: any };
  const session = data.session;

  async function uploadFile(file: File) {
    if (!session?.user) return status = 'no user logged in';

    status = 'uploading...';

    const formData = new FormData();
    formData.append('file', file);
    formData.append('token', session.access_token);

    const res = await fetch('/upload_clip', {
      method: 'POST',
      body: formData
    });

    const result = await res.json();
    status = result.success ? `upload success: ${result.path}, temporary URL: ${result.temporaryUrl}` : `upload failed: ${result.error}`;
  }
</script>

<PageTemplate>
  <Card class="max-w-xl mx-auto text-center space-y-6">
    <div class="space-y-2">
      <h1 class="text-2xl font-bold text-white">Upload Clip</h1>
      <p class="text-gray-400 text-sm">Drag and drop your clip to share it.</p>
    </div>
    
    <Upload on:fileSelected="{(e) => uploadFile(e.detail)}" />
    
    {#if status}
      <div class="p-3 rounded-lg bg-white/5 border border-white/10 text-sm animate-fade-in font-mono break-all text-left">
        <span class="text-brand-primary font-bold mr-2">Status:</span>
        <span class="text-gray-300">{status}</span>
      </div>
    {/if}
  </Card>
</PageTemplate>