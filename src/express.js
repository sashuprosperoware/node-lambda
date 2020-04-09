import * as converter from "./utils/event.utils";
import * as handlers from "./handlers";
import { Router } from "express";

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const defaultPort = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ strict: true }));


app.get('/api/v1/metadata-definition', async (req, res) => {
    let event = converter.prepareApiGatewayEvent(req);
    let result = await handlers.handler(event, {});
    res.status(result.statusCode).json(JSON.parse(result.body));
});

app.get('/api/v1/metadata-definition/pages', async (req, res) => {
    let event = converter.prepareApiGatewayEvent(req);
    let result = await handlers.handler(event, {});
    res.status(result.statusCode).send(JSON.parse(result.body));
});

app.get('/api/v1/metadata-definition/:id', async (req, res) => {
    let event = converter.prepareApiGatewayEvent(req);
    let result = await handlers.handler(event, {});
    res.status(result.statusCode).send(JSON.parse(result.body));
});

app.post('/api/v1/metadata-definition', async (req, res) => {
    let event = converter.prepareApiGatewayEvent(req);
    let result = await handlers.handler(event, {});
    res.status(result.statusCode).send(JSON.parse(result.body));
});

export function getExpressApp(){
    return app;
}

export function startExpressApp(port){
    if(process.env.lambda_profile == 'local'){
        app.listen(port ? port : defaultPort, () => console.log(`Express App Started.Listening on port ${port ? port : defaultPort}!`));
    }
}

export function getHttpRoutes(){
    let handlers = [];
    app._router.stack.forEach(r => {
        if(r.route){
            let route = r.route;
            let methods = Object.keys(route.methods).map((x) => { return x.toUpperCase() });
            let path = route.path;

            if(methods.length > 0 && path && path.length > 0){
                methods.forEach(m => {
                    handlers.push(m+":"+path);
                });
            }
        }
    });
    return handlers;
}