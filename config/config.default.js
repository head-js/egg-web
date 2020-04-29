'use strict';
const fs = require('fs');
const path = require('path');
const envfileLoader = require('egg-web/config/envfileLoader');
const envfileParser = require('egg-web/config/envfileParser');


module.exports = appInfo => {
  const envfile = envfileLoader(__dirname);
  const props = envfileParser(envfile);

  const config = { props };

  config.keys = 'egg-mq-local-key';

  return config;
};
