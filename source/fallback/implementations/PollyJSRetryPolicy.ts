import { ResponseObject } from "../../client/models/ResponseObject";
import { IRetryPolicy } from "../abstractions/IRetryPolicy";

export class PollyJSRetryPolicy implements IRetryPolicy
{
    public async getWithPolicy(requestString: string): Promise<ResponseObject> {
        throw new Error("Method not implemented.");
    }

}