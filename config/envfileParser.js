module.exports = function envfileParser(envfile) {
  const lines = envfile.split('\n');

  const props = {};
  const discovery = {};
  lines.forEach(p => {
    if (p) {
      const idx = p.indexOf('=');
      const k = p.substring(0, idx);
      const v = p.substring(idx + 1);
      if (k && v) {
        if (k.indexOf('url.') === 0) {
          discovery[k.substring(4)] = v;
        } else {
          props[k] = v;
        }
      }
    }
  });
  props.discovery = discovery;

  return props;
}
