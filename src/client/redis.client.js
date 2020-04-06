import * as context from "../context/app.context";

export async function getClient(){
    let redis_config = context.REQUEST_CONTEXT.get().app_config.cacheConfig;
    let connectionParams = {
        host : redis_config.host,
        port : redis_config.port,
        database: redis_config.database
    }

    if(redis_config.password){
        connectionParams.password = redis_config.password;
    }

    let redis_client = redis.createClient(connectionParams);
    return redis_client;
}


export async function sharedKey(partials){
    let prefix = context.getProfile()+".shared_cache";
    let key = "";
    partials.forEach(p => {
        key = key + "."+p;
    });
   return prefix + key;
}


export async function getValue(key){
    let client = await getClient();
    return new Promise((resolve, reject)=>{
        client.get(key, function (err, value) {
            if (err) 
                reject(err);
            else 
                resolve(value);
        });
    });
}

export async function getTenantConnectionParams(key){
    if(context.getProfile() == 'local'){
        let localDbConfig = context.REQUEST_CONTEXT.get().app_config.dbserver.primary;
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
        let client = await getClient();
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