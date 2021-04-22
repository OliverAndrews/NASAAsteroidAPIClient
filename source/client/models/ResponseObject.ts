import { HTTPResponse } from "../../resources/enums/HTTPResponse";

export class ResponseObject
{
    public Payload: any;
    public ResponseCode: HTTPResponse;

    constructor(payload: any, responseCode: HTTPResponse)
    {
        this.Payload = payload;
        this.ResponseCode = responseCode;
    }
}