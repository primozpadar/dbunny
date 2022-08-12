import type * as CSS from 'csstype';

const kebabize = (str) => str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? '-' : '') + $.toLowerCase());

export function css(values: CSS.Properties): string {
  return Object.entries(values).reduce((acc, [key, value]) => {
    acc += `${kebabize(key)}: ${value}; `;
    return acc;
  }, '');
}
