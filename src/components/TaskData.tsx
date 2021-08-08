import React, { useState } from "react";
import clsx from "clsx";
import {createStyles,lighten,makeStyles,Theme} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { Data } from "../interfaces/tasks-data.interface";
import FullScreenDialog from "../components/FullScreenDialog";
import { FormControl, FormGroup, FormLabel, MenuItem, Select, TextField } from "@material-ui/core";


import _ from "lodash";
import BOServices from '../BOServices';

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  handleClickOpen: () => void;
  handleClose: () => void;
  open: boolean;
  assignTask: () => void;
  setAgentName: (name: string) => void;
  setAgentId: (id: string) => void;
  items: { name: string; _id: string }[];
  submitSearch: (text: string, fields?: string[]) => Promise<null | undefined>;
}

type Order = "asc" | "desc";

const headCells: HeadCell[] = [
  { id: "name", numeric: false, disablePadding: true, label: "Name" },
  { id: "type", numeric: false, disablePadding: false, label: "Type" },
  { id: "state", numeric: false, disablePadding: false, label: "State" },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Description",
  },
  { id: "duration", numeric: true, disablePadding: false, label: "Duration" },
  {
    id: "startTime",
    numeric: true,
    disablePadding: false,
    label: "Start Time",
  },
  {
    id: "assignmentInfo",
    numeric: false,
    disablePadding: false,
    label: "Assigned to",
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: false,
    label: "Created At",
  },
  {
    id: "updatedAt",
    numeric: false,
    disablePadding: false,
    label: "Updated At",
  },
];

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === "light"
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: "1 1 100%",
    },
    formControl: {
      margin: theme.spacing(3),
    },
  })
);
const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  const [open, setOpen] = React.useState(false);

  const [filters, setFilters] = React.useState({
    state: false,
    id: false,
    name: false,
    type: false,
    description: false,
  });

  const [searchText, setSearchText] = React.useState({text: ''});

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = event.target;
    setFilters({ ...filters, [name]: checked });
  }

  const handleTextSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchText({...searchText, text: event.target.value})
  }

  const {state, id, name, type, description} = filters;

  const filterArray = [state, id, name, type, description];
  const error = filterArray.filter((filter) => filter).length < 1;
  
  const getCheckedFields = () => {
    let checked: string[] = [];
    Object.entries(filters).map(entry => {
      if(entry[1] === true){
        checked.push(entry[0])
      }
    })
    return checked
  }

  return (
    <>
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography
            className={classes.title}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            className={classes.title}
            variant="h6"
            id="tableTitle"
            component="div"
          ></Typography>
        )}
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon
                onClick={() => {
                  setOpen(!open);
                }}
              />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
      <FullScreenDialog
        items={[]}
        handleClickOpen={() => setOpen(true)}
        handleClose={() => setOpen(false)}
        open={open}
        title="Filter tasks"
        Component={<div>
          <div
            style={{
              padding: '1rem',
              margin: '1rem',
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TextField
              id="standard-search"
              label="Search anything 😊"
              type="search"
              value={searchText.text}
              onChange={(event) => {
                handleTextSearch(event);
              }}
            />

            <FormControl required error={error} component="fieldset" className={classes.formControl}>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={filters.name} onChange={handleFilterChange} name="name" />}
                        label="Name"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={filters.description} onChange={handleFilterChange} name="description" />}
                        label="Description"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={filters.type} onChange={handleFilterChange} name="type" />}
                        label="Type"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={filters.state} onChange={handleFilterChange} name="state" />}
                        label="State"
                      />
                      {/* <FormControlLabel
                        control={<Checkbox checked={filters.type} onChange={handleFilterChange} name="type" />}
                        label="Type"
                      /> */}
                      <FormControlLabel
                        control={<Checkbox checked={filters.id} onChange={handleFilterChange} name="id" />}
                        label="Unique ID"
                      />
                      <FormLabel component="legend">Please pick at lease one field</FormLabel>
                    </FormGroup>
                  </FormControl>
          </div>
        </div>}
        buttonLabel="Filter tasks"
        assignTask={() => {
          props.submitSearch.call('', searchText.text, getCheckedFields());
        }}
        setAgentName={props.setAgentName}
        setAgentId={props.setAgentId}
      />
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      minWidth: "70vw",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    assignDiv: {
      display: "flex",
      justifyContent: "flex-start",
      padding: "0.5rem",
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
  })
);

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface TableProps {
  dataRows: Data[];
  submitSearch: (text: string, fields?: string[]) => Promise<null | undefined>;
  setButtons: () => void;
  handleClickOpen: () => void;
  handleClose: () => void;
  open: boolean;
  agentsList: {
      name: any;
      _id: any;
  }[];
  setAgentList:() => void;
}

const EnhancedTable: React.FC<TableProps> = ({
  dataRows,
  setButtons,
  handleClickOpen,
  handleClose,
  open,
  submitSearch,
  agentsList,
  setAgentList
}) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("type");
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // const [dataRows, setDataRows] = React.useState<Data[]>([]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = dataRows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    // debugger
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
    setButtons();
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataRows.length - page * rowsPerPage);

  const [agentName, setAgentName] = useState("");
  const [agentId, setAgentId] = useState("");

  const assignTask = async () => {


    if (selected.length > 1) {
      const response = await BOServices.assignMultipleTasks({
        agentId: agentId,
        agentName: agentName,
        tasksIds: selected
      });

      alert(JSON.stringify(response, null, 2));
    } else {
      const response = await BOServices.assignTask({
        agentId,
        agentName,
      }, selected[0]);
      
      alert(JSON.stringify(response, null, 2));
    }
  };


  
  const [agentSelected, setAgentSelected] = React.useState('');

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          submitSearch={submitSearch}
          numSelected={selected.length}
          items={[]}
          handleClose={handleClose}
          handleClickOpen={handleClickOpen}
          open={open}
          assignTask={assignTask}
          setAgentName={setAgentName}
          setAgentId={setAgentId}
        />

        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={dataRows.length}
            />
            <TableBody>
              {stableSort(dataRows || [], getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.type}</TableCell>
                      <TableCell align="right">{row.state}</TableCell>
                      <TableCell align="right">{row.description}</TableCell>
                      <TableCell align="right">{row.startTime}</TableCell>
                      <TableCell align="right">{row.duration}</TableCell>
                      <TableCell align="right">{row.assignmentInfo}</TableCell>
                      <TableCell align="right">{row.createdAt}</TableCell>
                      <TableCell align="right">{row.updatedAt}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={dataRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
      <div className={classes.assignDiv}>
        {/*<Button variant="outlined" color="primary" onClick={() => assignTask()}>
          <ListItemIcon>
            ASSIGN TASK
              <LabelImportantIcon />
          </ListItemIcon>
        </Button>*/}
        <FullScreenDialog
          items={agentsList || []}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          open={open}
          buttonLabel="Assign task"
          title="Assign"
          currentSelection={agentSelected}
          Component={
            <Select
              autoFocus
              variant="outlined"
              fullWidth
              value={agentSelected}
              onChange={(event) => {
              
                const agent = _.find(agentsList, {_id: event.target.value});
                const agentName = _.get(agent, 'name');

                setAgentSelected(agentName);
                setAgentName(agentName);

                setAgentId(event.target.value as string);
              }}
            >
              {agentsList.map((item) => {
                return <MenuItem value={item._id}>{item.name}</MenuItem>;
              })}
            </Select>
          }
          assignTask={assignTask}
          setAgentName={setAgentName}
          setAgentId={setAgentId}
        />
      </div>
    </div>
  );
};

export default EnhancedTable;
