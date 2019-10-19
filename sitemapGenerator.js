const axios = require('axios');

const API = 'https://blog.woolta.com';
const BLOG_API = 'https://api-blog.woolta.com';

const NOW = new Date();
const CATEGORY_PRIORITY = 0.5;

const POSTS_PRIORITY = 1;

async function makeCategoriesSiteMap() {
    const categories = await getCategories();
    const categoriesSiteMap = await categories.data.data.map(category => makeSiteMapItemXml(
        `${API}/categories/${category.value}`, CATEGORY_PRIORITY));

    return wrapSiteMap(categoriesSiteMap);
};

async function makePostsSiteMap() {
    const posts = await getAllPosts();

    const newPostsSiteMap = await posts.data.data.map(post => makeSiteMapItemXml(
        ` ${API}/categories/${post.categoryNo}/posts/${post.postNo}`, POSTS_PRIORITY));

    return wrapSiteMap(newPostsSiteMap);
};


function makeSiteMapItemXml(url, priority) {
    return `<url>
        <loc>${url}</loc>
        <lastmod>${NOW.toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${priority}</priority>
    </url>`
}

function wrapSiteMap(body) {
    return `<?xml version="1.0" encoding="utf-8"?>
    <!--Generated by Screaming Frog SEO Spider 9.4-->
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${body}
    </urlset>`
}

const getAllPosts = () => {
    return axios.get(`${BLOG_API}/post/categories/posts/all`);
};

const getCategories = () => {
    return axios.get(`${BLOG_API}/post/categories`);
};


module.exports = {
    makeCategoriesSiteMap,
    makePostsSiteMap
};

