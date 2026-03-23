import * as cheerio from "cheerio";
import { normalizeUrl } from "./normalizeUrl.js";


export const getPageUrls = (page : any, url : string) => {
    const $ = cheerio.load(page);
    const links : string[] = [];
    $("a[href]").each((_, el) => {
        const href = $(el).attr("href");
        if(!href) return;
        const normalize = normalizeUrl(href as string, url);
        if(!normalize) return;
        if(!normalize.startsWith('http')) return;
        const finalLink = normalize.split('#')[0];
        links.push(finalLink as string);
    });
    return links;
} 