level-rawcopy
=====

[![NPM](https://nodei.co/npm/level-rawcopy.png)](https://nodei.co/npm/level-rawcopy/)

[![david-dm](https://david-dm.org/brycebaril/level-rawcopy.png)](https://david-dm.org/brycebaril/level-rawcopy/)
[![david-dm](https://david-dm.org/brycebaril/level-rawcopy/dev-status.png)](https://david-dm.org/brycebaril/level-rawcopy#info=devDependencies/)

Optimized live copying of [levelup](http://npm.im/levelup) instances.

Uses [level-bufferstreams](http://npm.im/level-bufferstreams) internally to optimize copy operations.

If you are using [level-hyper](http://npm.im/level-hyper) it will attempt to use the LiveCopy feature.

**NOTES**: This is still experimental and has some issues on some LevelDOWN layers/versions. I am working those out.

```javascript
var level = require("level")
var source = level("./your_source_db")
var target = level("./your_target_db")

var rawcopy = require("level-rawcopy")

rawcopy(source, target, function () {
  console.log("DONE!")
})

```

STATS
===

Comparing copies on a 180 megabyte `level-hyper` db:

`db1.readStream().pipe(db2.writeStream())`
```
{ rss: 3204366336, heapTotal: 1488523264, heapUsed: 1346318856 }
slowLoad: 382969ms
```

`rawcopy(db1, db2)`
```
{ rss: 656027648, heapTotal: 59279872, heapUsed: 28893008 }
fastLoad: 369023ms
```

Right now the speed is appears mostly bottle-necked by the iterator, see https://github.com/rvagg/node-leveldown/pull/34

API
===

`rawcopy(source, target, options, callback)`
---

Copies data from a LevelUP instance `source` into `target`. The `target` can be another LevelUP instance, or a path to a desired location. If a path is provided, you must also provide a `LevelDOWN` factory to use in `options` (same as when creating a levelup instance). Options also will respect level-bufferstreams options for the read and write ends.

LICENSE
=======

MIT
