
const express = require('express');
const next = require('next');
const routes = require('./routes');
const { siteMapRoutes } = require('./serverRoutes');
const port = parseInt(process.env.PORT, 10) || 5000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = routes.getRequestHandler(app);


app.prepare().then(() => {
    const server = express();
    siteMapRoutes(server);

    server.use('/service-worker.js', express.static(__dirname + '/service-worker.js'));


    server.get('*', (req, res) => {
        return handler(req, res)
    });

    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on blog running port:${port}`);
    });
})
