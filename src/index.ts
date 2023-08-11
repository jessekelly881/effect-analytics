import { AnalyticsInstance } from "analytics";
import * as Context from "@effect/data/Context";
import * as Effect from "@effect/io/Effect";


/**
 * @since 1.0.0
 */
export interface Analytics extends AnalyticsInstance {}

/**
 * @since 1.0.0
 */
export const Analytics = Context.Tag<Analytics>("effect-analytics/Analytics");

/**
 * @since 1.0.0
 */
export const tryTrack = <E>(props: {
  eventName: string;
  value: unknown;
  catch: (e: unknown) => E;
}): Effect.Effect<Analytics, E, void> =>
  Analytics.pipe(
    Effect.flatMap((analytics) =>
      Effect.tryPromise({
        try: () => analytics.track(props.eventName, props.value),
        catch: props.catch,
      })
    )
  );

/**
 * @since 1.0.0
 */
export const track = <A>(eventName: string, value: A) =>
  tryTrack({ eventName, value, catch: () => undefined });