# Advanced Ember Example

Notes, patterns and examples for developing Ember applications.

## Container

### Debugging
- Use **Container** tab in Ember Inspector
- Use `$E.__container__` by pressing `$E` in the Inspector when in `application:main`

### Accessing
- Proper way is using [Ember.getOwner](http://emberjs.com/api/#method_getOwner)

### Usage
- Great place for config objects

## [Resolver](https://github.com/ember-cli/ember-resolver)

- Given a container key, **Resolver** finds the appropriate [named AMD module](http://requirejs.org/docs/whyamd.html#namedmodules) and puts it in the container for us.

- "Gives us the 'posts' controller" (regardless of how we organize our project structure)

```js
// named AMD module
define('myCoolModule', ['dependentModuleA', 'dependentModuleB'], function(moduleA, moduleB) {
  const defaultExport = em.default;
  return {
    default: {
      hello: 'world'
    }
  };
});

const myModule = require('myCoolModule');

// usage in ember-cli-build.js
app.import('vendor/myCoolModule.js', {
  exports: ['myCoolModule'] // select which export to take from `myCoolModule.js`
});
```

### Debugging
- Use `$E.resolveRegistration('type:name')` to get the constructor of the Resolve (by pressing `$E` in the Inspector when in `application:main`)

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

const { default: math, PI } = require('math'); // Object {default: Math, PI: 3.141592653589793}

math.sqrt(4);    // 2
console.log(PI); // 3.145926

// ES6 equivalent
import { default as math, PI } from 'math';

math.sqrt(4);    // 2
console.log(PI); // 3.145926
```

## License

MIT
