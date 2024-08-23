/* eslint-disable @typescript-eslint/no-unused-vars */
export default function debouncer<A, R = unknown>(
  callback: (args?: A) => R,
  _delay: number = 500,
) {
  return [callback, () => {}]
}