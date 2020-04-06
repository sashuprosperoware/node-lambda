export function getWhereClause(criteria){
    let clause =  "";
    if(criteria){
        criteria.forEach(c => {
            clause = clause + c.column + " = ?";
        });
    }
    return clause;
}

export function getQueryParams(criteria){
    let values = [];
    if(criteria){
        criteria.forEach(c => {
            values.push(c.value);
        });
    }
    return values;
}