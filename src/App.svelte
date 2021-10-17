<script>
  import Canvas from './lib/Canvas.svelte'
  import SettingsPanel from './lib/SettingsPanel.svelte'
</script>

<main>
  <Canvas />
  <SettingsPanel />
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  :global(body) {
    margin: 0;
  }
</style>
