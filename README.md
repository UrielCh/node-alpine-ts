# Alpine-ts

[alpine-ts](https://www.npmjs.com/package/alpine-ts) is a fork of [alpine](https://www.npmjs.com/package/alpine), this version is writen in Typescript, so contains a full typing.

[![Actions Status](https://github.com/UrielCh/node-alpine-ts/workflows/coveralls-on-push/badge.svg)](https://github.com/UrielCh/node-alpine-ts/actions)
[![Coverage Status](https://coveralls.io/repos/github/UrielCh/node-alpine-ts/badge.svg?branch=master)](https://coveralls.io/github/UrielCh/node-alpine-ts?branch=master)
[![Package Version](https://img.shields.io/npm/v/alpine-ts.svg)](https://www.npmjs.com/package/alpine-ts)
![downloads](https://img.shields.io/npm/dt/alpine-ts.svg)
![license](https://img.shields.io/npm/l/alpine-ts.svg)

`alpine-ts` is a parser for Apache mod_log log files. It supports the three most common log formats 

- the Common Log Format
- the Common Log Format with a vhost field
- the Combined log format

And also allows you to specify custom log formats by passing it the [LogFormat string](http://httpd.apache.org/docs/current/mod/mod_log_config.html) used to generate the log file you want parsed.

## Predefined log formats

Alpine has these three predefined log formats:

- Alpine.LOGFORMATS.COMBINED
- Alpine.LOGFORMATS.CLF
- Alpine.LOGFORMATS.CLF_VHOST

That can be passed as arguments to the constructor or configured with the .setLogFormat() method.

The default log format is Alpine.LOGFORMATS.COMBINED.

## Examples

### Parse from string using custom log format

The simplest (if not all that useful) use case is

```typescript
import Alpine, {AlpineLine} from 'alpine';

const alpine: Alpine = new Alpine("%h %s %B");
const data: AlpineLine = alpine.parseLine("www.brain-salad.com 403 4321");
console.log(data);
```

which produces

```typescript
{
  originalLine: 'www.brain-salad.com 403 4321',
  remoteHost: 'www.brain-salad.com',
  status: '403',
  size: '4321'
}
```

### Parse file in combined log format with callbacks

```typescript
import fs from 'fs';
import Alpine, {AlpineLine} from 'alpine';

const alpine = new Alpine();
alpine.parseReadStream(fs.createReadStream('access_log', {encoding: "utf8"}),
  function(data: AlpineLine) {
    console.log(`Status: ${data.status}, request: ${data.request}`);
  });
```

### Change from the legacy `alpine` 

- Parameterized filed like `AlpineLine['RequestHeader header']` are now avalable in `AlpineLine.RequestHeader['header']`
- AlpineLine contains some helper like:
  - AlpineLine.url return the log line as a request (patial if not all data are available in the log format)
  - AlpineLine.method return 'GET'/'POST'/'PUT' ...
  - AlpineLine.pathname return the requested path
  - AlpineLine.extension return the file extention from the requested path like (.js, .css, .html ....)
  - AlpineLine.getQuery('name') return a query parameter value
  - AlpineLine.getQueryAll('name') return a query parameter value in a string[]

### Use streams

Alpine supports duplex streaming, but the stream it reads from must be a per-line stream, as implemented by the byline module.

- Alpine().getObjectStream() returns a duplex stream that will write parsed objects.
- Alpine().getStringStream() returns a duplex stream that will write the same parsed objects, but serialized using JSON.stringify()

```typescript
import fs from 'fs';
import byline from 'byline';
import Alpine from 'alpine';
byline.createStream(fs.createReadStream('access_log', {encoding: "utf8"}))
  .pipe(new Alpine().getStringStream())
  .pipe(fs.createWriteStream("access.out"));
```

## Restrictions

Alpine assumes that the log format contains fields, quotation marks (surrounding fields) and whitespace. Further literal text is not supported.

Alpine will probably only work with log files created by Apache HTTPD version 2.0.46 and later - earlier versions logged the contents
of the %r, %i and %o fields without quoting the data, making logs irregular and unpredictable.
