import * as metadata_dao from "../dao/metadata.dao";

export async function fetchAllMetadataDefinition(){
    let results =  await metadata_dao.fetchMetadataDefinition();
    return results;
}