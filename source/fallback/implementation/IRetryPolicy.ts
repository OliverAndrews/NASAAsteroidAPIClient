import { RequestObject } from "../../client/models/RequestObject";

export interface IRetryPolicy
{
    getPolicy(request: RequestObject): string;
}