const { URL } = require('url');


module.exports = options => {
  return function wrapper (context, replace) {
    return async function forward(ctx, next) {
      const { host, pathname: prefix } = new URL(ctx.discovery[context]);

      const options = {
        rewrite(opts) {
          const remains = replace ? replace(ctx.params) : ctx.params[0];
          opts.pathname = `${prefix}/${remains}`;
          return opts;
        }
      };

      await ctx.proxyRequest(host, options);
    };
  }
};
