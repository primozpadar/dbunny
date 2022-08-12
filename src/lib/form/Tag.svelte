<script lang="ts">
  export let color: 'purple' | 'yellow' | 'blue' = 'purple';

  let textColor;
  let borderColor;
  let backgroundColor;
  switch (color) {
    case 'purple':
      textColor = 'rgba(255, 255, 255, 0.5)';
      borderColor = 'var(--purple)';
      backgroundColor = 'rgb(72, 20, 108)';
      break;
    case 'yellow':
      textColor = '#ECC94B';
      borderColor = '#B7791F';
      backgroundColor = '#744210';
      break;
    case 'blue':
      textColor = '#63B3ED';
      borderColor = '#2B6CB0';
      backgroundColor = '#1A365D';
      break;
  }

  const style = `
    color: ${textColor};
    background: ${backgroundColor};
    border: 2px solid ${borderColor};
  `;
</script>

<span class="form-tag" {style}>
  <slot />
</span>

<style lang="less" scoped>
  .form-tag {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px 8px;
    height: 18px;
    font-size: 10px;
    font-weight: bold;
    border-radius: 1000px;
  }
</style>
