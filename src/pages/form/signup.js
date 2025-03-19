import React, { useContext, useState } from "react";
import { AppContext } from '../../context/context';
import axios from 'axios'
import { toast } from 'react-toastify'

// Material UI Imports
import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  IconButton,
  Button,
  Input,
  Alert,
  Stack,
  Typography,
  Link,
  Paper,
  Avatar,
  Grid
} from "@mui/material";

// Material UI Icon Imports
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';



// Email Validation
const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const Signup = () => {

  const {backendUrl, token, setToken } = useContext(AppContext)

  const [showPassword, setShowPassword] = React.useState(false);

  const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
  const btnstyle={margin:'8px 0'}

 

  //Inputs
  const [usernameInput, setUsernameInput] = useState();
  const [emailInput, setEmailInput] = useState();
  const [passwordInput, setPasswordInput] = useState();
 

  // Inputs Errors
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Overall Form Validity
  const [formValid, setFormValid] = useState();
  const [success, setSuccess] = useState();

  // Handles Display and Hide Password
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };



  // Validation for onBlur Email
  const handleEmail = () => {
    console.log(isEmail(emailInput));
    if (!isEmail(emailInput)) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
  };

  // Validation for onBlur Password
  const handlePassword = () => {
    if (
      !passwordInput ||
      passwordInput.length < 5 ||
      passwordInput.length > 20
    ) {
      setPasswordError(true);
      return;
    }

    setPasswordError(false);
  };

  //handle Submittion
  const handleSubmit = async (event) => {
    setSuccess(null);
    //Check for Errors

    // If Email error is true
    if (emailError || !emailInput) {
      setFormValid("Email is Invalid. Please Re-Enter");
      return;
    }

    // If Password error is true
    if (passwordError || !passwordInput) {
      setFormValid(
        "Password is set btw 5 - 20 characters long. Please Re-Enter"
      );
      return;
    }


    setFormValid(null);


    //Successfull Submission
    try {
    const { data } = await axios.post(backendUrl + '/api/user/register', {emailInput, passwordInput, usernameInput})
    if (data.success) {
      localStorage.setItem('token', data.token)
      setToken(data.token)
    } else {
      toast.error(data.message)
    }
           
    } catch (error) {
      toast.error(error.message)
    }
    
    setSuccess("Successful");
  };

  return (
    <Paper elevation={10} style={paperStyle}>
     <Grid align='center'>
            <Avatar><LockOutlinedIcon/></Avatar>
        <h2>Create Account</h2>
     </Grid>

      <div style={{ marginTop: "5px" }}>
        <TextField
          label="Full Name"
          fullWidth
          
          id="standard-basic"
          variant="standard"
          sx={{ width: "100%" }}
          value={usernameInput}
          InputProps={{}}
          size="small"
          onBlur={handleEmail}
          onChange={(event) => {
            setUsernameInput(event.target.value);
          }}
        />
      </div>
    
      <div style={{ marginTop: "5px" }}>
        <TextField
          label="Email Address"
          fullWidth
          error={emailError}
          id="standard-basic"
          variant="standard"
          sx={{ width: "100%" }}
          value={emailInput}
          InputProps={{}}
          size="small"
          onBlur={handleEmail}
          onChange={(event) => {
            setEmailInput(event.target.value);
          }}
        />
      </div>

      <div style={{ marginTop: "5px" }}>
        <FormControl sx={{ width: "100%" }} variant="standard">
          <InputLabel
            error={passwordError}
            htmlFor="standard-adornment-password"
          >
            Password
          </InputLabel>
          <Input
            error={passwordError}
            onBlur={handlePassword}
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            onChange={(event) => {
              setPasswordInput(event.target.value);
            }}
            value={passwordInput}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </div>


      <div style={{ marginTop: "10px" }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<LoginIcon />}
          onClick={handleSubmit}
        >
          SIGN UP
        </Button>
      </div>

      {/* Show Form Error if any */}
      {formValid && (
        <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
          <Alert severity="error" size="small">
            {formValid}
          </Alert>
        </Stack>
      )}

      {/* Show Success if no issues */}
      {success && (
        <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
          <Alert severity="success" size="small">
            {success}
          </Alert>
        </Stack>
      )}

      <div style={{ marginTop: "7px", fontSize: "10px" }} margin="left">

      
        <Typography> 
            Already have an account ?{" "}
            <Link href="/signup" >
                <Button color='primary' variant="contained" style={btnstyle} >Sign in</Button>
            </Link>
        </Typography>
      </div>
    </Paper>
  );
}


export default Signup;





