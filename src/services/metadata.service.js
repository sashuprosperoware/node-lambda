import * as metadataDefinitionDao from "../dao/metadata-definition.dao";

export async function fetchAllMetadataDefinition(){
    let results =  await metadataDefinitionDao.findAll();
    return results;
}

export async function fetchMetadataDefinitionById(id){
    let result = await metadataDefinitionDao.findById(id);
    return result;
}

export async function fetchMetadataDefinitionByCriteria(criteria){
    console.log(criteria);
    let results =  await metadataDefinitionDao.findByCriteria(criteria);
    return results;
}