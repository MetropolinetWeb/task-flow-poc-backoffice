import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Task } from '../interfaces/tasks.interface';
import StateFlow from '../components/StateFlow';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    // width: '100%',
  },
}));

const FullWidthTabs = (props: {selectedTask: Task}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
 
  //const jsonTaskArr = Object.entries(selectedTask);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Task Details" {...a11yProps(0)} />
          <Tab label="Agent Details" {...a11yProps(1)} />
          <Tab label="State" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleChangeIndex}>
        <TabPanel value={value} index={0} dir={theme.direction}>
          {props.selectedTask && props.selectedTask.id.length > 1 && <div>
            <h4>{props.selectedTask.system.name} - {props.selectedTask.name}</h4>
            <div className="floatL alignL">
              <p>Type:  <span className="blu">{props.selectedTask.type}</span></p>
              <p>State:  <span className="blu">{props.selectedTask.state.stateHistory[0].currentState}</span></p>
              <p>Assign To:  <span className="blu">{props.selectedTask.assignmentInfo!.agentName}</span></p>
              <p>Description:  <span className="blu">{props.selectedTask.description}</span></p>
              <p>Start Time:  <span className="blu">{props.selectedTask.executionDetails.startTime}</span></p>
              <p>Created Time:  <span className="blu">{props.selectedTask.createdAt}</span></p>
              <p>Created By:  <span className="blu">missing</span></p>
              <p>Estimated Duration:  <span className="blu">missing</span></p>
              <p>Last Date To Preform:  <span className="blu">missing</span></p>
              <p>ExecutionDate:  <span className="blu">missing</span></p>
              <p>Actual Duration:  <span className="blu">missing</span></p>
            </div>
          </div>}
          
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <p>Agent Details</p>
          {JSON.stringify(props.selectedTask.id.length < 1 ? null: props.selectedTask.assignmentInfo, null, 2)}
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
        <StateFlow />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

export default FullWidthTabs
