

import Timeline from "react-calendar-timeline";
import { FC, useState, useEffect } from "react";
import PanelGroup from "react-panelgroup";
import FullWidthTabs from "../components/FullWidthTabs";
import { Button, ListItemIcon } from "@material-ui/core";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import TaskData from "../components/TaskData";
import moment from "moment";
import { Data } from "../interfaces/tasks-data.interface";
import { Task } from "../interfaces/tasks.interface";
import axios from "axios";

const groups = [
  { id: "Guy", title: "Guy", rightTitle: "side title", stackItems: true },
  { id: "Itsik", title: "Itsik", rightTitle: "side title", stackItems: true },
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
      group: task.assignment_info.agent_name,
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
          background: "blue",
        },
      },
    };
  });

  return { createTimelineTasks, createTimelineGroups };
};

const TaskPage: FC = () => {
  const [dataRows, setDataRows] = useState<Data[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task>({
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
  });

  const [loading, setLoading] = useState(false);
  const baseUrl = "http://localhost:8000/gateway/v1/";

  const fetchTasksData = async () => {
    setLoading(true);
    const response = await axios.get(`${baseUrl}tasks/systems/3`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGU1YjI4NTQ3YTBmMDAwMmZiNWUzYzkiLCJpYXQiOjE2MjY2MDk0ODIsImV4cCI6MTYyOTIwMTQ4Mn0.gLHb_V-9eTBlhoMtb1OD6GuHv4oTcbLatufJ5WXMnU8",
      },
    });

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

  useEffect(() => {
    fetchTasksData();
    setLoading(false);
  }, []);

  return (
    <div>
      {loading ? (
        "loading"
      ) : (
        <div>
          <Timeline
            groups={groups}
            items={createTimeline(tasks).createTimelineTasks}
            defaultTimeStart={moment().add(-12, "hour")}
            defaultTimeEnd={moment().add(12, "hour")}
            onItemDoubleClick={(itemId, e, time) => {
              //@ts-ignore
              setSelectedTask(tasks.find((task) => task.id === itemId));
            }}
          />

          <PanelGroup
            spacing={5}
            panelWidths={[
              { size: 800, minSize: 650},
              { size: 440, minSize: 350},
            ]}
          >
            <TaskData dataRows={dataRows} />
            <FullWidthTabs selectedTask={selectedTask} />
          </PanelGroup>

          <div>
            <Button variant="contained" color="primary">
              NEW TASK
              <ListItemIcon>
                <LibraryAddIcon />
              </ListItemIcon>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
export default TaskPage;

// const items = [
//   {
//     id: 1,
//     group: 1,
//     title: "קריאת מד",
//     start_time: moment(),
//     end_time: moment().add(1, "hour"),
//     canMove: true,
//     canResize: true,
//     canChangeGroup: true,
//     itemProps: {
//       // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
//       "data-custom-attribute": "Random content",
//       "aria-hidden": true,
//       onDoubleClick: () => {
//         alert("Show task details");
//       },
//       className: "weekend",
//       style: {
//         background: "green",
//       },
//     },
//   },
//   {
//     id: 2,
//     group: 2,
//     title: "התנקשות",
//     start_time: moment().add(-0.5, "hour"),
//     end_time: moment().add(0.5, "hour"),
//     canMove: true,
//     canResize: true,
//     canChangeGroup: true,
//     itemProps: {
//       // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
//       "data-custom-attribute": "Random content",
//       "aria-hidden": true,
//       onDoubleClick: () => {
//         alert("Show task details");
//       },
//       className: "weekend",
//       style: {
//         background: "red",
//       },
//     },
//   },
//   {
//     id: 3,
//     group: 3,
//     title: "גביה",
//     start_time: moment().add(2, "hour"),
//     end_time: moment().add(3, "hour"),
//     canMove: true,
//     canResize: true,
//     canChangeGroup: true,
//     itemProps: {
//       // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
//       "data-custom-attribute": "Random content",
//       "aria-hidden": true,
//       onDoubleClick: () => {
//         alert("Show task details");
//       },
//       className: "weekend",
//       style: {
//         background: "blue",
//       },
//     },
//   },
// ];

