import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router , Routes , Route , Link} from 'react-router-dom';
import Login from './Auth/Login';
import Inscription from './Auth/Inscription';
import LoginPic from './img/login.png'
import InscriptionPic from './img/inscription.png'
import Logout from './img/logout.png'
import DashboardAdmin  from './Admin/DashboardAdmin';
import ConsulterAnnonces from './User/ConsulterAnnonces';
import DesposerAnnonce from './User/DesposerAnnonce';
import SupprimerAnnonce from './User/SupprimerAnnonce';
import SupprimerMembre from './Admin/SupprimerMembre';
import GestionVille from './Admin/GestionVille';
import CreeVille from './Admin/CreeVille';
import UpdateVille from './Admin/UpdateVille';
import ValidationAnnonce from './Admin/ValidationAnnonce';
import GestionCategorie from './Admin/GestionCategorie';
import CreeCategorie from './Admin/CreeCategorie';
import UpdateCategorie from './Admin/UpdateCategorie';
import SupprimerAnnonces from './Admin/SupprimerAnnonces';
// Aymen
import Filter from './User/FilterAnnonce';
function Menu(){
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('user_id');
        window.location.href = '/';
      };      
    return(
        <Router>
            <nav className="navbar navbar-expand-lg py-0 navbar-light px-2" style={{backgroundColor:"#e3f2fd"}}>
                <span><b>Nouveau !</b>Créez un compte</span>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link fw-bold" to={"/login"}><span><img src={LoginPic} style={{width:"20px",height:"20px"}} />&nbsp;Se connecter</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fw-bold" to={"/inscription"}><span><img src={InscriptionPic} style={{width:"20px",height:"20px"}} />&nbsp;Créez un compte</span></Link>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link fw-bold" onClick={handleLogout}><span><img src={Logout} style={{width:"20px",height:"20px"}} />&nbsp;Deconnecter</span></button>
                            </li>
                        </ul>
                    </div>
            </nav>
            <Routes>
                <Route path='/login' element={<Login/>} />
                <Route path='/inscription' element={<Inscription/>} />
                <Route path='/dashboardadmin' element={<DashboardAdmin/>} />
                <Route path='/' element={<ConsulterAnnonces/>} />
                <Route path='/DesposerAnnonce' element={<DesposerAnnonce/>} />
                <Route path='/SupprimerAnnonce' element={<SupprimerAnnonce/>} />
                <Route path='/SupprimerMembre' element={<SupprimerMembre/>} />
                <Route path='/GestionVille' element={<GestionVille/>} />
                <Route path='/CreeVille' element={<CreeVille/>} />
                <Route path='/UpdateVille/:id' element={<UpdateVille/>} />
                <Route path='/ValidationAnnonce' element={<ValidationAnnonce/>} />
                <Route path='/SupprimerAnnonces' element={<SupprimerAnnonces/>} />
                {/* Aymen */}
                <Route path='/filter' element={<Filter/>} />
                <Route path='/GestionCategorie' element={<GestionCategorie/>} />
                <Route path='/CreeCategorie' element={<CreeCategorie/>} />
                <Route path='/UpdateCategorie/:id' element={<UpdateCategorie/>} />
            </Routes>
        </Router>
    )
}
export default Menu;