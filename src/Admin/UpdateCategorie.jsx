import { useEffect, useState } from 'react';
import GestionV from '../img/Category.gif';
import { useNavigate , useParams  } from 'react-router-dom';
import axios from 'axios';
function UpdateCategorie(){
    const [libelleCategorie,SetNomCat]=useState('');
    const navigate=useNavigate();
    const {id}=useParams()
    useEffect(() => {
      const accessToken = localStorage.getItem('token');
      if (!accessToken) {
        navigate('/login');
      }
    }, [navigate]);
    const UpdateCat= async()=>{
        try{
            const response = await axios.put(`http://localhost:8000/api/GestionCategorie/${id}`,{libelleCategorie},{
                headers:{
                    'Content-Type':'application/json',
                },
            });
            navigate('/GestionCategorie');
        }catch(error){
            console.error('Failed to update categorie',error)
        }
    }
    return(
        <div className="container">
            <div className="row text-center my-4">
                <div className="col d-flex justify-content-center"> 
                    <h5 className="rounded-5 py-3 w-25 text-dark fw-bold text-center">
                        <span className="badge bg-warning"><img src={GestionV} style={{width:"50px",height:"50px"}}/></span>
                        &nbsp;&nbsp;<span>Modifier categorie</span>
                    </h5>
                </div>
            </div>
            <div className="row col-5 my-2 mx-auto">
                <div className="col">
                    <label>Nom categorie</label>
                    <input type="text" value={libelleCategorie} onChange={(v)=>SetNomCat(v.target.value)} className='form-control'/>
                </div>
            </div>
            <div className="row col-5 my-2 mx-auto">
                <div className="col">
                    <button className='btn btn-info text-light' onClick={UpdateCat}>Modifier</button>
                </div>
            </div>
        </div>
    )
}
export default UpdateCategorie;