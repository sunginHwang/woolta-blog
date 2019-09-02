const routes = require('next-routes');

module.exports = routes()
    .add('/test','/test','main')
    .add('postEdit','/edit','postEdit')
    .add('post', '/categories/:categoryNo/posts/:postNo','post')
    .add('posts', '/categories/:categoryNo','posts')
    .add('custom', '/custom/routes/:name','routeCustom');
