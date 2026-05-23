// Login.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../Hooks/useAuth';
import SocialLogin from './SocialLogin';
import { showSuccess, showError } from './Message'; // Import the functions

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';
    const [loginError, setLoginError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async(data) => {
        setLoginError('');
        setIsLoading(true);
        
        try {
            await signIn(data.email, data.password);
            navigate(from, { replace: true });
            showSuccess('Login Successful! Welcome back! 🎉'); // Simple!
        } catch (err) {
            console.log(err);
            
            if (err.code === 'auth/user-not-found') {
                setLoginError('No account found with this email. Please register first.');
                showError('No account found. Please register first.'); // Simple!
            } else if (err.code === 'auth/wrong-password') {
                setLoginError('Incorrect password. Please try again.');
                showError('Incorrect password. Please try again.'); // Simple!
            } else if (err.code === 'auth/invalid-email') {
                setLoginError('Invalid email format.');
                showError('Invalid email format.'); // Simple!
            } else if (err.code === 'auth/too-many-requests') {
                setLoginError('Too many failed attempts. Please try again later.');
                showError('Too many failed attempts. Please try again later.'); // Simple!
            } else {
                setLoginError('Login failed. Please check your email and password or Register.');
                showError('Login failed. Please try again.'); // Simple!
            }
        } finally {
            setIsLoading(false);
        }
    }
   
    return (
        <div className='flex justify-center items-center p-10 rounded-box'>
            <div className="card bg-slate-200 text-blue-900 w-full text-center max-w-sm shrink-0 shadow-2xl italic">
                <div className="card-body content-center">
                    <h1 className="text-5xl font-bold">Please Login</h1>
                    
                    {loginError && (
                        <div className="alert alert-error text-white mb-4">
                            {loginError}
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset className="fieldset">
                            <label className="label">Email</label>
                            <input
                                type="email"
                                {...register('email', { required: 'Email is required' })}
                                className="input bg-white" 
                                placeholder="Email" 
                            />
                            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}

                            <label className="label">Password</label>
                            <input
                                type="password"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be 6 characters or longer'
                                    }
                                })}
                                className="input bg-white" 
                                placeholder="Password" 
                            />
                            {errors.password && <p className='text-red-500'>{errors.password.message}</p>}

                            <div>
                                <a className="link link-hover">Forgot password?</a>
                            </div>

                            <button 
                                className="btn btn-primary text-black mt-4" 
                                disabled={isLoading}
                            >
                                {isLoading ? 'Logging in...' : 'Login'}
                            </button>
                        </fieldset>
                        
                        <p className="mt-4">
                            <small>New to this website? 
                                <Link state={{ from }} className="btn btn-link" to="/SignIn">Register</Link>
                            </small>
                        </p>
                    </form>
                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default Login;





// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { Link, useLocation, useNavigate } from 'react-router';
// import useAuth from '../Hooks/useAuth';
// import SocialLogin from './SocialLogin';
// import { toast } from 'react-toastify';


// const Login = () => {
//     const { register, handleSubmit, formState: { errors } } = useForm();
//     const { signIn } = useAuth();
//     const location = useLocation();
//     const navigate = useNavigate();
//     const from = location.state?.from || '/';

//     const onSubmit = async(data) => {
//         try {
//             //User Login
//             await signIn(data.email, data.password)

//             navigate(from, { replace: true })
//             toast.success('Login Successful')
//         } catch (err) {
//             console.log(err)
//             toast.error(err?.message)
//         }    
//     }

//     return (
//         <div className='flex justify-center items-center p-10 rounded-box  '>
//         <div className="card bg-slate-200 text-blue-900 w-full text-center max-w-sm shrink-0 shadow-2xl italic">
//             <div className="card-body content-center">
//                 <h1 className="text-5xl font-bold">Please Login</h1>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <fieldset className="fieldset">

//                         <label className="label">Email</label>
//                         <input
//                             type="email"
//                             {...register('email')}
//                             className="input bg-white" placeholder="Email" />


//                         <label className="label">Password</label>
//                         <input
//                             type="password"
//                             {...register('password', {
//                                 required: true,
//                                 minLength: 6
//                             })}
//                             className="input bg-white" placeholder="Password" />
//                         {
//                             errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
//                         }
//                         {
//                             errors.password?.type === 'minLength' && <p className='text-red-500'>Password Must be 6 characters or longer</p>
//                         }

//                         <div><a className="link link-hover">Forgot password?</a></div>

//                         <button className="btn btn-primary text-black mt-4">Login</button>
//                     </fieldset>
//                     <p><small>New to this website? <Link state={{ from }} className="btn btn-link" to="/SignIn">Register</Link></small></p>
//                 </form>
//                 <SocialLogin></SocialLogin>
//             </div>
//         </div>
//         </div>
//     );
// };

// export default Login;