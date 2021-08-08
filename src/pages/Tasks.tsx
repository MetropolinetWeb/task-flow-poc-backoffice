import React from "react";
import Timeline , {TimelineHeaders,SidebarHeader,DateHeader}from "react-calendar-timeline";
import { FC, useState, useEffect } from "react";
import PanelGroup from "react-panelgroup";
import FullWidthTabs from "../components/FullWidthTabs";
import { Box, Button, ListItemIcon, TextField } from "@material-ui/core";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import UpdateIcon from '@material-ui/icons/Update';
import DeleteIcon from '@material-ui/icons/Delete';
import TaskData from "../components/TaskData";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import moment from "moment";
import { Data } from "../interfaces/tasks-data.interface";
import { Task } from "../interfaces/tasks.interface";
import NewTaskDialog from "../DialogComponents/NewTask";
import DeleteConfrimDialog from "../DialogComponents/DeleteConfirm";
import _ from "lodash";
import BOServices from '../BOServices';
import EditTaskDialog from "../DialogComponents/EditTask";

const groups = [
  { id: "Guy", title: "Guy", rightTitle: "Agent", stackItems: true },
  { id: "Itsik", title: "Itsik", rightTitle: "Agent", stackItems: true },
];

function createData(
  id: string,
  name: string,
  type: string,
  state: string,
  description: string,
  startTime: number,
  duration: number,
  assignmentInfo: string,
  createdAt: string,
  updatedAt: string,
  system: string
): Data {
  return {
    id,
    name,
    type,
    state,
    description,
    startTime,
    duration,
    assignmentInfo,
    createdAt,
    updatedAt,
    system,
  };
}

const createTimeline = (tasks: Task[]) => {
  const createTimelineGroups = tasks.map((task, index) => {
    return {
      id: index,
      title: task.assignmentInfo?.agentName,
    };
  });

  const createTimelineTasks = tasks.map((task: Task, index) => {
    debugger
    return {
      id: task?.id,
      group: '',//task.assignment_info.agent_name,
      title: task.name,
      start_time: moment(task.executionDetails.startTime).add(2, "hour"),
      end_time: moment().add(task.executionDetails.duration, "hour"),
      canMove: true,
      canResize: true,
      canChangeGroup: true,
      itemProps: {
        // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
        "data-custom-attribute": "Random content",
        "aria-hidden": true,
        // onDoubleClick: () => {
        //   alert("Show task details");
        // },
        className: "weekend",
        style: {
          background: "lightgreen",
          color: "black",
        },
      },
    };
  });

  return { createTimelineTasks, createTimelineGroups };
};




