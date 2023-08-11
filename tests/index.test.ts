import { describe, it, expect, vi } from "vitest";
import { Analytics } from "analytics";
import { pipe } from "@effect/data/Function";
import * as Effect from "@effect/io/Effect";
import * as A from "../src/index";

const createTestInstance = (callback: (_: unknown) => unknown) => {
  const testInstance = Analytics({
    app: "test",
    plugins: [],
  });

  testInstance.on("track", callback);

  return testInstance;
};


describe("Analytics", () => {
  it("track", async () => {
    const mockCallback = vi.fn(({ payload }) => payload?.properties)
    const testInstance = createTestInstance(mockCallback)

    const program = pipe(
      Effect.sync(() => 1),
      Effect.tap(x => A.track("test", x)),
      Effect.provideService(A.Analytics, testInstance)
    );

    await Effect.runPromise(program);

    expect(mockCallback).toHaveBeenCalledTimes(1)
    expect(mockCallback).toHaveLastReturnedWith(1)
  });
});