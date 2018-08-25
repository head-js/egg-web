module.exports = function envfileParser(envfile) {
  const lines = envfile.split('\n');

  const props = {};
  lines.forEach(p => {
    if (p) {
      const idx = p.indexOf('=');
      const k = p.substring(0, idx);
      const v = p.substring(idx + 1);
      if (k && v) {
        props[k] = v;
      }
    }
  });

  return props;
}
