# vorboss-assignment

## Getting started

- Please make sure you're using node version 16. I tried using Docker but couldn't figure out how to fix an importing module issue.

- Run `yarn` to install dependencies, and `yarn build` to build for the first time.

- Run `yarn start` to start the server.


## Schema
order 
```
{
"order_id": 604,
"order_placed": "2021-10-05",
"product_name": "i heart milk brooch",
"price": 68.83,
"first_name": "Janeva",
"last_name": "Canadine",
"address": "2263 Maple Avenue",
"email": "jcanadinegr@sphinn.com",
"order_status": "in_progress"
}
```

`GET` /orders/total 
```
{[order, order, ...]}
```

`GET` /orders/1
```
{[order]}
```

## Examples of using APIs

- use `alice-2b5z.onrender.com/orders/total` to get all orders from database.
- use `alice-2b5z.onrender.com/orders/{maxRecords}` to get a certain number of orders from database. 
