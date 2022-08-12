<script lang="ts">
  import { actions } from '../../store/actions';
  import ToolbarButton from './ToolbarButton.svelte';
</script>

<div class="toolbar">
  <ToolbarButton on:click={actions.table.createTable}>Add table</ToolbarButton>
</div>

<style lang="less" scoped>
  @offset: 0.6rem;

  .toolbar {
    position: absolute;
    top: @offset;
    left: @offset;
    right: @offset;
    height: var(--toolbar-height);
    border-radius: 8px;
    background: #1e1f23;
    border: 1px solid #18191d;
    box-shadow: 0 4px 2rem rgba(0, 0, 0, 0.1);
    padding: 0.6rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
</style>
