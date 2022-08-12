<script lang="ts">
  import { getters } from '../../store/getters';
  import SelectorRelation from './SelectorRelation.svelte';
  import TableHighlight from './TableHighlight.svelte';

  let selectedTable = getters.table.selectedTable;
  let boundingBox = getters.table.selectedTableBoundingBox;
</script>

{#if $boundingBox}
  <TableHighlight boundingBox={$boundingBox}>
    <div class="selector-box__inner">
      <SelectorRelation tableId={$selectedTable.id} position="top" />
      <SelectorRelation tableId={$selectedTable.id} position="left" />
      <SelectorRelation tableId={$selectedTable.id} position="bottom" />
      <SelectorRelation tableId={$selectedTable.id} position="right" />
    </div>
  </TableHighlight>
{/if}

<style lang="less" scoped>
  .selector-box {
    &__inner {
      position: relative;
      width: 100%;
      height: 100%;
    }
  }
</style>
