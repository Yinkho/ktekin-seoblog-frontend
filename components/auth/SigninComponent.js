import { useState, useEffect } from 'react'
import { signin, authenticate, isAuth } from '../../actions/auth'
import Router from 'next/router'
import Link from 'next/link'

const SignupComponent = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        loading: false,
        message: '',
        showForm: true,
    })

    const { email, password, error, loading, message, showForm } = values

    // Redirect to homepage if connected
    useEffect(() => {
        isAuth() && Router.push('/')
    }, [])

    // submit form
    const handleSubmit = (e) => {
        e.preventDefault()
        // console.table({ name, email, password, error, loading, message, showForm })
        setValues({ ...values, loading: true, error: false })
        const user = { email, password }

        console.log(user)

        signin(user)
            .then(data => {
                if(data.error) {
                    setValues({ ...values, error: data.error, loading: false })
                } else {
                    // save user token to cookie
                    // save user info to localStorage
                    // authenticate user
                    authenticate(data, () => {
                        if(isAuth() && isAuth().role === 1) {
                            Router.push(`/admin`)
                        } else {
                            Router.push(`/user`)
                        }
                    })
                }
            })
    }

    const handleChange = name => (e) => {
        setValues({ ...values, error: false, [name]: e.target.value })
    }

    const showLoading = () => (loading ? <div className="alert alert-info">Un instant...</div> : '')
    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '')
    const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '')

    const signinForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        value={email}
                        onChange={handleChange('email')} type="email" className="form-control" placeholder="Entrez votre email" />
                </div>
                <div className="form-group">
                    <input 
                        value={password}
                        onChange={handleChange('password')} type="password" className="form-control" placeholder="Entrez votre mot de passe" />
                </div>

                <div>
                    <button className="btn btn-info">Connexion</button>
                </div>
            </form>
        )
    }

    return (
        <React.Fragment>
            {showError()}
            {showLoading()}
            {showMessage()}
            {showForm && signinForm()}
            <br />
            <Link href="/auth/password/forgot" >
                <a className="btn btn-outline-danger btn-sm">Mot de passe oublié ?</a>
            </Link>
        </React.Fragment>
    )
}

export default SignupComponent