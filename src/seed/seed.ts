import { seedUrl } from "../config/seedUrl.js"
import { urlQueue } from "../queue/urlQueue.js";

const urlSeeding = async () => {
    const seeds = seedUrl;
    for(const url of seeds){
        await urlQueue.add('urls', {url : url});
    }
}

urlSeeding();