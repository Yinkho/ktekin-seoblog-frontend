import Link from 'next/link'
import renderHTML from 'react-render-html'
import moment from 'moment'
import { API } from '../../config'

const SmallCard = ({ blog }) => {

    return (
        <div className="card">
            <section>
                <Link href={`/blogs/${blog.slug}`}>
                    <a >
                        <div style={{ height: '250px', width: '100%', overflow: 'hidden' }}>
                            <img 
                                src={`${API}/blog/photo/${blog.slug}`} 
                                alt={blog.title}
                                className="img img-fluid" 
                                style={{ objectFit: 'cover', height: '250px', minWidth: '100%' }}
                            />
                        </div>
                    </a>
                </Link>
            </section>

            <div className="card-body">
                <section>
                    <Link href={`/blogs/${blog.slug}`}>
                        <a className="text-decoration-none text-info">
                            <h5 className="card-title ">{blog.title}</h5>
                        </a>
                    </Link>
                    <p className="card-text">{renderHTML(blog.excerpt)}</p>
                </section>
            </div>

            <div className="card-body">
                <div>
                    Rédigé {/*moment(blog.updateAt).fromNow()*/} par <Link href={`/profile/${blog.postedBy.username}`}><a className="text-decoration-none text-info">{blog.postedBy.name}</a></Link>
                </div>
            </div>
        </div>
    )
}

export default SmallCard