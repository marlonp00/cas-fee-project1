import express from 'express';
import bodyParser from 'body-parser';
import path, {dirname, join} from 'path';

import {fileURLToPath} from "url";
import {noteRoutes} from './routes/noteRoutes.js';

const currentDir = dirname(fileURLToPath(import.meta.url));

export const app = express();

app.use(express.static(join(currentDir, '/public')));
app.use(bodyParser.json());

app.get("/", function (req, res) {
    res.sendFile("/index.html", {root: __dirname + '/public/'});
});

app.use("/notes", noteRoutes);


