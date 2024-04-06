import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/hf_transformers";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { JSONLoader } from "langchain/document_loaders/fs/json";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { search, SafeSearchType } from 'duck-duck-scrape';
import { LlamaCpp } from "@langchain/community/llms/llama_cpp";
// const dotenv = require('dotenv');
import dotenv from 'dotenv';

import OpenAI from "openai";

// const openai = new OpenAI({
// });

const embeddings = new HuggingFaceTransformersEmbeddings({
  modelName: "WhereIsAI/UAE-Large-V1",
});

function normalizeDocuments(docs) {
  return docs.map((doc) => {
    if (typeof doc.pageContent === "string") {
      return doc.pageContent;
    } else if (Array.isArray(doc.pageContent)) {
      return doc.pageContent.join("\n");
    }
  });
}
const loader = new DirectoryLoader(`./uploads`, {
  ".json": (path) => new JSONLoader(path),
  ".txt": (path) => new TextLoader(path),
  ".csv": (path) => new CSVLoader(path),
  ".pdf": (path) => new PDFLoader(path),
});
const docs = await loader.load();
   
const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
});

// const normalizedDocs = normalizeDocuments(docs);

// const splitDocs = await textSplitter.createDocuments(normalizedDocs);
// // Vectorize data using embeddings.
// const vectorStore = await FaissStore.fromDocuments(splitDocs, embeddings);
// // Save embeddings for future analysis.
// await vectorStore.save(`./embeddings`);

const queryController = async (query)=>{
  // const query = "Who win the IPL last night";
  console.log("Runnig query Controller");
  const systemPrompt = "";
  const context = "";
  
  const searchInternet = await search(query, {
    safeSearch: SafeSearchType.STRICT
  });
  
  const searchResult = searchInternet.results[0]


  // const prompt = `${systemPrompt}\n Answer the last question using the provided context ${searchResult ? 'and search results from internet':''}. Your answer should be in your own words and be no longer than 50 words
  // Context: ${searchResult.description} \n\n`;
  const prompt = `Answer ${query} with reference ${searchResult.description}`;
  console.log(prompt);
   
  
  // const response = await model.invoke(prompt);
  
  const response = await openai.chat.completions.create({
    messages: prompt,
    model: "gpt-3.5-turbo-0125",
  });

  console.log(response);

  return response;
}
console.log(await queryController("Who win IPL last night"));

export default queryController