import { debouncer } from "./debouncer";

jest.useFakeTimers();

describe("teardown function", () => {
  test("prevents callback from running if called before the delay", () => {
    const callback = jest.fn();
    const [debouncedCallback, teardown] = debouncer(callback, 0);
    debouncedCallback();
    teardown();
    jest.advanceTimersByTime(1000);

    expect(callback).not.toHaveBeenCalled();
  });
});

describe("debouncer returned function", () => {
  test("calls callback with correct args when delay is reached", () => {
    const callback = jest.fn();
    const [debouncedCallback] = debouncer<string[]>(callback, 0);
    const args: string[] = ["any"];
    debouncedCallback(args);
    jest.advanceTimersByTime(10);

    expect(callback).toHaveBeenCalledWith(args);
  });

  test("does not call callback when delay is not reached", () => {
    const callback = jest.fn();
    const [debouncedCallback] = debouncer(callback, 500);
    debouncedCallback();
    jest.advanceTimersByTime(10);

    expect(callback).not.toHaveBeenCalled();
  });

  test("bounces calls called before delay only accepting the last call", () => {
    const callback = jest.fn();
    const [debouncedCallback] = debouncer(callback, 500);
    const lastArgs: string = "lastArgs";
    debouncedCallback("something");
    debouncedCallback("something else");
    debouncedCallback("another thing");
    jest.advanceTimersByTime(10);
    debouncedCallback(lastArgs);
    jest.advanceTimersByTime(1000);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(lastArgs);
  });

  test("does not bounce calls called after delay", () => {
    const callback = jest.fn();
    const args: string = "any";
    const otherArgs: string = "other args";
    const [debouncedCallback] = debouncer<string>(callback, 500);
    debouncedCallback(args);
    jest.advanceTimersByTime(1000);
    debouncedCallback(otherArgs);
    jest.advanceTimersByTime(1000);

    expect(callback.mock.calls).toEqual([[args], [otherArgs]]);
  });
});
