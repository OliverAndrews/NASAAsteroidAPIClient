import { Asteroid } from '../models/Asteroid';
import { RequestObject } from '../models/RequestObject';
import { ResponseObject } from '../models/ResponseObject';

export interface IClient 
{
    initialize(): boolean;
    get(): ResponseObject;
    get(request: RequestObject): ResponseObject;
    get(asteroid: Asteroid, request: RequestObject): ResponseObject;
    dispose(): boolean;
}