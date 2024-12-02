import React, { useState } from 'react'
import './Login.css'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'


export default function Login({islogged}) {
    const [data, setData] = useState({
        email: "",
        password: ""
    })

    // const [islogged, setLogged] = useState(null)

    let navigate = useNavigate()

    const logindata = async () => {
        console.log(data)
        const res = await axios.post("http://127.0.0.1:5000/api/login", data)
            .then((e) => {
                if (e.data.status === 'success') {
                    islogged(true)
                    navigate('/interface') // Redirect to the Manage page
                }
            })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        logindata()
    }


    return (
        <>
            <div className="login-container" onSubmit={handleSubmit}>
                <div className="login-box">
                    <div className="sbjlogo">
                        <img src="sbj.png" alt="College logo" />
                    </div>
                    <h2>Login</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email" id="email"
                                name='email'
                                value={data.email}
                                onChange={(e) => { setData({ ...data, email: e.target.value }) }}
                                // value={email}
                                // onChange={(e) => { setEmail(e.value) }}
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                name='password'
                                value={data.password}
                                onChange={(e) => { setData({ ...data, password: e.target.value }) }}
                            />
                        </div>
                        <button type="submit" className="login-button">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}
