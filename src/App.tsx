import React from 'react';
import './App.css';
import 'react-calendar-timeline/lib/Timeline.css';
import PersistentDrawerLeft from './components/sideMenu';
import Timeline from 'react-calendar-timeline';
import PanelGroup from 'react-panelgroup';
import FullWidthTabs  from './components/FullWidthTabs'
import { Button, ListItemIcon } from '@material-ui/core';
import moment from 'moment';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';


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
  return (
    <div className="App">
      <PersistentDrawerLeft></PersistentDrawerLeft>
      <Timeline groups={agents} items={tasks} defaultTimeStart={moment().add(-12, 'hour')} defaultTimeEnd={moment().add(12, 'hour')}/>
        <PanelGroup>
          <div className="panel"></div>
          <div className="panel">
            <FullWidthTabs />
          </div>
        </PanelGroup>
        <div>
          <Button variant="contained" color="primary">NEW TASK<ListItemIcon><LibraryAddIcon /></ListItemIcon></Button>
        </div>
    </div>
  );
}

export default App;
