import { IRetryPolicy } from '../../fallback/abstractions/IRetryPolicy';
import { IClient } from '../abstractions/IClient';
import { RequestObject } from '../models/RequestObject';
import { ResponseObject } from '../models/ResponseObject';
import { ClientConfigs } from '../models/ClientConfigs';
import { Asteroid } from '../models/Asteroid';

export class MarsRoverImageAPIClient implements IClient
{

    private readonly _httpFallbackPolicy: IRetryPolicy;
    private readonly _config: ClientConfigs;

    constructor(httpFallbackPolicy: IRetryPolicy, configs: ClientConfigs){
        this._httpFallbackPolicy = httpFallbackPolicy;
        this._config = configs;
    }
    
    initialize(): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    fetch(): Promise<ResponseObject>;

    fetch(request: RequestObject): Promise<ResponseObject>;

    fetch(request: RequestObject, asteroid: Asteroid): Promise<ResponseObject>;

    fetch(request?: any, asteroid?: any) {
        throw new Error('Method not implemented.');
    }

    dispose(): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

}