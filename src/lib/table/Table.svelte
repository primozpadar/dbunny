<script lang="ts">
  import { actions } from '../../store/actions';
  import { newRelation } from '../../store/state';
  import type { Table } from '../../store/types';
  import TableContent from './TableContent.svelte';
  import TableDropzone from './TableDropzone.svelte';
  import TableHead from './TableHead.svelte';

  export let data: Table;

  let boxRef: HTMLDivElement;
  function handleSelect() {
    actions.table.setSelected({ id: data.id, ref: boxRef });
  }

  function handleDragEnter() {
    newRelation.update((value) => {
      value.to = data.id;
      return value;
    });
  }

  $: showDropzone = $newRelation.to === data.id && $newRelation.from !== data.id;

  $: style = `
    left: ${data.position.x}px;
    top: ${data.position.y}px;
  `;
</script>

<div
  class="box"
  bind:this={boxRef}
  on:mousedown={handleSelect}
  on:dragenter={handleDragEnter}
  data-table-id={data.id}
  {style}
>
  <div class="box__inner">
    <TableHead {data}>
      {data.title}
    </TableHead>
    <TableContent rows={data.rows} tableId={data.id} />
    {#if showDropzone}
      <TableDropzone />
    {/if}
  </div>
</div>

<style lang="less" scoped>
  .box {
    position: absolute;
    background: #26282c;
    width: 300px;
    border: 1px solid #404247;
    border-radius: 4px;

    &__inner {
      position: relative;
    }

    &:hover {
      border: 1px solid #60636a;
    }
  }
</style>
