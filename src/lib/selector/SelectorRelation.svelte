<script lang="ts">
  import { newRelation } from '../../store/state';

  export let position: 'top' | 'left' | 'bottom' | 'right';
  export let tableId: string;

  function handleDragStart(e: DragEvent) {
    newRelation.set({
      from: tableId,
      to: null,
    });

    window.addEventListener(
      'dragend',
      () => {
        newRelation.set({ from: null, to: null });
      },
      { once: true },
    );
  }

  $: style = `
    top: ${position === 'top' ? 100 : position === 'bottom' ? 0 : 50}%;
    left: ${position === 'right' ? 100 : position === 'left' ? 0 : 50}%;
  `;
</script>

<div class="trigger-box" {style}>
  <div class="circle" on:dragstart={handleDragStart} draggable={true} />
</div>

<style lang="less" scoped>
  @size: 14px;
  @triggerSize: 30px;

  .trigger-box {
    width: @triggerSize;
    height: @triggerSize;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    transform: translate(-50%, -50%);
    user-select: none;
    pointer-events: initial;

    .circle {
      display: none;
      width: @size;
      height: @size;
      border-radius: 100%;
      background: var(--purple);
      cursor: pointer;

      &:hover {
        filter: brightness(1.2);
      }
    }

    &:hover > * {
      display: block;
    }
  }
</style>
