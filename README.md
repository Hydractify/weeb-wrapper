# Weeb Wrapper [![npm version](https://badge.fury.io/js/weeb-wrapper.svg)](https://www.npmjs.com/package/weeb-wrapper) [![Downloads](https://img.shields.io/npm/dm/weeb-wrapper.svg)](https://www.npmjs.com/package/weeb-wrapper)

A simple, yet useful wrapper for the `weeb.sh` API.

---

## Installing the Module

### Yarn
```
yarn add weeb-wrapper
```

### NPM
```
npm install weeb-wrapper
```

---

## Usage

_Disclaimer: This is just a simple wrapper, if you want more information than `url`, `type`, `fileType`, etc... You should not be even downloading a node module for that._

##### On this examples `WeebWrapper` will be:
```js
const WeebWrapper = require('weeb-wrapper');
```

### Random
```js
const wrapper = new WeebWrapper(<Token>);
wrapper.random(<ImageType/ImageTag>, { hidden, nsfw, filetype }); // Returns Promise<Object>

/**
 * You can get the ImageTypes and ImageTags using the wrapper.types(); and wrapper.tags();
 * Everything on the object of the second argument is optional.
 */
```

Example:
```js
const wrapper = new WeebWrapper(<Token>);
wrapper.random('hug', { hidden: false, nsfw: false, filetype: 'jpeg' });
```

### Tags
```js
const wrapper = new WeebWrapper(<Token>);
wrapper.tags(hidden); // Returns Promise<Array<string>>

/**
 * The first and only argument is optional.
 */
```

Example:
```js
const wrapper = new WeebWrapper(<Token>);
wrapper.tags(false);
```

### Types
```js
const wrapper = new WeebWrapper(<Token>);
wrapper.types(hidden); // Returns Promise<Array<string>>

/**
 * The first and only argument is optional.
 */
```

Example:
```js
const wrapper = new WeebWrapper(<Token>);
wrapper.types(true);
```

### Upload
```js
const wrapper = new WeebWrapper(<Token>);
wrapper.upload(<Buffer>, <ImageType/ImageTag>, { nsfw, source, tags }); // Returns Promise<Object>

/**
 * The third argument is optional.
 * The first argument is a File Buffer, for example using https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback
 */
 ```

 Example:
 ```js
 const wrapper = new WeebWrapper(<Token>);
 wrapper.upload('<directory>', 'hug', { nsfw: true, source: '<URL/Anime Name>', tags: 'cuddle,astolfo' });
```
