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
    start_time: number;
    duration: number;
    assignment_info: {
      agent_id: string;
      agent_name: string;
    };
    system: {
      name: string;
      type: string;
    }
    created_at: string;
    updated_at: string;
  }