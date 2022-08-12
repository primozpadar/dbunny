<button class="toolbar-button" on:click>
  <slot />
</button>

<style lang="less" scoped>
  .toolbar-button {
    padding: 0.4rem 0.8rem;
    border-radius: 4px;
    color: var(--purple);
    font-weight: bold;
    font-size: 0.9rem;
    background: transparent;
    transition: all 0.4s ease;
    cursor: pointer;

    &:hover {
      background: #2a2b30;
    }
  }
</style>
