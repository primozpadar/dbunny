<script lang="ts">
  import { actions } from '../../store/actions';
  import { newRelation } from '../../store/state';

  function handleDragLeave() {
    newRelation.update((value) => {
      value.to = null;
      return value;
    });
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
  }

  function handleDrop() {
    const { from, to } = $newRelation;

    if (from && to) {
      actions.relations.addRelation(from, to);
    }

    newRelation.set({
      from: null,
      to: null,
    });
  }

  $: style = 'display: flex;';
</script>

<div class="dropzone" on:dragleave={handleDragLeave} on:dragover={handleDragOver} on:drop={handleDrop} {style}>
  <span>create relation</span>
</div>

<style lang="less" scoped>
  .dropzone {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    background: rgba(137, 18, 222, 0.4);
    backdrop-filter: blur(2px);
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px dashed var(--purple);

    span {
      font-weight: bold;
      pointer-events: none;
    }
  }
</style>
