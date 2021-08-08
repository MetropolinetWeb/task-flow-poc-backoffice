import axios from "axios";

const BOServices = {
  baseUrl: "http://localhost:8000/gateway/v1/",
  config: {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTAyODJlZDM2ZWU3NzAwMzFmODQzYmIiLCJpYXQiOjE2MjgwNjMwODcsImV4cCI6MTYzMDY1NTA4N30.TVaWxyK5jbd3VILeqydfy5CoWIp5onU4wOUttlYdxR0",
    }
  },
  taskSearch: async (content: {}) => {
    const result = await axios.post(`${BOServices.baseUrl}tasks/search`, content, BOServices.config);
    return result;
  },
  getTaskBySystemId: async (systemId: number) => {
    const result = await axios.get(`${BOServices.baseUrl}tasks/systems/${systemId}`, BOServices.config);
    return result;
  },
  assignMultipleTasks: async (content: {}) => {
    const result = await axios.post(`${BOServices.baseUrl}tasks/assign`, content, BOServices.config);
    return result;
  },
  assignTask: async (content: {}, taskId: string) => {
    const result = await axios.post(`${BOServices.baseUrl}tasks/${taskId}/assign`, content, BOServices.config);
    return result;
  },
  createNewTask: async (content: {}) => {
    const result = await axios.post(`${BOServices.baseUrl}tasks`, content, BOServices.config);
    return result;
  },
  deleteTask: async (taskId: string) => {
    const result = await axios.delete(`${BOServices.baseUrl}tasks/${taskId}`, BOServices.config);
    return result;
  },
  editTask: async (taskId: string) => {
    const result = await axios.put(`${BOServices.baseUrl}tasks/${taskId}`, BOServices.config);
    return result;
  },
  /* 
▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧
▧▧▧▧▧▧▧▧ Agent Service ▧▧▧▧▧▧▧▧▧▧▧
▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧
*/
  getAgentsBySystemType: async (systemType: number) => {
    const result = await axios.get(`${BOServices.baseUrl}agents/systems/${systemType}`, BOServices.config);
    return result;
  },
  /* 
▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧
▧▧▧▧▧▧▧▧▧ Form Service ▧▧▧▧▧▧▧▧▧▧▧
▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧
*/
  getFormById: async (formId: string) => {
    const result = await axios.get(`${BOServices.baseUrl}forms/${formId}`, BOServices.config);
    return result;
  }
}
export default BOServices;