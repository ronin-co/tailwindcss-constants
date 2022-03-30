# tailwindcss-constants

Applying utility classes provided by [TailwindCSS](https://tailwindcss.com) (like `bg-white`) conditionally doesn't require a lot of effort, because it's only a matter of enabling strings conditionally.

For simple apps, that's usually enough. For more advanced ones, however, you might find yourself wanting to done one of the following things:

- Share utility classes between multiple places in your code
- Construct a utility class from a constant

This package lets you accomplish all of those things with ease.

## Setup

First, install the package:

```bash
npm install tailwindcss-constants --save
```

Then invoke it from your application code:

```jsx
import TailwindConstant from "tailwind-constants";

const transitionDuration == new TailwindConstant(300);

// This is non-working pseudo-code and only supposed to show off the usage.
const Component = () => {
  useEffect(() => {
    setTimeout(() => {
      console.log('Test');
    }, transitionDuration.value);
  });
  
  return <span class={transitionDuration.util('transition-colors duration-300')}>Test</span>;
};
```

This will ensure that the applied `duration` utility class always uses a value of `300`, otherwise an error will be thrown — effectively preventing values from diverging in multiple places, just like a constant would.

**NOTE:** It is highly recommended to use this package in combition with [clsx](https://www.npmjs.com/package/clsx) if you're applying lots of utility classes.

## Why is this needed?

When using TailwindCSS' [Just-in-Time Mode](https://v2.tailwindcss.com/docs/just-in-time-mode), it will scan your template files and automatically only generate the CSS that is needed for the utility classes it finds.

If it doesn't find a particular utility class (like `bg-black`), it won't generate CSS for it.

That's one of the main purposes of this mode (generating as little CSS as possible), and it's amazing. However, that also means that TailwindCSS has to be able to see all of your utility classes upfront in your code, otherwise it will consider them non-existent.

If you're applying a class name conditionally like so...

```js
const Component = () => {
  return <span class={someVariable && 'bg-black'}>Test</span>;
};
```

...then TailwindCSS would still be able to generate the CSS, because it can see the utility class.

Once you start doing something like this, however...

```js
const Component = () => {
  return <span class={`bg-${someVariable}`}>Test</span>;
};
```

...TailwindCSS won't be able to detect it, because the actual name of the class is only known at runtime.

The package right here lets you accomplish the things mentioned in the intro, while still letting TailwindCSS detect the utility classes upfront.

## Additional Options

By default, `.util` matches utility classes against your defined constant by checking if one of them ends in the suffix `-[your-constant]`, where `[your-constant]` is the constant value you've passed as the first argument to `new TailwindConstant`.

If you'd like to assert with a custom suffix, you can pass it like this:

```jsx
const darkBackground = new TailwindConstant(500, '-dark');
```

Now the second argument you've passed will be used instead of `-[your-constant]`.

Additionally, `.util` also allows for passing extra conditions as a second argument:

```jsx
const Component = () => {
  const [state, setState] = useState(null);
  return <span class={transitionDuration.util('transition-colors duration-300', state)}>Test</span>;
};
```

As you can see, this especially comes in handy when applying a utility class depending on some state.

## Author

Created by [Leo Lamprecht (@leo)](https://leo.im)
