module.exports = app => {
  return class Foo extends app.Service {
    async bar() {
      const { ctx } = this;
      ctx.logger.info('Hello Format %j', { name: 'albert info' });
      ctx.logger.warn('Hello Format %j', { name: 'albert warning' });
    }
  };
}
