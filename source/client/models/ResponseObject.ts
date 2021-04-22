import { HTTPResponse } from "../../resources/enums/HTTPResponse";

export class ResponseObject
{
    public Payload: string;
    public ResponseCode: HTTPResponse;

    constructor(payload: string, responseCode: HTTPResponse)
    {
        this.Payload = payload;
        this.ResponseCode = responseCode;
    }
}