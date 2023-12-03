import React, { useEffect } from 'react'
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../features/user/userSlice';
import { toast } from 'react-toastify';

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  let loginSchema = object({
    email: string().email("Email should be valid!").required("Email is Required!"),
    password: string().required("Password is Required!"),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: values => {
      dispatch(loginUser(values))
      navigate("/")
    }
  })

  return (
    <div className='container'>
      <div>
        <div className='my-5'>
          <h1 className='text-center'>Login</h1>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className='w-50 justify-content-center mx-auto'
        >
          <div>
            <label>Email</label>
            <input
              className="form-control form-control-sm"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
            />
            <div className="formik-error mb-3">
              {formik.touched.email && formik.errors.email}
            </div>
          </div>

          <div>
            <label>Password</label>
            <input
              className="form-control form-control-sm"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange("password")}
              onBlur={formik.handleBlur("password")}
            />
            <div className="formik-error mb-3">
              {formik.touched.password && formik.errors.password}
            </div>
          </div>
          {/* forgot password link */}
          <div className='d-flex flex-column'>
            <Link to="/forgotPassword" className='d-none'>Forgot Password?</Link>
            <button className='btn btn-dark mt-3' type='submit'>Login</button>
          </div>
          {/* go to signup page link */}
          <div className="d-flex align-items-center gap-2 justify-content-center mt-3 ">
            <p className='mb-0'>Don't have an account?</p>
            <Link to="/signup" className=''>Signup</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login