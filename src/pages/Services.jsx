import { useState } from 'react';
import './../assets/styles/jobs.css';

const Services = () => {
    let userInfo = localStorage.getItem ("Frappe_account-sys_authenticattion_details");

    const [form, setForm] = useState({
        "name": "",
        "email": "",
        "contacts": "",
        "qualifications": "",
        "nrc": "",
        "nationality": ""
    });

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.id]: event.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault ();

        const url = "http://jobs.test:8000/api/method/accounts.api.createJob";
        let accessToken = "";
        if (userInfo) {
            accessToken = userInfo;
            console.log(accessToken)
        }
         
        fetch(url,{
            method: 'POST',
            headers:{
                'Accept': 'applicaton/json',
                'Content-Type': 'application/json',
                'auth': accessToken

            },
            body: JSON.stringify({data:{
                name: form.name,
                contacts: form.contacts,
                nationality: form.nationality,
                nrc: form.nrc,
                qualifications: form.qualifications,
                email: form.email }
             })
                
        })
        .then(res => res.json())
        .then( res => {
            console.log(res);
        })
        
    }

    return (
        <div className="jobs">
            <div className="form">
                <form>
                    <h2>Job Application</h2>
                    <div className="inputs">
                        <div className="input">
                            <label htmlFor="name">full name <span>*</span></label>
                            <input type="text" id='name' onChange={handleChange} placeholder="Name" />
                        </div>
                        <div className="input">
                            <label htmlFor="email">email <span>*</span></label>
                            <input type="email" id='email'  onChange={handleChange}  placeholder="Email" />
                        </div>
                        <div className="input">
                            <label htmlFor="contact">contact <span>*</span></label>
                            <input type="text" id='contact'  onChange={handleChange} placeholder="Contact" />
                        </div>
                        <div className="input">
                            <label htmlFor="nrc">nrc number <span>*</span></label>
                            <input type="text" id='nrc'  onChange={handleChange} placeholder="NRC Number" />
                        </div>
                        <div className="input">
                            <label htmlFor="nationality">nationality <span>*</span></label>
                            <input type="text" id='nationality'  onChange={handleChange} placeholder="Nationality" />
                        </div>
                        <div className="input">
                            <label htmlFor="qualifications">qualifications <span>*</span></label>
                            <input type="text"  onChange={handleChange} id='qualifications' placeholder="Qualifications" />
                        </div>
                    </div>
                    <button onClick={handleSubmit}>Apply</button>
                </form>
            </div>
        </div>
    )
}

export default Services;