const gulp = require('gulp');
const lineno = require('./tasks/append-line-number.js');
const replace = require('./tasks/replace-by-line.js');


gulp.task('logger', function() {
  const PATTERN = /(ctx\.logger\.)(debug|info|warn|error)\('(.+)'(, .+)?\);(.*)/;
  const LINENO = lineno.LINENO;

  gulp
    .src([
      'app/**/*',
      '!app/middleware/**/*',
      '!app/public/**/*',
      '!app/router.js',
    ])
    .pipe(lineno(PATTERN))
    .pipe(replace(PATTERN, function (match, p1, p2, p3, p4, p5) {
      // console.log(method);

      // console.log(match);
      // console.log(p1);
      // console.log(p2);
      // console.log(p3);
      // console.log(p4);
      // console.log(p5);
      const ln = p5.match(LINENO)[1];
      return `${p1}${p2}('${p3}'${p4 || ''}, '[${ln}]');`;
    }))
    .pipe(gulp.dest('app/'));
});
