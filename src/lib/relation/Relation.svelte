<script lang="ts">
  import { onMount } from 'svelte';
  import { tables, selectedTable } from '../../store/state';
  import type { Position, TableRelation } from '../../store/types';

  export let data: TableRelation;

  function signum(x) {
    return x < 0 ? -1 : 1;
  }

  function absolute(x) {
    return x < 0 ? -x : x;
  }

  function getNumberAttr(el: HTMLElement | SVGElement, attr: string): number {
    return parseInt(el.getAttribute(attr));
  }

  function setNumberAttr(el: HTMLElement | SVGElement, attr: string, value: number) {
    el.setAttribute(attr, value as unknown as string);
  }

  function drawPath(svg: SVGSVGElement, path: SVGPathElement, start: Position, end: Position) {
    if (!svg || !path) {
      return;
    }

    if (start.y > end.y) {
      const tmp = start;
      start = end;
      end = tmp;
    }

    // get the path's stroke width (if one wanted to be  really precize, one could use half the stroke size)
    const stroke = parseFloat(path?.getAttribute('stroke-width'));
    // check if the svg is big enough to draw the path, if not, set heigh/width
    if (getNumberAttr(svg, 'height') < end.y) setNumberAttr(svg, 'height', end.y);
    if (getNumberAttr(svg, 'width') < start.x + stroke) setNumberAttr(svg, 'width', start.x + stroke);
    if (getNumberAttr(svg, 'width') < end.x + stroke) setNumberAttr(svg, 'width', end.x + stroke);

    const deltaX = (end.x - start.x) * 0.05;
    const deltaY = (end.y - start.y) * 0.05;
    // for further calculations which ever is the shortest distance
    const delta = deltaY < absolute(deltaX) ? deltaY : absolute(deltaX);

    // set sweep-flag (counter/clock-wise)
    // if start element is closer to the left edge,
    // draw the first arc counter-clockwise, and the second one clock-wise
    let arc1 = 0;
    let arc2 = 1;
    if (start.x > end.x) {
      arc1 = 1;
      arc2 = 0;
    }

    // draw tha pipe-like path
    // 1. move a bit down, 2. arch,  3. move a bit to the right, 4.arch, 5. move down to the end
    path.setAttribute(
      'd',
      'M' +
        start.x +
        ' ' +
        start.y +
        ' V' +
        (start.y + delta) +
        ' A' +
        delta +
        ' ' +
        delta +
        ' 0 0 ' +
        arc1 +
        ' ' +
        (start.x + delta * signum(deltaX)) +
        ' ' +
        (start.y + 2 * delta) +
        ' H' +
        (end.x - delta * signum(deltaX)) +
        ' A' +
        delta +
        ' ' +
        delta +
        ' 0 0 ' +
        arc2 +
        ' ' +
        end.x +
        ' ' +
        (start.y + 3 * delta) +
        ' V' +
        end.y,
    );
  }

  let svgRef: SVGSVGElement;
  let pathRef: SVGPathElement;

  let fromRef: HTMLDivElement | null;
  let toRef: HTMLDivElement | null;

  function draw() {
    // get middle point for now

    const fromBox = fromRef.getBoundingClientRect();
    const toBox = toRef.getBoundingClientRect();

    const fromX = fromBox.x + fromBox.width / 2;
    const fromY = fromBox.y + fromBox.height / 2;

    const toX = toBox.x + toBox.width / 2;
    const toY = toBox.y + toBox.height / 2;

    drawPath(svgRef, pathRef, { x: fromX, y: fromY }, { x: toX, y: toY });
  }

  onMount(() => {
    try {
      fromRef = document.querySelector(`div[data-table-id=${data.from}]`);
      toRef = document.querySelector(`div[data-table-id=${data.to}]`);
      draw();
    } catch (e) {
      console.error(e);
    }
  });

  tables.subscribe(() => {
    if (fromRef && toRef) {
      draw();
    }
  });

  // highlight relations from currently selectedTable
  $: isActive = $selectedTable?.id === data.from || $selectedTable?.id === data.to;
</script>

<svg bind:this={svgRef}>
  <path
    bind:this={pathRef}
    d="M0 0"
    stroke-width="4"
    fill="none"
    stroke={isActive ? 'var(--purple)' : 'rgba(255,255,255,0.2)'}
  />
</svg>

<style>
  svg {
    position: absolute;
    pointer-events: none;
    height: 100vh;
    width: 100vw;
  }
</style>
