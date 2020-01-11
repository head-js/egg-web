const LOCAL = Symbol('context#local');
const DISCOVERY = Symbol('context#discovery');


module.exports = {
  get local() {
    if (!this[LOCAL]) {
      const { p_u: uid = '', p_s: sid = '', p_l: lang = 'zh' } = this.query;
      this[LOCAL] = { uid, sid, lang };
    }
    return this[LOCAL];
  },

  set local(payload) {
    this[LOCAL] = Object.assign({}, this[LOCAL], payload);
  },

  get discovery() {
    return this.app.config.props.discovery;
  },

  rest(...args) {
    if (args.length === 1) {
      const [ data ] = args;
      this.status = 200;
      // this.body = { code: 0, message: 'ok', data };
      this.body = data;
    } else if (args.length === 2) {
      const [ status, data ] = args;
      this.status = status;
      this.body = data;
    } else if (args.length === 0) {
      this.status = 200;
      this.body = { code: 0, message: 'ok' };
    }
  }
};
