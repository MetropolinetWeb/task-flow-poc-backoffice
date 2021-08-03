import React, { ReactElement } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { DialogActions, DialogContent, MenuItem, Select } from '@material-ui/core';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: "relative",
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  })
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props: {
  handleClickOpen: () => void;
  handleClose: () => void;
  open: boolean;
  assignTask: () => void;
  setAgentName: (name: string) => void;
  setAgentId: (id: string) => void;
  items: { name: string; _id: string }[];
  title: string;
  buttonLabel: string;
  Component: ReactElement<any, any>
}) {
  const classes = useStyles();
  //const [selected, setSelected] = React.useState("Choose Agent");

  //const [open, setOpen] = React.useState(true);

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Task {props.buttonLabel}
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent dividers>
          <Typography gutterBottom>
          <Select fullWidth autoFocus variant="outlined" value={selected} onChange={handleAgentSelectChange}>
              {props.items.map((item) => {
                return (<MenuItem value={item.name}>{item.name}</MenuItem>)
              })}
          </Select>
          </Typography>
          <Typography gutterBottom>
            Chosen Agent: { selected }
          </Typography>
        </DialogContent>
        <DialogActions>
        <Button variant="outlined" color="primary" onClick={() => {
          props.assignTask();
          props.handleClose();
        }}>Assign</Button>
        </DialogActions>      
        <hr/>
      </Dialog>
    </div>
  );
}
