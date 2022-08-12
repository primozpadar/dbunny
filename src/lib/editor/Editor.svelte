<script lang="ts">
  import { actions } from '../../store/actions';
  import { getters } from '../../store/getters';
  import EditorHead from './EditorHead.svelte';
  import EditorRow from './EditorRow.svelte';

  let selectedTable = getters.table.selectedTable;
</script>

<div class="editor">
  {#if $selectedTable}
    <EditorHead data={$selectedTable} />
    <div class="divider" />
    {#each $selectedTable.rows as row, index ([index, row.name])}
      <EditorRow id={$selectedTable.id} {index} {row} />
    {/each}
    <button class="add-row-btn" on:click={() => actions.editor.addRow($selectedTable.id)}>add row</button>
  {/if}
</div>

<style lang="less" scoped>
  @offset: 0.6rem;
  @toolbarWidth: 280px;

  .editor {
    position: absolute;
    top: calc(var(--toolbar-height) + (2 * @offset));
    bottom: @offset;
    right: @offset;
    width: @toolbarWidth;
    border-radius: 8px;
    background: #1e1f23;
    border: 1px solid #18191d;
    box-shadow: 0 4px 2rem rgba(0, 0, 0, 0.1);
    padding: 0.6rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
  }

  .divider {
    margin: 0.6rem 0;
    height: 0;
    border-bottom: 1px solid #404247;
  }

  .add-row-btn {
    cursor: pointer;
    background: #404247;
    color: white;
    padding: 0.4rem 0.8rem;
    border-radius: 4px;
    font-weight: bold;

    &:hover {
      background: #484b50;
    }
  }
</style>
