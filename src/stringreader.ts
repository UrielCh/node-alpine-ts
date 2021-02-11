/**
 * Created by blarsen on 03.10.14.
 */

// import util from 'util';
import { Readable }  from 'stream';

export class StringReader extends Readable {
    constructor(private data: string) {
        super();
    }
    _read() {
        this.push(this.data);
        this.push(null);
    }
}


// function StringReader(str: string) {
//     Readable.call(this);
//     this.data = str;
// }

// util.inherits(StringReader, Readable);

// module.exports = StringReader;

// StringReader.prototype._read =function(n) {
//     this.push(this.data);
//     this.push(null);
// }