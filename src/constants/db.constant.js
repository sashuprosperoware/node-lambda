export const MYSQL_OPERATORS = {
    eq : " = ? ",
    lt : " < ? ",
    gt : " > ? ",
    lte : " <= ? ",
    gte : " >= ? ",
    nlt : " !< ? ",
    ngt : " !> ? ",
    neq : " <> ? ",
    between : " between ? and ? ",
    not_null : " is not null ",
    null : " is null ",
    starts_with:  " like {0}% ",
    ends_with: " like %{0} ",
    contains: " like %{0}% "
}

export const _PAGE_NO = "_pageNo";
export const _PAGE_SIZE = "_pageSize";
export const _SORT = "_sort";