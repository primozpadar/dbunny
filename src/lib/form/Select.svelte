<script lang="ts">
  export let value;
</script>

<select {...$$props} bind:value class="form-select">
  <slot />
</select>

<style lang="less" scoped>
  @import './styles.less';

  .form-select {
    .base-input();

    font-weight: bold;
  }
</style>
