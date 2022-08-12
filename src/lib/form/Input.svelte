<script lang="ts">
  export let value;
</script>

<input {...$$props} on:change bind:value class="form-input" />

<style lang="less" scoped>
  @import './styles.less';

  .form-input {
    .base-input();

    padding: 2px 4px;
  }
</style>
