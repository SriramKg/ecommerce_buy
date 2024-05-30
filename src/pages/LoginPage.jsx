import React,{ useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Button } from 'antd';
//import { Alert } from 'antd';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const LoginPage = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(false);

  const handleLogin = async () => {
    const response = await fetch("http://localhost:8000/users");
    const users = await response.json();
    console.log(users);
    const user = users.find((user) => user.email === email && user.password === password);
    console.log(user);
      if(user){
        navigate("/products");
      }
      else {
        setAlert(true);
      }
  }

  const formik = useFormik({
    initialValues: {
      email:"",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      setEmail(values.email);
      setPassword(values.password);
      handleLogin();
    },
  });
  const handleRegister = () => {
    navigate("/register");
  }
  return (
    <>
      <h1>Welcome to my Login Page</h1>
      <div className="container">
        <Stack sx={{ width: "100%" }} spacing={2}>
          {alert && <Alert variant="filled" severity="error">
            Register Please!
          </Alert>}
        </Stack>
        {/* {alert && <Alert message="Register Please!" type="error" />} */}
        <form onSubmit={formik.handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={(e) => {
                formik.handleChange(e);
                setEmail(e.target.value);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={(e) => {
                formik.handleChange(e);
                setPassword(e.target.value);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
          </div>
          <Button onClick={handleLogin} type="submit">
            Login
          </Button>
          {/* <button onSubmit={handleLogin} type="submit">Login</button> */}
          <p>Don't have a Account already. Click here to Register.</p>
          <Button onClick={handleRegister} type="submit">
            Register
          </Button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
