import Block from "./block";
import Validation from "./validation";

export default class Blockchain {
  blocks: Block[] = [];
  nextIndex: number = 0;

  constructor() {
    this.blocks.push(new Block(0, "", "Genesis Block"));
    this.nextIndex++;
  }

  getLastBlock = (): Block => {
    return this.blocks[this.blocks.length - 1];
  };

  public addBlock = (block: Block): Validation => {
    const lastBlock = this.getLastBlock();
    const validation = block.isValid(lastBlock.hash, lastBlock.index);
    if (!validation.success) {
      return new Validation(false, `Block invalido #${validation.message}`);
    }
    this.blocks.push(block);
    this.nextIndex++;
    return new Validation();
  };

  isValid = (): Validation => {
    for (let i = this.blocks.length - 1; i > 0; i--) {
      const block = this.blocks[i];
      const previousBlock = this.blocks[i - 1];
      const validation = block.isValid(previousBlock.hash, previousBlock.index);
      if (!validation.success) return validation;
    }
    return new Validation();
  };

  getBlockByHash = (hash: string): Block | undefined => {
    return this.blocks.find((block) => block.hash === hash);
  };
}
