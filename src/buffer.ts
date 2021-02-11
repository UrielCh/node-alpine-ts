/**
 * Created by blarsen on 03.10.14.
 * Convert to Typescipt by uriel on 11/02/2021
 */

export class Buffer {
  constructor(public readonly data: string, public index: number) {}

  skipSpaces(): void {
    while (this.hasMore() && this.data[this.index] == " ") this.index++;
  }

  getUptoX(char: string): string {
    const str = this.getUpto(char);
    if (!str)
      throw new Error(`getUpto("${char}") failed in "${this.data}"`);
    return str;
  }

  getUpto(char: string): string {
    if (!this.hasMore()) return '';
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

  rewind(): void {
    this.index = 0;
  }

  peek(): string {
    if (!this.hasMore()) return '';
    return this.data[this.index];
  }

  rest(): string {
    if (!this.hasMore()) return '';
    return this.data.substring(this.index);
  }

  hasMore(): boolean {
    return this.remaining() > 0;
  }

  remaining(): number {
    return this.data.length - this.index;
  }
}
