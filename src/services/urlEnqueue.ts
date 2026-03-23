import { prisma } from "../db/prisma.js";
import { urlQueue } from "../queue/urlQueue.js";
import { isUrlVisited } from "../utils/isUrlVisited.js";

export const UrlEnqueue = async (urls : string[]) => {
    try{
        const links = [];
        for(const url of urls){
            if(await isUrlVisited(url)){
                continue;
            }
            else{
                const urlCount = await prisma.visitedUrls.count();
                if(urlCount > 300) return;
                await prisma.visitedUrls.create({
                    data : {
                        url : url,
                        status : 'VISITED'
                    }
                });
                links.push(url);
            }
        }
        const jobs = links.map((li) => ({
            name : 'urls',
            data : {url : li}
        }));
        await urlQueue.addBulk(jobs);
    }
    catch(e){
        console.log(e);
        throw e;
    }
}