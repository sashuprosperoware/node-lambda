import * as redisClient from "./redis.client";
import * as context from "../context/app.context";
import mysql from "mysql2";
import {logger} from "../logger/app.logger";

export async function getConnection(){

    let cacheKey = await redisClient.sharedKey([context.REQUEST_CONTEXT.get().tenant_id,"config","rds"]);
    let cacheValue = await redisClient.getTenantConnectionParams(cacheKey);
    let params = JSON.parse(cacheValue);

    logger.debug("MYSQL Connection Parameters. "+ JSON.stringify(params));

    let connectionParams = {
        host: params.host,
        port: params.port,
        user: params.username,
        password: params.password,
        database: params.database,
        connectTimeout:params.connectTimeout,
        charset: "utf8mb4"
    }
    let connection = await mysql.createConnection(connectionParams);
    return connection;
}

export async function query(query, params){
    let conn = await getConnection();
    return new Promise((resolve, reject) => {
        logger.debug("QUERY : " + conn.format(query, params));
        conn.execute(query, params, function(error, results, fields) {
            closeConnection(conn);
            if (error) {
                reject(error)
            } else {
                resolve(results)
            }
        });
    });
}

export function closeConnection(connection){
    try{
        connection.end();
    }catch(err){
        logger.error("Error Closing Connection");
    }
}