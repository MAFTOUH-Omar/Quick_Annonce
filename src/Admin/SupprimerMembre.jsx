import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import User from '../img/User.gif';
import Supprimer from '../img/SupprimerA.png';
function SupprimerMembre(){
    const [msg, setMsg] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
      const accessToken = localStorage.getItem('token');
      if (!accessToken) {
        navigate('/login');
      }
    }, [navigate]);

    const [user,SetUser]=useState(null);
    useEffect(()=>{
        axios.get('http://localhost:8000/api/showUser')
        .then(response=>SetUser(response.data.success))
    },[])
    const [idUser,SetIdUser]=useState(null);
    const DeleteUser = (idUser) => {
        axios
          .delete(`http://localhost:8000/api/destroyUser/${idUser}`)
          .then(() => {
            alert('Bien Supprimer');
            window.location.reload();
          })
          .catch((error) => {
            console.error('Failed to delete', error);
          });
      };
      const confirmDeleteUser = (userId) => {
        const confirmMessage = "Are you sure you want to delete this user?";
        const shouldDelete = window.confirm(confirmMessage);
        if (shouldDelete) {
          DeleteUser(userId);
        }
      };
    return(
        <div className="container">
            <div className="row text-center my-4">
                <div className="col d-flex justify-content-center"> 
                    <h5 className="rounded-5 py-3 w-25 text-danger fw-bold text-center">
                        <span className="badge bg-danger"><img src={Supprimer} style={{width:"50px",height:"50px"}}/></span>
                        &nbsp;&nbsp;<span>Supprimer Membre</span>
                    </h5>
                </div>
            </div>
            <div className="row">
                <div className="col my-1">
                    <button onClick={()=>navigate('/dashboardadmin')} className="btn btn-dark">DashboardAdmin</button>
                </div>
            </div>
            <div className="row">
                {user && user.map(u=>(
                    <div className="col">
                        <ul className="list-group mb-2">
                            <li className="border border-dark list-group-item d-flex justify-content-between align-items-center">
                                <div className="d-flex gap-4">
                                    <img
                                    className="rounded-circle bg-gray-50"
                                    src={User}
                                    style={{ height: '3rem', width: '3rem' }}
                                    />
                                    <div className="flex-grow-1">
                                    <p className="fw-bold text-sm font-semibold leading-6 badge bg-dark" value={idUser} onChange={(i)=>SetIdUser(i.target.value)}>{u.id}</p>
                                    <p className="fw-bold text-sm font-semibold leading-6">{u.nom}&nbsp;{u.prenom}</p>
                                    <p className="fw-bold mt-1 truncate text-xs leading-5">{u.email}</p>
                                    </div>
                                </div>
                                <div className="d-sm-flex flex-column align-items-end">
                                    <p className="fw-bold text-sm"><span className={u.sexe=="homme"?"badge bg-info":"badge bg-success"}>{u.sexe}</span></p>
                                    <p className="fw-bold mt-1 text-xs">
                                    <p className="fw-bold">{u.telephone}</p>
                                    </p>
                                    <button className="btn btn-danger" onClick={()=>confirmDeleteUser(u.id)}><img src={Supprimer} style={{width:"20px",height:"20px"}} /><span>Supprimer</span></button>
                                </div>
                            </li>
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default SupprimerMembre;