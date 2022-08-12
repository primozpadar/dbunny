<script lang="ts">
  import { actions } from '../../store/actions';
  import type { Table } from '../../store/types';

  export let data: Table;

  function handleInput(e: Event) {
    // @ts-ignore
    const newValue = e.target.value;
    actions.editor.setTitle(data.id, newValue);
  }
</script>

<input type="text" class="title-input" placeholder="table title" value={data.title} on:input={handleInput} />
<div class="position__wrapper">
  <div class="position">
    <span class="position__label">x:</span>
    <span class="position__number">{data.position.x}</span>
    <span class="position__label">y:</span>
    <span class="position__number">{data.position.y}</span>
  </div>
</div>

<style lang="less" scoped>
  .title-input {
    font-weight: bold;
    color: white;
    background: #404247;
    font-size: 16px;
    padding: 0.4rem;
    border-radius: 0.2rem;
    margin-bottom: 0.6rem;
    outline: none;

    &:focus {
      box-shadow: 0 0 0 1px var(--purple);
    }
  }

  .position {
    font-size: 14px;

    &__wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__label {
      color: #5f6167;
    }

    &__number {
      color: #696c74;
      font-weight: bold;
      margin-right: 8px;
    }
  }
</style>
