import { Client } from '@notionhq/client';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import express, { Express, Request, Response } from 'express';
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const notionDatabaseId = process.env.NOTION_DATABASE_ID;
const notionSecret = process.env.NOTION_SECRET;
if (!notionDatabaseId || !notionSecret) {
  throw Error('Must define NOTION_SECRET and NOTION_DATABASE_ID in env');
}

const app: Express = express();
const jsonParser = bodyParser.json();


app.use(cors({ origin: 'http://localhost:3000' }));
const port = 8000;
const endpoint = `https://api.notion.com/v1/databases/${notionDatabaseId}/query`;

type Sales = {
  id: number;
  name: string;
  company: string;
  status: 'low' | 'medium' | 'high';
  estimated_value: number;
  account_owner: string;
};

type SortNotionParams = {
  sortProperty: string;
  sortOrder: 'asc' | 'desc';
}

let config = {
  Authorization: `Bearer ${notionSecret}`,
  'Notion-Version': '2022-06-28',
  'Content-Type': 'application/json',
};

// app.get('/sales', async (req: Request, res: Response) => {
//   const ress = await axios.post(endpoint, {}, { headers: config });

//   const list = ress.data.results.map((record: any) => {
//     return getRowFromProperties(record.properties);
//   });


//   res.send(list);
// });

app.post("/sales/", jsonParser, async (req: Request, res: Response) => {
  const sortPayload: {
    sorts: {
      property: string,
      direction: 'ascending' | 'descending'
    } | {}
  } = req.body.sortParams;

  try {
    const ress = await axios.post(endpoint, sortPayload, { headers: config });

    const list = ress.data.results.map((record: any) => {
      return record.properties;
    });

    //res.writeHead(200);
    res.send(list);
  }
  catch (err: any | AxiosError) {
    console.log(err)
    res.send(err);
  }
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

// const getRowFromProperties = ({ id, estimated_value, name, company, status, account_owner }: any) => {
//   const row = {
//     id: { type: id.type, value: id.title[0].text.content },
//     estimated_value: { type: estimated_value.type, value: estimated_value.number },
//     name: {type:  value: name.rich_text[0].text.content},
//     company: company.rich_text[0].text.content,
//     status: { name: status.select.name, color: status.select.color },
//     account_owner: account_owner.created_by.id,
//   };
//   return row;
// };
