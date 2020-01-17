const fs = require('fs');
const path = require('path');
const request = require('syncrequest');


module.exports = function envfileLoader(dirname) {
  const envfile = process.env.EGG_WEB_ENVFILE;
  if (envfile) {
    const resp = request.get.sync(envfile);
    return resp.body;
  } else {
    return fs.readFileSync(path.resolve(dirname, './envfile'), 'utf-8');
  }

  return props;
}
