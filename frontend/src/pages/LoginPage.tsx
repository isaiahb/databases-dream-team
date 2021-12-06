import { Link } from 'react-router-dom';
import React from "react";
import Nav from './components/Nav';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Card, Container, TextField } from '@mui/material';
import { Button } from '@material-ui/core';
import Api from '../Api';
import { AuthContext } from "./AuthContext";
import { useAuth } from './Auth';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [loading, setLoading] = React.useState(true);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const { setUser } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    setLoading(false);
  }, [])

  const onEmailChanged = (ev: React.ChangeEvent<HTMLInputElement>): void => setEmail(ev.target.value)
  const onPasswordChanged = (ev: React.ChangeEvent<HTMLInputElement>): void => setPassword(ev.target.value)
  const _login = async () => {
    // TODO: call login api
    try {
      setError("");
      const user = await Api.auth.login(email, password);
      console.log(user);
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      navigate('/dashboard');
    }
    catch (err: any) {
      console.log(err?.response?.data ?? err);
      setError(err?.response?.data ?? err);
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
      <Box height={"300px"} width="500px">
        <Card>
          <Box padding="30px" height={"300px"} display="flex" flexDirection="column" alignContent="center" justifyContent="center">
            <Typography variant="h4"> Login </Typography>
            <Box flexGrow={1} />

            {/* Text fields */}
            <Box display="flex" flexDirection="column" width="100%" alignContent="center" justifyContent="center">
              <TextField id="outlined-basic" label="Email" variant="outlined" size="small" fullWidth={true} margin="dense" onChange={onEmailChanged} />
              <TextField id="outlined-basic" label="Password" type="password" variant="outlined" size="small" fullWidth={true} margin="dense" onChange={onPasswordChanged} />
              <Button variant="contained" onClick={_login}>Login</Button>
              {error ? <Typography paddingTop="20px" color="red">{error}</Typography> : <Box />}
            </Box>

            <Box flexGrow={1} />
            <Typography paddingRight="5px">Not a user? <Link to="/signup">Signup</Link></Typography>
            <Box flexGrow={1} />
          </Box >
        </Card>
      </Box>
    </Container>
  );
}



export default LoginPage;