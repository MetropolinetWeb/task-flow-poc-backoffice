
import React from 'react';
import { useState } from 'react';
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





function App() {
  const [show, setShow] = useState({Users:true, Systems:true, Tasks:false, Forms:true, Agents:true, Dashboard:true, Stats:true, UploadFIles:true});

  const changeView = (view: string) => {
    switch(view){
      case 'Users': setShow({Users:false, Systems:true, Tasks:true, Forms:true, Agents:true, Dashboard:true, Stats:true, UploadFIles:true});
        break;
      case 'Systems': setShow({Users:true, Systems:false, Tasks:true, Forms:true, Agents:true, Dashboard:true, Stats:true, UploadFIles:true});
        break;
      case 'Tasks': setShow({Users:true, Systems:true, Tasks:false, Forms:true, Agents:true, Dashboard:true, Stats:true, UploadFIles:true});
        break;
      case 'Forms': setShow({Users:true, Systems:true, Tasks:true, Forms:false, Agents:true, Dashboard:true, Stats:true, UploadFIles:true});
        break;
      case 'Agents': setShow({Users:true, Systems:true, Tasks:true, Forms:true, Agents:false, Dashboard:true, Stats:true, UploadFIles:true});
        break;
      case 'Dashboards': setShow({Users:true, Systems:true, Tasks:true, Forms:true, Agents:true, Dashboard:false, Stats:true, UploadFIles:true});
        break;
      case 'Stats': setShow({Users:true, Systems:true, Tasks:true, Forms:true, Agents:true, Dashboard:true, Stats:false, UploadFIles:true});
        break;
      case 'Upload Files': setShow({Users:true, Systems:true, Tasks:true, Forms:true, Agents:true, Dashboard:true, Stats:true, UploadFIles:false});
        break;
    }
  };



  return (
    
    <div className="App">
      <SideMenu displayView={changeView}></SideMenu>
      <div id="tasks" hidden={show.Tasks}><TasksPage /></div>
      <div id="users"   hidden={show.Users}><UsersPage /></div>
      <div id="systems" hidden={show.Systems}><SystemsPage /></div>
      <div id="forms"   hidden={show.Forms}><FormsPage /></div>
      <div id="agents" hidden={show.Agents}><AgentsPage /></div>
      <div id="dashbords" hidden={show.Dashboard}><DashboardsPage /></div>
      <div id="stats" hidden={show.Stats}><StatsPage /></div>
      <div id="upload"  hidden={show.UploadFIles}><UploadFilesPage /></div>
    </div>
  );
}

export default App;
