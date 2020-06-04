import 'date-fns';
import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Title from './Title';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import DateFnsUtils from '@date-io/date-fns';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


class TaskGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      helperText: '',
      error: false,
      open: false,
      setOpen: false,
      taskCategories: ["Architecture", "Development", "Testing", "Delivery"],
      model: {
        id: 0,
        name: '',
        category: '',
        description: '',
        duedate: new Date()
      },
      rows: [
        {
          id: 1,
          name: "Design solution architecture",
          category: "Architecture",
          description: "Create component diagrams",
          duedate: new Date()
        },
        {
          id: 2,
          name: "Implement user stories",
          category: "Development",
          description: "Implement US 1",
          duedate: new Date()
        },
        {
          id: 3,
          name: "Code Review",
          category: "Development",
          description: "Verify pull request #2323",
          duedate: new Date()
        },
        {
          id: 4,
          name: "Create unit tests",
          category: "Testing",
          description: "Unit tests must have at least 70% code coverage",
          duedate: new Date()
        },
        {
          id: 5,
          name: "Create integration tests",
          category: "Testing",
          description: "Integration tests must have at least 90% code coverage",
          duedate: new Date()
        },
        {
          id: 6,
          name: "Deploy solution in Production",
          category: "Delivery",
          description: "Must create automated release pipeline",
          duedate: new Date()
        },
        {
          id: 7,
          name: "Deploy solution in Staging",
          category: "Delivery",
          description: "Must create automated release pipeline",
          duedate: new Date()
        }
      ]
    };
  }

  classes = makeStyles((theme) => ({
    seeMore: {
      marginTop: theme.spacing(3),
    },
  }));

  setOpen = (state) => {
    this.setState({ open: state });
  }

  handleSave = (event) => {
    event.preventDefault();
    if (this.state.error) {
      return;
    }
    var model =
    {
      id: this.state.model.id,
      name: this.state.model.name,
      category: this.state.model.category,
      description: this.state.model.description,
      duedate: this.state.model.duedate,
    };

    if (model.id === 0) {
      model.id = this.state.rows[this.state.rows.length - 1].id + 1;
      this.setState({ rows: [...this.state.rows, model] });
    } else {

      const updatedRows = this.state.rows.map((item, j) => {
        if (item.id === model.id) {
          return model;
        } else {
          return item;
        }
      });

      this.setState({ rows: updatedRows });

    }
    this.setOpen(false);
  };

  handleClose = () => {
    this.setOpen(false);
  };

  newTask = () => {
    var initialState =
    {
      id: 0,
      name: '',
      category: '',
      description: '',
      duedate: new Date(),
    };

    this.setState({ model: initialState, error: false, helperText: '' });
    this.setOpen(true);
  };

  updateTask = (task) => {
    this.setState({ model: task, error: false });
    this.setOpen(true);
  }

  removeTask = (task) => {
    
    if(window.confirm('Do you really want to delete the task?')) {
      var tasks = this.state.rows.filter(function (obj) {
        return obj.id !== task.id;
      })
  
      this.setState({ rows: tasks });
    }
  }

  onInputChange = event => {
    const { name, value } = event.target;
    this.setState({ model: { ...this.state.model, [name]: value } });
  }

  onInputBlur = event => {

    const value = event.currentTarget.value + "";

    if (value.length > 0) {
      this.setState({ helperText: '', error: false });
    } else {
      this.setState({ helperText: 'Required', error: true });
    }
  }

  onDateChange = date => {
    this.setState({ model: { ...this.state.model, duedate: date } });
  };
  
  render() {
    const { rows, open, model, error, helperText, taskCategories } = this.state;
    return (
      <React.Fragment>
        <Grid container spacing={3}>
          <Grid item xs={10}>
            <Title>My Tasks</Title>
          </Grid>
          <Grid item xs={2}>
            <Box align="right">
              <Button variant="contained" color="primary" align="right" onClick={this.newTask}>NEW TASK</Button>
            </Box>
            <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
              <form className={this.classes.root} autoComplete="off">
                <DialogTitle id="form-dialog-title">Task</DialogTitle>
                <DialogContent>
                  <TextField required autoFocus error={error}
                    label="Name"
                    fullWidth
                    name="name"
                    value={model.name}
                    onBlur={this.onInputBlur.bind(this)}
                    onChange={this.onInputChange.bind(this)}
                    helperText={helperText} />
                  <TextField select label="Category"
                    name="category"
                    value={model.category}
                    onChange={this.onInputChange}
                    fullWidth >
                    {taskCategories.map(option => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      margin="normal"
                      fullWidth
                      id="date-picker-dialog"
                      label="Due Date"
                      format="dd/MM/yyyy"
                      name="duedate"
                      value={model.duedate}
                      onChange={this.onDateChange.bind(this)}
                      KeyboardButtonProps={{
                        'aria-label': 'change due date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                  <TextField label="Description"
                    fullWidth
                    multiline
                    name="description"
                    value={model.description}
                    onChange={this.onInputChange}
                    rows="4" />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary" value="cancel">
                    Cancel
                  </Button>
                  <Button onClick={this.handleSave} type="submit" color="primary">
                    Save
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
          </Grid>
        </Grid>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.duedate.toISOString().substr(0, 10)}</TableCell>
                <TableCell align="right">
                  <IconButton aria-label="edit" onClick={() => this.updateTask(row)}>
                    <EditIcon></EditIcon>
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => this.removeTask(row)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

export default TaskGrid;
