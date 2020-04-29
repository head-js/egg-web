'use strict';

module.exports = app => {
  const { router, controller } = app;
  const forward = app.middlewares.forward();

  router.get('/', controller.view.index);

  /**
   * /magi/s1/vo-api/books                        ->    /s1/vo-api/books                       # 完全匹配，显式转发
   * /magi/s1/vo-api/books/:isbn/chapters/:chp    ->    /s1/vo-api/books/:isbn/chapers/:chp    # @params
   * /magi/s2/vo-api/**                           ->    /s2/vo-api/**                          # 通配符匹配，显式转发
   * /magi/s3/admin-api/**                        ->    /s3/admin/api/**                       # 转发时改写
   */
  router.get('/magi/s1/vo-api/books', forward('s1', '/vo-api/books'));
  router.post('/magi/s1/vo-api/books', forward('s1', '/vo-api/books'));
  router.get('/magi/s1/vo-api/books/:isbn/chapters/:chp', forward('s1', ({ isbn, chp }) => `/vo-api/books/${isbn}/chapters/${chp}`));
  router.all('/magi/s2/vo-api/:wildcard+', forward('s2', ({ wildcard }) => `/vo-api/${wildcard}`));
  router.all('/magi/s3/admin-api/:wildcard+', forward('s3', ({ wildcard }) => `/admin/api/${wildcard}`));

  /**
   * /magi/api/account/**    ->    /s1/admin/api/users/:uid/**    # 额外传参，框架约定统一参数
   * /magi/api/account       ->    /s1/admin/api/users/:uid
   */
  router.all('/magi/api/account/:wildcard+', forward('s1'), ({ wildcard, local }) => `/admin/api/users/${local.uid}/${wildcard}`);
  router.all('/magi/api/account', forward('s1', ({ local }) => `/admin/api/users/${local.uid}`));

  // TODO: sign / r_s
  
  /**
   * /magi/stereotype-api/s1/** -> /s1/admin/api/**
   * /magi/stereotype-api/s2/** -> /s2/admin/api/**
   * ...
   * /magi/stereotype-api/:service/**    ->    /:service/admin/api/**    # 一类接口的格式一致，service 本身是参数
   */
  router.all('/magi/stereotype-api/:service/:wildcard+', forward(({ service }) => service, ({ wildcard }) => `/stereotype-api/${wildcard}`));

  /**
   * /magi/free-api/s1/history-books/**    ->    /s1/history-books/**   # 完全自由
   * /magi/free-api/s1/**                  ->    /s1/admin/api/**
   * /magi/free-api/s2/**                  ->    /s2/admin/api/**
   * /magi/free-api/s4/**                  ->    /s3/s4/admin-api/**    # s4 不是真实独立的服务，而是 s3 的一个子服务
   * /magi/free-api/s5/**                  ->    /s3/s5/admin-api/**
   */
  router.all('/magi/free-api/:service/:wildcard+', forward(
    ({ service }) => {
      switch (service) {
        case 's1':
          return 's1';
        case 's2':
          return 's2';
        case 's4':
          return 's3';
        case 's5':
          return 's3';
        default:
          throw new TypeError('invalid service');
      }
    },
    ({ service, wildcard }) => {
      switch (service) {
        case 's1':
          if (wildcard.indexOf('history-') === 0) {
            return `/history-api/${wildcard.substring(8)}`; // 'history-'.length
          } else {
            return `/admin/api/${wildcard}`;
          }
        case 's2':
          return `/admin/api/${wildcard}`;
        case 's4':
          return `/s4/admin-api/${wildcard}`;
        case 's5':
          return `/s5/admin-api/${wildcard}`;
        default:
          throw new TypeError('invalid service');
      }
    }
  ));
};
