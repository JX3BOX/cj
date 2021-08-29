import axios from "axios";
import { __next } from "@jx3box/jx3box-common/data/jx3box.json";

const $http = axios.create({
    withCredentials: true,
    headers: {'JX3-Client-Type': 2}
});

const $next = axios.create({
    withCredentials: true,
    baseURL: process.env.NODE_ENV === "production" ? __next : "/",
});

export { $http, $next, axios };
