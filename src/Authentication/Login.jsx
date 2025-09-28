import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../Hooks/useAuth';
import SocialLogin from './SocialLogin';
import { toast } from 'react-toastify';


const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';

    const onSubmit = async(data) => {
        try {
            //User Login
            await signIn(data.email, data.password)

            navigate(from, { replace: true })
            toast.success('Login Successful')
        } catch (err) {
            console.log(err)
            toast.error(err?.message)
        }
  
      
         
    }
   

    return (
        <div className="card bg-slate-200 text-blue-900 w-full text-center max-w-sm shrink-0 shadow-2xl italic">
            <div className="card-body content-center">
                <h1 className="text-5xl font-bold">Please Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">

                        <label className="label">Email</label>
                        <input
                            type="email"
                            {...register('email')}
                            className="input" placeholder="Email" />


                        <label className="label">Password</label>
                        <input
                            type="password"
                            {...register('password', {
                                required: true,
                                minLength: 6
                            })}
                            className="input" placeholder="Password" />
                        {
                            errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
                        }
                        {
                            errors.password?.type === 'minLength' && <p className='text-red-500'>Password Must be 6 characters or longer</p>
                        }

                        <div><a className="link link-hover">Forgot password?</a></div>

                        <button className="btn btn-primary text-black mt-4">Login</button>
                    </fieldset>
                    <p><small>New to this website? <Link state={{ from }} className="btn btn-link" to="/SignIn">Sign In</Link></small></p>
                </form>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Login;