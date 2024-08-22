export default function debouncer<A, R = unknown>(
  callback: (args?: A) => R,
  delay: number = 500,
) {
  let timerID: number;

  const debouncedFunction = function (...args: [args?: A]) {
    return new Promise<R>((resolve) => {
      clearTimeout(timerID);
      timerID = window.setTimeout(function (this: unknown) {
        resolve(callback.apply(this, args));
      }, delay);
    });
  };

  const teardown = () => clearTimeout(timerID);

  return [debouncedFunction, teardown];
}