const TaskPage = (props:{changeView:(view:string) => void}) => {

  const [dataRows, setDataRows] = useState<Data[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task>(JSON.parse(JSON.stringify({
    "state": {
      "availableStates": [
        "new",
        "in_progress",
        "done"
      ],
      "stateHistory": [
        {
          "_id": "610fa3c4e177c100303208db",
          "updatedAt": "0",
          "createdAt": "0",
          "previousState": "null",
          "currentState": "new"
        }
      ]
    },
    "tags": [
      "measurement",
      "task",
      "v2"
    ],
    "assignmentInfo": "null",
    "name": "Test Task V2 Fields",
    "type": "measurement",
    "description": "Test Task V2 description",
    "groupBy": [],
    "executionDetails": {
      "scheduledDate": 1628673769023,
      "executionDate": 1628418180079,
      "lastDateToPerform": 1628932995051,
      "startTime": 1628414674800,
      "duration": 4
    },
    "system": {
      "name": "Rabbanut",
      "type": "3"
    },
    "fields": {
      "name": "Jack Herrer",
      "identification": "230323423",
      "authority": "Eilat",
      "city": "Carmiel",
      "originalDebt": "3600",
      "expenses": "101",
      "payed": "0"
    },
    "createdAt": "2021-08-08T09:28:37.015Z",
    "id": "610fa3c4e177c100303208da",
    "updatedAt": "2021-08-08T09:28:37.015Z"
  }
)));
  const [showActions, setShowActions] = useState(true);
  //const [loading, setLoading] = useState(false);
  

  const callSetShowActions = () => {
    setShowActions(!showActions);
  };

  const fetchTasksData = async () => {
    //await getAgentsBySystemId(3);
    const response = await BOServices.getTaskBySystemId(3);
    const tasks: Task[] = response.data.data.tasks || [];

    setTasks(tasks);
    const modifiedTasks = tasks.map((task: Task) => {
      return createData(
        task.id,
        task.name,
        task.type,
        task.state.stateHistory[0].currentState,
        task.description,
        task.executionDetails.startTime,
        task.executionDetails.duration,
        task.assignmentInfo?.agentName || "task is not assigned",
        task.createdAt,
        task.updatedAt,
        task.system.type
      );
    });
    setDataRows(modifiedTasks);
  };

  
  const [agentsList, setAgentList] = React.useState<{ name: any; _id: any; }[]>( [
    {
      name: "Guy",
      _id: "GuyagentId",
    },
    {
      name: "Itsik",
      _id: "ItsikagentId",
    },
    {
      name: "Yaniv",
      _id: "YanivagentId",
    },
    {
      name: "Ami",
      _id: "AmiagentId",
    },
    {
      name: "Dan",
      _id: "DanagentId",
    },
  ]);

  //const getAgentsBySystemId = async (systemType: number) => {
  //  const {data} = await BOServices.getAgentsBySystemType(systemType);
  //  const {agents} = data.data;

  //  const list = _.map(agents, (agent) => _.assign({
  //    name: _.get(agent, 'name'),
  //    _id: _.get(agent, '_id')
  //  },{}));

  //  setAgentList(list);  
  //}

  useEffect(() => {
    fetchTasksData();
    //setLoading(false);
  }, []);

  const [open, setOpen] = React.useState(false);
  const [openNewTask, setOpenNewTask] = React.useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = React.useState(false);
  const [openEditTask, setOpenEditTask] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleNewTaskClickOpen = () => {
    setOpenNewTask(true);
  };
  const handleNewTaskClose = () => {
    setOpenNewTask(false);
  };
  const handleDeleteConfirmClickOpen = () => {
    setOpenDeleteConfirm(true);
  };
  const handleDeleteConfirmClose = () => {
    setOpenDeleteConfirm(false);
  };
  const handleEditTaskClickOpen = () => {
    setOpenEditTask(true);
  };
  const handleEditTaskClose = () => {
    setOpenEditTask(false);
  };

  const onTaskDrag = (itemDragObject: any) => {
    if (itemDragObject.eventType === "move") {
      console.log('set new object to time line with time: ' + itemDragObject.time.toString());
    } else if (itemDragObject.eventType === "resize") {
      
      console.log('set new object to time line with duration to the: '+ itemDragObject.edge + itemDragObject.time.toString());
    }
  };
  const [value, setValue] = React.useState({
    text: "",
  });



  const submitSearch = async (text: string, fields = ["name", "type", "description"]) => {
    
   const results = await BOServices.taskSearch({
      text: text,
      fields: fields,
      index: "tasks",
    });
    
    const tasks: Task[] = results.data.data.tasks || [];

    const source = _.map(tasks, '_source');

    if (source.length < 1) {
      alert('Your search results came empty');
      return null
    }

    setTasks(source);
    const modifiedTasks = source.map((task: Task) => {
      return createData(
        task.id,
        task.name,
        task.type,
        task.state.stateHistory[0].currentState,
        task.description,
        task.executionDetails.startTime,
        task.executionDetails.duration,
        task.assignmentInfo?.agentName || "task is not assigned",
        task.createdAt,
        task.updatedAt,
        task.system.type
      );
    });
    setDataRows(modifiedTasks);
  };

  

  return (
    <div>
      {/*{loading ? ("loading") : ()}*/}
       <div>
            <Timeline groups={groups} items={createTimeline(tasks).createTimelineTasks}
              sidebarWidth={100}
              rightSidebarContent={'Agents'}
              canResize={"both"}
              onItemDrag={(itemDragObject) => {
                //@ts-ignore
                onTaskDrag(itemDragObject);
              }}
              defaultTimeStart={moment().add(-12, "hour")} 
              defaultTimeEnd={moment().add(12, "hour")} 
              onItemSelect={
              (itemId, e, time) => {
                //@ts-ignore
                setSelectedTask(tasks.find((task) => task.id === itemId));
                alert(selectedTask);
                }}>
              <TimelineHeaders>
                <SidebarHeader>
                  {({ getRootProps }) => {
                    return <div {...getRootProps()}>AGENTS</div>
                  }}
                </SidebarHeader>
                  <DateHeader unit="primaryHeader" />
                  <DateHeader />
              </TimelineHeaders>
              </Timeline>
                  {/*search*/}
          <div style={{ padding: "1rem", float: "right", margin: "0.5rem" }}>
            <TextField
              id="standard-search"
              label="Search field"
              type="search"
              value={value.text}
              onChange={(event) => {
                setValue({
                  ...value,
                  text: event.target.value,
                });
              }}
              />
           
            <Button color="primary" style={{border: "1.5px solid blue",margin: "0.5rem"}}
              onClick={() => {
                submitSearch(value.text);
              }}
            >Search</Button>
          </div>         
          <div className="floatL">
            <Button color="primary" onClick={handleNewTaskClickOpen}><ListItemIcon><LibraryAddIcon />NEW</ListItemIcon></Button>
              <Box hidden={showActions} className="floatR">
                <Button color="primary" onClick={handleDeleteConfirmClickOpen}><ListItemIcon><DeleteIcon />DELETE</ListItemIcon></Button>
                <Button color="primary" onClick={handleEditTaskClickOpen}><ListItemIcon><UpdateIcon />EDIT</ListItemIcon></Button>
                <Button color="primary" onClick={handleClickOpen}><ListItemIcon><AssignmentIndIcon />ASSIGN</ListItemIcon></Button>
              </Box>

          </div>
          <PanelGroup spacing={5} panelWidths={[{ size: 1450, minSize: 800},{ size: 450, minSize: 450}]}>
          <TaskData agentsList={agentsList} submitSearch={submitSearch}
                    dataRows={dataRows} setButtons={callSetShowActions} handleClose={handleClose}
                   handleClickOpen={handleClickOpen} open={open} setAgentList={() => setAgentList} />
            <FullWidthTabs selectedTask={selectedTask} />
          </PanelGroup>

        <NewTaskDialog open={openNewTask} handleNewTaskClose={handleNewTaskClose} />
        <DeleteConfrimDialog open={openDeleteConfirm} handleDeleteConfirmClose={handleDeleteConfirmClose} taskId={selectedTask.id} />
        <EditTaskDialog open={openEditTask} handleEditTaskClose={handleEditTaskClose} task={selectedTask} />
        </div>
    </div>
  );
};
export default TaskPage;