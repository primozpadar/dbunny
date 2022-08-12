<script lang="ts">
  import { actions } from '../../store/actions';
  import { RowType, type TableRow } from '../../store/types';
  import Checkbox from '../form/Checkbox.svelte';
  import Input from '../form/Input.svelte';
  import Select from '../form/Select.svelte';

  export let id: string;
  export let index: number;
  export let row: TableRow;

  const input = {
    get name() {
      return row.name;
    },
    set name(value) {
      actions.editor.setRowName(id, index, value);
    },

    get type() {
      return row.type;
    },
    set type(value) {
      actions.editor.setRowType(id, index, value);
    },

    get pk() {
      return row.pk;
    },
    set pk(value) {
      actions.editor.setRowPk(id, index, value);
    },

    get nullable() {
      return row.nullable;
    },
    set nullable(value) {
      actions.editor.setRowNullable(id, index, value);
    },
  };
</script>

<div class="editor-row">
  <div class="row-1">
    <Input
      placeholder="name"
      value={input.name}
      on:change={(e) => {
        // @ts-ignore
        input.name = e.target.value;
      }}
    />
    <Select bind:value={input.type}>
      {#each Object.entries(RowType) as [key, value]}
        <option {value}>{key}</option>
      {/each}
    </Select>
  </div>

  <div class="row-2">
    <Checkbox bind:checked={input.pk} label="PK" />
    <Checkbox bind:checked={input.nullable} label="NULL" />
  </div>

  <div class="del">
    <button class="remove-btn" on:click={() => actions.editor.removeRow(id, index)}>&times;</button>
  </div>
</div>

<style lang="less" scoped>
  @rowSpacing: 12px;

  .editor-row {
    display: grid;
    gap: 8px;
    grid-template-areas:
      'row-1 del'
      'row-2 del';

    padding-bottom: @rowSpacing;
    border-bottom: 1px solid rgb(40, 40, 40);
    margin-bottom: @rowSpacing;

    &:hover > .del > .remove-btn {
      border: 1px solid rgb(215, 139, 139);
    }
  }

  .row-1 {
    grid-area: row-1;
    display: grid;
    gap: 8px;
    grid-template-columns: auto 110px;
  }

  .row-2 {
    grid-area: row-2;
    display: flex;
    gap: 8px;
  }

  .del {
    grid-area: del;
    place-self: center;
  }

  .remove-btn {
    width: 16px;
    height: 16px;
    cursor: pointer;
    border-radius: 2px;
    font-weight: bold;
    color: white;
    background: transparent;

    &:hover {
      background: rgb(177, 44, 44);
    }
  }
</style>
