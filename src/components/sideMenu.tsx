import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import WorkIcon from '@material-ui/icons/Work';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import DomainIcon from '@material-ui/icons/Domain';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PostAddIcon from '@material-ui/icons/PostAdd';
import PollIcon from '@material-ui/icons/Poll';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  }),
);

interface IView {
  displayView: (viewName: string) => void;
}

//(displayView: (divName: string) => {}) {
const SideMenu: React.FC<IView> = ({displayView}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);


  const renderIcon = (ind: number) => {
    console.log(ind);
    switch (ind) {
      case 0:
        return <ListItemIcon><EmojiPeopleIcon /></ListItemIcon>;
      case 1:
        return <ListItemIcon><DomainIcon /></ListItemIcon>;
      case 2:
        return <ListItemIcon><AssignmentIcon /></ListItemIcon>;
      case 3:
        return <ListItemIcon><PostAddIcon /></ListItemIcon>;
      case 4:
        return <ListItemIcon><WorkIcon /></ListItemIcon>;
      case 5:
        return <ListItemIcon><DashboardIcon /></ListItemIcon>;
      case 6:
        return <ListItemIcon><PollIcon /></ListItemIcon>;
      case 7:
        return <ListItemIcon><CloudUploadIcon /></ListItemIcon>;
      default:
        return -1;
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (text: string) => {
      displayView(text);
 };
 
 const mainMenuItem = ['Users','Systems','Tasks', 'Forms', 'Agents'];
 const secondMenuItem = ['Dashboards', 'Stats', 'Upload Files'];
 const userMenuItem = ['Create', 'Add Permission','Kol zot Va Od'];
 const systemMenuItem = ['Create', 'Add Permission','Kol zot Va Od'];
 const taskMenuItem = ['Create', 'Add Permission','Kol zot Va Od'];
 const formMenuItem = ['Create', 'Add Permission','Kol zot Va Od'];
 const agentMenuItem = ['Create', 'Add Permission','Kol zot Va Od'];
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={clsx(classes.appBar, {[classes.appBarShift]: open,})}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" className={clsx(classes.menuButton, open && classes.hide)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>Task Monitor</Typography>
        </Toolbar>
      </AppBar>
      <Drawer className={classes.drawer} variant="persistent" anchor="left" open={open} classes={{paper: classes.drawerPaper,}}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        {/* <Divider /> */}
        {/* <List>
          {mainMenuItem.map((text, index) => (
            <ListItem button key={text}  onClick={() =>handleListItemClick(text)}>
              {renderIcon(index)}
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
        {/* <Divider /> */}
        {/* <List>
          {secondMenuItem.map((text, index) => (
            <ListItem button key={text}>
              {renderIcon(index + 5)}
              <ListItemText primary={text} onClick={() =>handleListItemClick(text)}/>
            </ListItem>
          ))}
        </List> */}
        {mainMenuItem.map((text, index) => (
          <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>{ renderIcon(index)}{text}</AccordionSummary>
          <AccordionDetails>
            <List>
              { text === 'Users'? userMenuItem.map((userText, index) => (<List><ListItem>{userText}</ListItem></List>)): null}
              { text === 'Systems'? systemMenuItem.map((userText, index) => (<List><ListItem>{userText}</ListItem></List>)): null}
              { text === 'Tasks'? taskMenuItem.map((userText, index) => (<List><ListItem>{userText}</ListItem></List>)): null}
              { text === 'Forms'? formMenuItem.map((userText, index) => (<List><ListItem>{userText}</ListItem></List>)): null}
              { text === 'Agents'? agentMenuItem.map((userText, index) => (<List><ListItem>{userText}</ListItem></List>)): null}
            </List>
          </AccordionDetails>
        </Accordion>
        ))}
        
        {<List>
          {secondMenuItem.map((text, index) => (
            <ListItem button key={text}>
              {renderIcon(index + 5)}
              <ListItemText primary={text} onClick={() =>handleListItemClick(text)}/>
            </ListItem>
          ))}
        </List>}
      </Drawer>
      <main className={clsx(classes.content, {[classes.contentShift]: open,})}>
        <div className={classes.drawerHeader} />
      </main>
    </div>
  );
}
export default SideMenu;
