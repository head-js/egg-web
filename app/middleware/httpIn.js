module.exports = options => {
  return async function httpIn(ctx, next) {
    await next();

    const { env, protocolHeaders, ipHeaders, hostHeaders } = ctx.app.config;
    // console.log(protocolHeaders);
    // console.log(ipHeaders);
    // console.log(hostHeaders);

    // console.log(ctx.request);
    if (env !== 'local') {
      const { method, url } = ctx.request;
      ctx.logger.info(`[HttpIn] ${method} ${url}`, '[egg-web/m/httpIn:13]'); // TODO: ResponseStatus
    }
    // [HttpIn]
    // requestContentType
    // requestId
    // userAgent
  };
};
