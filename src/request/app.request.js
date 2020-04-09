import * as eventUtils from "../utils/event.utils";
import * as appConfig from "../config/app.config";
import * as context from "../context/app.context";
import {atob} from "atob";
import { logger } from "../logger/app.logger";

export async function initRequest(event, lambdacontext){

    let authorization = eventUtils.getKeyValue(event.headers, "Authorization", false);
    if(!authorization){
        logger.error("Missing Authorization Header in request. 401 Unauthorized Request")
        throw new Error("Missing Authorization Header. 401 Unauthorized Request");
    }
    
    let envConfig = await appConfig.loadAppConfig(requestBean);
    let jwtTokenBody = JSON.parse(atob(authorization.replace("Bearer ", "").split(".")[1]));
    let requestBean =  {
        "tenant_id" : jwtTokenBody.tenant_id,
        "session" : {
            "tenantId" : jwtTokenBody.tenant_id,
            "user_claims" : JSON.parse(atob(jwtTokenBody.user_claims)),
            "user_email" : jwtTokenBody.email,
            "aurora_user_id" : jwtTokenBody.auroraUserId,
            "user_name" : (jwtTokenBody.given_name ? jwtTokenBody.given_name : "") + (jwtTokenBody.family_name ? jwtTokenBody.family_name : "")
        },
        "lambda_profile" : process.env['lambda_profile'],
        "config_basepath" : process.env['config_basepath'],
        "cam_domain" : process.env['cam_domain'],
        "cam_s3_domain" : process.env['cam_s3_domain'],
        "event" : event,
        "body" : event.body && event.body.length > 0 ? JSON.parse(event.body) : null,
        "query" : event.queryStringParameters,
        "headers" : event.headers,
        "lambda_context" : lambdacontext
    }
    
    requestBean.app_config = envConfig;

    /**
     * Set Context On Thread
     */
    context.REQUEST_CONTEXT.set(requestBean);
    return requestBean;
}