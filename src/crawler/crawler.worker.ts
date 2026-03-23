import { Worker } from "bullmq";
import { redisConnection } from "../lib/redisConnection.js";
import { getHTML } from "../services/getHTML.js";
import { handlePage } from "../services/handlePage.js";


new Worker('url-crawler', async (job : any) => {
    console.log("Worker has started");
    if(job.name === 'urls'){
        const url = job.data.url;
        console.log(url);
        const page = await getHTML(url);
        await handlePage(page, url);
    } 
},
{
    connection : redisConnection,
    concurrency: 5
});