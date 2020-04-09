import * as dbConstants from "../constants/db.constant";
import { logger } from "../logger/app.logger";

export function getWhereClause(criteria){
    let clause =  "";
    if(criteria){
        criteria.forEach(c => {
            let op = c.operator;
            if(op.indexOf("%{0}%") != -1){
                op = op.replace("%{0}%", "?");
            }
            else if(op.indexOf("{0}%") != -1){
                op = op.replace("{0}%", "?");
            }
            else if(op.indexOf("%{0}") != -1){
                op = op.replace("%{0}", "?");
            }
            clause = clause + " "+c.column + op + "and";
        });
    }
    if(clause.endsWith("and")){
        clause = clause.substring(0, clause.length - 3).trim()
    }
    
    logger.debug("Where Clause : "+ JSON.stringify(clause));

    return clause;
}

export function getQueryParams(criteria){
    let values = [];
    if(criteria){
        criteria.forEach(c => {
            let op = c.operator;
            let val = c.value;
            if(op.indexOf("%{0}%") != -1){
                val = "%"+val+"%";
            }
            else if(op.indexOf("{0}%") != -1){
                val = val+"%";
            }
            else if(op.indexOf("%{0}") != -1){
                val = "%"+val;
            }
            if(c.values && c.values.length > 0){
                values.push(...c.values);
            }
            else if(c.value){
                values.push(val);
            }
        });
    }
    
    logger.debug("Query Param Values : "+ JSON.stringify(values));

    return values;
}

export function getSQLCriteriaFromQueryParams(query){
    let criteriaList = [];
    if(query !== null && Object.keys(query).length > 0){
        let mysqloperators = dbConstants.MYSQL_OPERATORS;
        let operatorKeys = Object.keys(mysqloperators);
        Object.keys(query).forEach(q => {
            if(q != dbConstants._PAGE_NO && q != dbConstants._PAGE_SIZE && q != dbConstants._SORT){
                let criteria = {};

                let key = q;
                let value = query[key];
                let values = [];
                let operator = dbConstants.MYSQL_OPERATORS.eq;

                if(value && value.length > 0){
                    operatorKeys.forEach(op => {
                        if(value.startsWith(op) && value.indexOf("(")!=-1 && value.endsWith(")")){
                            let op = value.split("(")[0];
                            value = value.replace(op+"(", "");
                            value = value.substring(0, value.length - 1);
                            
                            operator = dbConstants.MYSQL_OPERATORS[op];
                            
                            if(op == 'between'){
                                values = [value.split(',')[0].trim(), value.split(',')[1].trim()];
                            }
                        }
                    });
                }

                // if(key && operator && value && values){
                criteria.column = key;
                criteria.value = value;
                criteria.values = values;
                criteria.operator = operator;

                criteriaList.push(criteria);
                // }
            }
        });
    }

    logger.debug("Criteria List From Request : "+ JSON.stringify(criteriaList));

    return criteriaList;
}