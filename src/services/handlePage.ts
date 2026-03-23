import { prisma } from "../db/prisma.js";
import { getPageContent } from "../utils/getPageContent.js"
import { getPageUrls } from "../utils/getPageUrls.js";
import { UrlEnqueue } from "./urlEnqueue.js";

export const handlePage = async (page : any, url : string) => {
    const {title, content} = getPageContent(page);
    const urls = getPageUrls(page, url);
    try{
        await UrlEnqueue(urls);
        await prisma.document.create({
            data : {
                title : title,
                content : content,
                url : url,
                links : urls
            }
        });
    }
    catch(e){
        console.log(e);
        throw e;
    }

    
}