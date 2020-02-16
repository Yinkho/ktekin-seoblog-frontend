import Link from 'next/link'
import renderHTML from 'react-render-html'
import { useState, useEffect } from 'react'
import { listSearch } from '../../actions/blog'

const Search = () => {
    const [values, setValues] = useState({
        search: undefined,
        results: [],
        searched: false,
        message: ''
    })

    const { search, results, searched, message } = values

    const searchSubmit = e => {
        e.preventDefault()
        listSearch({ search }).then(data => {
            setValues({ ...values, results: data, searched: true, message: `${data.length} blogs found` })
        })
    }

    const handleChange = e => {
        e.preventDefault()
        setValues({ ...values, search: e.target.value, searched: false, results: [] })
    }

    const searchedBlogs = (results = []) => {
        return (
            <div className="jumbotron bg-white">
                {message && <p className="pt-4 text-muted font-italic">{message}</p>}

                {results.map((blog, i) => {
                    return (
                        <div key={i} >
                            <Link href={`/blogs/${blog.slug}`}>
                                <a className="text-primary">{blog.title}</a>
                            </Link>
                        </div>
                    );
                })}
            </div>
        );
    }

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <div className="row justify-content-center pl-2 pr-0">
                <div className="col-md-4 mb-2 pl-0">
                    <input 
                        type="search" className="form-control" placeholder="Recherchez des articles" onChange={handleChange} 
                    />
                </div>

                <div className="col-md-2 pl-0">
                    <button className="btn btn-block btn-outline-info" type="submit" >
                        Recherchez
                    </button>
                </div>
            </div>
        </form>
    );

    return (
        <div className="container-fluid">
            <div className="pt-3 pb-5">
                {searchForm()}
            </div>
            {searched && <div style={{ marginTop: '-120px', marginBottom: '-80px' }}>{searchedBlogs(results)}</div> }
        </div>
    );
}

export default Search;