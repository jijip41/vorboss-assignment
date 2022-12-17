# vorboss-assignment

## Getting started

- Run `yarn` to install dependencies, and `yarn build` to build for the first time.

- Run `yarn start` to start the app on the browser. You will be able to watch the web app locally while building: [localhost:3000](http://localhost:3000)


## Alice-server Repo

- Please check the server repository [here](https://github.com/jijip41/alice-server)


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

- use `https://alice-server.onrender.com/orders/total` to get all orders from database.
- use `https://alice-server.onrender.com/orders/{maxRecords}` to get a certain number of orders from database. 

