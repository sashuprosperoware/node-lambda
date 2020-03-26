import regeneratorRuntime from "regenerator-runtime/runtime";
import * as response from './utils/response-utils';
import * as eventutils from './utils/event-utils';
import * as app_request from "./request/app.request";
import * as metadata_service from "./services/metadata.service";

let handlers = [
    "GET:/api/v1/metadata-definition/{id}",
    "GET:/api/v1/metadata-definition"
];

exports.handler = async (event, context) => {
    let result = response.error(404, {"error" : "Handler Not Found"});
    let apiPath = eventutils.resolveHandler(handlers, event).handler;

    await app_request.initRequest(event);
    
    switch(apiPath){
        case "GET:/api/v1/metadata-definition":
            let result = await metadata_service.fetchAllMetadataDefinition();
            return response.ok(result);
        case "GET:/api/v1/metadata-definition/{id}":
            return response.ok({name : "users"});
    }
    return result;
}