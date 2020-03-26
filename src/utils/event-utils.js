
import * as apiEvents from "../resources/api-gateway";

export function prepareApiGatewayEvent(req){
    let eventObject = apiEvents.EVENT;
    let body = req.body;
    if(body){
        eventObject.body = JSON.stringify(body);
    }
    eventObject.httpMethod = req.method;
    eventObject.path = req.path;
    eventObject.queryStringParameters = req.query;
    
    let multiValueQueryStringParameters = {};
    if(req.query && Object.keys(req.query).length > 0){
        Object.keys(req.query).forEach(key =>{
            let value = req.query[key];
            if(Array.isArray(value)){
                multiValueQueryStringParameters[key] = value;
            }else{
                multiValueQueryStringParameters[key] = [value];
            }
        });
        eventObject.multiValueQueryStringParameters = multiValueQueryStringParameters;
    }
    eventObject.pathParameters.proxy = req.path;
    eventObject.headers = Object.assign(eventObject.headers, req.headers);
    
    let multiValueHeaders = {};
    if(eventObject.headers && Object.keys(eventObject.headers).length > 0){
        Object.keys(eventObject.headers).forEach(key =>{
            let value = eventObject.headers[key];
            if(Array.isArray(value)){
                multiValueHeaders[key] = value;
            }else{
                multiValueHeaders[key] = [value];
            }
        });
        eventObject.multiValueHeaders = multiValueHeaders;
    }

    eventObject.requestContext.path = req.path;
    eventObject.requestContext.httpMethod = req.method;
    
    return eventObject;
}

export function resolveHandler(handlers, event){
    let url = event.path;
    let method = event.httpMethod;

    let path = method + ":" + url;

    let pathScores = [];
    handlers.forEach(p => {
        let absPathParts = p.split("/");
        let relPathParts = path.split("/");

        let score = 0;
        if(absPathParts.length == relPathParts.length){
            score++;
            for(let i = 0 ; i < relPathParts.length; i++){
                if(relPathParts[i] == absPathParts[i]){
                    score++;
                }
            }
        }
        pathScores.push({handler : p, score : score});
    });

    pathScores.sort((a,b) => (b.score > a.score) ? 1 : -1);
    if(pathScores.length > 0){
        return pathScores[0];
    }

    return "";
}

export function getKeyValue(map, key, caseSensitive){
    let value = null;
    if(caseSensitive){
       value = map[key]; 
    }else{
        value = map[key];
        if(!value){
            value = map[key.toLowerCase()];
        }
        if(!value){
            value = map[key.toUpperCase()];
        }
    }
    return value;
}