import Layout from '../../../components/Layout'
import Admin from '../../../components/auth/Admin'
import ReadBlog from '../../../components/crud/ReadBlog'
import Link from 'next/link'

const Blog = () => {
    return (
        <Layout>
            <Admin>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>Gérer les articles</h2>
                        </div>
                        <div className="col-md-12">
                            <ReadBlog />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    )
}

export default Blog