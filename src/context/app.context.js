
export function getProfile(){
    return process.env['lambda_profile'];
}

export const REQUEST_CONTEXT = {
    current: {},
    set: (val) => {
        REQUEST_CONTEXT.current['request'] = val;
    },
    get: () => REQUEST_CONTEXT.current['request']
};

export function getTenantId(){
    return REQUEST_CONTEXT.get().tenant_id;
}

export function getSessionUser(){
    return REQUEST_CONTEXT.get().session;
}

export function getRequest(){
    return REQUEST_CONTEXT.get();
}

export function getLambdaContext(){
    return REQUEST_CONTEXT.get().lambda_context;
}