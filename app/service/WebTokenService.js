const jwt = require('jsonwebtoken');
const _pick = require('vanilla.js/lodash/pick');
const Service = require('egg').Service;


module.exports = class WebTokenService extends Service {
  async update(input) {
    const { ctx } = this;

    const { ver, pub, prv } = await ctx.service.secret.latest();

    const decoded = await ctx.service.webTokenService.decode();
    // ctx.logger.info('[BB]', decoded);

    // try {
    //   const decoded = jwt.verify(webtoken, certpub, { algorithms: ['RS256'], maxAge: '2h' });
    //   // ctx.logger.info(decoded);
    //   command.openId = decoded.openId;
    // } catch (e) {
    //   if (e.name === 'TokenExpiredError' || e.name === 'JsonWebTokenError') {
    //     ctx.logger.warn(e);
    //   } else {
    //     throw e;
    //   }
    // }

    const output = { ...decoded, ...input };
    // ctx.logger.info(output);
    const encoded = jwt.sign(output, prv, { algorithm: 'RS256' });

    ctx.local = _pick(output, ['uid', 'sid', 'openId', 'unionId']);
    ctx.session.webtoken = encoded;
    ctx.locals.$webtoken = encoded;
    ctx.set('x-web-token', encoded);
  }

  async decode() {
    const { ctx } = this;

    const { ver, pub, prv } = await ctx.service.secret.latest();

    const webtoken = (ctx.request.headers.authorization || '').substring(7) || ctx.session.webtoken;

    const decoded = webtoken ? jwt.decode(webtoken, pub, { algorithms: ['RS256'] }) : {};
    return decoded;
  }
};
