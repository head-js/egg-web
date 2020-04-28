const REG_DISCOVERY = /^service\.([a-z0-9]+)\.url$/;


module.exports = function envfileParser(envfile) {
  const lines = envfile.split('\n');

  const props = {};
  const discovery = {};
  lines.forEach(p => {
    if (p) {
      const idx = p.indexOf('=');
      const k = p.substring(0, idx).trim();
      const v = p.substring(idx + 1).trim();
      if (k && v) {
        const matches = k.match(REG_DISCOVERY);
        if (matches) {
          discovery[matches[1]] = v;
        } else {
          props[k] = v;
        }
      }
    }
  });
  props.discovery = discovery;

  return props;
}
