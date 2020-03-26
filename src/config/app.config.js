import yaml from "js-yaml";
import AWS from "aws-sdk";

var appConfig = null;
export async function loadAppConfig(request){
    if(!appConfig){
        let params = {
            Bucket: request.config_basepath.replace("s3:",""),
            Key: "ymls/appconfig-"+request.lambda_profile+".yml"
        }
        let s3 = new AWS.S3();
        let result = await s3.getObject(params).promise();
        let data = yaml.safeLoad(result.Body.toString());
        appConfig = data;
    }
    return appConfig;
}

export function getAppConfig(){
    return appConfig;
}