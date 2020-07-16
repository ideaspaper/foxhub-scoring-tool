# Foxhub Scoring Tool

## Description

Since Hacktiv8's Foxhub website load very slowly, that makes scoring students' submissions an exhausting task. This project is aimed to make scoring process faster without using Foxhub website. Instead, scoring can be done through CLI alone.

## Installation

This app deppends on some external packages. Use `npm install` to install all needed packages.

## Usage

### `db_conf.json`

Database configuration for this app will be taken from `db_conf.json`. You should create the file then put it in `src` directory. The template for `db_conf.json` is as below.

```json
{
  "host": "",
  "port": 0,
  "user": "",
  "database": "",
  "password": ""
}
```

- `host`: address of the database server.
- `port`: port of the database server.
- `user`: user of the database.
- `database`: the name of the database.
- `password`: password of the database.

After configuring `db_conf.json`, execute `node foxhub.js --help` to view the in-app help.
