export const normalizeUrl = (href : string, baseUrl : string) => {
    try{
        const url = new URL(href, baseUrl);
        return url.href;
    }
    catch(e){
        return null;
    }
}