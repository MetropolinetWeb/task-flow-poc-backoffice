// export interface Task {
//   id: string;
//   name: string;
//   type: string;
//   state: {
//     availableStates: string[];
//     stateHistory: {
//       updatedAt: string;
//       createdAt: string;
//       previousState: string;
//       currentState: string;
//     }[];
//   };
//   description: string;
//   startTime: number;
//   duration: number;
//   assignmentInfo: {
//     agentId: string;
//     agentName: string;
//   };
//   system: {
//     name: string;
//     type: string;
//   }
//   createdAt: string;
//   updatedAt: string;
// }

export interface Task {
  id: string,
  name: string,
  type: string,
  description: string,
  groupBy: {
    name: string,
  }[],
  tags: string[],
  executionDetails: {
    scheduledDate: number,
    executionDate: number,
    lastDateToPerform: number,
    startTime: number,
    duration: number,
  },
  system: {
    name: string,
    type: string,
  },
  state: {
    availableStates: string[],
    stateHistory: {
      updatedAt: string,
      createdAt: string,
      previousState: string,
      currentState: string
    }[]
  },
  assignmentInfo: {
    agentId: string,
    agentName: string,
  } | null,
  createdAt: string;
  updatedAt: string;
}