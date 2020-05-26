import React from 'react';
import {
  Container, Grid, Button, FormControl, TextField, FormHelperText, FormLabel, Divider
} from '@material-ui/core';


import './formBuilder.style.scss';

function FormBuilderComponent({
  formConfig,
  ...rest
}) {


  /*
    JSX methods
  */

  const buildFormBody = (fields = []) => {
    return fields.map((field, index) => {
      const {
        type,
      } = field;

      switch(type){
        case "text": return buildTextField(field,index);
        default : return null;
      }
      
    })
  }


  const buildTextField = (field, id) => {
    const {
      type,
      name,
      label,
      placeholder,
      inputProps,
      onChangeHandler,
    } = field;
    return (
      <TextField
        key={id}
        fullWidth
        margin="dense"
        variant="outlined"
        label={label}
        placeholder={placeholder}
        name={name}
        inputProps={inputProps}
        required={inputProps.required}
        onChange={onChangeHandler}
      />
    )
  }

  /*
    Submit methods
  */
  const handleSubmit = (event) => {
    event.preventDefault();
    [...event.target].map( item => console.log(item.name))
  }

  return (
    <React.Fragment>
      <Container className="formBuilderWrapper">
        <Grid container justify="center" spacing={2}>
          <form onSubmit={handleSubmit} autoComplete="off" className="form">
            {
              formConfig &&
              formConfig.fieldSets.map((fieldSet, index) => {
                const {
                  formLabel,
                  formHelperText,
                  buttonText,
                  fields,
                  divider,
                } = fieldSet;
                return (
                  <Grid container className="fieldSet" key={index}>
                    <FormControl
                      color="primary"
                      component="fieldset"
                      className="formControl"
                      margin="normal"
                      fullWidth
                    >
                      {
                        formLabel &&
                        <FormLabel component="legend">
                          {formLabel}
                        </FormLabel>
                      }
                      {buildFormBody(fields)}
                      {
                        formHelperText &&
                        <FormHelperText>
                          {formHelperText}
                        </FormHelperText>
                      }
                      <Button
                        color="primary"
                        fullWidth
                        type="submit"
                        variant="contained"
                      >
                        {buttonText}
                      </Button>
                    </FormControl>
                    { divider && <Divider className="divider"/> }
                  </Grid>
                )
              })
            }
          </form>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export {
  FormBuilderComponent,
}