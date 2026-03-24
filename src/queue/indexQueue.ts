import { Queue } from "bullmq";
import { redisConnection } from "../lib/redisConnection.js";

export const indexQueue = new Queue('indexer', {
    connection : redisConnection
});