import React, { useState, useEffect } from 'react';
import {
  Container, Grid, Button, FormControl, TextField, FormHelperText, FormLabel, Divider,
  CircularProgress, LinearProgress
} from '@material-ui/core';


import './formBuilder.style.scss';

function FormBuilderComponent({
  formConfig,
  loading,
  error,
  onFormSubmit,
  ...rest
}) {


  const [formBuilderState, setFormBuilderState] = useState(state => generateFormState(formConfig))

  function generateFormState(formConfig = []){
    let formStateModel = {};
    formConfig.map(form => {
      const {
        formStateKey,
        formModel,
        fieldSets,
      } = form;
      let fieldsetModel = {};
      fieldSets.map(fieldset => {
        fieldsetModel[fieldset.fieldsetKey] = formModel;
      })
      formStateModel[formStateKey] = fieldsetModel;
    })
    return formStateModel;
  }

  /*
    Submit methods
  */
 const handleSubmit = (event) => {
  event.preventDefault();
  if( typeof onFormSubmit === 'function' ){
    onFormSubmit(formBuilderState);
  }
  setFormBuilderState( generateFormState(formConfig) )
}

const handleFormChange = (event) => {
  event.preventDefault();
  event.persist();

  const {
    formstatekey,
    fieldsetkey,
    fieldkey,
  } = event.target.dataset;

  let fieldValue = getFormFieldValue(event);
  setFormBuilderState( state => {
    return{
      ...state,
      [formstatekey]:{
        ...state[formstatekey],
        [fieldsetkey] : {
          ...state[formstatekey][fieldsetkey],
          [fieldkey] : fieldValue,
        }
      }
    }
  })
}

const getFormFieldValue = (event) => {

  switch(event.target.type){

    case 'text' :
      return event.target.value.trimLeft();

    case 'radio' :
      return event.target.selected;

    default:
      return '';
  }

}

  /*
    JSX methods
  */

  const buildFormBody = (fields = []) => {
    return fields.map((field, index) => {
      const {
        type,
      } = field;

      switch (type) {
        case "text": return buildTextField(field, index);
        default: return null;
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
      keys: {
        fieldKey,
        fieldsetKey,
        formStateKey,
      }
    } = field;
    return (
      <TextField
        key={id}
        fullWidth
        margin="dense"
        variant="outlined"
        value={formBuilderState[formStateKey][fieldsetKey][fieldKey]}
        label={label}
        placeholder={placeholder}
        name={name}
        inputProps={{
          ...inputProps,
          ["data-fieldkey"]: fieldKey,
          ["data-fieldsetkey"]: fieldsetKey,
          ["data-formstatekey"]: formStateKey,
        }}
        required={inputProps.required}
        onChange={onChangeHandler}
      />
    )
  }


  return (
    <React.Fragment>
      <Container className="formBuilderWrapper">
        <Grid container justify="center" spacing={2}>
          {
            formConfig &&
            formConfig.map((form, formIndex) => {
              return (
                <form
                  key={formIndex}
                  onSubmit={handleSubmit}
                  onChange={handleFormChange}
                  autoComplete="off"
                  className="form"
                >
                  {
                    form.fieldSets.map((fieldSet, fieldSetIndex) => {
                      const {
                        fieldsetKey,
                        formLabel,
                        formHelperText,
                        buttonText,
                        fields,
                        divider,
                        buttonName,
                        buttonValue
                      } = fieldSet;
                      return (
                        <Grid
                          container
                          className="fieldSet"
                          key={fieldSetIndex}
                        >
                          <FormControl
                            color="primary"
                            component="fieldset"
                            className="formControl"
                            margin="normal"
                            fullWidth
                            name={fieldsetKey}
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
                              name={buttonName}
                              value={buttonValue}
                            // disabled={loading}
                            >
                              {buttonText}
                              {/* {loading && <CircularProgress color="secondary" size={20} />} */}
                              {/* {
                          loading 
                          ? <CircularProgress color="secondary" size={20} />
                          : buttonText
                        } */}
                            </Button>
                          </FormControl>
                          {divider && <Divider className="divider" />}
                        </Grid>
                      )
                    })
                  }
                </form>
              )
            })


          }
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export {
  FormBuilderComponent,
}