<script lang="ts">
  import { newRelation } from '../../store/state';
  import type { Position } from '../../store/types';

  let startPos: Position | null = null;
  let endPos: Position | null = null;

  newRelation.subscribe((value) => {
    let fromBox: DOMRect;
    if (value.from) {
      try {
        fromBox = document.querySelector(`div[data-table-id=${value.from}]`)?.getBoundingClientRect();
      } catch (e) {
        console.error(e);
      }

      if (!fromBox) {
        return;
      }

      startPos = { x: fromBox.x + fromBox.width / 2, y: fromBox.y + fromBox.height / 2 };

      function handleDrag(e: DragEvent) {
        // prevent dragend draw
        if (e.clientX !== 0 && e.clientY !== 0) {
          endPos = { x: e.clientX, y: e.clientY };
        }
      }

      window.addEventListener('drag', handleDrag);
      window.addEventListener(
        'dragend',
        () => {
          startPos = null;
          endPos = null;
          window.removeEventListener('drag', handleDrag);
        },
        { once: true },
      );
    }
  });
</script>

{#if startPos && endPos}
  <svg>
    <path
      d={`M${startPos.x} ${startPos.y} L ${endPos.x} ${endPos.y}`}
      stroke-width="4"
      fill="none"
      stroke="rgba(255,255,255,1)"
    />
  </svg>
{/if}

<style>
  svg {
    position: absolute;
    pointer-events: none;
    height: 100vh;
    width: 100vw;
  }
</style>
