import React from 'react';
import './App.css';
import 'react-calendar-timeline/lib/Timeline.css';
import Timeline from 'react-calendar-timeline';
import PanelGroup from 'react-panelgroup';
import FullWidthTabs  from './components/FullWidthTabs'
import { Button, ListItemIcon } from '@material-ui/core';
import moment from 'moment';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import TaskData from './components/TaskData';
import { useState } from 'react';
import SideMenu from './components/SideMenu';


const agents = [{ id: 1, title: 'דוד דוד',rightTitle: 'side title'}, 
                { id: 2, title: 'ג`ק הרר',rightTitle: 'side title'}, 
                { id: 3, title: 'רמי לוי',rightTitle: 'side title'}]

const tasks = [
  {
    id: 1,
    group: 1,
    title: 'קריאת מד',
    start_time: moment(),
    end_time: moment().add(1, 'hour'),
    canMove: true,
    canResize: true,
    canChangeGroup: true,
    itemProps: {
      // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
      'data-custom-attribute': 'Random content',
      'aria-hidden': true,
      onDoubleClick: () => { alert('Show task details') },
      className: 'weekend',
      style: {
        background: 'green'
      }
    }
  },
  {
    id: 2,
    group: 2,
    title: 'התנקשות',
    start_time: moment().add(-0.5, 'hour'),
    end_time: moment().add(0.5, 'hour'),
    canMove: true,
    canResize: true,
    canChangeGroup: true,
    itemProps: {
      // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
      'data-custom-attribute': 'Random content',
      'aria-hidden': true,
      onDoubleClick: () => { alert('Show task details') },
      className: 'weekend',
      style: {
        background: 'red'
      }
    }
  },
  {
    id: 3,
    group: 1,
    title: 'גביה',
    start_time: moment().add(2, 'hour'),
    end_time: moment().add(3, 'hour'),
    canMove: true,
    canResize: true,
    canChangeGroup: true,
    itemProps: {
      // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
      'data-custom-attribute': 'Random content',
      'aria-hidden': true,
      onDoubleClick: () => { alert('Show task details') },
      className: 'weekend',
      style: {
        background: 'blue'
      }
    }
  }
]


function App() {
  const [show, setShow] = useState({Users:true, Systems:true, Tasks:false, Forms:true, Agents:true});

  const displayShow = (divName: string) => {
    switch(divName){
      case 'users': setShow({Users:false, Systems:true, Tasks:true, Forms:true, Agents:true});
        break;
      case 'systems': setShow({Users:true, Systems:false, Tasks:true, Forms:true, Agents:true});
        break;
      case 'tasks': setShow({Users:true, Systems:true, Tasks:false, Forms:true, Agents:true});
        break;
      case 'forms': setShow({Users:true, Systems:true, Tasks:true, Forms:false, Agents:true});
        break;
      case 'agents': setShow({Users:true, Systems:true, Tasks:true, Forms:true, Agents:false});
        break;
    }
  };



  return (
    
    <div className="App" hidden={show.Tasks}>
      <SideMenu></SideMenu>
      <div id="tasks" >
        <Timeline groups={agents} items={tasks} defaultTimeStart={moment().add(-12, 'hour')} defaultTimeEnd={moment().add(12, 'hour')}/>
        <PanelGroup>
          <div className="panel">
            <TaskData />
          </div>
          <div className="panel">
            <FullWidthTabs />
          </div>
        </PanelGroup>
        <div>
          <Button variant="contained" color="primary">NEW TASK<ListItemIcon><LibraryAddIcon /></ListItemIcon></Button>
        </div>
      </div>
      <div id="users"   hidden={show.Users}>USERS</div>
      <div id="systems" hidden={show.Systems}>SYSTEMS</div>
      <div id="tasks"   hidden={show.Tasks}>TASKS</div>
      <div id="forms"   hidden={show.Forms}>FORMS</div>
      <div id="agents"  hidden={show.Agents}>AGENTS</div>
    </div>
  );
}

export default App;
