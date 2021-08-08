import axios from "axios";
import Utils from "./utils";


const token = Utils.getCookie("apiToken");
const BOServices = {
  baseUrl: "http://localhost:8000/gateway/v1/",
  config: {
    headers: {
      Authorization:
        "Bearer " + token,
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
    return await axios.put(`${BOServices.baseUrl}tasks/${taskId}/assign`, content, BOServices.config);
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
  },

  /* 
▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧
▧▧▧▧▧▧▧▧ User Service ▧▧▧▧▧▧▧▧▧▧▧
▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧▧
*/
 login: async (userName: string, password: string) => {
   return await axios.post(`${BOServices.baseUrl}users/login`, {email:userName,password:password},BOServices.config);
 },
}
export default BOServices;