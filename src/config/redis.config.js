import redis from "redis";
import * as context from "../context/app.context";

let redis_client = null;

let initClient = async function(){
    let redis_config = context.REQUEST_CONTEXT.get().app_config.cacheConfig;
    let connectionParams = {
        host : redis_config.host,
        port : redis_config.port,
        database: redis_config.database
    }

    if(redis_config.password){
        connectionParams.password = redis_config.password;
    }
    redis_client = redis.createClient(connectionParams);
    return redis_client;
}

exports.getClient = async function(){
    try{
        redis_client.get("test");
        return redis_client;
    }catch(err){
        return initClient();
    }
}

exports.init = async function(){
    await initClient();
}


