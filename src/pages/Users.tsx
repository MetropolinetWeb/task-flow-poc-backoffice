import { Box } from '@material-ui/core';
import SearchBar from '../components/SearchBar';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { User } from '../interfaces/user.interface';



const rows = [
  createData(uuidv4(),'Itsik', 20, 'Agent'),
  createData(uuidv4(),'Nissim', 20, 'Project Manager'),
  createData(uuidv4(),'Guy', 20, 'Team Owner'),
  createData(uuidv4(),'Ami', 20, 'Admin'),
  ].sort((a, b) => (a.name < b.name ? -1 : 1));

function createData(Id:string, name: string, age: number, role: string) {
  return {Id, name, age, role };
}

const cols = [{ field: 'Id' },{ field: 'Name' }, { field: 'Age' }, { field: 'Role'}];
const UsersPage = (props:{changeView:(view:string) => void}) => {
  const [dataRows, setDataRows] = useState<User[]>([]);
  const users = [
    {
      id: '0',
      name: 'itsik',
      role: 'Admin',
      system: {
        name: 'Collectors',
        type: ''
      },
      createdAt: '',
      updatedAt: ''
    },
    {
      id: '0',
      name: 'itsik',
      role: 'Admin',
      system: {
        name: 'Collectors',
        type: ''
      },
      createdAt: '',
      updatedAt: ''
    }
  ]
  return (<div className="container">
    <h1>USERS</h1>
    <Box m={+5}>
      <SearchBar />
    </Box>
    {/*<UserData userRows={dataRows} />*/}
  </div>)
}
export default UsersPage;