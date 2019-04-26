import regeneratorRuntime from "regenerator-runtime/runtime";
import * as user from './controller/user.controller';
import * as response from './utils/response';


exports.handler = async (event, context) => {
    console.log(event);
    console.log(context);
    let u = user.getUser();
    return response.ok(u);
}