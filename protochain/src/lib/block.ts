import { SHA256 } from "crypto-js";
import Validation from "./validation";

export default class Block {
  timestamp: number;
  hash: string;

  constructor(
    readonly index: number = 0,
    readonly previousHash: string = "",
    public data: string
  ) {
    if (this.index < 0) {
      throw new Error("Index não pode ser negativo");
    }
    this.timestamp = Date.now();
    this.hash = this.calculateBlockHash();
  }

  private calculateBlockHash(): string {
    return SHA256(
      `${this.index}${this.previousHash}${this.timestamp}${this.data}`
    ).toString();
  }

  public isValid = (
    previousHash: string,
    previousIndex: number
  ): Validation => {
    if (previousIndex !== this.index - 1)
      return new Validation(false, "Invalido index");
    if (this.index < 0) return new Validation(false, "Invalido index negativo");
    if (this.timestamp < 1) return new Validation(false, "Invalido timestamp.");
    if (this.hash !== this.calculateBlockHash())
      return new Validation(false, "Invalido hash calculado");
    if (this.previousHash !== previousHash)
      return new Validation(false, "Invalido hash anterior");
    return new Validation();
  };
}
