<script lang="ts">
  export let checked: boolean = false;
  export let label: string | null = null;
</script>

<div class="wrapper">
  <input {...$$props} type="checkbox" bind:checked class="form-checkbox" />
  {#if label}
    <span class="form-checkbox__label">{label}</span>
  {/if}
</div>

<style lang="less" scoped>
  @import './styles.less';

  @size: 14px;

  .wrapper {
    display: inline-flex;
    gap: 4px;
    align-items: center;
  }

  .form-checkbox {
    .base-input();

    width: @size;
    height: @size;
    accent-color: var(--purple);

    &__label {
      font-size: 12px;
    }
  }
</style>
