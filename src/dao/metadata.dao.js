import * as mysql_client from "../client/mysql.client";


export async function fetchMetadataDefinition(){
    let query = "select * from metadata_definition where applicationName = ? and isComposite = ?";
    let results = await mysql_client.query(query, ['CAM', 1]);
    return results;
}