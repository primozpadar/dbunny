<script lang="ts">
  export let boundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };

  $: style = `
    top: ${boundingBox?.y}px;
    left: ${boundingBox?.x}px;
    width: ${boundingBox?.width}px;
    height: ${boundingBox?.height}px;
  `;
</script>

<div class="table-highlight" {style}>
  <slot />
</div>

<style lang="less" scoped>
  .table-highlight {
    position: absolute;
    border: 1px solid var(--purple);
    border-radius: 4px;
    pointer-events: none;
  }
</style>
