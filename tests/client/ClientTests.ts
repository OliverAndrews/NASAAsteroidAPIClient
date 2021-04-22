import { expect } from 'chai';
import { APIClient } from '../../source/client/implementations/APIClient';
import { ClientConfigs } from '../../source/client/models/ClientConfigs';
import {Mock, It, Times} from 'moq.ts';
import { IRetryPolicy } from '../../source/fallback/abstractions/IRetryPolicy';
import { ResponseObject } from '../../source/client/models/ResponseObject';
import { HTTPResponse } from '../../source/resources/enums/HTTPResponse';
import { RequestObject } from '../../source/client/models/RequestObject';
import { Asteroid } from '../../source/client/models/Asteroid';

describe('Tests for APIClient.ts', () => {
    
    var apiKey = "1234567890"

    var configs = new ClientConfigs(apiKey, 1, 0);

    var typedRequest = new RequestObject("2020-01-01", "2020-01-07");
    var typedAsteroid = new Asteroid(123456);

    var firstOverloadURL = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${typedRequest.StartDate}&end_date=${typedRequest.EndDate}&api_key=${apiKey}`;

    var secondOverloadURL = `https://api.nasa.gov/neo/rest/v1/neo/${typedAsteroid.AsteroidID}?api_key=${apiKey}`;

    var baseURL = `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${apiKey}`;


    it("Should call first overload", async() => {

        var retryPolicyMoq = new Mock<IRetryPolicy>();
        retryPolicyMoq
            .setup(obj => obj.getWithPolicy(It.Is(value => typeof(value) == "string")))
            .returns(Promise.resolve(new ResponseObject(null, HTTPResponse.OK)));

        var client = new APIClient(retryPolicyMoq.object(), baseURL, configs);
        await client.fetch();

        var verifyFunc = () => retryPolicyMoq.verify(obj => obj.getWithPolicy(baseURL), Times.Once());
        expect(verifyFunc).to.not.throw(Error());
    });

    it("Should call second overload", async() => {

        var retryPolicyMoq = new Mock<IRetryPolicy>();
        retryPolicyMoq
            .setup(obj => obj.getWithPolicy(It.Is(value => typeof(value) == "string")))
            .returns(Promise.resolve(new ResponseObject(null, HTTPResponse.OK)));

        var client = new APIClient(retryPolicyMoq.object(), baseURL, configs);

        await client.fetch(typedRequest);

        var verifyFunc = () => retryPolicyMoq.verify(obj => obj.getWithPolicy(firstOverloadURL), Times.Once());

        expect(verifyFunc).to.not.throw(Error());
    });


    it("Should call second overload", async() => {

        var retryPolicyMoq = new Mock<IRetryPolicy>();
        retryPolicyMoq
            .setup(obj => obj.getWithPolicy(It.Is(value => typeof(value) == "string")))
            .returns(Promise.resolve(new ResponseObject(null, HTTPResponse.OK)));

        var client = new APIClient(retryPolicyMoq.object(), baseURL, configs);

        await client.fetch(typedRequest, typedAsteroid);

        var verifyFunc = () => retryPolicyMoq.verify(obj => obj.getWithPolicy(secondOverloadURL), Times.Once());

        expect(verifyFunc).to.not.throw(Error());
    });

});