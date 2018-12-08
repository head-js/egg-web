const Service = require('egg').Service;


module.exports = class Foo extends Service {
  async bar() {
    const { ctx } = this;
    ctx.logger.info('Hello Format %j', { name: 'albert info' });
    ctx.logger.warn('Hello Format %j', { name: 'albert warning' });
  }
};
