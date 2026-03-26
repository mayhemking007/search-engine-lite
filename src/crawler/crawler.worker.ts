import { Worker } from "bullmq";
import { redisConnection } from "../lib/redisConnection.js";
import { getHTML } from "../services/getHTML.js";
import { handlePage } from "../services/handlePage.js";
import { prisma } from "../db/prisma.js";


new Worker('url-crawler', async (job : any) => {
    if(job.name === 'urls'){
        const urlCount = await prisma.visitedUrls.count();
        if(urlCount > 300) return;
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