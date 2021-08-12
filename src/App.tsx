
import React, { useState, useEffect }from 'react';
import './App.css';
import 'react-calendar-timeline/lib/Timeline.css';
import SideMenu from './components/SideMenu';
import UsersPage from './pages/Users';
import AgentsPage from './pages/Agents';
import FormsPage from './pages/Forms';
import StatsPage from './pages/Stats';
import TasksPage from './pages/Tasks';
import UploadFilesPage from './pages/UploadFiles';
import SystemsPage from './pages/Systems';
import DashboardsPage from './pages/Dashboards';
import Login from './pages/Login';
import Utils from './utils';






function App() {
  const [show, setShow] = useState({Users:true, Systems:true, Tasks:true, Forms:true, Agents:true, Dashboard:true, Stats:true, UploadFIles:true, Login: false});
  const token= Utils.getCookie("apiToken");
  
  useEffect(() => {
    if(token){
      setShow({Users:true, Systems:true, Tasks:false, Forms:true, Agents:true, Dashboard:true, Stats:true, UploadFIles:true, Login: true});
    }
  },[])


    const changeView = (view: string) => {
      switch(view) {
        case 'Login': setShow({Users:true, Systems:true, Tasks:true, Forms:true, Agents:true, Dashboard:true, Stats:true, UploadFIles:true, Login: false});
          break;
        case 'Users': setShow({Users:false, Systems:true, Tasks:true, Forms:true, Agents:true, Dashboard:true, Stats:true, UploadFIles:true, Login: true});
          break;
        case 'Systems': setShow({Users:true, Systems:false, Tasks:true, Forms:true, Agents:true, Dashboard:true, Stats:true, UploadFIles:true, Login: true});
          break;
        case 'Tasks': setShow({Users:true, Systems:true, Tasks:false, Forms:true, Agents:true, Dashboard:true, Stats:true, UploadFIles:true, Login: true});
          break;
        case 'Forms': setShow({Users:true, Systems:true, Tasks:true, Forms:false, Agents:true, Dashboard:true, Stats:true, UploadFIles:true, Login: true});
          break;
        case 'Agents': setShow({Users:true, Systems:true, Tasks:true, Forms:true, Agents:false, Dashboard:true, Stats:true, UploadFIles:true, Login: true});
          break;
        case 'Dashboards': setShow({Users:true, Systems:true, Tasks:true, Forms:true, Agents:true, Dashboard:false, Stats:true, UploadFIles:true, Login: true});
          break;
        case 'Stats': setShow({Users:true, Systems:true, Tasks:true, Forms:true, Agents:true, Dashboard:true, Stats:false, UploadFIles:true, Login: true});
          break;
        case 'Upload Files': setShow({Users:true, Systems:true, Tasks:true, Forms:true, Agents:true, Dashboard:true, Stats:true, UploadFIles:false, Login: true});
          break;
      }
  }


  return (
    
    <div className="App">
      <SideMenu displayView={changeView}></SideMenu>
      <div id="tasks" hidden={show.Tasks}><TasksPage changeView={changeView} /></div>
      <div id="users"   hidden={show.Users}><UsersPage changeView={changeView}/></div>
      <div id="systems" hidden={show.Systems}><SystemsPage changeView={changeView}/></div>
      <div id="forms"   hidden={show.Forms}><FormsPage changeView={changeView}/></div>
      <div id="agents" hidden={show.Agents}><AgentsPage changeView={changeView}/></div>
      <div id="dashbords" hidden={show.Dashboard}><DashboardsPage changeView={changeView} /></div>
      <div id="stats" hidden={show.Stats}><StatsPage changeView={changeView}/></div>
      <div id="upload" hidden={show.UploadFIles}><UploadFilesPage changeView={changeView} /></div>
      <div id="login"  hidden={show.Login}><Login changeView={changeView}/></div>
    </div>
  );
}

export default App;

