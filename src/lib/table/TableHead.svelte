<script lang="ts">
  import { actions } from '../../store/actions';
  import type { Table } from '../../store/types';

  export let data: Table;

  let isMoving = false;
  let prevPosition = { x: 0, y: 0 };

  function handleMouseDown(event: MouseEvent) {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener(
      'mouseup',
      () => {
        window.removeEventListener('mousemove', handleMouseMove);
        isMoving = false;
      },
      { once: true },
    );

    prevPosition = { x: event.x, y: event.y };
    isMoving = true;
  }

  function handleMouseMove(event: MouseEvent) {
    if (isMoving) {
      const diffX = event.x - prevPosition.x;
      const diffY = event.y - prevPosition.y;

      const newX = data.position.x + diffX;
      const newY = data.position.y + diffY;

      actions.table.setPosition(data.id, { x: newX, y: newY });
      prevPosition = { x: event.x, y: event.y };
    }
  }

  $: style = `cursor: ${isMoving ? 'grabbing' : 'grab'};`;
</script>

<div class="container" {style} on:mousedown={handleMouseDown}>
  <div class="title">
    <slot />
  </div>
</div>

<style lang="less" scoped>
  .container {
    background: rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid #404247;
    padding: 0.4rem;
    user-select: none;
  }

  .title {
    font-weight: bold;
  }
</style>
