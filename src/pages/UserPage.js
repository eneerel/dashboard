import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import axios from 'axios';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import EditCategory from '../components/modal/updateModal';
import AddCategory from "../components/modal/createModal"
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'title', label: 'Нэр', alignRight: false },
  { id: 'description', label: 'Тайлбар', alignRight: false },
  { id: 'categoryImg', label: 'Зураг', alignRight: false },
  { id: 'catgegoryRating', label: 'Үнэлгээ', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  const [fileteredCategory, setFilteredCategory] = useState([]);

  const [categories, setCategory] = useState([]);

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(2);

  const [editModal, setEditModal] = useState(false);

  const [addModal, setAddModal] = useState(false);

  const [clickButton, setClickButton]=useState([]);

  const handleOpen = (row) => {setEditModal(true); console.log(row);setClickButton(row)};

  const handleClose = () => setEditModal(false);

  const handleAddOpen = () => setAddModal(true);

  const handleAddClose = () => setAddModal(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  const getCategory = async () => {
    try {
      const result = await axios.get('http://localhost:8000/category');
      console.log('CAT IRLEE', result.data.category);
      setCategory(result.data.category);
      setFilteredCategory(result.data.category);
    } catch (err) {
      console.log('Err', err);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const delCategory = async (_id) => {
    console.log('id', _id);
    try {
      const result = await axios.delete(`http://localhost:8000/category/${_id}`);
      getCategory();
    } catch (err) {
      console.log('err', err);
    }
  };

  const handleSet = () => {
    handleOpen();
  };

  return (
    <>
      <Helmet>
        <title> Azure Категори </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Категори
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => {
              handleAddOpen ();
            }}>
            Шинэ Категори Үүсгэх
          </Button>
        </Stack>
        {!categories.length && <h4>Хоосон байна</h4>}
        {categories.length > 0 && (
          <Card>
            <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={USERLIST.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  {/* {.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)} */}
                  <TableBody>
                    {fileteredCategory?.map((row) => {
                      const { _id, title, description, categoryImg, categoryRating } = row;

                      // selected={selectedUser}
                      return (
                        <>
                          <TableRow hover key={_id} tabIndex={-1} role="checkbox">
                            <TableCell padding="checkbox">
                              <Checkbox checked={false} onChange={(event) => handleClick(event, title)} />
                            </TableCell>

                            <TableCell component="th" scope="row" padding="none">
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Avatar alt={title} src={categoryImg} />
                                <Typography variant="subtitle2" noWrap>
                                  {title}
                                </Typography>
                              </Stack>
                            </TableCell>

                            <TableCell align="left">{description}</TableCell>

                            <TableCell align="left">url</TableCell>

                            <TableCell align="left">
                              {/* <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label> */}
                              {categoryRating}
                            </TableCell>

                            <TableCell align="right">
                              <Button size="large" color="inherit">
                                <Iconify icon={'eva:trash-fill'} sx={{ mr: 2 }} onClick={() => delCategory(_id)} />
                              </Button>
                              <Button size="large" color="inherit" onClick={()=>handleOpen(row)}>
                                <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                    
                                Edit
                              </Button>
                            </TableCell>
                          </TableRow>
                          <EditCategory
                                
                                  open={editModal}
                                  handleClose={handleClose}
                                  id={clickButton._id}
                                  title={clickButton.title}
                                  description={clickButton.description}
                                  categoryImg={clickButton.categoryImg}
                                  rating={clickButton.categoryRating}
                                  getCategory={getCategory}
                                  
                                 />
                        </>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>

                  {isNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <Paper
                            sx={{
                              textAlign: 'center',
                            }}
                          >
                            <Typography variant="h6" paragraph>
                              Not found
                            </Typography>

                            <Typography variant="body2">
                              No results found for &nbsp;
                              <strong>&quot;{filterName}&quot;</strong>.
                              <br /> Try checking for typos or using complete words.
                            </Typography>
                          </Paper>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={USERLIST.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        )}
      </Container>
      <AddCategory open={addModal} handleClose={handleAddClose } />
    </>
  );
}
