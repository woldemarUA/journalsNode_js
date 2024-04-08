import {
  Document,
  VectorStoreIndex,
  SimpleDirectoryReader,
  RouterQueryEngine,
  storageContextFromDefaults,
  ContextChatEngine,
} from 'llamaindex';

const storageContext = await storageContextFromDefaults({
  persistDir: '../storage',
});

const index = await VectorStoreIndex.init({
  storageContext,
});

const engine = index.asQueryEngine();

const response = await engine.query({ query: 'What is this document about?' });

console.log(respone.toString());
