import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import {useCookies} from 'react-cookie';
import { useState } from 'react';
import Logo from '../img/logo.png';
import axios from 'axios';
import "./Auth.css"
function Login(){
    const [email,SetEmail]=useState('');
    const [password,SetPassword]=useState('');
    const navigate=useNavigate();
    const [Err,SetErr]=useState('');
    const handleLogin = async () => {
      try {
        const response = await axios.post(
          'http://localhost:8000/api/login',
          {
            email,
            password,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
    
        const { token } = response.data.token;
        const EmailStorage=response.data.email;
        const user_id=response.data.user_id;
        if (token) {
          // Store the access token in the local storage
          localStorage.setItem('token', token);
          localStorage.setItem('user_id', user_id);
          localStorage.setItem('email',EmailStorage);
          // Add the access token to the headers
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
    
          // Fetch user data to check if they are an admin
          const userResponse = await axios.get('http://localhost:8000/api/admin/dashboard', config);
          if (userResponse.status===200) {
            // Redirect to the admin dashboard
            navigate('/dashboardadmin');
          } else if(userResponse.status===201){
            // Redirect to the user dashboard
            navigate('/DesposerAnnonce');
          }
        } else {
          // Handle error case where no access token is returned
          console.error('Access token not found');
        }
      } catch (error) {
        console.error(error);
        SetErr('Invalid email or password');
      }
    };
    return(
        <div className="container col-4 mt-4">
            <div className="row text-center">
                <div className="col">
                    <img src={Logo}/>
                </div>
            </div>
            <div className="row my-2">
                <div className="col">
                    <label>Email</label>
                    <input type="text" className='form-control border-dark' value={email} onChange={(e)=>{SetEmail(e.target.value)}} />
                </div>
            </div>
            <div className="row my-2">
                <div className="col">
                    <label>PassWord</label>
                    <input type="password" className='form-control border-dark' value={password} onChange={(p)=>{SetPassword(p.target.value)}} />
                </div>
            </div>
            <div className="row my-2">
                <div className="col">
                    <button className='btn btn-success form-control' onClick={handleLogin}>Login</button>
                </div>
            </div>
            {Err && 
            <div className='row'>
                <div className='col'>
                    <div className="alert alert-danger">
                        {Err}
                    </div>
                </div>
            </div>
            }
        </div>
    )
}
export default Login;