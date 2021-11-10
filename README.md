# joi-sqlinjection
Avoid SQL Injection Attack with the help of Joi validator

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install joi-sqlinjection.

```bash
npm install joi-sqlinjection
```

## Usage
```jaascript
const sqli = require('joi-sqlinjection');
let Joi = require('joi');
Joi = Joi.extend(sqli('string'), sqli('number'), sqli('object'), sqli('array'))

const schema = Joi.object().keys({
    username: Joi.string().sqli().required(),
    phone: Joi.number().sqli().required(),
    password: Joi.string().required(),
    type: Joi.string().sqli(),
    session: Joi.object().keys({
        id:Joi.string(),
        value:Joi.string(),
    }).sqli().required()
});


const data = {
    username: 'my name',
    password: "2323",
    phone: 123654,
    type: '1212',
    session: {
        id: '112 \'select *\'',
        value:'54454'
    }
};

let result = schema.validate(data);
console.log('validation result', result)
```
### Result

```bash
Error [ValidationError]: child "session" fails because ["session" sql and single quote is not allowed]
```