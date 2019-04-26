

exports.ok = function(body){
    var response = {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json"
        },
        body: body
      };
    return response;
}

exports.error = function(code, body){
    var response = {
        statusCode: code,
        headers: {
          "Content-Type": "application/json"
        },
        body: body
      };
    return response;
}