import axios from "axios";
import { __next } from "@jx3box/jx3box-common/data/jx3box.json";
import {jx3ClientType} from "@jx3box/jx3box-common/js/utils";

const $http = axios.create({
    withCredentials: true,
    headers: {'JX3-Client-Type': jx3ClientType()}
});

const $next = axios.create({
    withCredentials: true,
    baseURL: process.env.NODE_ENV === "production" ? __next : "/",
});

export { $http, $next, axios };
