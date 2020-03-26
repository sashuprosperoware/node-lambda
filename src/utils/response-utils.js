

export function ok(body){
    let response = {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json"
        },
        body: body ? JSON.stringify(body) : JSON.stringify({}),
        isBase64Encoded: false
      };
    return response;
}

export function error(code, body){
    let response = {
        statusCode: code,
        headers: {
          "Content-Type": "application/json"
        },
        body: body ? JSON.stringify(body) : JSON.stringify({}),
        isBase64Encoded: false
      };
    return response;
}