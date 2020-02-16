import Layout from '../components/Layout'
import Link from 'next/link'
import ContactForm from '../components/form/ContactForm'

const Contact = () => {

    return (
        <Layout>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h2>Contactez-nous !</h2>
                        <hr/>
                        <ContactForm />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Contact