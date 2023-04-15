import http from 'http';
import { Client } from '@notionhq/client';
import axios from 'axios';

require('dotenv').config();

// The dotenv library will read from your .env file into these values on `process.env`
const notionDatabaseId = process.env.NOTION_DATABASE_ID;
const notionSecret = process.env.NOTION_SECRET;

// Will provide an error to users who forget to create the .env file
// with their Notion data in it
if (!notionDatabaseId || !notionSecret) {
  throw Error('Must define NOTION_SECRET and NOTION_DATABASE_ID in env');
}

// Initializing the Notion client with your secret
const notion = new Client({
  auth: notionSecret,
});

const host = 'localhost';
const port = 8000;

export type Sales = {
  id: number,
  name: string,
  company: string,
  status: 'low' | 'medium' | 'high',
  estimated_value: number,
  account_owner: string,
};

const URL = `https://api.notion.com/v1/databases/${notionDatabaseId}/query`


var config = {
  method: 'post',
  url: URL,

  headers: {
    'Authorization': `Bearer ${notionSecret}`,
    'Notion-Version': '2022-06-28',
    'Content-Type': 'application/json',

  },
};


const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  switch (req.url) {
    case '/sales/':
      // Query the database and wait for the result

      const ress = await axios(config);


      const list = ress.data.results.map((record: any) => {

        const row = {
          // id: record.properties.id.content,
          estimated_value: record.properties.estimated_value.number,
          name: record.properties.name.rich_text[0].text.content,
          company: record.properties.company.rich_text[0].text.content,
          status: { name: record.properties.status.select.name, color: record.properties.status.select.color },
          account_owner: record.properties.account_owner.created_by.id,

        }

        return row;
      });



      res.setHeader('Content-Type', 'application/json');
      res.writeHead(200);
      res.end(JSON.stringify(list));
      break;

    default:
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Resource not found' }));
  }
});

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
