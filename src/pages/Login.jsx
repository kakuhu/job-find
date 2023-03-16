import { useState } from 'react';
import './../assets/styles/jobs.css';

const Login = () => {
    
    const [form, setForm] = useState({
        "usr": "",
        "pwd": "",
    });

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.id]: event.target.value,
        })
    }
    const handleSubmit = (e) => {
        const url = "http://jobs.test:8000/api/method/accounts.api.login";
        e.preventDefault ();

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                usr: form.usr,
                pwd: form.pwd
            })
        })
        .then(res => res.json())
        .then(res => {

            console.log (res)
            if (res.message.status == 200) {
                if (!localStorage.getItem ("Frappe_account-sys_authenticattion_details")) {
                    localStorage.setItem ("Frappe_account-sys_authenticattion_details", res.message.token);
                    console.log ("loggin!")
                }else {
                    localStorage.setItem ("Frappe_account-sys_authenticattion_details", res.message.token);
                    console.log ("loggin!")
                }

            }
        })
        
    }

    return (
        <div className="jobs">
            <div className="form">
                <form>
                    <h2>Job Application</h2>
                    <div className="inputs">
                        <div className="input">
                            <label htmlFor="usr">full name <span>*</span></label>
                            <input type="text" id='usr' onChange={handleChange} placeholder="Username" />
                        </div>
                        <div className="input">
                            <label htmlFor="pwd">email <span>*</span></label>
                            <input type="password" id='pwd'  onChange={handleChange}  placeholder="Password" />
                        </div>
                    </div>
                    <button onClick={handleSubmit}>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login;