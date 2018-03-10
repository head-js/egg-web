module.exports = app => {
  const ctx = app.createAnonymousContext({});

  app.messenger.on('egg-ready', async () => {
    console.log('egg-ready');
  });
};
