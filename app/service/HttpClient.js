const Service = require('egg').Service;
const WebClientException = require('egg-web/exception/WebClientException');
const WebServerException = require('egg-web/exception/WebServerException');


module.exports = class HttpClient extends Service {
  async doExecute(method, endpoint, command) {
    const { ctx } = this;
    const { status, headers, data, res } = await ctx.curl(endpoint, {
      method,
      contentType: 'json',
      dataType: 'json',
      data: command,
    });
    // ctx.logger.info(status);
    // ctx.logger.info(headers);
    // ctx.logger.info(data);
    // ctx.logger.info(res);

    if (status >= 500) {
      if (data.code && data.message) {
        throw new WebServerException(status, data.code, data.message);
      } else {
        const developerMessage = JSON.stringify(data);
        throw new WebServerException(status, -1, 'INTERNAL SERVER ERROR', developerMessage);
      }
    } else if (status >= 400) {
      if (data.code && data.message) {
        throw new WebClientException(status, data.code, data.message);
      } else {
        const developerMessage = JSON.stringify(data);
        throw new WebClientException(status, -1, 'BAD REQUEST', developerMessage);
      }
    } else {
      return data;
    }
  }

  async doGet(endpoint, query) {
    // TODO: append query
    return this.doExecute('GET', endpoint);
  }

  async doPost(endpoint, command) {
    return this.doExecute('POST', endpoint, command);
  }
}
