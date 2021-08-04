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

import _ from "lodash";
import BOServices from '../BOServices';

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
  start_time: number,
  duration: number,
  assignment_info: string,
  created_at: string,
  updated_at: string,
  system: string
): Data {
  return {
    id,
    name,
    type,
    state,
    description,
    start_time,
    duration,
    assignment_info,
    created_at,
    updated_at,
    system,
  };
}

const createTimeline = (tasks: Task[]) => {
  const createTimelineGroups = tasks.map((task, index) => {
    return {
      id: index,
      title: task.assignment_info?.agent_name,
    };
  });

  const createTimelineTasks = tasks.map((task: Task, index) => {
    return {
      id: task?.id,
      group: '',//task.assignment_info.agent_name,
      title: task.name,
      start_time: moment(task.start_time).add(2, "hour"),
      end_time: moment().add(task.duration, "hour"),
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




const TaskPage: FC = () => {

  const [dataRows, setDataRows] = useState<Data[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task>(
    {
      assignment_info: {
        agent_id: "",
        agent_name: "",
      },
      created_at: "0",
      description: "",
      duration: 0,
      name: "",
      type: "",
      updated_at: "0",
      start_time: 0,
      system: {
        name: "",
        type: "0",
      },
      id: "",
      state: {
        availableStates: [],
        stateHistory: [
          {
            createdAt: "",
            currentState: "",
            previousState: "",
            updatedAt: "",
          },
        ],
      },
    }
  );
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
        task.start_time,
        task.duration,
        task.assignment_info?.agent_name || "task is not assigned",
        task.created_at,
        task.updated_at,
        task.system.type
      );
    });
    setDataRows(modifiedTasks);
  };

  
  const [agentsList, setAgentList] = React.useState<{ name: any; _id: any; }[]>([]);

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onTaskDrag = (itemDragObject: any) => {
    if (itemDragObject.eventType === "move") {
      console.log('set new object to time line with time: ' + itemDragObject.time.toString());
    } else if (itemDragObject.eventType === "resize") {
      
      console.log('set new object to time line with dureation to the: '+ itemDragObject.edge + itemDragObject.time.toString());
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
        task.start_time,
        task.duration,
        task.assignment_info?.agent_name || "task is not assigned",
        task.created_at,
        task.updated_at,
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
            <Button color="primary"><ListItemIcon><LibraryAddIcon />NEW</ListItemIcon></Button>
              <Box hidden={showActions} className="floatR">
                <Button color="primary"><ListItemIcon><DeleteIcon />DELETE</ListItemIcon></Button>
                <Button color="primary"><ListItemIcon><UpdateIcon />EDIT</ListItemIcon></Button>
                <Button color="primary" onClick={handleClickOpen}><ListItemIcon><AssignmentIndIcon />ASSIGN</ListItemIcon></Button>
              </Box>

          </div>
          <PanelGroup spacing={5} panelWidths={[{ size: 1450, minSize: 800},{ size: 450, minSize: 450}]}>
              <TaskData agentsList={agentsList} submitSearch={submitSearch} dataRows={dataRows} setButtons={callSetShowActions} handleClose={handleClose} handleClickOpen={handleClickOpen} open={open}/>
            <FullWidthTabs selectedTask={selectedTask} />
          </PanelGroup>

         
        </div>
    </div>
  );
};
export default TaskPage;