const hasSql = require('./lib/hasSql')


const IS_OBJECT = 'object';
const IS_ARRAY = 'array';
const IS_OBJECT_PROTO = '[object Object]';
const IS_ARRAY_PROTO = '[object Array]';
const SQL_ERROR_MESSAGE = 'sql and single quote is not allowed';
const RULE_NAME = 'sqli'
let deepResult = false;
let injectedValue = '';

/**initial called function from out side. */
module.exports = function (type) {
  return joi => ({
    base: joi[type](),
    name: type,
    language: { sqli: SQL_ERROR_MESSAGE },
    rules: [{
      name: RULE_NAME,
      params: { args: joi.any().optional() },
      validate: function ({ args }, value, state, options) {
                
        let isNotValid = validating(type, value, {...args});
        if (isNotValid === true) {
          
          let error = `${type}.${RULE_NAME}`
          return this.createError(error, {v: injectedValue}, state, options);
        }
        return value;
              
      },
    }],
  });
};


const validating = function (type, value, args) {
  deepResult = false;
  injectedValue = ''
  if (type === IS_OBJECT || type === IS_ARRAY) {
    let deepResult  = deep(value, args)
    return deepResult
  } else {   
    injectedValue = value;
    return hasSql(value)
  }
}


const is = {
  array: x => Object.prototype.toString.call(x) === IS_ARRAY_PROTO || Array.isArray(x),
  object: (x) => {
    if (Object.prototype.toString.call(x) === IS_OBJECT_PROTO) {
      return true;
    }
    if (x === null || x === undefined) {
      return false;
    }
    const prototype = Object.getPrototypeOf(x);
    return prototype === null || prototype === Object.prototype;
  },
};



function deep(value, args) {  
if (is.object(value)) {
  for (const key in value) {
    if ((is.object(value[key]) || is.array(value[key]))) {
      deep(value[key], args);
    } else {
      let isSql = hasSql(value[key])
      if (isSql) {
        injectedValue = value;
        deepResult = isSql;
      }

    }
  }
} else {
  value.forEach((element, index) => {
    if (args.deep && (is.object(element) || is.array(element))) {
      deep(element, args);
    } else {
      return hasSql(element)
    }
  });
  }
  
  return deepResult
}