import express, { Request, Response, NextFunction } from "express";
import Blockchain from "../lib/blockchain";
import Block from "../lib/block";

const app = express();
const PORT = 3000;
app.use(express.json());

const blockchain = new Blockchain();
app.get("/status", (_: Request, response: Response, next: NextFunction) => {
  response.json({
    numberOfBlocks: blockchain.blocks.length,
    lastBlock: blockchain.getLastBlock(),
    isValid: blockchain.isValid(),
  });
});

app.get(
  "/blocks/:indexOrHash",
  (request: Request, response: Response, next: NextFunction) => {
    let block;
    if (/^[0-9]+$/.test(request.params.indexOrHash))
      block = blockchain.blocks[parseInt(request.params.indexOrHash)];
    else block = blockchain.getBlockByHash(request.params.indexOrHash);

    if (!block) return response.sendStatus(404);
    else return response.json(block);
  }
);

app.post(
  "/blocks",
  (request: Request, response: Response, next: NextFunction) => {
    const block = new Block(
      request.body.index,
      request.body.previousHash,
      request.body.data
    );
    const validation = blockchain.addBlock(block);
    if (validation.success) {
      return response.status(201).json({ block });
    }
    return response.status(400).json({ message: validation.message });
  }
);

app.listen(PORT, () => {
  console.log(`Blockchain server is running at port: ${PORT}`);
});
