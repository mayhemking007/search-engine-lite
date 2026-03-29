import {Redis} from "ioredis";
import { redisConnection } from "./redisConnection.js";

export const redis = new Redis(redisConnection);