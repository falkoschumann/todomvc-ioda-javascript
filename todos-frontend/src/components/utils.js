// @ts-check

import { useEffect, useRef } from 'react';

/**
 * @param {number} count
 * @param {string} noun
 */
export function pluralize(count, noun) {
  return count === 1 ? noun : `${noun}s`;
}

/**
 * @param {any} value
 * @returns {any|undefined}
 */
export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
