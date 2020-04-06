import * as converter from "./utils/event.utils";
import * as handlers from "./handlers";

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

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

app.listen(port, () => console.log(`Express App Started.Listening on port ${port}!`));
