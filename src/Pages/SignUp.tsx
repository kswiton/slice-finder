import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { auth } from "../Auth/firebaseConfig";
import Link from "@mui/material/Link";
import { useLoginStatus } from "../Auth/AuthContext";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import CircularProgress from "@mui/material/CircularProgress";

const SignUp = () => {
  const { isLoggedIn } = useLoginStatus();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmailCorrect, setIsEmailCorrect] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailRegex.test(email)) {
      setIsEmailCorrect(true);
      return true;
    } else {
      setIsEmailCorrect(false);
      return false;
    }
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/; //between 8-32 characters, at least one uppercase, one lowercase and one number
    if (passwordRegex.test(password)) {
      setIsPasswordValid(true);
      return true;
    } else {
      setIsPasswordValid(false);
      return false;
    }
  };

  const validatePasswordsMatch = (
    password: string,
    confirmPassword: string
  ) => {
    if (password === confirmPassword) {
      setPasswordsMatch(true);
      return true;
    } else {
      setPasswordsMatch(false);
      return false;
    }
  };

  const onRegister = async () => {
    if (
      validateEmail(email) &&
      validatePassword(password) &&
      validatePasswordsMatch(password, confirmPassword)
    ) {
      await createUserWithEmailAndPassword(email, password);
    }
  };

  if (isLoggedIn) {
    navigate("/");
  }
  return (
    <Box
      sx={{
        backgroundColor: "#2196f3",
        background: "linear-gradient(160deg, #2196f3 0%, #1769aa 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        sx={{
          elevation: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 3,
        }}
      >
        <Typography variant="h4">Create account</Typography>
        <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
          Already have an account?{" "}
          <Link component={NavLink} to="/login" underline="hover">
            Login
          </Link>
        </Typography>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="login">Email</InputLabel>
          <OutlinedInput
            autoComplete="off"
            id="login"
            type={"email"}
            label="Email"
            value={email}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onRegister();
              }
            }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            error={!isEmailCorrect}
          />
        </FormControl>
        {!isEmailCorrect && (
          <FormHelperText error>Enter correct email</FormHelperText>
        )}
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onRegister();
              }
            }}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((show) => !show)}
                  onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => {
                    event.preventDefault();
                  }}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
          <OutlinedInput
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            label="Confirm Password"
            value={confirmPassword}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onRegister();
              }
            }}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </FormControl>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            width: "25ch",
          }}
        >
          {!isPasswordValid && (
            <FormHelperText error>
              Password needs to be between 8-32 characters, at least one
              uppercase, one lowercase and one number
            </FormHelperText>
          )}
          {!passwordsMatch && (
            <FormHelperText error>Passwords do not match</FormHelperText>
          )}
          {error && <FormHelperText error>{error.message}</FormHelperText>}
        </Box>
        {loading ? (
          <CircularProgress />
        ) : (
          <Button
            sx={{ marginTop: 1 }}
            variant="contained"
            onClick={() => {
              onRegister();
            }}
          >
            Create account
          </Button>
        )}
      </Paper>
    </Box>
  );
};

export default SignUp;
