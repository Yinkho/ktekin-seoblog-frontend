import { useState, useEffect } from 'react'
import { signup, isAuth, preSignup } from '../../actions/auth'
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

    const { name, email, password, error, loading, message, showForm } = values

    // Redirect to homepage if connected
    useEffect(() => {
        isAuth() && Router.push('/')
    }, [])

    // submit form
    const handleSubmit = (e) => {
        e.preventDefault()
        // console.table({ name, email, password, error, loading, message, showForm })
        setValues({ ...values, loading: true, error: false })
        const user = { name, email, password }

        console.log(user)

        preSignup(user)
            .then(data => {
                if(data.error) {
                    setValues({ ...values, error: data.error, loading: false })
                } else {
                    setValues({ 
                        ...values,
                        name: '', 
                        email: '', 
                        password: '', 
                        error: '',
                        loading: false,
                        message: data.message,
                        showForm: false
                    })
                }
            })
    }

    const handleChange = name => (e) => {
        setValues({ ...values, error: false, [name]: e.target.value })
    }

    const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '')
    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '')
    const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '')

    const signupForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        value={name}
                        onChange={handleChange('name')} type="text" className="form-control" placeholder="Entrez votre nom" />
                </div>
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
                    <button className="btn btn-info">Inscription</button>
                </div>
            </form>
        )
    }

    return (
        <React.Fragment>
            {showError()}
            {showLoading()}
            {showMessage()}
            {showForm && signupForm()}
            <br />
            <Link href="/auth/password/forgot" >
                <a className="btn btn-outline-danger btn-sm">Forgot password</a>
            </Link>
        </React.Fragment>
    )
}

export default SignupComponent