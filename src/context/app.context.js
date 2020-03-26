
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