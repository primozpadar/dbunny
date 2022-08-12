<script lang="ts">
  import { getters } from '../../store/getters';

  import type { TableRow, UUID } from '../../store/types';
  import Tag from '../form/Tag.svelte';

  export let tableId: UUID;
  export let rows: TableRow[];

  const relations = getters.relations.getTableRelations(tableId);
</script>

<table class="table-content">
  <tbody>
    {#each rows as row}
      <tr>
        <td>
          <div class="name">{row.name}</div>
        </td>
        <td>
          <div class="type">{row.type}</div>
        </td>
        <td>
          <div class="tags">
            {#if row.pk}
              <Tag color="yellow">PK</Tag>
            {/if}
            {#if row.nullable}
              <Tag color="purple">NULL</Tag>
            {/if}
          </div>
        </td>
      </tr>
    {/each}
    {#if $relations.length > 0}
      <tr class="relations-divider" />
    {/if}
    {#each $relations as relationRow}
      <tr>
        <td>
          <div class="name">{relationRow.name}</div>
        </td>
        <td>
          <div class="type">{relationRow.type}</div>
        </td>
        <td>
          <div class="tags">
            <Tag color="blue">FK</Tag>
          </div>
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style lang="less" scoped>
  .table-content {
    width: 100%;
    border-collapse: collapse;

    td {
      padding: 0.2rem 0.4rem;
      font-size: 14px;
    }

    tr:not(:last-child) > td {
      border-bottom: 1px solid #404247;
    }

    .name {
      max-width: 100px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .type {
      font-weight: bold;
      font-size: 12px;
    }

    .tags {
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }

    .relations-divider {
      border-bottom: 1px solid #2b6cb0;
    }
  }
</style>
