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
/*
{
  "_id": {
      "$oid": "610fa2f0ecf9140030cffea8"
  },
  "state": {
      "availableStates": ["new", "in_progress", "done"],
      "stateHistory": [{
          "_id": {
              "$oid": "610fa2f0ecf9140030cffea9"
          },
          "updatedAt": "0",
          "createdAt": "0",
          "previousState": "null",
          "currentState": "new"
      }]
  },
  "tags": ["collection", "task", "v2"],
  "assignmentInfo": {
      "agentId": "AmiagentId",
      "agentName": "Ami",
      "user_id": "610fde770be5ff0030d9b19c"
  },
  "name": "Test Task V2",
  "type": "collection",
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
  "createdAt": {
      "$date": "2021-08-08T09:25:04.423Z"
  },
  "__v": 0
}*/