import axios from "axios";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
function ConsulterAnnonces(){
    // const navigate=useNavigate();
    // useEffect(() => {
    //   const accessToken = localStorage.getItem('token');
    //   if (!accessToken) {
    //     navigate('/login');
    //   }
    // }, [navigate]);
    const [v,setV] = useState(null)
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/allVille').then(r=>setV(r.data))
    },[])
    const [c,setC] = useState(null)
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/allCat').then(r=>setC(r.data))
    },[])
    const [data, setData] = useState([]);
    const [ville, setVilleP] = useState('');
    const [categorie, setCatP] = useState('');
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/consulter', {
            params: {
                param1: ville,
                param2: categorie
            }
          });
          setData(response.data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, [ville, categorie]);
    console.log(ville)
    
    return(
        <div className="conatiner text-center">
          
            <ul class="nav bg-info py-4  justify-content-around">
                <li className="nav-item">
                    <label className="h3 fw-bold">trier par :</label>
                </li>
                <li className="nav-item">
                    <label>categorie :</label>
                    <select  className="form-control"  value={categorie} onChange={(e) => setCatP(e.target.value)} >
                    {c && c.map((e)=>(
                            <option>{e.libelleCategorie}</option>
                    ))}
                    </select>
                </li>
                <li className="nav-item">
                    <label >ville :</label>
                    <select  className="form-control"  value={ville} onChange={(e) => setVilleP(e.target.value)}>
                        {v && v.map((e)=>(
                            <option>{e.nomVille}</option>
                        ))}
                    </select>
                </li> 
              
            </ul>
            <div>
      
      </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>image</th>
                        <th>titre</th>
                        <th>prix</th>
                        <th>ville</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                {data && data.map((e,i)=>(
                    <tr key={i+1}>
                        <td scope="row"><img src={`http://localhost:8000/storage/${e.photo}`} width={50}/></td>
                        <td>{e.titreAnnonce}</td>
                        <td>{e.prix}</td>
                        <td>{e.nomVille}</td>
                        <td>{e.created_at}</td>
                      </tr>
                ))}
                </tbody>
            </table>
    
        </div>
    );
}
export default ConsulterAnnonces;
