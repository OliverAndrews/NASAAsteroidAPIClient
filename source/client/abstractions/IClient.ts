import { Asteroid } from '../models/Asteroid';
import { RequestObject } from '../models/RequestObject';
import { ResponseObject } from '../models/ResponseObject';

export interface IClient 
{
    initialize(): Promise<boolean>;
    fetch(): Promise<ResponseObject>;
    fetch(request: RequestObject): Promise<ResponseObject>;
    fetch(request: RequestObject, asteroid: Asteroid): Promise<ResponseObject>;
    dispose(): Promise<boolean>;
}