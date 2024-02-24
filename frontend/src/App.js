
import './App.css';
import About from './components/about/about';
import ContactUs from './components/contactus/contactus';
import Home from './components/home/home';
import NavBar from './components/navbar';
import Events from './components/Events/Events'
import Login from './pages/login/login';
import SignUp from './pages/signup/signup';
import CreateProfile from './pages/createProfile/createprofile'
import AddEvent from './pages/addEvent/addEvent'
import EventList from './pages/eventlist/eventList'
import Profile from './pages/profile/profile'
import UpdateProfile from './pages/updateProfile/updateprofile'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
<div className="App">
      <NavBar/>
      <Routes>
      <Route path="/" element={<Home/>} />
            <Route path="/events" element={<Events/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/contact" element={<ContactUs/>} /> 
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/signup/createprofile/:email' element={<CreateProfile/>}/>
            <Route path='/login/profile/:email' element={<Profile/>}/>
            <Route path='/login/profile/addevent/:email' element={<AddEvent/>}/>
            <Route path='/login/profile/eventlist/:email' element={<EventList/>}/>
            <Route path='/signup/updateprofile/:email' element={<UpdateProfile/>}/>
      </Routes>
    </div>
    </Router>
    
  );
}

export default App;
