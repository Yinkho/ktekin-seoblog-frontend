import Link from 'next/link'
import renderHTML from 'react-render-html'
import moment from 'moment'
import { API } from '../../config'

const Card = ({ blog }) => {

    const showBlogCategories = blog => {
        return blog.categories.map((c, i) => (
            <Link href={`/categories/${c.slug}`}>
                <a className="btn btn-outline-dark mr-1 ml-1">{c.name}</a>
            </Link>
        ))
    }

    const showBlogTags = blog => {
        return blog.tags.map((t, i) => (
            <Link href={`/tags/${t.slug}`}>
                <a className="btn btn-outline-secondary mr-1 ml-1">{t.name}</a>
            </Link>
        ))
    }

    return (
        
        <div className="col-md-4">
            <section>
                <img 
                    src={`${API}/blog/photo/${blog.slug}`} 
                    alt={blog.title}
                    className="img img-fluid" 
                    style={{ maxHeight: 'auto', width: '100%' }} />
            </section>

            <header>
                <Link href={`/blogs/${blog.slug}`}>
                    <a><h2 className="pt-3 font-weight bold">{blog.title}</h2></a>
                </Link>
            </header>

            <section>
                <div className="">{renderHTML(blog.excerpt)}</div>
                <Link href={`/blogs/${blog.slug}`}>
                    <a className="btn btn-outline-secondary">Lire la suite</a></Link>
            </section>

            <section>
                <p className="mark ml-1 mt-4 pt-2">Rédigé par <Link href={`/profile/${blog.postedBy.username}`}><a>{blog.postedBy.username}</a></Link> | Published {moment(blog.updatedAt).fromNow()}</p>
            </section>

            <section>
                {showBlogCategories(blog)}
                {showBlogTags(blog)}
                <br />
                <br />
            </section>
        </div>
    )
}

export default Card