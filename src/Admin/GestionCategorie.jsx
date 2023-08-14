import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import GestionV from '../img/Category.gif'
import { useEffect, useState } from "react";
import axios from "axios";
function GestionCategorie(){
    const navigate = useNavigate();
    useEffect(() => {
      const accessToken = localStorage.getItem('token');
      if (!accessToken) {
        navigate('/login');
      }
    }, [navigate]);
    const [cat,SetCat]=useState(null);
    const [IdCat,SetIdCat]=useState(null);
    useEffect(()=>{
        axios.get('http://localhost:8000/api/GestionCategorie')
        .then(response=>SetCat(response.data.categorie))
    },[])
    // Delet Ville
    const DeleteCat = (IdCat) => {
        axios
          .delete(`http://localhost:8000/api/GestionCategorie/${IdCat}`)
          .then(() => {
            alert('Bien Supprimer');
            setTimeout(()=>{
                window.location.reload(false);
               },1000)
          })
          .catch((error) => {
            console.error('Failed to delete', error);
          });
      };
      const confirmDeleteUser = (IdCat) => {
        const confirmMessage = "Are you sure you want to delete this categorie?";
        const shouldDelete = window.confirm(confirmMessage);
        if (shouldDelete) {
            DeleteCat(IdCat);
        }
      };
    return(
        <div className="container">
            <div className="row text-center my-4">
                <div className="col d-flex justify-content-center"> 
                    <h5 className="rounded-5 py-3 w-25 text-dark fw-bold text-center">
                        <span className="badge bg-light border border-dark"><img src={GestionV} style={{width:"50px",height:"50px"}}/></span>
                        &nbsp;&nbsp;<span>Gestion Categorie</span>
                    </h5>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <button className="btn btn-dark form-control" onClick={()=>navigate('/dashboardadmin')}>Dashboard Admin</button>
                </div>
                <div className="col">
                    <button className="btn btn-primary form-control" onClick={()=>navigate('/CreeCategorie')}>Nouveaux categorie</button>
                </div>
            </div>
            <div className="row">
                {cat && cat.map(v=>(
                    <div className="col-6 my-2">
                    <ul className="list-group mb-2">
                        <li className="border border-dark list-group-item d-flex justify-content-between align-items-center">
                            <div className="d-flex gap-4">
                                <img
                                className="rounded-circle bg-light my-2 mx-2"
                                src={GestionV}
                                style={{ height: '3rem', width: '3rem' }}
                                />
                                <div className="flex-grow-1">
                                <p className="fw-bold text-sm font-semibold leading-6 badge bg-dark" value={IdCat} onChange={(v)=>SetIdCat(v.target.value)}>{v.id}</p>
                                <p className="fw-bold text-sm font-semibold leading-6">{v.libelleCategorie}</p>
                                </div>
                            </div>
                            <div className="d-sm-flex flex-column align-items-end">
                                <div className="row">
                                    <div className="col">
                                        <button className="btn btn-danger" onClick={()=>confirmDeleteUser(v.id)}>Supprimer</button>
                                    </div>
                                    <div className="col">
                                        <button className="btn btn-info" onClick={()=>navigate(`/UpdateCategorie/${v.id}`)}>Modifier</button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                ))}
            </div>
        </div>  
    )
}
export default GestionCategorie;