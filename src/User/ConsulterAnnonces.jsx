import axios from "axios";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Logo from '../img/logo.png';
import CreerAnnonce from '../img/CreerAnnonce.gif';
import { useNavigate } from "react-router-dom";
function ConsulterAnnonces(){
    const [an,setAn] = useState(null);
    const navigate=useNavigate();
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/allAnnonces').then(r=>setAn(r.data))
    },[])
    const [searchT , setSearchT] = useState("");
    console.log(searchT)
    return(
        <div className="container text-center">
            <div className="row my-2">
                <div className="col">
                    <img src={Logo} 
                    style={{width:'300px',height:"100px"}} />
                </div>
                <div className="col mt-4">
                    <input type="text" className="form-control" placeholder="search" 
                    onChange={(e)=>setSearchT(e.target.value)}
                    />
                </div>
                <div className="col d-flex justify-content-center align-items-center">
                    <button className='rounded-5 form-control w-75 text-dark fw-bold border border-dark text-center' onClick={()=>navigate('/DesposerAnnonce')}><img src={CreerAnnonce} style={{width:"50px",height:"50px"}}/><span>&nbsp;Créez Votre Annonce</span></button>
                </div>
            </div>
            <div className="row">
                <div className="col d-flex justify-content-start">
                    <button className="btn btn-info px-4 text-light" onClick={()=>navigate('/filter')}>Filtrage</button>
                </div>
            </div>
            <div className="row">
                {an && an.filter((d)=>d.titreAnnonce.toLowerCase().includes(searchT)).map((e,i)=>(
                    <div className="col my-2" key={i}>
                    <ul className="list-group mb-2">
                        <li className="border border-dark list-group-item d-flex justify-content-between align-items-center">
                            <div className="d-flex gap-4">
                                <img
                                className="rounded-circle bg-gray-50"
                                src={`http://localhost:8000/storage/${e.photo}`}
                                style={{width:'100px',height:'100px'}}
                                />
                                <div className="flex-grow-1">
                                <p className="fw-bold text-sm font-semibold leading-6 badge bg-dark">{e.id}</p>
                                <p className="fw-bold text-sm font-semibold leading-6">Titre : {e.titreAnnonce}</p>
                                <p className="fw-bold mt-1 truncate text-xs leading-5">Prix : {e.prix}</p>
                                </div>
                            </div>
                            <div className="d-sm-flex flex-column align-items-end">
                                {/* <p className="fw-bold text-sm"><span className={u.sexe=="homme"?"badge bg-info":"badge bg-success"}>{u.sexe}</span></p> */}
                                <p className="fw-bold mt-1 text-xs">
                                <p className="fw-bold">Ville : {e.nomVille}</p>
                                <p className="fw-bold">Date Creation : {e.created_at}</p>
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
                ))}
            </div>
        </div>
    );
}
export default ConsulterAnnonces;
