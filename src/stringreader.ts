/**
 * Created by blarsen on 03.10.14.
 * Convert to Typescipt by uriel on 11/02/2021
 */

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

export default StringReader;
