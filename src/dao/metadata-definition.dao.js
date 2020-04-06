import * as tables from "../constants/tables.constant";
import * as baseDAO from "./sql-base.dao";

export async function findAll(){
    let results = await baseDAO.findAll(tables.SQL_TABLES.METADATA_DEFINITION.tableName);
    return results;
}

export async function findById(id){
    let results = await baseDAO.findById(tables.SQL_TABLES.METADATA_DEFINITION.tableName, id);
    return results;
}

export async function findByCriteria(criteria){
    let results = await baseDAO.findByCriteria(tables.SQL_TABLES.METADATA_DEFINITION.tableName, criteria,tables.SQL_TABLES.METADATA_DEFINITION.projections.BASIC_INFO);
    return results;
}