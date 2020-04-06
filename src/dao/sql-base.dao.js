
import * as mysql_client from "../client/mysql.client";
import * as query_utils from "../utils/query.utils";

export async function findById(table, id, projection){
    if(typeof projection == 'undefined' || !projection){
        projection = "*";
    }
    let query = "select "+projection+" from " + table + " where id = ?";
    let results = await mysql_client.query(query, [id]);
    if(results.length > 1){
        throw "More than 1 result found. Find By ID expected single result";
    }
    return results.length == 1 ? results[0] : null;
}

export async function findAll(table, projection){
    if(typeof projection == 'undefined' || !projection){
        projection = "*";
    }
    let query = "select "+projection+" from " + table;
    let results = await mysql_client.query(query);
    return results;
}

export async function findByCriteria(table, criteria, projection){
    if(typeof projection == 'undefined' || !projection){
        projection = "*";
    }
    let query = "select "+projection+" from " + table;
    let whereClause = query_utils.getWhereClause(criteria);
    query = query + " where " + whereClause;
    let params = query_utils.getQueryParams(criteria);
    let results = await mysql_client.query(query, params);
    return results;
}

export async function findPageByCriteria(table, criteria, pageNo, pageSize, projection){
    if(typeof projection == 'undefined' || !projection){
        projection = "*";
    }
    if(typeof pageNo == 'undefined' || !pageNo){
        pageNo = 1;
    }
    if(typeof pageSize == 'undefined' || !pageSize){
        pageSize = 100;
    }

    let params = query_utils.getQueryParams(criteria);
    let query = "select " + projection + " from " + table;
    let whereClause = query_utils.getWhereClause(criteria);
    query = query + " where " + whereClause;
    let count = await mysql_client.query(query, params)[0];

    query = query + " limit "+(pageNo - 1) + ", " + pageSize;
    let results = await mysql_client.query(query, params);

    return {
        items : results,
        pageNo : pageNo,
        pageSize : pageSize,
        total : count
    };
}

export async function findByQuery(query, params){
    let results = await mysql_client.query(query, params);
    return results;
}