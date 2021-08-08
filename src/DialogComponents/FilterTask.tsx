import { TextField, FormControl, FormGroup, FormControlLabel, Checkbox, FormLabel } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { error } from 'console';
import React from 'react';


interface dialogProps {
  searchText: {text: string},
  handleTextSearch: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  error: boolean,
  classes: ClassNameMap<"root" | "highlight" | "title" | "formControl">,
  filters:{
    state: boolean,
    id: boolean,
    name: boolean,
    type: boolean,
    description: boolean,
  },
  handleFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}


const FilterTaskDialog: React.FC<dialogProps> = ({searchText,handleTextSearch,error,classes,filters,handleFilterChange}) => {

  return (
    <div>
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
        </div>
  );
}
export default FilterTaskDialog;

