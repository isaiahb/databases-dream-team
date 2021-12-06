import { Link } from 'react-router-dom';
import React from "react";
import Nav from './components/Nav';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Card, Container, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Button } from '@material-ui/core';
import Api from '../Api';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

function SignupPage() {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fName, setFName] = React.useState("");
  const [lName, setLName] = React.useState("");
  const [dOB, setDOB] = React.useState(new Date());
  const [sex, setSex] = React.useState("");
  const [weight, setWeight] = React.useState(0);

  React.useEffect(() => {
    setLoading(false);
  }, [])

  const onFirstNameChanged = (ev: React.ChangeEvent<HTMLInputElement>): void => setFName(ev.target.value);
  const onLastNameChanged = (ev: React.ChangeEvent<HTMLInputElement>): void => setLName(ev.target.value);
  const onEmailChanged = (ev: React.ChangeEvent<HTMLInputElement>): void => setEmail(ev.target.value);
  const onPasswordChanged = (ev: React.ChangeEvent<HTMLInputElement>): void => setPassword(ev.target.value);
  const onSexChanged = (ev: any): void => setSex(ev.target.value);
  const onWeightChanged = (ev: React.ChangeEvent<HTMLInputElement>): void => setWeight(Number(ev.target.value));

  const signup = async () => {
    // TODO: call login api
    try {
      setError("");
      const user = await Api.auth.signup(fName, lName, email, password, dOB, weight, sex);
      console.log(user);
      // TODO: redirect to dashboard page and set user in state if signup is successfull.
    }
    catch (err: any) {
      console.log(error)
      console.log(err.response.data);
      setError(err.response.data.message ?? err.response.data);
    }
  }

  if (loading) return (
    <div>
      <Nav />
      Loading ...
    </div>
  );

  return (
    <Container>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <Box height={"300px"} width="500px">
          <Card>
            <Box padding="30px" minHeight={"300px"} display="flex" flexDirection="column" alignContent="center" justifyContent="center">
              <Typography variant="h4"> Signup </Typography>
              <Box flexGrow={1} />

              {/* Text fields */}
              <Box display="flex" flexDirection="column" width="100%" alignContent="center" justifyContent="center">

                <Box display="flex" flexDirection="row" width="100%" alignContent="center" justifyContent="center">
                  <TextField id="outlined-basic" label="First Name" variant="outlined" size="small" fullWidth={true} margin="dense" onChange={onFirstNameChanged} />
                  <TextField id="outlined-basic" label="Last Name" variant="outlined" size="small" fullWidth={true} margin="dense" onChange={onLastNameChanged} />
                </Box>

                <Box display="flex" flexDirection="row" width="100%" alignContent="center" justifyContent="center">
                  <TextField id="outlined-basic" label="Email" variant="outlined" size="small" fullWidth={true} margin="dense" onChange={onEmailChanged} />
                  <TextField id="outlined-basic" label="Password" type="password" variant="outlined" size="small" fullWidth={true} margin="dense" onChange={onPasswordChanged} />
                </Box>

                <Box display="flex" flexDirection="row" width="100%" alignContent="center" justifyContent="center">
                  {/* <TextField id="outlined-basic" label="Birthday" variant="outlined" size="small" fullWidth={true} margin="dense" onChange={onDOBChanged} /> */}
                  <MobileDatePicker
                    label="Date of birth"
                    inputFormat="MMMM/DD/yyyy"
                    value={dOB}
                    onChange={(newValue: any) => {
                      console.log(newValue._i);
                      setDOB(newValue._i);
                    }}
                    renderInput={(params) => <TextField size="small" margin="dense" fullWidth={true} {...params} />}
                  />
                  <FormControl fullWidth size="small" margin="dense" >
                    <InputLabel>Sex</InputLabel>
                    <Select
                      value={sex}
                      label="Sex"
                      onChange={onSexChanged}
                    >
                      <MenuItem value={"Female"}>Female</MenuItem>
                      <MenuItem value={"Male"}>Male</MenuItem>
                      <MenuItem value={"Other"}>Other</MenuItem>
                    </Select>
                  </FormControl>
                  {/* <TextField
                    select
                    label="Select"
                    value={sex}
                    onChange={onSexChanged}
                    helperText="Please select your sex"
                  >
                    {["female", "male", "other"].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField> */}

                </Box>

                <TextField type="number" label="Weight" variant="outlined" size="small" fullWidth={true} margin="dense" onChange={onWeightChanged}
                />

                <Button variant="contained" onClick={signup}>Signup</Button>

                {error ? <Typography paddingTop="20px" paddingBottom="20px" color="red">{error}</Typography> : <Box />}
              </Box>

              <Box flexGrow={1} />
              <Typography paddingRight="5px">Already have an account? <Link to="/login">Login</Link></Typography>
              <Box flexGrow={1} />
            </Box >
          </Card>
        </Box>
      </LocalizationProvider>
    </Container>
  );
}



export default SignupPage;