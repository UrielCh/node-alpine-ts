

import { Alpine } from "../src/alpine";
import assert from 'assert';

describe('AlpineLine', function() {

    it("should handle a CLF log format line correctly", function() {
        //   CLF: '%h %l %u %t "%r" %>s %b',
        const a = new Alpine(Alpine.LOGFORMATS.CLF);
        const result = a.parseLine(
            '192.168.2.20 - - [28/Jul/2006:10:27:10 -0300] "GET /cgi-bin/try/?a=123&a=456&b=000 HTTP/1.0" 200 3395'
        );       
        assert(result.remoteHost === "192.168.2.20");
        assert(result.sizeCLF === "3395", "Wrong size: " + result.sizeCLF);
        assert(result.extension === "", "Wrong extension: " + result.extension);
        assert(result.pathname === "/cgi-bin/try/", "Wrong pathname: " + result.pathname);
        assert(result.method === "GET", "Wrong method: " + result.method);
        const ar = result.getQueryAll('a') as string[];
        assert(ar[0] === "123", "error in query parsing ");
        assert(ar[1] === "456", "error in query parsing ");
        assert(result.getQuery('b') === "000", "error in query parsing ");
        assert(result.getQuery() === "?a=123&a=456&b=000", "error in query parsing " + result.getQuery());
    })

    it("should handle a superligth non standard log format", function() {
        const a = new Alpine('%h %t %>s %b');
        const result = a.parseLine(
            '192.168.2.20 [28/Jul/2006:10:27:10 -0300] 200 3395'
        );       
        const url = result.url;
        assert.strictEqual(url.toString(), 'http://-/');
        console.log(url.toString())
    })

})