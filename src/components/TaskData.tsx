import React, { useState } from "react";
import clsx from "clsx";
import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
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
import axios from "axios";
import { Data } from "../interfaces/tasks-data.interface";
import FullScreenDialog from "../components/FullScreenDialog";
import { MenuItem, Select, TextField } from "@material-ui/core";

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
    id: "start_time",
    numeric: true,
    disablePadding: false,
    label: "Start Time",
  },
  {
    id: "assignment_info",
    numeric: false,
    disablePadding: false,
    label: "Assigned to",
  },
  {
    id: "created_at",
    numeric: false,
    disablePadding: false,
    label: "Created At",
  },
  {
    id: "updated_at",
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
  })
);
const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  const [open, setOpen] = React.useState(false);

  const [filters, setFilters] = React.useState({
    authority: "",
    state: "",
    id: "",
    agentName: "",
    createdBy: "",
    name: "",
    type: "",
    description: "",
  });

  const [searchFields, setSearchFields] = React.useState<string[]>([]);
  
  const handleFilterChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const {name, value} = event.target;
    setFilters({ ...filters, [name]: value});
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
              label="Search by task name"
              type="search"
              name="name"
              value={filters.name}
              onChange={(event) => {
                handleFilterChange(event);
              }}
            />

            <TextField
              id="standard-search"
              label="Search by task type"
              type="search"
              name="type"
              value={filters.type}
              onChange={(event) => {
                handleFilterChange(event);
              }}
            />
            <TextField
              id="standard-search"
              label="Search by description"
              type="search"
              name="description"
              value={filters.description}
              onChange={(event) => {
                handleFilterChange(event);
              }}
            />

            <TextField
              id="standard-search"
              label="Search by authority"
              type="search"
              name="authority"
              value={filters.authority}
              onChange={(event) => {
                setFilters({
                  ...filters,
                  authority: event.target.value,
                });
              }}
            />

            <TextField
              id="standard-search"
              label="Search by task state"
              type="search"
              value={filters.state}
              name="state"
              onChange={(event) => {
                handleFilterChange(event);
              }}
            />

            <TextField
              id="standard-search"
              label="Search by task creator"
              type="search"
              name="createdBy"
              value={filters.createdBy}
              onChange={(event) => {
                handleFilterChange(event);
              }}
            />

            <TextField
              id="standard-search"
              label="Search by Agent name"
              type="search"
              value={filters.agentName}
              name="agentName"
              onChange={(event) => {
                handleFilterChange(event);
              }}
            />
          </div>
        </div>}
        buttonLabel="Filter tasks"
        assignTask={props.assignTask}
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
  setButtons: () => void;
  handleClickOpen: () => void;
  handleClose: () => void;
  open: boolean;
}

const EnhancedTable: React.FC<TableProps> = ({
  dataRows,
  setButtons,
  handleClickOpen,
  handleClose,
  open,
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

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, dataRows.length - page * rowsPerPage);

  const [agentName, setAgentName] = useState("");
  const [agentId, setAgentId] = useState("");

  const assignTask = async () => {
    // debugger
    const config = {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTA2YTBhOWY2YTA3NTAwMzBjYzY4OTIiLCJpYXQiOjE2Mjc5Mjg3NDQsImV4cCI6MTYzMDUyMDc0NH0.8Uvy8tgflSxbN7J8hkw3BilDIrJpB-dvgofRYsNcRlc",
      },
    };

    if (selected.length > 1) {
      const response = await axios.post(
        `http://localhost:8000/gateway/v1/tasks/assign`,
        {
          agent_id: agentId,
          agent_name: agentName,
          tasksIds: selected,
        },
        config
      );
      alert(JSON.stringify(response, null, 2));
    } else {
      const response = await axios.put(
        `http://localhost:8000/gateway/v1/tasks/${selected[0]}/assign`,
        {
          agent_id: agentId,
          agent_name: agentName,
        },
        config
      );
      alert(JSON.stringify(response, null, 2));
    }
  };

  const agentsList = [
    {
      name: "Guy",
      _id: "agentId",
    },
    {
      name: "Itsik",
      _id: "agentId",
    },
    {
      name: "Yaniv",
      _id: "agentId",
    },
    {
      name: "Ami",
      _id: "agentId",
    },
    {
      name: "Dan",
      _id: "agentId",
    },
  ];

  const [agentSelected, setAgentSelected] = React.useState('');

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
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
                      <TableCell align="right">{row.start_time}</TableCell>
                      <TableCell align="right">{row.duration}</TableCell>
                      <TableCell align="right">{row.assignment_info}</TableCell>
                      <TableCell align="right">{row.created_at}</TableCell>
                      <TableCell align="right">{row.updated_at}</TableCell>
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
          items={agentsList}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          open={open}
          buttonLabel="Assign task"
          title="Assign"
          Component={
            <Select
              autoFocus
              variant="outlined"
              value={selected}
              onChange={(event) => {
                setAgentSelected(event.target.value as string);
                setAgentName(event.target.value as string);
                setAgentId(
                  String(agentsList.find((item) => item.name === event.target.value))
                );
              }}
            >
              {agentsList.map((item) => {
                return <MenuItem value={item.name}>{item.name}</MenuItem>;
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
