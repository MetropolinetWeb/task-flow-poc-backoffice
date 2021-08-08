export interface Task {
    id: string;
    name: string;
    type: string;
    state: {
      availableStates: string[];
      stateHistory: {
        updatedAt: string;
        createdAt: string;
        previousState: string;
        currentState: string;
      }[];
    };
    description: string;
    startTime: number;
    duration: number;
    assignmentInfo: {
      agentId: string;
      agentName: string;
    };
    system: {
      name: string;
      type: string;
    }
    createdAt: string;
    updatedAt: string;
  }