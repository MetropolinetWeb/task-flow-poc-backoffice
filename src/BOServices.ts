import axios from "axios";

const BOServices = {
  baseUrl: "http://localhost:8000/gateway/v1/",
  config: {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTA2YTBhOWY2YTA3NTAwMzBjYzY4OTIiLCJpYXQiOjE2MjgxNjQ4MDMsImV4cCI6MTYzMDc1NjgwM30.0J-u5AAWTiYrD_O-m4P66KhicnQRbIiDNcE5QBhHWog",
    }
  },
    /* 
▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧
▧▧▧▧▧▧▧▧ Task Service ▧▧▧▧▧▧▧▧▧▧▧
▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧
*/
  taskSearch: async (content: {}) => {
    return await axios.post(`${BOServices.baseUrl}tasks/search`, content, BOServices.config);
  },
  getTaskBySystemId: async (systemId: number) => {
    return await axios.get(`${BOServices.baseUrl}tasks/systems/${systemId}`, BOServices.config);
  },
  assignMultipleTasks: async (content: {}) => {
    return await axios.post(`${BOServices.baseUrl}tasks/assign`, content, BOServices.config);
  },
  assignTask: async (content: {}, taskId: string) => {
    return await axios.post(`${BOServices.baseUrl}tasks/${taskId}/assign`, content, BOServices.config);
  },
  createNewTask: async (content: {}) => {
    return await axios.post(`${BOServices.baseUrl}tasks`, content, BOServices.config);
  },
  deleteTask: async (taskId: string) => {
    return await axios.delete(`${BOServices.baseUrl}tasks/${taskId}`, BOServices.config);
  },
  editTask: async (taskId: string) => {
    return await axios.put(`${BOServices.baseUrl}tasks/${taskId}`, BOServices.config);
  },
  /* 
▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧
▧▧▧▧▧▧▧▧ Agent Service ▧▧▧▧▧▧▧▧▧▧▧
▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧
*/
  getAgentsBySystemType: async (systemType: number) => {
    return await axios.get(`${BOServices.baseUrl}agents/systems/${systemType}`, BOServices.config);
  }
}
export default BOServices;