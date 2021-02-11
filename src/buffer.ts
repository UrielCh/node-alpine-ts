/**
 * Created by blarsen on 03.10.14.
 */

"use strict";

export class Buffer {
  constructor(public readonly data: string, public index: number) {}

  skipSpaces() {
    while (this.hasMore() && this.data[this.index] == " ") this.index++;
  }

  getUptoX(char: string): string {
    const str = this.getUpto(char);
    if (str === undefined)
      throw new Error(`getUpto("${char}") failed in "${this.data}"`);
    return str;
  }

  getUpto(char: string) {
    if (!this.hasMore()) return undefined;
    let result = "";
    while (
      this.hasMore() &&
      (this.data[this.index] != char || this.data[this.index - 1] == "\\")
    ) {
      result += this.data[this.index++];
    }
    return result;
  }

  skip(count?: number) {
    count = count || 1;
    // const before = this.index;
    this.index = Math.min(this.index + count, this.data.length);
  }

  rewind() {
    this.index = 0;
  }

  peek(): string | undefined {
    if (!this.hasMore()) return undefined;
    return this.data[this.index];
  }

  get rest(): string {
    if (!this.hasMore()) return '';
    return this.data.substring(this.index);
  }

  hasMore() {
    return this.remaining() > 0;
  }

  remaining() {
    return this.data.length - this.index;
  }
}
