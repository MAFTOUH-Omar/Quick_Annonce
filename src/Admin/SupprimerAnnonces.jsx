import "bootstrap/dist/css/bootstrap.css";
import Supprimer from '../img/SupprimerA.png';
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function SupprimerAnnonces(){
    const navigate=useNavigate();
    const [annonce,SetAnnonce]=useState(null);
    const accessToken = localStorage.getItem('token');
    useEffect(() => {
      const accessToken = localStorage.getItem('token');
      if (!accessToken) {
        navigate('/login');
      }
    }, [navigate]);
    useEffect(()=>{
        axios.get('http://localhost:8000/api/ShowAnnonceAdmin')
        .then(response=>SetAnnonce(response.data.Annonce))
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
            <div className="row my-1">
                <div className="col">
                    <button className="btn btn-dark" onClick={()=>navigate('/dashboardadmin')}>Dashboard Admin</button>
                </div>
            </div>
            <div className="row my-2">
                {annonce && annonce.map(a=>(
                    <div className="col-4">
                        <div className="card text-center">
                            <img src={`http://localhost:8000/storage/${a.photo}`} alt="err" className="card-img-top"/>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col">
                                        <h4 className="badge bg-dark" value={AnnonceId} onChange={(a)=>{SetAnnonceId(a.target.value)}}>{a.id}</h4>
                                    </div>
                                </div>
                                <table className="table table-bodered table-hovered">
                                    <tr>
                                        <th>Titre Annonce</th><td>{a.titreAnnonce}</td>
                                    </tr>
                                    <tr>
                                        <th>Prix</th><td>{a.prix}</td>
                                    </tr>
                                    <tr>
                                        <th>Date</th><td>{a.created_at}</td>
                                    </tr>
                                    <tr>
                                        <th>Ville</th><td>{a.nomVille}</td>
                                    </tr>
                                </table>
                            </div>
                            <div className="card-footer">
                                <div className="row">
                                    <div className="col">
                                    <button className="btn btn-danger form-control" onClick={()=>confirmDeleteAnnonce(a.id)}><img src={Supprimer} style={{width:"20px",height:"20px"}} /><span>Delete</span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default SupprimerAnnonces;