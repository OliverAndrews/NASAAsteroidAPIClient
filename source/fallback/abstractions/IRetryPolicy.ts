import { ResponseObject } from "../../client/models/ResponseObject";

export interface IRetryPolicy
{
    getWithPolicy(requestString: string): Promise<ResponseObject>;
}