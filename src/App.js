import React from 'react';
import './App.css';

import {
  Container
} from '@material-ui/core';
import {
  LogoComponent,
  FormBuilderComponent,
} from "src/reuseableComp";

import {
  createMeetingForm,
} from "src/components/createMeetingForm.config";

function App() {


  return (
    <React.Fragment>
      <Container maxWidth="xs" className="container">
        <LogoComponent />
        <FormBuilderComponent formConfig={createMeetingForm}/>
      </Container>
    </React.Fragment>
  );
}

export default App;
