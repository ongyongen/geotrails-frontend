import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { LandingPage } from './pages/LandingPage/LandingPage'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { SignupPage } from './pages/SignupPage/SignupPage'
import { GeocachesPage } from './pages/GeocachesPage/GeocachesPage'
import { GeocacheDetailsPage } from './pages/GeocacheDetailsPage/GeocacheDetailsPage'
import GlobalStyle from './themes/globalStyles'
import { 
  HOME_PAGE_PATH, 
  LOGIN_PAGE_PATH,
  SIGNUP_PAGE_PATH, 
  GEOCACHES_PAGE_PATH,
  GEOCACHE_DETAILS_PAGE_PATH,
  GEOCACHES_PAGE_MAP_PATH,
  USER_PROFILE_PAGE_PATH,
  USER_DASHBOARD_PATH
} from './routes'
import { GeocachesMap } from './pages/GeocachesPage/GeocachesMap/GeocachesMap'
import { Profile } from './pages/Profile/Profile'
import { Dashboard } from './pages/Profile/Dashboard'

function App() {
  return (
    <div className="App">
      <GlobalStyle/>
      <BrowserRouter>
          <Routes>
            <Route path={HOME_PAGE_PATH} element={<LandingPage/>}/>
            <Route path={LOGIN_PAGE_PATH} element={<LoginPage/>}/>
            <Route path={SIGNUP_PAGE_PATH} element={<SignupPage/>}/>
            <Route path={GEOCACHES_PAGE_PATH} element={<GeocachesPage/>}/>
            <Route path={GEOCACHE_DETAILS_PAGE_PATH} element={<GeocacheDetailsPage/>}/>
            <Route path={GEOCACHES_PAGE_MAP_PATH} element={<GeocachesMap/>}/>
            <Route path={USER_PROFILE_PAGE_PATH} element={<Profile/>}/>
            <Route path={USER_DASHBOARD_PATH} element={<Dashboard/>}/>

          </Routes>
      </BrowserRouter>
    </div>
  )
}



export default App;
