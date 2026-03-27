import { Router } from "express";
import { cleanText, tokenizeText } from "../utils/cleanText.js";
import { prisma } from "../db/prisma.js";

export const queryRouter = Router();

queryRouter.post("/", async(req, res) => {
    const query = req.body.query;
    const cleanQuery = cleanText(query);
    const tokens = tokenizeText(cleanQuery);
    console.log(tokens);
    try{
        const results = await prisma.invertedIndex.groupBy({
            by : ["documentId"],
            where : {word : {in : tokens}},
            _sum : {
                frequency : true
            },
            orderBy : {
                _sum : {
                    frequency : "desc"
                }
            },
            take : 10
        });
        const docs = await prisma.document.findMany({
            where : {id : {in : results.map(r => r.documentId)}}
        });
        const showData = docs.map((d) => ({
            id : d.id,
            title : d.title,
            link : d.url,
            content : d.content.slice(0, 30)
        }))
        res.json({
            success : true,
            data : showData
        });
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            error : "Internal Server Error. Cannot POST query."
        })
    }

});