import { Worker } from "bullmq";
import { redisConnection } from "../lib/redisConnection.js";
import { prisma } from "../db/prisma.js";
import { getTermFrequency, tokenizeText } from "../utils/cleanText.js";

new Worker("indexer", async(job : any) => {
    const docId = job.data.docId;
    if(job.name == "index-doc"){
        const doc = await prisma.document.findFirst({
            where : {id : docId}
        });
        if(!doc) throw new Error("Document is not found");
        const text = `${doc.title} ${doc.content}`;
        const tokens = tokenizeText(text as string);
        const freqMap = getTermFrequency(tokens);
        const indices = await prisma.invertedIndex.createMany({
            data : Object.entries(freqMap).map(([term, frequency]) => ({
                word : term,
                documentId : doc.id,
                frequency : frequency
            })),
            skipDuplicates : true
        });
        if(indices){
            console.log(indices.count);
        }
    }

},
{
    connection : redisConnection,
    concurrency : 2
});