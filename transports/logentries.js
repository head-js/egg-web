const Transport = require('egg-logger').Transport;
const Logger = require('le_node');


let logger = null;


class LogentriesTransport extends Transport {
  log(level, args, meta) {
    const [message] = args;
    // console.log(message);
    // console.log(meta);
    // console.log(this.options);

    const { hostname, pid } = meta;
    const date = meta.date ? meta.date.replace(',', '.') : '';

    const { app: { name, config: { env, cluster: { listen: { port } }, props } } } = this.options;
    // console.log(name);
    // console.log(config);
    // console.log(config.env);
    // console.log(config.props);
    // console.log(config.cluster.listen.port);

    if (env === 'local') {
      return;
    }

    const formatted = `${date} [${name}|${hostname}|${port}] [${pid}] [todo.stack] [${level}] [todo.line] - ${message}`;
    // console.log(formatted);

    if (!logger) {
      logger = new Logger({
        token: props['logentries.token'],
      });
      logger.warn = logger.warning;
      logger.error = logger.err;
    }

    const lvl = level.toLowerCase();
    if (logger[lvl]) {
      logger[lvl](formatted);
    } else {
      logger.info(formatted);
    }
  }
}


module.exports = LogentriesTransport;
