import regeneratorRuntime from "regenerator-runtime/runtime";
import * as proxyResponse from './utils/aws-response.utils';
import * as eventutils from './utils/event.utils';
import * as appRequest from "./request/app.request";
import * as metadata_service from "./services/metadata.service";

let handlers = [
    "GET:/api/v1/metadata-definition",
    "GET:/api/v1/metadata-definition/:id",
    "POST:/api/v1/metadata-definition"
];

exports.handler = async (event, context) => {
    try{
        let result = proxyResponse.error(404, {"error" : "Handler Not Found"});
        let handlerObj = eventutils.resolveHandler(handlers, event);

        console.log(handlerObj);
        
        let apiPath = handlerObj.handler;
        let pathParams = handlerObj.pathParams;

        let request = await appRequest.initRequest(event,context);
        console.log(apiPath);

        switch(apiPath){
            case "GET:/api/v1/metadata-definition":
                result = await metadata_service.fetchAllMetadataDefinition();
                return proxyResponse.ok(result);
            case "GET:/api/v1/metadata-definition/:id":
                result = await metadata_service.fetchMetadataDefinitionById(pathParams.id);
                return proxyResponse.ok(result);
            case "POST:/api/v1/metadata-definition":
                result = await metadata_service.fetchMetadataDefinitionByCriteria(request.body);
                return proxyResponse.ok(result);
        }
        return result;
    }catch(err){
        console.log("Error Executing Handler.", err);
        return proxyResponse.error(500, {"error" : "Internal Error [" + err.name + ':' + err.message + "]"});
    }
}