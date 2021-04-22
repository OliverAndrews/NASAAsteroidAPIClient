import { ResponseObject } from "../../client/models/ResponseObject";
import { IRetryPolicy } from "../abstractions/IRetryPolicy";
import * as polly from 'polly-js';
import axios from "axios";
import { HTTPResponse } from "../../resources/enums/HTTPResponse";

export class PollyJSRetryPolicy implements IRetryPolicy
{
    private _polly: polly.Polly;
    private _delay: number;
    private _count: number;

    constructor(retryCount: number, retryDelay: number) 
    {
        this._polly = polly();
        this._delay = retryDelay;
        this._count = retryCount;
    }

    public async getWithPolicy(requestString: string): Promise<ResponseObject> {
        var result = await this._polly
            .retry(this._count)
            .executeForPromise(() => {
                return axios.get(requestString);
            })
            .then((result) => {
                return result;
            }, (err) => {
                return err;
            });
        return new ResponseObject(result.data, parseInt(result.status));
    }

}