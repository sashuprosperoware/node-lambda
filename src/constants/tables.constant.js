
export const SQL_TABLES  = {
    METADATA_DEFINITION : {
        tableName : "metadata_definition",
        projections : {
            ALL : "*",
            BASIC_INFO : "id,columnName,code,description,parent",
            BASIC_INFO_WITH_AUDIT : "id,columnName,code,description,parent,camCreatedDate,camEditedDate,camCreatedBy,camModifiedBy"
        }
    },
    METADATA : "metadata"
}


export const DYNAMODB_TABLES  = {
    EXTERNAL_APPLICATION_MAPPING : process.env.cam_domain+"_CAM_external_application_mapping",
    EXTERNAL_SYSTEM_ATTRIBUTES : process.env.cam_domain+"_CAM_external_system_attributes"
}