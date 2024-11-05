# Resourceful

## Resource

**Movie Reviews**

Attributes:

* title (string)
* director (string)
* star rating (integer)
* review (string)
* date (string)

## Schema

```sql
CREATE TABLE reviews (
id INTEGER PRIMARY KEY,
title TEXT,
director TEXT,
star rating INTEGER,
review TEXT,
date TEXT);
```

## REST Endpoints

Name                           | Method | Path
-------------------------------|--------|------------------
Retrieve review collection | GET    | /reviews
Retrieve review member     | GET    | /reviews/*\<id\>*
Create review member       | POST   | /reviews
Update review member       | PUT    | /reviews/*\<id\>*
Delete review member       | DELETE | /reviews/*\<id\>*