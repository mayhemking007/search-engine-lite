import * as cheerio from "cheerio";
import { cleanText } from "./cleanText.js";

export const getPageContent = (page : any) => {
    const $ = cheerio.load(page);
    $("script").remove();
    $("style").remove();
    $("nocript").remove();
    $("iframe").remove();

    const title = $("title").text();
    const content = $("body").text();
    
    const cleanContent = cleanText(content);
    return {title : title, content : cleanContent};
} 