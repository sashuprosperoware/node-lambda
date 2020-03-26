import * as eventUtils from "../utils/event-utils";
import * as appConfig from "../config/app.config";
import * as redisConfig from "../config/redis.config";
import * as context from "../context/app.context";
import {atob} from "atob";

exports.initRequest = async function(event){

    let authorization = eventUtils.getKeyValue(event.headers, "Authorization", false);
    if(!authorization){
        throw new Error("Missing Authorization Header");
    }

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
        "payload" : event.body && event.body.length > 0 ? JSON.parse(event.body) : null,
        "query" : event.queryStringParameters,
        "headers" : event.headers 
    }
    let config = await appConfig.loadAppConfig(requestBean);
    requestBean.app_config = config;

    /**
     * Set Context On Thread
     */
    context.REQUEST_CONTEXT.set(requestBean);

    /**
     * Initialize Redis Config On Request Creation
     */
    await redisConfig.init();

    return requestBean;
}