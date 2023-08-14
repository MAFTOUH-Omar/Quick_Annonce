import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ValidationA from '../img/Validation.png';
import axios from 'axios';
function ValidationAnnonce(){
    const navigate = useNavigate();
    useEffect(() => {
      const accessToken = localStorage.getItem('token');
      if (!accessToken) {
        navigate('/login');
      }
    }, [navigate]);
    const [AnnonceFalse,SetAnnonceFalse]=useState(null);
    useEffect(()=>{
        axios.get('http://localhost:8000/api/annonceValidateFalse/')
        .then(res=>SetAnnonceFalse(res.data.annonce))
    },[])
    const [idA,SetidA]=useState(null);
    const UpdateVille= async(idA)=>{
        try{
            const response = await axios.put(`http://localhost:8000/api/validateAnnonce/${idA}`)
            .then(() => {
                alert('Bien Valider');
                window.location.reload();
              })
            .catch((error) => {
                console.error('Failed to Validate', error);
            });
        }catch(error){
            console.error('Failed to Validate Annonce',error)
        }
    }
    return(
        <div className="container">
            <div className="row text-center my-4">
                <div className="col d-flex justify-content-center"> 
                    <h5 className="rounded-5 py-3 w-25 text-dark fw-bold text-center">
                        <span className="badge bg-dark"><img src={ValidationA} style={{width:"50px",height:"50px"}}/></span>
                        &nbsp;&nbsp;<span>Validation Annonces</span>
                    </h5>
                </div>
            </div>
            <div className="row">
                <div className="col my-1">
                    <button onClick={()=>navigate('/dashboardadmin')} className="btn btn-dark">DashboardAdmin</button>
                </div>
            </div>
            <div className="row">
            {AnnonceFalse && AnnonceFalse.map(a=>(
                <div className="col">
                    <ul className="list-group mb-2">
                        <li className="border border-dark list-group-item d-flex justify-content-between align-items-center">
                            <div className="d-flex gap-4">
                                <img
                                className="rounded-circle bg-gray-50"
                                src={`http://localhost:8000/storage/${a.photo}`}
                                style={{ height: '100px', width: '100px' }}
                                />
                                <div className="flex-grow-1">
                                <p className="fw-bold text-sm font-semibold leading-6 badge bg-dark" value={idA} onChange={(i)=>{SetidA(i.target.value)}}>{a.id}</p>
                                <p className="fw-bold text-sm font-semibold leading-6">{a.titreAnnonce}</p>
                                <p className="fw-bold text-sm font-semibold leading-6">{a.prix}</p>
                                <p className="fw-bold mt-1 truncate text-xs leading-5">{a.nomVille}</p>
                                </div>
                            </div>
                            <div className="d-sm-flex flex-column align-items-end">
                                <p className="fw-bold mt-1 text-xs">
                                <p className="fw-bold">{a.created_at}</p>
                                </p>
                                <button className="btn btn-success" onClick={()=>UpdateVille(a.id)}>Valider</button>
                            </div>
                        </li>
                    </ul>
                </div>
            ))}
            </div>
        </div>
    )
}
export default ValidationAnnonce;