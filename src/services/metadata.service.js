import * as metadataDefinitionDao from "../dao/metadata-definition.dao";
import * as queryUtils from "../utils/query.utils";
import * as dbConstants from "../constants/db.constant";

export async function fetchMetadataDefinition(query){
    let criteria = queryUtils.getSQLCriteriaFromQueryParams(query);
    let results =  await metadataDefinitionDao.findByCriteria(criteria);
    return results;
}

export async function fetchMetadataDefinitionByPage(query){
    let criteria = queryUtils.getSQLCriteriaFromQueryParams(query);
    let results =  await metadataDefinitionDao.findPageByCriteria(criteria, query[dbConstants._PAGE_NO], query[dbConstants._PAGE_SIZE]);
    return results;
}

export async function fetchMetadataDefinitionById(id){
    let result = await metadataDefinitionDao.findById(id);
    return result;
}