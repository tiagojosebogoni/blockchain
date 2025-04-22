import { describe, expect, test } from "@jest/globals";
import Blockchain from "../src/lib/blockchain";
import Block from "../src/lib/block";

describe("Blockchain tests ", () => {
  test("deve criar o bloco genesis e blockchain valida", () => {
    const blockchain = new Blockchain();
    expect(blockchain.blocks.length === 1);
    expect(blockchain.isValid()).toBeTruthy();
  });

  test("permite adicionar um novo bloco", () => {
    const blockchain = new Blockchain();
    const block = new Block(
      blockchain.blocks.length,
      blockchain.getLastBlock().hash,
      "block2"
    );
    blockchain.addBlock(block);
    expect(blockchain.blocks.length === 2);
    expect(blockchain.isValid().success).toBeTruthy();
  });

  test("nao permite adicionar um bloco invalido", () => {
    const blockchain = new Blockchain();
    expect(
      () => new Block(-1, blockchain.getLastBlock().hash, "block2")
    ).toThrow("Index não pode ser negativo");
  });

  test("deve retornar um bloco pelo hash", () => {
    const blockchain = new Blockchain();
    const block = new Block(
      blockchain.blocks.length,
      blockchain.getLastBlock().hash,
      "block2"
    );
    blockchain.addBlock(block);
    const findBlock = blockchain.getBlockByHash(block.hash);
    expect(findBlock).toBeDefined();
    expect(findBlock?.index).toEqual(1);
    expect(findBlock?.data).toEqual("block2");
    expect(findBlock?.hash).toEqual(block.hash);
    expect(findBlock?.previousHash).toEqual(block.previousHash);
  });
});
