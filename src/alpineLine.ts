/**
 * Created by uriel on 11/02/2021
 */

import url from 'url';
import querystring from 'querystring';

export class AlpineLine {
  constructor(public originalLine: string) {}
  public remoteIP!: string;
  public localIP!: string;
  public size!: string;
  public sizeCLF!: string;
  public serveTime!: string;
  public filename!: string;
  public remoteHost!: string;
  public requestProtocol!: string;
  public keepaliveRequests!: string;
  public logname!: string;
  public requestMethod!: string;
  public port!: string;
  public pid!: string;
  public queryString!: string;
  public request!: string;
  public responseHandler!: string;
  public status!: string;
  public time!: string;
  public remoteUser!: string;
  public urlPath!: string;
  public canonicalServerName!: string;
  public serverName!: string;
  public connectionStatus!: string;
  public bytesReceived!: string;
  public bytesSent!: string;
  // removed from original version
  // public cookie?: string;
  public environment!: string;
  public requestHeader!: string;
  public note!: string;
  public responseHeader!: string;
  public requestTrailerLine!: string;
  public responseTrailerLine!: string;

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

  private _url?: URL;
  private _mtd?: string;

  get url(): URL {
    if (!this._url) {
      if (!this.request) {
        this._url = new URL(`http://-`)//, "dummy", true);
      } else {
        const [mtd, uri] = this.request.split(" ");
        this._mtd = mtd;
        const proto = this.requestProtocol || "http";
        const host = this.logname || "-";
        this._url = new URL(`${proto}://${host}${uri}`)//, "dummy", true);
      }
    }
    return this._url;
  }

  getQuery(param?: string): string | null {
    if (!param) {
      return this.url.search;
    }
    return this.url.searchParams.get(param);
  }

  getQueryAll(param: string): string[] | null {
    return this.url.searchParams.getAll(param);
  }

  get method(): string {
    this.url;
    return this._mtd || "";
  }

  get pathname(): string {
    return this.url.pathname;
  }

  get extension(): string {
    const pathname = this.pathname;
    const p = pathname.lastIndexOf(".");
    if (p === -1) return "";
    return pathname.substring(p);
  }
}
