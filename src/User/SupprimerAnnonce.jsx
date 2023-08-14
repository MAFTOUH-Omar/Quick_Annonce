import "bootstrap/dist/css/bootstrap.css";
import Supprimer from '../img/SupprimerA.png';
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function SupprimerAnnonce(){
    const navigate=useNavigate();
    const [annonce,SetAnnonce]=useState(null);
    const user_id=localStorage.getItem('user_id');
    useEffect(() => {
      const accessToken = localStorage.getItem('token');
      if (!accessToken) {
        navigate('/login');
      }
    }, [navigate]);
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/ShowAnnonceByUserId/${user_id}`)
        .then(response=>SetAnnonce(response.data.Annonces))
    },[])
    const [AnnonceId,SetAnnonceId]=useState(null);
    const DeleteAnnonce = (AnnonceId) => {
        axios
          .delete(`http://localhost:8000/api/deleteAnnonce/${AnnonceId}`)
          .then(() => {
            alert('Delete with success');
            window.location.reload();
          })
          .catch((error) => {
            console.error('Failed to delete', error);
          });
      };
      const confirmDeleteAnnonce = (AnnonceId) => {
        const confirmMessage = "Are you sure you want to delete this Annonce?";
        const shouldDelete = window.confirm(confirmMessage);
        if (shouldDelete) {
            DeleteAnnonce(AnnonceId);
        }
      };
    return(
        <div className="container">
            <div className="row my-4">
                <div className="col d-flex justify-content-center">
                    <h5 className="rounded-5 py-3 w-25 text-danger fw-bold text-center">
                        <span className="badge bg-danger"><img src={Supprimer} style={{width:"50px",height:"50px"}}/></span>
                        &nbsp;&nbsp;<span>Supprimer Annonce</span>
                    </h5>
                </div>
            </div>
            <div className="row">
                <div className="col d-flex justify-content-start">
                    <button className="btn btn-info text-light my-1" onClick={()=>navigate('/DesposerAnnonce')}>Creez votre Annonce</button>
                </div>
            </div>
            <div className="row">
                {annonce && annonce.map(a=>(
                <div className="col my-2" value={AnnonceId} onChange={(a)=>{SetAnnonceId(a.target.value)}}>
                    <ul className="list-group mb-2">
                        <li className="border border-dark list-group-item d-flex justify-content-between align-items-center">
                            <div className="d-flex gap-4">
                                <img
                                className="rounded-circle bg-gray-50"
                                src={`http://localhost:8000/storage/${a.photo}`}
                                style={{width:'100px',height:'100px'}}
                                />
                                <div className="flex-grow-1">
                                <p className="fw-bold text-sm font-semibold leading-6 badge bg-dark">{a.id}</p>
                                <p className="fw-bold text-sm font-semibold leading-6">Titre : {a.titreAnnonce}</p>
                                <p className="fw-bold mt-1 truncate text-xs leading-5">Prix : {a.prix}</p>
                                </div>
                            </div>
                            <div className="d-sm-flex flex-column align-items-end">
                                {/* <p className="fw-bold text-sm"><span className={u.sexe=="homme"?"badge bg-info":"badge bg-success"}>{u.sexe}</span></p> */}
                                <p className="fw-bold mt-1 text-xs">
                                <p className="fw-bold">Ville : {a.nomVille}</p>
                                <p className="fw-bold">Date Creation : {a.created_at}</p>
                                <h5 className={a.validate==1?"badge bg-success":"badge bg-danger"}>{a.validate==1?"Valider":"Non Valider"}</h5>
                                </p>
                                <button className="btn btn-danger" onClick={()=>confirmDeleteAnnonce(a.id)}><img src={Supprimer} style={{width:"20px",height:"20px"}} /><span>Delete</span></button>
                                
                            </div>
                        </li>
                    </ul>
                </div> 
                ))}
            </div>
        </div>
    );
};
export default SupprimerAnnonce;