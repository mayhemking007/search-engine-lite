import { prisma } from "../db/prisma.js";
import { indexQueue } from "../queue/indexQueue.js";
import { getPageContent } from "../utils/getPageContent.js"
import { getPageUrls } from "../utils/getPageUrls.js";
import { UrlEnqueue } from "./urlEnqueue.js";

export const handlePage = async (page : any, url : string) => {
    const {title, content} = getPageContent(page);
    let urls = getPageUrls(page, url);
    urls = urls.slice(0,10);
    try{
        await UrlEnqueue(urls);
        const doc = await prisma.document.create({
            data : {
                title : title,
                content : content,
                url : url,
                links : urls
            }
        });
        await indexQueue.add("index-doc", {doc : doc});
    }
    catch(e){
        console.log(e);
        throw e;
    }

    
}