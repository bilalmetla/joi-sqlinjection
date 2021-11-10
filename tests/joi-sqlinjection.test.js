

const sqli = require("../");
let Joi = require("joi")
Joi = Joi.extend(sqli('string'), sqli('number'), sqli('object'), sqli('array'));

describe("joi-sqli", () => {
//   it("expect to be a function", () => {
//     expect(sqli).toBeFunction();
//   });
//   it("expect extension be added to a base schema", () => {
//     expect(Joi.object()).toHaveProperty("sqli");
//     expect(Joi.array()).toHaveProperty("sqli");
//     expect(Joi.string()).toHaveProperty("sqli");
//   });
    
 

 
 
  
});