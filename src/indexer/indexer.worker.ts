import { Worker } from "bullmq";
import { redisConnection } from "../lib/redisConnection.js";

new Worker("indexer", async(job : any) => {
    if(job.name == "index-doc"){
        
    }
},
{
    connection : redisConnection,
    concurrency : 2
});