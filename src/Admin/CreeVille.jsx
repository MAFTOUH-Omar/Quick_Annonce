import { useEffect, useState } from 'react';
import GestionV from '../img/GestionV.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function CreeVille(){
    const [nomVille,SetNomVille]=useState('');
    const navigate=useNavigate();
    const accessToken = localStorage.getItem('token');
    useEffect(() => {
      const accessToken = localStorage.getItem('token');
      if (!accessToken) {
        navigate('/login');
      }
    }, [navigate]);
    const AddVille= async()=>{
        try{
            const response = await axios.post('http://localhost:8000/api/Gestionville/',{nomVille},{
                headers:{
                    'Content-Type':'application/json',
                },
            });
            navigate('/GestionVille');
        }catch(error){
            console.error('Failed to add Ville',error)
        }
    }
    return(
        <div className="container">
            <div className="row text-center my-4">
                <div className="col d-flex justify-content-center"> 
                    <h5 className="rounded-5 py-3 w-25 text-primary fw-bold text-center">
                        <span className="badge bg-primary"><img src={GestionV} style={{width:"50px",height:"50px"}}/></span>
                        &nbsp;&nbsp;<span>Cree Nouveux Ville</span>
                    </h5>
                </div>
            </div>
            <div className="row col-5 my-2 mx-auto">
                <div className="col">
                    <label>Nom Ville</label>
                    <input type="text" value={nomVille} onChange={(v)=>SetNomVille(v.target.value)} className='form-control'/>
                </div>
            </div>
            <div className="row col-5 my-2 mx-auto">
                <div className="col">
                    <button className='btn btn-info text-light' onClick={AddVille}>Creez</button>
                </div>
            </div>
        </div>
    )
}
export default CreeVille;