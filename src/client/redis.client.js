import * as redis_config from "../config/redis.config";
import * as context from "../context/app.context";

exports.sharedKey = async function(partials){
    let prefix = context.getProfile()+".shared_cache";
    let key = "";
    partials.forEach(p => {
        key = key + "."+p;
    });
   return prefix + key;
}


exports.getValue = async function(key){
    let client = await redis_config.getClient();
    return new Promise((resolve, reject)=>{
        client.get(key, function (err, value) {
            if (err) 
                reject(err);
            else 
                resolve(value);
        });
    });
}

exports.getTenantConnectionParams = async function(key){
    if(context.getProfile() == 'local1'){
        let localDbConfig = context.REQUEST_CONTEXT.get().app_config.dbserver.primary;
        console.log(localDbConfig);
        return JSON.stringify({ 
           host:localDbConfig.host,
           port: localDbConfig.port,
           username: localDbConfig.username,
           password: localDbConfig.password,
           validationQuery: localDbConfig.validationQuery,
           validationInterval: localDbConfig.validationInterval,
           database: localDbConfig.database,
           connectTimeout: localDbConfig.connectTimeout 
        });
    }else{
        let client = await redis_config.getClient();
        return new Promise((resolve, reject)=>{
            client.get(key, function (err, value) {
                if (err) 
                    reject(err);
                else 
                    resolve(value);
            });
        });
    }
}