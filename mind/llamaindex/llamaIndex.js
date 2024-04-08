import fs from 'node:fs/promises';

import { Document, VectorStoreIndex, SimpleDirectoryReader } from 'llamaindex';

// const OPEN_AI_API = process.env.OPEN_AI_API;

// async function main() {
//   const documents = new SimpleDirectoryReader().loadData({
//     directoryPath: '../node_modules/llamaindex/examples/',
//   });
//   const index = await VectorStoreIndex.fromDocuments([documents]);
//   const queryEngine = index.asQueryEngine();
//   const response = await queryEngine.query({
//     query: 'What did the author do in college?',
//   });

//   console.log(response.toString());
// }

// main();

async function main() {
  // Load essay from abramov.txt in Node

  try {
    const path = './node_modules/llamaindex/examples/abramov.txt';

    const essay = await fs.readFile(path, 'utf-8');

    // Create Document object with essay
    const document = new Document({ text: essay, id_: path });

    // Split text and create embeddings. Store them in a VectorStoreIndex
    const index = await VectorStoreIndex.fromDocuments([document]);

    // Query the index
    const queryEngine = index.asQueryEngine();
    const response = await queryEngine.query({
      query: 'What did the author do in college?',
    });

    // Output response
    // console.log(response.toString());
    return response;
  } catch (err) {
    throw err;
  }
}

export default main;
