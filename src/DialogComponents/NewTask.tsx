import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { Box, DialogActions, DialogContent, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { Task } from "../interfaces/tasks.interface";
import {MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
import { ModeComment } from '@material-ui/icons';
import moment from 'moment';
import BOServices from '../BOServices';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: "relative",
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 140,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function NewTaskDialog(props:{open:boolean, handleNewTaskClose:() => void}) {
  
  const classes = useStyles();
  const handleCreateClick = async() => {
      const taskToSend = {
        state:{
          availableStates:["new", "in_progress", "done"],
          stateHistory:{
            previousState:"",
            currentState: "new"
          }
        },
        tags:[],
        assignmentInfo:null,
        name:name,
        type:type,
        description:description,
        groupBy:[selectedGroup],
        executionDetails:{
          scheduledDate: scheduledDate,
          executionDate: null,
          lastDateToPerform: lastDay,
          startTime: scheduledDate,
          duration: duration
        },
        system:{system},

      };
       const response = await BOServices.createNewTask(taskToSend);
       debugger
       if(response.status === 201){
         alert(response.data.message);
       }else{
         //goToErrorPage();
       }
      
  }
  const handleTypeChange = (event: React.ChangeEvent<{
    name?: string | undefined;
    value: unknown;
}>) => {
    //@ts-ignore
    setType(event.target.value);
  }
  const [type, setType] = React.useState('');
  const [system, setSystem] = React.useState('');
  const [scheduledDate, setScheduledDate] = React.useState<number>(moment.now().valueOf());
  const handleScheduledDateChange = (date:number) => {
    setScheduledDate(date);
  };
  const [lastDay,setLastDay] = React.useState<number>(moment.now().valueOf());
  const handleLastDayDateChange = (date:number) => {
    setLastDay(date);
  };
  const [selectedGroup,setSelectedGroup] = React.useState('');
  const handleGroupChange = (event: React.ChangeEvent<{
    name?: string | undefined;
    value: unknown;
}>) => {
    //@ts-ignore
    setSelectedGroup(event.target.value);
  }
  const [name,setName]=React.useState('');
  const handleNameChange = (event: React.ChangeEvent<{
    name?: string | undefined;
    value: unknown;
  }>) => {
    //@ts-ignore
    setName(event.target.value);
 }

  const [description,setDescription]=React.useState('');
  const handleDescriptionChange = (event: React.ChangeEvent<{
    name?: string | undefined;
    value: unknown;
  }>) => {
    //@ts-ignore
    setDescription(event.target.value);
 }
  
  const [duration,setDuration]=React.useState('0');
  const handleDurationChange = (event: React.ChangeEvent<{
    name?: string | undefined;
    value: unknown;
  }>) => {
    //@ts-ignore
    setDuration(event.target.value);
 }


  return (
    <div>
      <Dialog open={props.open}  TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="close" onClick={ props.handleNewTaskClose }>
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Create New Task
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent dividers>
          <Typography gutterBottom>
            <label>system name</label>
            <Box m={5}>
              <Box>
                <TextField label="name" value={name} onChange={handleNameChange}/>
              </Box>
              <Box>
                <TextField  label="description" value={description} onChange = {handleDescriptionChange}/>
              </Box>
              <Box>
              <TextField
                  id="datetime-local"
                  label="scheduled date"
                  type="datetime-local"
                  className={classes.selectEmpty}
                  defaultValue={scheduledDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>
              <Box><TextField  label="duration" value={duration} onChange={handleDurationChange}/></Box>
              <Box>
              <TextField
                  id="datetime-local"
                  label="last day to perform"
                  type="datetime-local"
                  className={classes.selectEmpty}
                  defaultValue={lastDay}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                </Box>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={type} onChange={(event) => handleTypeChange(event)}>
                  <MenuItem value="Collection">Collection</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Group</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={selectedGroup} onChange={(event) => handleGroupChange(event)}>
                  <MenuItem value="Group 1">Group 1</MenuItem>
                  <MenuItem value="Group 2">Group 2</MenuItem>
                  <MenuItem value="Group 3">Group 3</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Typography> 
        </DialogContent>
        <DialogActions>
        <Button variant="outlined" color="primary" fullWidth onClick={handleCreateClick}>Create Task</Button>
        </DialogActions>      
        <hr/>
      </Dialog>
    </div>
  );
}




