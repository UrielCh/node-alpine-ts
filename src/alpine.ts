/**
 *
 * Alpine, the Apache Log Parser
 *
 * Created by blarsen on 02.10.14.
 */

"use strict";

import { Buffer } from "./buffer";
import { AlpineLine } from "./alpineLine";
import byline from "byline";
import _ from "underscore.string";
import through2 from "through2";

import {
  Field,
  FIELDS,
  PARAMFIELDS,
  ParamFields,
  SimpleFields,
} from "./fields";

export class Alpine {
  private formatfields: Field[] = [];

  public static LOGFORMATS = {
    COMBINED: '%h %l %u %t "%r" %>s %b "%{Referer}i" "%{User-agent}i"',
    CLF: '%h %l %u %t "%r" %>s %b',
    CLF_VHOST: '%v %h %l %u %t "%r" %>s %b',
  };

  constructor(private logformat: string) {
    if (logformat) this.setLogFormat(logformat);
    else this.setLogFormat(Alpine.LOGFORMATS.COMBINED);
  }

  setLogFormat(logformat: string) {
    this.logformat = logformat;
    this.formatfields = parseLogFormat(logformat);
  }

  getLogFormat() {
    return this.logformat;
  }

  parseLine(line: string): AlpineLine {
    const result = new AlpineLine(line);
    const buf = new Buffer(line, 0);

    this.formatfields.forEach(function (field: Field) {
      buf.skipSpaces();
      let val: string;
      if (field.isQuoted) {
        if (!(buf.lookingAt() === '"'))
          throw new Error("Field defined as quoted was not quoted");
        buf.skip();
        val = buf.getUptoX('"');
        buf.skipSpaces();
      } else if (field.isDate) {
        if (!(buf.lookingAt() === "["))
          throw new Error("Time field is not enclosed in brackets");
        buf.skip();
        val = buf.getUptoX("]");
        buf.skipSpaces();
      } else {
        val = buf.getUptoX(" ");
      }
      if (field.param) {
        let oldValue = result[field.name as ParamFields];
        if (!oldValue) {
          oldValue = {};
          result[field.name as ParamFields] = oldValue;
        }
        oldValue[field.param] = val;
      } else {
        result[field.name as SimpleFields] = val;
      }
    });

    return result;
  }
  getObjectStream() {
    const thisAlpine = this;
    return through2.obj(function (chunk, enc, callback) {
      const data = thisAlpine.parseLine(chunk);
      this.push(data);
      callback();
    });
  }

  getStringStream() {
    const thisAlpine = this;
    return through2.obj(function (chunk, enc, callback) {
      const data = thisAlpine.parseLine(chunk);
      this.push(JSON.stringify(data));
      callback();
    });
  }

  parseReadStream(stream: NodeJS.ReadableStream, callback: (line: AlpineLine) => any) {
    const thisAlpine = this;
    const lineStream = byline.createStream(stream);
    lineStream.pipe(
      through2.obj(function (chunk, enc, t2callback) {
        const data = thisAlpine.parseLine(chunk.toString());
        callback(data);
        t2callback();
      })
    );
  }
}

/**
 * parse log format string
 * @param logformat apache type logcormat string
 * @returns array of Fileds
 */
function parseLogFormat(logformat: string): Field[] {
  const fields: Field[] = [];
  const buf = new Buffer(logformat, 0);
  while (buf.hasMore()) {
    buf.skipSpaces();
    let field = buf.getUptoX(" ");
    const isQuoted = field[0] === '"';
    field = stripQuotes(field);
    let param = "";
    // Check that this is a field definition (starting with %) and remove the prefix
    if (!(field[0] === "%"))
      throw new Error("Field does not start with %: " + field);
    field = field.substring(1);

    // Remove modifiers
    if (field.indexOf("{") > 0) {
      field = field.replace(/^[0-9!]+/, "");
    }
    field = field.replace(/[<>]/g, "");

    let fieldName: SimpleFields | ParamFields = FIELDS[field];

    let fieldLetter = field;

    // Handle parameterized fields
    if (field.indexOf("{") >= 0) {
      const matches = /{(.*)}(.*)/.exec(field);
      if (!matches)
        throw new Error(`Faild to parse parameterized format`);
      const value = matches[1];
      fieldLetter = matches[2];
      if (!PARAMFIELDS[fieldLetter])
        throw new Error(`The field ${fieldLetter} should not be parameterized`);
      fieldName = PARAMFIELDS[fieldLetter];
      param = value;
    }

    if (!FIELDS[fieldLetter])
      throw new Error("Unknown log format field " + fieldLetter);
    fields.push({
      field,
      name: fieldName,
      param,
      isQuoted,
      isDate: fieldLetter === "t",
    });
  }
  return fields;
}

function stripQuotes(text: string): string {
  if (
    (_.startsWith(text, '"') && _.endsWith(text, '"')) ||
    (_.startsWith(text, "[") && _.endsWith(text, "]"))
  )
    return text.substr(1, text.length - 2);
  return text;
}
