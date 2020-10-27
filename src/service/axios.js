import axios from "axios";
import { __next } from "@jx3box/jx3box-common/js/jx3box.json";

const $http = axios.create({
    withCredentials: true,
});

const $next = axios.create({
    withCredentials: true,
    baseURL: process.env.NODE_ENV === "production" ? __next : "/",
});

export { $http, $next };
