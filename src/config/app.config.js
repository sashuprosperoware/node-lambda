import yaml from "js-yaml";
import AWS from "aws-sdk";
import {logger} from "../logger/app.logger";

let appConfig = null;

export async function loadAppConfig(){
    if(!appConfig){
        let profile = process.env['lambda_profile'];
        let configBasePath = process.env['config_basepath'];

        let params = {
            Bucket: configBasePath.replace("s3:",""),
            Key: "ymls/appconfig-"+profile+".yml"
        }
        let s3 = new AWS.S3();
        let result = await s3.getObject(params).promise();
        let data = yaml.safeLoad(result.Body.toString());
        appConfig = data;

        logger.info("App Config Loaded from S3 : Path :" + params.Bucket + "/"+params.Key);
    }
    return appConfig;
}

export function getAppConfig(){
    return appConfig;
}