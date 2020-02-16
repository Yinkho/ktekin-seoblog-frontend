import Head from 'next/head'
import Link from 'next/link'
import { withRouter } from 'next/router'
import Layout from '../components/Layout'
import { useState } from 'react'
import { listBlogsWithCategoriesAndTags } from '../actions/blog'
import SmallCard from '../components/blog/SmallCard'
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../config'

import headerBackground from '../assets/background.jpg';

const Blogs = ({ blogs, categories, tags, totalBlogs, blogsLimit, blogSkip, router }) => {

    const head = () => (
        <Head>
            <title>Nouveautés de la tech web | {APP_NAME}</title>
            <meta name="description" content="Programming blogs and tutorials on react node next vue php laravel and web development" />
            <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
            <meta property="og:title" content={`Lastest web development tutorials | ${APP_NAME}`} />
            <meta property="og:description" content="Programming blogs and tutorials on react node next vue php laravel and web development" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            
            <meta property="og:image" content={`${DOMAIN}/static/images/seoblog.jpg`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/seoblog.jpg`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    );

    const [limit, setLimit] = useState(blogsLimit);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(totalBlogs);
    const [loadedBlogs, setLoadedBlogs] = useState([]);

    const loadMore = () => {
        let toSkip = skip + limit;
        listBlogsWithCategoriesAndTags(toSkip, limit).then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                setLoadedBlogs([ ...loadedBlogs, ...data.blogs]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-outline-info btn-lg">
                    Plus d'articles
                </button>
            )
        );
    };

    const showAllBlogs = () => {
        return blogs.map((blog, i) => (
            <div className="col-md-4 pb-4" key={i} >
                <article>
                    <SmallCard blog={blog} />
                </article>
            </div>
        ));
    };

    const showLoadedBlogs = () => {
        return loadedBlogs.map((blog, i) => (
            <div className="col-md-4 pb-4" key={i} >
                <article>
                    <SmallCard blog={blog} />
                </article>
            </div>
        ));
    };

    const showAllCategories = () => {
        return categories.map((c, i) => (
            <Link href={`/categories/${c.slug}`} key={i}>
                <a className="btn btn-outline-dark btn-sm mr-1 ml-1 mt-3">{c.name}</a>
            </Link>
        ));
    };

    const showAllTags = () => {
        return tags.map((t, i) => (
            <Link href={`/tags/${t.slug}`} key={i}>
                <a className="btn btn-outline-secondary btn-sm mr-1 ml-1 mt-2">{t.name}</a>
            </Link>
        ));
    };

    return (
        <React.Fragment>
            {head()}
                <main>
                    <div className="container-fluid px-0 mb-4" style={headerStyled}>
                        <Layout>
                            <header>
                                <div className="col-md-12 pt-1">
                                    <p className="font-weight-blod text-center h1 sm-h3" style={{ color: '#0F798A' }}>
                                        Lisez des articles qui vous rendent meilleur.<br />
                                        Rédigez pour instruire les autres.
                                    </p>
                                    <h5 className="font-weight-normal font-italic text-center pt-5" style={{ color: '#333333' }}>
                                        Derniers sujets récents
                                    </h5>
                                </div>
                                <section>
                                    <div className='pb-5 text-center'>
                                        {showAllCategories()}
                                        <br />
                                        {showAllTags()}
                                    </div>
                                </section>
                            </header>
                        </Layout>
                    </div>
                    <div className="container">
                        <div className="justify-content-md-left row" >
                            {showAllBlogs()}
                            {showLoadedBlogs()}
                        </div>
                    </div>
                    
                    <div className="text-center pb-5 pt-3">{loadMoreButton()}</div>
                </main>
        </React.Fragment>
    )
}

Blogs.getInitialProps = () => {
    let skip = 0
    let limit = 6

    return listBlogsWithCategoriesAndTags(skip, limit).then(data => {
        if(data.error) {
            console.log(data.error)
        } else {
            return {
                blogs: data.blogs,
                categories: data.categories,
                tags: data.tags,
                totalBlogs: data.size,
                blogsLimit: limit,
                blogSkip: skip
            }
        }
    })
}

// CSS

const headerStyled = {
    background: `url(${headerBackground})`,
    backgroundPosition: 'top',
    backgroundSize: 'cover',
    height: 'auto'
}

export default withRouter(Blogs)