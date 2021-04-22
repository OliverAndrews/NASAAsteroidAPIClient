export class ClientConfigs
{
    public ApiKey: string;
    public RetryCount: Number;
    public RetryDelay: Number;
    
    constructor(apiKey: string, retryCount: Number, retryDelay: Number)
    {
        this.RetryCount = retryCount;
        this.RetryDelay = retryDelay;
        this.ApiKey = apiKey;
    }
}