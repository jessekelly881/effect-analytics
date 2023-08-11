# effect-analytics
An Effect library for working with Analytics. Wraps the @analytics/* pluggable analytics library. 

```ts
import { Effect } from "effect";
import { Analytics as Instance } from "analytics";
import * as A from "effect-analytics"
// import googleAnalytics from '@analytics/google-analytics'

const instance = Instance({
  app: "app",
  plugins: [/*
    googleAnalytics({
        trackingId: 'UA-121991291',
      })
  */],
});

const program = pipe(
  Effect.sync(() => ({ data: 1 })),
  Effect.tap(x => A.track("test", x)), // sends { data: 1 } w/ tag "test" to configured providers.
  Effect.provideService(A.Analytics, instance)
);
```
