import Layout from '../../../components/Layout'
import Admin from '../../../components/auth/Admin'
import CreateBlog from '../../../components/crud/CreateBlog'
import Link from 'next/link'

const Blog = () => {
    return (
        <Layout>
            <Admin>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>Créer un nouvel article</h2>
                        </div>
                        <div className="col-md-12">
                            <CreateBlog />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    )
}

export default Blog