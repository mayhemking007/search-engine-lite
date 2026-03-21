import { Worker } from "bullmq";
import { redisConnection } from "../lib/redisConnection.js";

new Worker('url-crawler', async (job : any) => {
    console.log("Worker has started")
},
{
    connection : redisConnection,
    concurrency: 5
})