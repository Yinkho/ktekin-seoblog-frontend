import Layout from '../../../components/Layout'
import Private from '../../../components/auth/Private'
import ReadBlog from '../../../components/crud/ReadBlog'
import Link from 'next/link'
import { isAuth } from '../../../actions/auth'

const Blog = () => {
    const username = isAuth() && isAuth().username
    return (
        <Layout>
            <Private>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>Gérer les articles</h2>
                        </div>
                        <div className="col-md-12">
                            <ReadBlog username={username} />
                        </div>
                    </div>
                </div>
            </Private>
        </Layout>
    )
}

export default Blog