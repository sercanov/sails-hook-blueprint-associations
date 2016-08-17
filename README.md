# sails-hook-blueprint-associations
Custom blueprint hook to get associations

# Using

### Install

`npm install sails-hook-blueprint-associations --save`

### Rock

`GET /:model/associations`

Ex request
`'GET /user/associations'`

Ex response
```javascript

{
  "associations": [
    {
      "alias": "endpoints",
      "type": "collection",
      "collection": "endpoint",
      "via": "users"
    },
    {
      "alias": "clients",
      "type": "collection",
      "collection": "client",
      "via": "user"
    }
  ]
}
```
