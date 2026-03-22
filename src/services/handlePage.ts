import { getPageContent } from "../utils/getPageContent.js"
import { getPageUrls } from "../utils/getPageUrls.js";

export const handlePage = async (page : any) => {
    const {title, content} = getPageContent(page);
    const urls = getPageUrls(page);
    
}