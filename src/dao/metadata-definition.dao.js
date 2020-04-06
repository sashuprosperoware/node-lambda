import * as tables from "../constants/tables.constant";
import * as baseDAO from "./sql-base.dao";


export async function findById(id){
    let results = await baseDAO.findById(tables.SQL_TABLES.METADATA_DEFINITION.tableName, id);
    return results;
}

export async function findByCriteria(criteria){
    let results = await baseDAO.findByCriteria(tables.SQL_TABLES.METADATA_DEFINITION.tableName, criteria);
    return results;
}

export async function findPageByCriteria(criteria, pageNo, pageSize){
    let results = await baseDAO.findPageByCriteria(tables.SQL_TABLES.METADATA_DEFINITION.tableName, criteria, pageNo, pageSize);
    return results;
}