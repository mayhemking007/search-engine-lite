export const cleanText = (text : string) => {
    return text.replace(/\s+/g, " ").replace(/[^\w\s]/g, "").toLocaleLowerCase().trim();
}

export const tokenizeText = (text : string) => {
    const words = text.split(" ").filter(Boolean);
    const stopWords = new Set(["the", "is", "a", "an", "and", "or", "to", "of", "in"]);
    const tokens = words.filter((word) => !stopWords.has(word));
    return tokens;
}

export const getTermFrequency = (tokens : string[]) => {
    const frequencyMap : Record<string, number> = {};
    for(const token of tokens){
        frequencyMap[token] = (frequencyMap[token] || 0) + 1;
    }
    return frequencyMap;
}