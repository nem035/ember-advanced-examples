# Advanced Ember Example

Notes, patterns and examples for developing Ember applications.

## Container

### Debugging

- Use **Container** tab in Ember Inspector
- Use `$E.__container__` by pressing `$E` in the Inspector when in `application:main`

### Accessing instantiated factories

- Proper way is using [`Ember.getOwner`](http://emberjs.com/api/#method_getOwner) and [`applicationInstance.lookup`](http://emberjs.com/api/classes/Ember.ApplicationInstance.html#method_lookup)

```js
const applicationRoute = Ember.getOwner(this).lookup('application:route');
```

### Usage

- Great place for config objects

## [Resolver](https://github.com/ember-cli/ember-resolver)

- Given a container key, **Resolver** finds the appropriate [named AMD module](http://requirejs.org/docs/whyamd.html#namedmodules) and puts it in the container for us.

- "Gives us the 'posts' controller" (regardless of how we organize our project structure)

```js
// defining named AMD module
define('myCoolModule', ['dependentModuleA', 'dependentModuleB'], function(moduleA, moduleB) {
  const defaultExport = em.default;
  return {
    default: {
      hello: 'world'
    }
  };
});

// obtaining AMD module
const myModule = require('myCoolModule');

// usage in ember-cli-build.js to extract portions of our module
app.import('vendor/myCoolModule.js', {
  exports: ['myCoolModule'] // select which export to take from `myCoolModule.js`
});
```

### Debugging

- Use `$E.resolveRegistration('factoryType:name')` to get the constructor of the Resolve (by pressing `$E` in the Inspector when in `application:main`)

  For example `$E.resolveRegistration('route:application')`

- Use the `require` (for example `require._stats` and `require.entries`) global to inspect modules in your application

## Example

- Custom Math module

```js
define('math', [], function() {
  return {
    default: Math,
    PI: Math.PI
  };
});

// Usage
const { default: math, PI } = require('math'); // Object {default: Math, PI: 3.141592653589793}

math.sqrt(4);    // 2
console.log(PI); // 3.145926

// Usage (ES6 modules)
import { default as math, PI } from 'math';

math.sqrt(4);    // 2
console.log(PI); // 3.145926
```

## Initializers ([Example](https://github.com/nem035/advanced-ember-examples/blob/master/app/initializers/geolocation.js))

- Primarily deal with factories and `application.register` and `application.resolveRegistration`

### (non-instance) Initializer (In-Application-Constructor Logic)

- Can be used to break up the boot process of an [application](http://emberjs.com/api/classes/Ember.Application.html) into modular single-purpose functions
- Gets access to the **registration API**
- Usage examples:
  - Add a configuration object to the container
  - Setup for a/b testing
  - Conditionally load code ([application.deferReadiness](http://emberjs.com/api/classes/Ember.Application.html#method_deferReadiness) and [application.advanceReadiness](http://emberjs.com/api/classes/Ember.Application.html#method_advanceReadiness))
- Initializers are queues (we can specify order with the `before` and `after` named exports)

```js
export function initialize(application) {
  var logger = {
    log(m) {
      console.log(m);
    }
  };

  /*
    By default, Ember will attempt to instantiate a registered factory when it is looked up.
    When registering an already instantiated object instead of a class, use the

      instantiate: false

    option to avoid attempts to re-instantiate it during lookups.

    By default, registrations are treated as "singletons".
    When you want fresh objects to be created for every lookup, register your factories as
    non-singletons using the

      singleton: false option.
  */
  application.register('logger:main', logger, { instantiate: false });

  // Once a factory is registered, it can be "injected" where it is needed.
  application.inject('route', 'logger', 'logger:main');
}

export default {
  name: 'logger',
  // before: 'some-previous-initializer',
  // after: 'some-next-initializer',
  initialize
};
```

### Instance Initializer (Immediately-After-Application-Constructor Logic)

- Initializer after the [application instance](http://emberjs.com/api/classes/Ember.ApplicationInstance.html) has been created
- Run after all non-instance initializers have ran
- Access to a fully materialized container, store, etc...

  [`applicationInstance.lookup`](http://emberjs.com/api/classes/Ember.ApplicationInstance.html#method_lookup) is available to fetch an instantiated factory from the running application
- Cannot defer/advance readiness
- app instance allows registration of anything in the container

```js
export function initialize(applicationInstance) {
  let logger = applicationInstance.lookup('logger:main');

  logger.log('Hello from the instance initializer!');
}

export default {
  name: 'logger',
  initialize: initialize
};
```

[See Initializer Example](https://github.com/nem035/advanced-ember-examples/blob/master/app/initializers/geolocation.js)

## Build System

### Broccoli

- Cache intermediate build results

- Think trees, not files
  - A string is a tree
  - Plugins are either N:N or N:1
  - Think of trees as immutable data structures
  - Plugins are chainable

    - we are building a composable (chain) pipeline that will run later

  - [See Plugin Example](https://github.com/nem035/advanced-ember-examples/blob/master/plugins/custom-header.js)

### Debugging

- Use [Broccoli Stew](https://github.com/stefanpenner/broccoli-stew)
  - Main methods to use are [log](https://github.com/stefanpenner/broccoli-stew/blob/master/lib/log.js#L27) and [debug](https://github.com/stefanpenner/broccoli-stew/blob/master/lib/debug.js#L12)

  ```js
  // ember-cli-build.js
  var debug = require('broccoli-stew').debug;

  return new MyPlugin(
    debug(
      app.toTree(), {
        name: 'my-debug' // Write to this folder a snapshot of our pipeline at a certain point
      }
    )
  )
  ```

### Ember-App (in ember-cli-build.js)

- Many broccoli plugins act on options passed to the EmberApp constructor
- `ember build -prod` fingerprints the files and we have to [manually exclude](https://github.com/nem035/advanced-ember-examples/blob/master/ember-cli-build.js#L11) what we don't want fingerprinted

### Environment

- [`config/environment`](https://github.com/nem035/advanced-ember-examples/blob/master/config/environment.js) is where most per-environment switching takes place
- baked into the build, via meta tag
- module is available for client and server
- many non-build-related ember addons will be customized in this file

## Automated testing

- Already setup for [travis-ci](https://travis-ci.org/) and [PhantomJS](http://phantomjs.org/)

## Deployment

- TODO

### Heroku

- Heroku

## License

MIT
