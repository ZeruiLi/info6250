"use strict"

const SERVER = {
  AUTH_MISSING: 'auth-missing',
};

const CLIENT = {
  NETWORK_ERROR: 'networkError',
  NO_SESSION: 'noSession',
};

const MESSAGES = {
  [CLIENT.NETWORK_ERROR]: 'Network problems. Please try again',
  [CLIENT.NO_SESSION]: 'No login session. Please login',
  [CLIENT.AUTH_MISSING]: 'Auth missing. Please login again',
  default: 'Something went wrong. Please try again',
};

export { SERVER, CLIENT, MESSAGES };