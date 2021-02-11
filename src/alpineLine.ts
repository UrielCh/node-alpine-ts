/**
 * Created by uriel on 11/02/2021
 */

import Url from "url-parse";

export class AlpineLine {
  constructor(public originalLine: string) {}
  public remoteIP?: string;
  public localIP?: string;
  public size?: string;
  public sizeCLF?: string;
  public serveTime?: string;
  public filename?: string;
  public remoteHost?: string;
  public requestProtocol?: string;
  public keepaliveRequests?: string;
  public logname?: string;
  public requestMethod?: string;
  public port?: string;
  public pid?: string;
  public queryString?: string;
  public request?: string;
  public responseHandler?: string;
  public status?: string;
  public time?: string;
  public remoteUser?: string;
  public urlPath?: string;
  public canonicalServerName?: string;
  public serverName?: string;
  public connectionStatus?: string;
  public bytesReceived?: string;
  public bytesSent?: string;
  // removed from original version
  // public cookie?: string;
  public environment?: string;
  public requestHeader?: string;
  public note?: string;
  public responseHeader?: string;
  public requestTrailerLine?: string;
  public responseTrailerLine?: string;

  public Cookie!: { [key: string]: string };
  public Environment!: { [key: string]: string };
  public RequestHeader!: { [key: string]: string };
  public Note!: { [key: string]: string };
  public ResponseHeader!: { [key: string]: string };
  public Port!: { [key: string]: string };
  public PID!: { [key: string]: string };
  public Time!: { [key: string]: string };
  public RequestTrailerLine!: { [key: string]: string };
  public ResponseTrailerLine!: { [key: string]: string };

  private _url?: Url;
  get url(): Url | null {
    if (!this.request) return null;
    if (!this._url) {
      const [mtd, uri] = this.request.split(" ");
      const proto = this.requestProtocol || "http";
      const host = this.remoteHost || "dummy";
      this._url = new Url(`${proto}://${host}${this.request}${uri}`);
    }
    return this._url;
  }

  get pathname(): string {
    const url = this.url;
    if (!url) return "";
    const { pathname } = url;
    return pathname;
  }

  get extension(): string {
    const pathname = this.pathname;
    const p = pathname.lastIndexOf(".");
    if (p === -1) return "";
    return pathname.substring(p);
  }
}
