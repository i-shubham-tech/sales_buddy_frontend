import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { postData } from '../../backendservices/FetchNodeServices'
import { useNavigate } from 'react-router-dom'

function AdminLogin() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSumbit = async () => {
        var body = { 'email': email, 'password': password }
        var result = await postData('admin/adminlogin', body)
        
        if (result.status) {
            localStorage.setItem("token",result.data.token)
            navigate('/dashboard')
        }
        else {
            alert(result.message)
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100vw',background:"white" ,boxSizing:"border-box"}}>
            <div style={{ height: 'auto', width: '400px', boxShadow: '0 0 10px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', gap: 10, padding: "40px" }}>
                <img src="/logo.png" style={{ width: '140px', objectFit: 'contain' }} />
                <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Admin Login</h1>
                <form style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                        <label>Email/Mobile.No</label>
                        <TextField placeholder='your@gmail.com' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                        <label>Password</label>
                        <TextField placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <Button variant='contained' sx={{ marginTop: "4px" }} onClick={handleSumbit}>Login</Button>
                </form>
            </div>

        </div>
    )
}

export default AdminLogin