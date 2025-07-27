import React, { useState } from "react";
import type { ChangeEvent } from "react";

import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import axios from "axios";

// styles
import useStyles from "../styles";

// logo
import logo from "../../assets/react.svg";
// import google from "../../images/google.svg";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const Login: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  // Local state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [activeTabId, setActiveTabId] = useState<number>(0);
  const [nameValue, setNameValue] = useState<string>("");
  const [loginValue, setLoginValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  const login = async () => {
    setIsLoading(true);
    setError(false);

    try {
      const res = await axios.post(`${apiUrl}/api/super-admin/login`, {
        email: loginValue,
        password: passwordValue,
      });

      if (res.data.access_token) {
        localStorage.setItem("superToken", res.data.access_token);
        navigate("/super/dashboard");
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>Super Admin</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs
            value={activeTabId}
            onChange={(_, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Login" classes={{ root: classes.tab }} />
            {/* <Tab label="New User" classes={{ root: classes.tab }} /> */}
          </Tabs>

          {activeTabId === 0 && (
            <>
              {/* <Typography variant="h1" className={classes.greeting}>
                Good Morning, User
              </Typography>
              
              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <Typography className={classes.formDividerWord}>or</Typography>
                <div className={classes.formDivider} />
              </div> */}
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                onChange={handleInputChange(setLoginValue)}
                margin="normal"
                placeholder="Email Address"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={handleInputChange(setPasswordValue)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    disabled={loginValue.length === 0 || passwordValue.length === 0}
                    onClick={login}
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Login
                  </Button>
                )}
                {/* <Button color="primary" size="large" className={classes.forgetButton}>
                  Forget Password
                </Button> */}
              </div>
            </>
          )}

          {activeTabId === 1 && (
            <>
              <Typography variant="h1" className={classes.greeting}>
                Welcome!
              </Typography>
              <Typography variant="h2" className={classes.subGreeting}>
                Create your account
              </Typography>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
              <TextField
                id="name"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={nameValue}
                onChange={handleInputChange(setNameValue)}
                margin="normal"
                placeholder="Full Name"
                type="text"
                fullWidth
              />
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                onChange={handleInputChange(setLoginValue)}
                margin="normal"
                placeholder="Email Address"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={handleInputChange(setPasswordValue)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    onClick={login}
                    disabled={
                      loginValue.length === 0 ||
                      passwordValue.length === 0 ||
                      nameValue.length === 0
                    }
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.createAccountButton}
                  >
                    Create your account
                  </Button>
                )}
              </div>
              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <Typography className={classes.formDividerWord}>or</Typography>
                <div className={classes.formDivider} />
              </div>
              
            </>
          )}
        </div>
        {/* <Typography color="primary" className={classes.copyright}>
          © 2014-2019 Flatlogic, LLC. All rights reserved.
        </Typography> */}
      </div>
    </Grid>
  );
};

export default Login;
