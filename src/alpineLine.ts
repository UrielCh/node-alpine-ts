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
  // public cookie?: string;
  public environment?: string;
  public requestHeader?: string;
  public note?: string;
  public responseHeader?: string;
  public requestTrailerLine?: string;
  public responseTrailerLine?: string;

  public Cookie!: {[key:string]: string};
  public Environment!: {[key:string]: string};
  public RequestHeader!: {[key:string]: string};
  public Note!: {[key:string]: string};
  public ResponseHeader!: {[key:string]: string};
  public Port!: {[key:string]: string};
  public PID!: {[key:string]: string};
  public Time!: {[key:string]: string};
  public RequestTrailerLine!: {[key:string]: string};
  public ResponseTrailerLine!: {[key:string]: string};

  // remoteHost?: string; // remote IP
  // logname?: string;
  // remoteUser?: string;
  // time?: string; // '01/Mar/2020:13:13:11 +0100',
  // request?: string; // 'GET /disponible?q=serrurier%20ermont&cid=8083431561&p=&x=egt&z=1006014-9056594&gclid=EAIaIQobChMIwPu5t4qs3AIVAQAAAB0BAAAAEAAYACAAEgJVzfD_BwE HTTP/1.1',
  // status?: string; // '200',
  // sizeCLF?: string; // '6473',
  // "RequestHeader Referer"?: string; // '-',
  // "RequestHeader User-agent"?: string; // 'AdsBot-Google (+http://www.google.com/adsbot.html)'
}
