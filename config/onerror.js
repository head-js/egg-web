const REG_API = /^\/([0-9a-z]+)\/([0-9a-z-]+)?api\/.+/;


module.exports = {
  accepts: function (ctx) {
    if (REG_API.test(ctx.req.url)) {
      return 'json';
    } else {
      return 'html';
    }
  },
  json(err, ctx) {
    ctx.status = 500;
    ctx.body = { code: -1, message: 'INTERNAL SERVER ERROR' };

    // ctx.logger.info(err);
    if (err.status) {
      ctx.status = err.status;
    }
    if (err.code) {
      ctx.body.code = err.code;
    }
    if (err.message) {
      ctx.body.message = err.message;
    }
    // TODO: if env=production
    if (err.developerMessage) {
      ctx.body.developerMessage = err.developerMessage;
    }
  },
};
