import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  styled,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Pagination,
  TextField,
} from '@mui/material';
import { getUsers, deleteUser, updateUser } from '../service/api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';

const StyledTable = styled(Table)`
  width: 90%;
  margin: 20px auto 0 auto;
`;

const Thead = styled(TableRow)`
  & > th {
    background: #000;
    color: #fff;
    font-size: 20px;
  }
`;

const TBody = styled(TableRow)`
  & > td {
    font-size: 20px;
  }
`;

const SearchContainer = styled('div')`
  width: 90%;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
`;

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [userIdToUpdate, setUserIdToUpdate] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSorted, setIsSorted] = useState(false);

  const itemsPerPage = 10;

  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchQuery, page]);

  const getUserDetails = async () => {
    try {
      let response = await getUsers();
      const data = response.data;
      setUsers(data);
      setFilteredUsers(data.slice((page - 1) * itemsPerPage, page * itemsPerPage));
      setTotalPages(Math.ceil(data.length / itemsPerPage));
      setLoading(false);
    } catch (error) {
      setError('Error fetching user data');
      setLoading(false);
    }
  };
  const handleSearch = () => {
    let filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (isSorted) {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setFilteredUsers(filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage));
  };

  const handleDelete = async () => {
    try {
      await deleteUser(userIdToDelete);
      setDeleteDialogOpen(false);
      getUserDetails();
    } catch (error) {
      setError('Error deleting user');
    }
  };

  const handleStatusToggle = async () => {
    const user = users.find((u) => u.id === userIdToUpdate);
    const updatedUser = {
      ...user,
      active: !user.active,
      dateActive: !user.active ? new Date().toISOString() : user.dateActive,
      dateInactive: user.active ? new Date().toISOString() : null,
    };
    await updateUser(userIdToUpdate, updatedUser);
    setStatusDialogOpen(false);
    getUserDetails();
  };

  const openDeleteDialog = (id) => {
    setUserIdToDelete(id);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setUserIdToDelete(null);
  };

  const openStatusDialog = (id) => {
    setUserIdToUpdate(id);
    setStatusDialogOpen(true);
  };

  const closeStatusDialog = () => {
    setStatusDialogOpen(false);
    setUserIdToUpdate(null);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(users);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
    XLSX.writeFile(workbook, 'UsersData.xlsx');
  };

  const toggleSort = () => {
    setIsSorted(!isSorted);
    handleSearch();
  };
  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <SearchContainer>
            <TextField
              label="Search by Name"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fullWidth
            />
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={handleDownload}
                style={{ marginLeft: 20 }}
              >
                Download Data
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={toggleSort}
                style={{ marginLeft: 20 }}
              >
                {isSorted ? 'Unsort' : 'Sort by Name'}
              </Button>
            </div>
          </SearchContainer>
          <StyledTable>
            <TableHead>
              <Thead>
                <TableCell>Name</TableCell>
                <TableCell>EmpID</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Date Active</TableCell>
                <TableCell>Date Inactive</TableCell>
                <TableCell>Actions</TableCell>
              </Thead>
              </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TBody key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.EmpID}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    {user.dateActive ? new Date(user.dateActive).toLocaleDateString() : '-'}
                  </TableCell>
                  <TableCell>
                    {user.dateInactive ? new Date(user.dateInactive).toLocaleDateString() : '-'}
                  </TableCell>
                  <TableCell>
                    <Button
                      color="primary"
                      variant="contained"
                      style={{ marginRight: 10 }}
                      component={Link}
                      to={`/edit/${user.id}`}
                    >
                      Edit
                    </Button>
                    <Button
                      color="secondary"
                      variant="contained"
                      style={{ marginRight: 10 }}
                      onClick={() => openDeleteDialog(user.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      color={user.active ? 'success' : 'error'}
                      variant="contained"
                      onClick={() => openStatusDialog(user.id)}
                    >
                      {user.active ? 'Active' : 'Inactive'}
                    </Button>
                  </TableCell>
                </TBody>
              ))}
            </TableBody>
          </StyledTable>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}
          />
        </>
      )}
      <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this user?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={statusDialogOpen} onClose={closeStatusDialog}>
        <DialogTitle>Confirm Status Change</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to {users.find((u) => u.id === userIdToUpdate)?.active ? 'deactivate' : 'activate'} this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeStatusDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleStatusToggle} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AllUsers;