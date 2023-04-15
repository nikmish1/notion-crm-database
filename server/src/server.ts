import http from "http";
import { Client } from "@notionhq/client";
require("dotenv").config();



// The dotenv library will read from your .env file into these values on `process.env`
const notionDatabaseId = process.env.NOTION_DATABASE_ID;
const notionSecret = process.env.NOTION_SECRET;

// Will provide an error to users who forget to create the .env file
// with their Notion data in it
if (!notionDatabaseId || !notionSecret) {
    throw Error("Must define NOTION_SECRET and NOTION_DATABASE_ID in env");
}

// Initializing the Notion client with your secret
const notion = new Client({
    auth: notionSecret,
});

const host = "localhost";
const port = 8000;

// Require an async function here to support await with the DB query
const server = http.createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    switch (req.url) {
        case "/":
            // Query the database and wait for the result
            const query = await notion.databases.query({
                database_id: notionDatabaseId,
            });

            // We map over the complex shape of the results and return a nice clean array of
            // objects in the shape of our `ThingToLearn` interface
            const result = []
            const list = query.results.map((row) => {
                console.log("rowL: ", row);
                result.push(row);


                return { status: "success", data: row }
            });

            res.setHeader("Content-Type", "application/json");
            res.writeHead(200);
            res.end(JSON.stringify(list));
            break;

        default:
            res.setHeader("Content-Type", "application/json");
            res.writeHead(404);
            res.end(JSON.stringify({ error: "Resource not found" }));
    }
});

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});