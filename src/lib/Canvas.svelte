<script lang="ts">
  import { actions } from '../store/actions';
  import { tables, relations } from '../store/state';
  import NewRelation from './relation/NewRelation.svelte';
  import Relation from './relation/Relation.svelte';
  import Table from './table/Table.svelte';

  function handleTableUnselect(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      actions.table.setSelected(null);
    }
  }
</script>

<div class="canvas-wrapper">
  <div class="canvas" on:click={handleTableUnselect}>
    {#each $relations as relation}
      <Relation data={relation} />
    {/each}
    <NewRelation />
    {#each $tables as table}
      <Table data={table} />
    {/each}
  </div>
</div>

<style lang="less" scoped>
  .canvas-wrapper {
    position: absolute;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }

  .canvas {
    position: relative;
    height: 100vh;
    width: 100vw;

    /* GRID */
    // background-size: 50px 50px;
    // background-image: linear-gradient(to right, #2d2f34 1px, transparent 2px),
    //   linear-gradient(to bottom, #2d2f34 1px, transparent 2px);

    /* DOTS */
    background-size: 40px 40px;
    background-image: radial-gradient(circle, #494c54 1px, transparent 1px);
  }
</style>
