import { prisma } from "../db/prisma.js";

export const isUrlVisited = async (url : string) => {
    try{
        const data = await prisma.visitedUrls.findFirst({
            where : {url : url}
        });
        if(data) return true;
        else return false;
    }
    catch(e){
        console.log(e);
        throw e;
    }
}