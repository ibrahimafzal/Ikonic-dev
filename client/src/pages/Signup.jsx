import React from 'react'
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux"
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../features/user/userSlice';

const Signup = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    let signupSchema = object({
        firstname: string().required("First Name is Required!"),
        lastname: string().required("Last Name is Required!"),
        email: string().email("Email should be valid!").required("Email is Required!"),
        mobile: string().required("Mobile Number is Required!"),
        password: string().required("Password is Required!"),
        confirmPassword: string().required("Password is Required!"),
    });

    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            mobile: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: signupSchema,
        onSubmit: values => {
            if (values.password !== values.confirmPassword) {
                toast.error('Passwords do not match')
            } else {
                dispatch(registerUser(values))
                navigate("/login")
                toast.success("You are registered successfully")
            }
        }
    })

    return (
        <div className='container'>
            <div>
                <div className='my-5'>
                    <h1 className='text-center'>Create Your Account</h1>
                </div>
                <form className='w-50 justify-content-center mx-auto' onSubmit={formik.handleSubmit}>
                    <div>
                        <label>First Name:</label>
                        <input
                            className="form-control"
                            value={formik.values.firstname}
                            type="text"
                            onChange={formik.handleChange("firstname")}
                            onBlur={formik.handleBlur("firstname")}
                        />
                        <div className="formik-error mb-3">
                            {formik.touched.firstname && formik.errors.firstname}
                        </div>
                    </div>
                    <div>
                        <label>Last Name</label>
                        <input
                            className="form-control"
                            type="text"
                            value={formik.values.lastname}
                            onChange={formik.handleChange("lastname")}
                            onBlur={formik.handleBlur("lastname")}
                        />
                        <div className="formik-error mb-3">
                            {formik.touched.lastname && formik.errors.lastname}
                        </div>
                    </div>
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
                        <label>Mobile</label>
                        <input
                            className="form-control form-control-sm"
                            type="number"
                            value={formik.values.mobile}
                            onChange={formik.handleChange("mobile")}
                            onBlur={formik.handleBlur("mobile")}
                        />
                        <div className="formik-error mb-3">
                            {formik.touched.mobile && formik.errors.mobile}
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
                    <div>
                        <label>Confirm Password</label>
                        <input
                            className="form-control form-control-sm"
                            type="password"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange("confirmPassword")}
                            onBlur={formik.handleBlur("confirmPassword")}
                        />
                        <div className="formik-error mb-3">
                            {formik.touched.confirmPassword && formik.errors.confirmPassword}
                        </div>
                    </div>
                    <div className='d-flex flex-column'>
                        <button className='btn btn-dark mt-3' type='submit'>Sign Up</button>
                    </div>

                    <div className="d-flex align-items-center gap-2 justify-content-center mt-3 ">
                        <p className='mb-0'>Already have an account?</p>
                        <Link to="/login" className=''>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup