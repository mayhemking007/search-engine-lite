import axios from "axios"

export const getHTML = async(url : string) => {
    try{
        const response = await axios.get(url, {
            timeout : 5000,
            headers : {
                "User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36"
            },
            maxRedirects : 5
        });
    return response.data;
    }
    catch(e){
        console.log(e);
        throw e;
    }
} 