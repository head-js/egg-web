'use strict';

module.exports = agent => {
  agent.messenger.on('egg-ready', async () => {
    console.log('egg-ready');
  });
};
