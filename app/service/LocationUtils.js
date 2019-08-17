const Service = require('egg').Service;


module.exports = class LocationUtils extends Service {
  getProto() {
    const { ctx } = this;
    const proto = ctx.request.header['x-forwarded-proto'] || ctx.request.header.proto || 'http://';
    return proto;
  }

  getHost() {
    const { ctx } = this;
    const host = ctx.request.header['x-forwarded-host'] || ctx.request.header.host;
    return host;
  }

  getHref() {
    const pathname = `${this.getProto()}${this.getHost()}`;
    return pathname;
  }

  getAppUrl(page) {
    const pathname = `${this.getProto()}${this.getHost()}${page}`;
    return pathname;
  }
};
