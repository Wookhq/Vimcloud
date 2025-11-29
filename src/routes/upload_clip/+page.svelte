<script lang="ts">
  let status = '';
  export let data: { session: any };
  const session = data.session;

  async function uploadFile(file: File) {
    if (!session?.user) return status = 'no user logged in';

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

<input type="file" on:change="{(e) => uploadFile(e.target.files[0])}" />
<p>{status}</p>
