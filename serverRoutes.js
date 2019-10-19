const { makeCategoriesSiteMap, makePostsSiteMap} = require('./sitemapGenerator');
const path = require('path');

const options = {
    root: path.join(__dirname, '/'),
    headers: {
        'Content-Type': 'text/plain;charset=UTF-8',
    }
};

const siteMapRoutes = (server) => {
    server.get('/robots.txt', (req, res) => (
        res.status(200).sendFile('robots.txt', options)
    ));

    server.get('/site-map/posts.xml', (req, res)  => {
        makePostsSiteMap().then(postsXml => {
            res.set('Content-Type', 'text/xml');
            res.send(postsXml);
        });
    });

    server.get('/site-map/categories.xml', (req, res) => {

        makeCategoriesSiteMap().then(categoriesXml => {
            res.set('Content-Type', 'text/xml');
            res.send(categoriesXml);
        });
    });
}

module.exports = {
    siteMapRoutes,
};
