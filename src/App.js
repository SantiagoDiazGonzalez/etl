import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';

import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';

import {
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  TextField,
} from '@mui/material'

import {
  Container,
  TableWrapper,
  TableHeader,
  StyledDatagrid,
  ActionCellContainer,
  DialogContent,
} from './styles';

const localRows = [
  {
    id: 1,
    firstName: 'Santi',
    lastName: 'Diaz',
    age: '25',
  },
  {
    id: 2,
    firstName: 'Pepe',
    lastName: 'Ganga',
    age: '50',
  },
  {
    id: 3,
    firstName: 'Naruto',
    lastName: 'Uzumaki',
    age: '17',
  },
  {
    id: 4,
    firstName: 'Luffy',
    lastName: 'Monkey D.',
    age: '19',
  }
];

const ActionsCell = ({
  onUpdate,
  onDelete,
  onDownload,
}) => (
  <ActionCellContainer>
    <IconButton onClick={onUpdate}>
      <EditIcon/>
    </IconButton>
    <IconButton onClick={onDelete}>
      <DeleteIcon/>
    </IconButton>
    <IconButton onClick={onDownload}>
      <DownloadIcon />
    </IconButton>
  </ActionCellContainer>
);

function App() {
  // Table row states
  const [rows, setRows] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Modal open states
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  // Employee field states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');

  const onAdd = useCallback(() => {
    console.log('Add');
  }, []);

  const onUpdate = useCallback(() => {
    console.log('Update', selectedEmployee);
  }, [
    selectedEmployee,
  ]);

  const onDelete = useCallback(() => {
    console.log('Delete', selectedEmployee);
  }, [
    selectedEmployee,
  ]);

  const onDownload = useCallback((id) => {
    console.log('Download', id);
  }, []);

  const columns = useMemo(() => ([
    {
      field: 'id',
      headerName: 'ID',
      flex: 2,
    },
    {
      field: 'firstName',
      headerName: 'First name',
      flex: 4,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      flex: 4,
    },
    {
      field: 'action',
      headerName: 'Actions',
      disableColumnMenu: true,
      hideSortIcons: true,
      disableReorder: true,
      flex: 4,
      renderCell: ({ row }) => (
        <ActionsCell
          row={row}
          onUpdate={() => {
            setSelectedEmployee(row);
            setOpenAddModal(true);
          }}
          onDelete={() => {
            setSelectedEmployee(row);
            setOpenDeleteModal(true);
          }}
          onDownload={() => onDownload(row.id)}
        />
      ),
    },
  ]), [
    onDownload,
  ]);

  useEffect(() => {
    setRows(localRows);
  }, []);

  useEffect(() => {
    const {
      firstName = '',
      lastName = '',
      age = '',
    } = selectedEmployee || {};
    setFirstName(firstName);
    setLastName(lastName);
    setAge(age);
  }, [selectedEmployee]);

  const addModalTitle = selectedEmployee ? 'Update employee' : 'Add employee';
  const addModalHandler = selectedEmployee ? onUpdate : onAdd;

  return (
    <Container>
      <TableWrapper>
        <TableHeader>
          <h3>Employees</h3>
          <Button
            variant='contained'
            onClick={() => setOpenAddModal(true)}
          >
            Add Employee
          </Button>
        </TableHeader>
        <StyledDatagrid
          rows={rows}
          columns={columns}
          rowHeight={50}
          disableSelectionOnClick
        />
      </TableWrapper>
      <Dialog
        open={openAddModal}
        onClose={() => {
          setOpenAddModal(false);
          setSelectedEmployee(null);
        }}
      >
        <DialogTitle>{addModalTitle}</DialogTitle>
        <DialogContent>
          <TextField
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            label='First Name'
          />
          <TextField
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            label='Last Name'
          />
          <TextField
            value={age}
            onChange={(e) => setAge(e.target.value)}
            label='Age'
          />
          <Button
            variant='contained'
            onClick={addModalHandler}
          >
            Save
          </Button>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openDeleteModal}
        onClose={() => {
          setOpenDeleteModal(false);
          setSelectedEmployee(null);
        }}
      >
        <DialogTitle>Delete Employee</DialogTitle>
        <DialogContent>
          <Button
            variant='contained'
            onClick={onDelete}
          >
            Confirm
          </Button>
          <Button
            variant='contained'
            onClick={() => {
              setOpenDeleteModal(false);
              setSelectedEmployee(null);
            }}
          >
            Cancel
          </Button>
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default App;
