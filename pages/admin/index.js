import Layout from '../../components/Layout'
import Admin from '../../components/auth/Admin'
import Link from 'next/link'

const AdminIndex = () => {
    return (
        <Layout>
            <Admin>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>Admin Dashbord</h2>
                        </div>
                        <div className="col-md-4">
                            <ul class="list-group">
                                <li className="list-group-item">
                                    <a href="/admin/crud/category-tag">Créer une catégorie</a>
                                </li>

                                <li className="list-group-item">
                                    <a href="/admin/crud/category-tag">Créer un tag</a>
                                </li>

                                <li className="list-group-item">
                                    <a href="/admin/crud/blog">Créer un nouvel article</a>
                                </li>

                                <li className="list-group-item">
                                    <Link href="/admin/crud/blogs">
                                        <a>Éditer/Supprimer un article</a>
                                    </Link>
                                </li>

                                <li className="list-group-item">
                                    <Link href="/user/update">
                                        <a>Éditer votre profil</a>
                                    </Link>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    )
}

export default AdminIndex