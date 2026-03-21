import { Queue } from "bullmq";
import { redisConnection } from "../lib/redisConnection.js";

export const urlQueue = new Queue('url-crawler', {
    connection : redisConnection,
});