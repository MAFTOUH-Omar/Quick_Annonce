import 'bootstrap/dist/css/bootstrap.css';
import './Auth.css';
import Logo from '../img/logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
function Inscription(){
    const [NomUtilisateur,SetNomUser]=useState('');
    const [nom,SetNom]=useState('');
    const [prenom,SetPrenom]=useState('');
    const [email,SetEmail]=useState('');
    const [password,SetPassword]=useState('');
    const [c_password,SetC_Password]=useState('');
    const [telephone,SetTelephone]=useState('');
    const [sexe,SetSexe]=useState('homme');
    const navigate=useNavigate();
    const [Err,SetErr]=useState('');
    const handleInscription = async () => {
        try {
          const response = await axios.post('http://localhost:8000/api/register', {
            NomUtilisateur,
            nom,
            prenom,
            email,
            password,
            c_password,
            telephone,
            sexe,
          }, {
            headers: {
              'Content-Type': 'application/json',
            }
          });
      
          console.log(response.data.accessToken);
          const { accessToken } = response.data;
          // Save the access token in the local storage
          localStorage.setItem('accessToken', accessToken);
          navigate("/login");
        } catch (error) {
          console.error(error);
          SetErr('Failed to Subscribe');
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
                    <label>Nom Utilisateur</label>
                    <input type="text" className='form-control border-dark' value={NomUtilisateur} onChange={(n)=>{SetNomUser(n.target.value)}} />
                </div>
            </div>
            <div className="row my-2">
                <div className="col">
                    <label>Nom</label>
                    <input type="text" className='form-control border-dark' value={nom} onChange={(n)=>{SetNom(n.target.value)}} />
                </div>
                <div className="col">
                    <label>Prenom</label>
                    <input type="text" className='form-control border-dark' value={prenom} onChange={(p)=>{SetPrenom(p.target.value)}} />
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
                    <label>Password</label>
                    <input type="password" className='form-control border-dark' value={password} onChange={(p)=>{SetPassword(p.target.value)}} />
                </div>
            </div>
            <div className="row my-2">
                <div className="col">
                    <label>Confirm PassWord</label>
                    <input type="password" className='form-control border-dark' value={c_password} onChange={(c)=>{SetC_Password(c.target.value)}} />
                </div>
            </div>
            <div className="row my-2">
                <div className="col">
                    <label>Telephone</label>
                    <input type="text" className='form-control border-dark' value={telephone} onChange={(t)=>{SetTelephone(t.target.value)}} />
                </div>
            </div>
            <div className="row my-2">
                <div className="col">
                    <label>Sexe</label>
                    <select className='form-select' value={sexe} onChange={(s)=>{SetSexe(s.target.value)}}>
                        <option value="homme">Homme</option>
                        <option value="femme">Femme</option>
                    </select>
                </div>
            </div>
            <div className="row my-2">
                <div className="col">
                    <button className='btn btn-info form-control text-light' onClick={handleInscription}>S'inscription</button>
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
export default Inscription;