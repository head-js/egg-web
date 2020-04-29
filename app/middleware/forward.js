const { URL } = require('url');


module.exports = options => {
  return function wrapper (service, replace) {
    return async function forward(ctx, next) {
      const { params } = ctx;

      const svc = (typeof service === 'string') ? service : service(params);
      // ctx.logger.info(svc);

      // NOTE: ctx.discovery.s1 == 'http://172.0.0.1:8080/s1'
      const { host, pathname: prefix } = new URL(ctx.discovery[svc]);
      // ctx.logger.info(params);

      const options = {
        rewrite(opts) {
          const remains = (typeof replace === 'string') ? replace : replace({ ...params, local: { ...ctx.local } });
          opts.pathname = `${prefix}${remains}`;
          return opts;
        }
      };

      await ctx.proxyRequest(host, options);
    };
  }
};
