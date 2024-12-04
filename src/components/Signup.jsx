import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import {Button, Input, Logo} from './index.js'
import {Link ,useNavigate} from 'react-router-dom'
import authService from '../appwrite/auth'
import {useDispatch} from 'react-redux'
import {login} from '../store/authSlice'


function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const create = async(data) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const userData = await authService.createAccount(data)
      if (userData) {
          const userData = await authService.getCurrentUser()
          if(userData) dispatch(login(userData));
          navigate("/")
      }
  } catch (error) {
    setErrorMessage("An error occurred while creating your account. Please try again.");
  }
  finally {
    setIsLoading(false);
  }
  };

  return (
    <div className="flex items-center justify-center">
    <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
    <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
                <Logo width="100%" />
            </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
        <p className="mt-2 text-center text-base text-black/60">
            Already have an account?&nbsp;
            <Link
                to="/login"
                className="font-medium text-primary transition-all duration-200 hover:underline"
            >
                Sign In
            </Link>
        </p>
      
        <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                        label="Full Name: "
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: true,
                        })}
                        />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: (value) =>
                              /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                              'Email address must be valid',
                        })}
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                         <Input
                          label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,
                            minLength: {
                              value: 8,
                              message: 'Password must be at least 8 characters long',
                            },
                            validate: (value) =>
                              /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(value) ||
                              'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',})}
                        />
                         {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                         {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                        <Button type="submit" className="w-full" disabled={!isValid || isLoading}>
                        {isLoading ? 'Creating Account...' : 'Submit'}
                        </Button>
                    </div>
                </form>
            </div>

    </div>
  );
}

export default Signup;
