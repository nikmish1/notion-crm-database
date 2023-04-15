import { Client } from '@notionhq/client';
import axios from 'axios';
import express, { Express, Request, Response } from 'express';
require('dotenv').config();


const notionDatabaseId = process.env.NOTION_DATABASE_ID;
const notionSecret = process.env.NOTION_SECRET;
if (!notionDatabaseId || !notionSecret) {
  throw Error('Must define NOTION_SECRET and NOTION_DATABASE_ID in env');
}

const app: Express = express()

const host = 'localhost';
const port = 8000;
const URL = `https://api.notion.com/v1/databases/${notionDatabaseId}/query`

export type Sales = {
  id: number,
  name: string,
  company: string,
  status: 'low' | 'medium' | 'high',
  estimated_value: number,
  account_owner: string,
};




var config = {
  method: 'post',
  url: URL,

  headers: {
    'Authorization': `Bearer ${notionSecret}`,
    'Notion-Version': '2022-06-28',
    'Content-Type': 'application/json',

  },
};

app.get('/sales', async (req: Request, res: Response) => {
  const ress = await axios(config);
  const list = ress.data.results.map((record: any) => {
    console.log("first", JSON.stringify(record.properties))
    const row = {
      id: record.properties.id.title[0].text.content,
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
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
