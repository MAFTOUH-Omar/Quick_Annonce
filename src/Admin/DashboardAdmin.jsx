import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Validation from '../img/Validation.png';
import SupprimerU from '../img/SupprimerU.png';
import Category from '../img/Category.gif';
import GestionV from '../img/GestionV.png';
import SupprimerA from '../img/SupprimerA.png';
import Chart from 'chart.js/auto';
function DashboardAdmin() {
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('token');
  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    if (!accessToken) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios.get('http://localhost:8000/api/admin/dashboard', config)
    .then((res) => {
    setMsg(res.data.items);
        if (res.status === 201) {
            window.location.reload();
            localStorage.removeItem('token');
        }
    })
    .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 403) {
            navigate('/login');
        }
    });
  }, [navigate]);
  //Statistique Annonce
  const [StaAnnonce,SetStaAnnonce]=useState(null);
  useEffect(()=>{
    axios.get('http://localhost:8000/api/statistiqueAnnonce')
    .then(response=>SetStaAnnonce(response.data))
  },[])
  //Statistique Categorie
  const [StaCategorie,SetStaCategorie]=useState(null);
  useEffect(()=>{
    axios.get('http://localhost:8000/api/statistiqueCategorie')
    .then(response=>SetStaCategorie(response.data))
  },[])
  //Statistique Ville
  const [StaVille,SetStaVille]=useState(null);
  useEffect(()=>{
    axios.get('http://localhost:8000/api/statistiqueVille')
    .then(response=>SetStaVille(response.data))
  },[])
  //Statistique User
  const [StaUser,SetStaUser]=useState(null);
  useEffect(()=>{
    axios.get('http://localhost:8000/api/statistiqueUser')
    .then(response=>SetStaUser(response.data))
  },[])
  //Chart
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/chart-data');
      const responseData = response.data.chart_data;
  
      console.log('Fetched data:', responseData);
  
      const ctx = chartRef.current.getContext('2d');
  
      if (window.myChart !== undefined) {
        window.myChart.destroy();
      }
  
      window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: responseData.labels,
          datasets: [
            {
              label: responseData.datasets[0].label,
              data: responseData.datasets[0].data,
              backgroundColor: responseData.datasets[0].backgroundColor,
              borderColor: responseData.datasets[0].borderColor,
              borderWidth: responseData.datasets[0].borderWidth,
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: 'category',
              labels: responseData.labels,
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  const EmailStorage=localStorage.getItem('email')
  
  return (
    <div className="container text-center">
      <h3 className='my-4 fw-bold'>Panel d'administrateur&nbsp;<span className='badge bg-info'>{EmailStorage}</span></h3>
      <div className="row">
        <div className="col">
            <button className='btn btn-dark form-control' onClick={()=>navigate('/ValidationAnnonce')}>
                <img src={Validation} style={{width:"100px",height:"100px"}}/><br/>
                <p className='fw-bold'>Validation Annonces</p>
            </button>
        </div>
        <div className="col">
            <button className='btn btn-dark form-control' onClick={()=>navigate('/SupprimerMembre')}>
                <img src={SupprimerU}  style={{width:"100px",height:"100px"}}/><br />
                <p className='fw-bold'>Supprime un Membre</p>
            </button>
        </div>
        <div className="col">
            <button className='form-control border-dark' style={{backgroundColor:"#e3f2fd"}} onClick={()=>navigate('/GestionCategorie')}>
                <img src={Category}  style={{width:"100px",height:"100px"}}/><br />
                <p className='fw-bold'>Gestion Des Categories</p>
            </button>
        </div>
        <div className="col">
            <button className='btn btn-dark form-control' onClick={()=>navigate('/GestionVille')}>
                <img src={GestionV}  style={{width:"100px",height:"100px"}}/><br />
                <p className='fw-bold'>Gestion Des Villes</p>
            </button>
        </div>
        <div className="col">
            <button className='btn btn-dark form-control' onClick={()=>navigate('/SupprimerAnnonces')}>
                <img src={SupprimerA}  style={{width:"100px",height:"100px"}}/><br />
                <p className='fw-bold'>Supprimer Annonce</p>
            </button>
        </div>
      </div>
      <div className="row my-1">
        <div className="col">
          <button onClick={()=>navigate('/DesposerAnnonce')} className='btn text-light border-dark form-control' style={{backgroundColor:"#000"}}>Desposer Annonce</button>
        </div>
        <div className="col">
          <button onClick={()=>navigate('/')} className='btn text-light border-dark form-control' style={{backgroundColor:"#000"}}>Accueil</button>
        </div>
      </div>
      <div className="row">
        <div className="row">
          <div className="col">
              <h3 className='fw-bold'>Statistique</h3>
          </div>
        </div>
        <div className="col">
          <div className="row my-1">
            <div className="col rounded-4 border border-dark m-1 py-3 fw-bold" style={{background:"#e3f2fd",height:"100px"}}>
              <h5 className='text-dark fw-bold'>Nombre d'annonce</h5>
              {StaAnnonce && StaAnnonce.map(s=>(
                <p className='badge bg-dark'>{s.nbAnnonce}</p>
              ))}
            </div>
            <div className="col rounded-4 border border-dark m-1 py-3" style={{background:"#FFF",height:"100px"}}>
            <h5 className='text-dark fw-bold'>Nombre de categorie</h5>
              {StaCategorie && StaCategorie.map(s=>(
                <p className='badge bg-dark'>{s.nbCategories}</p>
              ))}
            </div>
          </div>
          <div className="row my-1">
            <div className="col rounded-4 border border-dark m-1 py-3" style={{background:"#fff",height:"100px"}}>
            <h5 className='text-dark fw-bold'>Nombre de ville</h5>
              {StaVille && StaVille.map(s=>(
                <p className='badge bg-dark'>{s.nbVilles}</p>
              ))}
            </div>
            <div className="col rounded-4 border border-dark m-1 py-3" style={{background:"#e3f2fd",height:"100px"}}>
              <h5 className='text-dark fw-bold'>Nombre de membre</h5>
              {StaUser && StaUser.map(s=>(
                <p className='badge bg-dark'>{s.nbUsers}</p>
              ))}
            </div>
          </div>
        </div>
      <div className="row">
          <div className="row">
            <div className="col">
              <h3 className='text-dark fw-bold'>Chart</h3>
            </div>
          </div>
          <div className="row">
            <canvas ref={chartRef}></canvas>
          </div>
      </div>
      </div>
    </div>
  );
}
export default DashboardAdmin;
