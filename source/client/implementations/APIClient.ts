import { IRetryPolicy } from '../../fallback/abstractions/IRetryPolicy';
import { IClient } from '../abstractions/IClient';
import { Asteroid } from '../models/Asteroid';
import { RequestObject } from '../models/RequestObject';
import { ResponseObject } from '../models/ResponseObject';
import { ClientConfigs } from '../models/ClientConfigs';

export class APIClient implements IClient
{

    private readonly _httpFallbackPolicy: IRetryPolicy;
    private readonly _config: ClientConfigs;

    constructor(httpFallbackPolicy: IRetryPolicy, configs: ClientConfigs){
        this._httpFallbackPolicy = httpFallbackPolicy;
        this._config = configs;
    }

    public async initialize(): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    public async fetch(): Promise<ResponseObject>; // First overload

    public async fetch(request: RequestObject): Promise<ResponseObject>; // Second overload

    public async fetch(request: RequestObject, asteroid: Asteroid): Promise<ResponseObject>; // Third overload

    public async fetch(request?: any, asteroid?: any) { // Overload definition
        var payload: ResponseObject;
        try 
        {
            if(asteroid == null && request == null)
            {
                payload = await this._httpFallbackPolicy.getWithPolicy(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${this._config.ApiKey}`);
    
            } else if (asteroid == null && request != null){
    
                var typedRequest = request as RequestObject;
                var url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${typedRequest.StartDate}&end_date=${typedRequest.EndDate}&api_key=${this._config.ApiKey}`;
                payload = await this._httpFallbackPolicy.getWithPolicy(url);
    
            } else if (asteroid != null && request != null){
    
                var typedAsteroid = asteroid as Asteroid;
                var url = `https://api.nasa.gov/neo/rest/v1/neo/${typedAsteroid.AsteroidID}?api_key=${this._config.ApiKey}`;
                payload = await this._httpFallbackPolicy.getWithPolicy(url);
    
            }  else {
    
                throw new Error("No overload exists for (null, null)");
    
            }
    
        } catch (err: any)
        {
            console.error(err.message);
        }

        return payload;
    }

    public async dispose(): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

}