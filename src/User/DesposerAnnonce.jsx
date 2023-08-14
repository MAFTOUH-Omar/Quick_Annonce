import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreerAnnonce from '../img/CreerAnnonce.gif'
import axios from 'axios';
function DesposerAnnonce(){
    const navigate=useNavigate();
    useEffect(() => {
        const accessToken = localStorage.getItem('token');
        if (!accessToken) {
          navigate('/login');
        }
      }, [navigate]);
    const EmailStorage=localStorage.getItem('email')
    const [nom,Setnom]=useState('');
    const [email,Setemail]=useState('');
    const [telephone,Settelephone]=useState('');
    const [categorie,Setcategorie]=useState('');
    const [ville,Setville]=useState('');
    const [titreAnnonce,SettitreAnnonce]=useState('');
    const [descriptionAnnonce,SetdescriptionAnnonce]=useState('');
    const [prix,Setprix]=useState('');
    const [photo,Setphoto]=useState(null);

    const [optVille,SetOptVille]=useState(null)
    const [optCategorie,SetOptCategorie]=useState(null)

    const handlePhotoChange = e => {
        const file = e.target.files[0];
        Setphoto(file);
    };
    // Get all Categorie
    useEffect(() => {
        axios.get('http://localhost:8000/api/categorie')
          .then(response => {
            SetOptCategorie(response.data.categorie);
          })
          .catch(error => console.error('Failed to fetch categories', error));
      }, []);
    // Get all Ville
    useEffect(()=>{
        axios.get('http://localhost:8000/api/ville')
        .then(response=>SetOptVille(response.data.ville))
        .catch(error => console.error('Failed to fetch ville', error));
    },[])
    const [Err,SetErr]=useState('')
    const user_id = localStorage.getItem('user_id');
    const AddAnnonce = async () => {
        try {
          const formData = new FormData();
          formData.append('nom', nom);
          formData.append('email', email);
          formData.append('telephone', telephone);
          formData.append('categorie', categorie);
          formData.append('ville', ville);
          formData.append('titreAnnonce', titreAnnonce);
          formData.append('descriptionAnnonce', descriptionAnnonce);
          formData.append('prix', prix);
          formData.append('photo', photo);
          formData.append('user_id', user_id);
      
          const response = await axios.post('http://localhost:8000/api/deposerAnnonce', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log(response.data.success);
          navigate('/SupprimerAnnonce');
        } catch (error) {
          console.error('Failed to add annonce', error);
          SetErr('Failed to add annonce');
        }
      };
      
    return(
        <div className="container mb-5">
            <div className="row text-center my-3">
                <div className="col">
                    <h3>Bienvenue&nbsp;<span className='badge bg-info'>{EmailStorage}</span></h3>
                </div>
            </div>
            <div className="row ">
                <div className="col d-flex justify-content-center">
                    <h6 className='bg-light rounded-5 py-3 w-25 text-dark fw-bold text-center'><img src={CreerAnnonce} style={{width:"50px",height:"50px"}}/><span>&nbsp;Créez Votre Annonce</span></h6>
                </div>
            </div>
            <div className="row col-7 my-2 mx-auto">
                <div className="col">
                    <label>Votre nom</label>
                    <input type="text" className='form-control' value={nom} onChange={(n)=>Setnom(n.target.value)} />
                </div>
            </div>
            <div className="row  col-7 my-2 mx-auto">
                <div className="col">
                    <label>E-mail</label>
                    <input type="text" className='form-control' value={email} onChange={(e)=>Setemail(e.target.value)} />
                </div>
            </div>
            <div className="row  col-7 my-2 mx-auto">
                <div className="col">
                    <label>Tel</label>
                    <input type="text" className='form-control' value={telephone} onChange={(t)=>Settelephone(t.target.value)} />
                </div>
            </div>
            <div className="row  col-7 my-2 mx-auto">
                <div className="col">
                    <label>Categorie</label>
                    <select className='form-select' value={categorie} onChange={(c)=>Setcategorie(c.target.value)}>
                    {optCategorie && optCategorie.map(c => (
                        <option key={c.id} value={c.id}>{c.libelleCategorie}</option>
                    ))}
                    </select>
                </div>
                <div className="col">
                    <label>Ville</label>
                    <select className='form-select' value={ville} onChange={(v)=>Setville(v.target.value)}>
                        {optVille && optVille.map(v=>(
                            <option key={v.id} value={v.id}>{v.nomVille}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="row col-7 my-2 mx-auto">
                <div className="col">
                    <label>Titre de l'annonce</label>
                    <input type="text" className='form-control' value={titreAnnonce} onChange={(t)=>SettitreAnnonce(t.target.value)} />
                </div>
            </div>
            <div className="row col-7 my-2 mx-auto">
                <div className="col">
                    <label>Description de l'annonce</label>
                    <textarea type="text" className='form-control' value={descriptionAnnonce} onChange={(d)=>SetdescriptionAnnonce(d.target.value)} ></textarea>
                </div>
            </div>
            <div className="row col-7 my-2 mx-auto">
                <div className="col">
                    <label>Prix</label>
                    <input type="text" className='form-control' value={prix} onChange={(p)=>Setprix(p.target.value)} />
                </div>
            </div>
            <div className="row col-7 my-2 mx-auto">
                <div className="col">
                    <label>Photo</label>
                    <input type="file" className='form-control' onChange={handlePhotoChange} />
                </div>
            </div>
            <div className="row col-7 my-2 mx-auto">
                <div className="col">
                    <button className='btn btn-info form-control text-light' onClick={AddAnnonce}>Publier</button>
                </div>
                <div className="col">
                    <button className='btn btn-danger form-control' onClick={()=>navigate('/SupprimerAnnonce')}>Supprimer des Annonces</button>
                </div>
            </div>
            {Err && 
                <div className="row">
                    <div className="col">
                        <div className="alert alert-danger">{Err}</div>
                    </div>
                </div>
            }
        </div>
                // 'nom',
                // 'email',
                // 'telephone',
                // 'categorie',
                // 'ville',
                // 'titreAnnonce',
                // 'descriptionAnnonce',
                // 'prix',
                // 'photo',
    )
}
export default DesposerAnnonce;