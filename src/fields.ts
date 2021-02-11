/**
 * Created by uriel on 11/02/2021
 */

export const SIMPLE_FIELDS_LIST = [
  "remoteIP",
  "localIP",
  "size",
  "sizeCLF",
  "serveTime",
  "filename",
  "remoteHost",
  "requestProtocol",
  "keepaliveRequests",
  "logname",
  "requestMethod",
  "port",
  "pid",
  "queryString",
  "request",
  "responseHandler",
  "status",
  "time",
  "remoteUser",
  "urlPath",
  "canonicalServerName",
  "serverName",
  "connectionStatus",
  "bytesReceived",
  "bytesSent",
  // "cookie",
  "environment",
  "requestHeader",
  "note",
  "responseHeader",
  "requestTrailerLine",
  "responseTrailerLine",
] as const;
export type SimpleFields = typeof SIMPLE_FIELDS_LIST[number];

export const PARAM_FIELDS_LIST = [
  "Cookie",
  "Environment",
  "RequestHeader",
  "Note",
  "ResponseHeader",
  "Port",
  "PID",
  "Time",
  "RequestTrailerLine",
  "ResponseTrailerLine",
] as const;
export type ParamFields = typeof PARAM_FIELDS_LIST[number];

export const FIELDS: { [key: string]: SimpleFields } = {
  a: "remoteIP",
  A: "localIP",
  B: "size",
  b: "sizeCLF",
  D: "serveTime",
  f: "filename",
  h: "remoteHost",
  H: "requestProtocol",
  k: "keepaliveRequests",
  l: "logname",
  m: "requestMethod",
  p: "port",
  P: "pid",
  q: "queryString",
  r: "request",
  R: "responseHandler",
  s: "status",
  t: "time",
  T: "serveTime",
  u: "remoteUser",
  U: "urlPath",
  v: "canonicalServerName",
  V: "serverName",
  X: "connectionStatus",
  I: "bytesReceived",
  O: "bytesSent",
  e: "environment",
  i: "requestHeader",
  n: "note",
  o: "responseHeader",
  "^ti": "requestTrailerLine",
  "^to": "responseTrailerLine",
};

export const PARAMFIELDS: { [key: string]: ParamFields } = {
  C: "Cookie",
  e: "Environment",
  i: "RequestHeader",
  n: "Note",
  o: "ResponseHeader",
  p: "Port",
  P: "PID",
  t: "Time",
  "^ti": "RequestTrailerLine",
  "^to": "ResponseTrailerLine",
};

export interface Field {
  field: string;
  name: SimpleFields | ParamFields;
  param: string;
  isQuoted: boolean;
  isDate: boolean;
}
