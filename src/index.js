import responses from './responses';
import { isEmptyObject, isRequired, invalidRequest } from './helpers';
import { matchPhone } from './phoneHelpers';
import { matchEmail } from './emailHelpers';

const Ganon = (opts) => {
  let returnVal = {};

  if (opts && Object.keys(opts).length) {
    returnVal = initialize(opts);
  }

  return returnVal;
}

function initialize(opts) {
  const returnVal = validate(opts);

  return {
    ...returnVal,
  };
}

function validate(opts) {
  const returnVal = { success: true };

  for (let prop in opts) {
    if (!opts[prop].type) {
      return invalidRequest('type', prop);
    }

    returnVal[prop] = evaluateProp(opts, prop);

    if (!returnVal[prop]) {
      delete returnVal[prop];
    } else if (isEmptyObject(returnVal[prop])) {
      delete returnVal[prop];
    }
  }

  return returnVal;
}

function evaluateProp(opts, prop) {
  const func = eval(opts[prop].type);

  const returnVal = func ? func(opts[prop], prop) : null;

  return returnVal;
}

function phone(object) {
  let returnVal = {};

  for (let i = 0; i < object.value.length; i++) {
    const key = object.value[i];

    const conditional = isRequired(key) || matchPhone(key);

    if (conditional) {
      returnVal[`userPhones-${i}`] = responses[object.type];
    }
  }

  return returnVal;
}

function email(object) {
  let returnVal = {};

  for (let i = 0; i < object.value.length; i++) {
    const key = object.value[i];

    const conditional = isRequired(key) || matchEmail(key);

    if (conditional) {
      returnVal[`userEmails-${i}`] = responses[object.type];
    }
  }

  return returnVal;
}

function birthday(object, prop) {
  let returnVal;

  return returnVal;
}

function location(object, prop) {
  let returnVal;

  return returnVal;
}

function string(object, prop) {
  let returnVal;

  const conditional = isRequired(object);

  if (conditional) {
    returnVal = responses[prop];
  }

  return returnVal;
}

module.exports = Ganon;
