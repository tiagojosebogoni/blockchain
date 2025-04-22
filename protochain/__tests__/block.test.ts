import { describe, expect, test } from "@jest/globals";
import Block from "../src/lib/block";

describe("Block test", () => {
  test("permite criar um bloco valido", () => {
    const block = new Block(0, "", "Genesis Block");
    expect(block.index).toEqual(0);
    expect(block.previousHash).toBeDefined();
    expect(block.data).toEqual("Genesis Block");
    expect(block.timestamp).toBeDefined();
    expect(block.hash).toBeDefined();
  });

  test("nao permite criar um bloco valido (index)", () => {
    expect(() => new Block(-1, "", "dados inválidos")).toThrow(
      "Index não pode ser negativo"
    );
  });
});
