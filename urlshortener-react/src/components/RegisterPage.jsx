import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import TextField from './TextField';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import toast from 'react-hot-toast';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
        mode: "onTouched",
    });

    const registerHandler = async (data) => {
        setLoader(true);
        try {
            const { data: response } = await api.post(
                "/api/auth/public/register",
                data
            );
            reset();
            navigate("/login");
            toast.success("Registeration Successful!")
        } catch (error) {
            console.log(error);
            toast.error("Registeration Failed!")
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className='min-h-[calc(100vh-64px)] flex justify-center items-center bg-gradient-to-br from-[#FDEFEF] to-[#EAF6F6]'>
            <form onSubmit={handleSubmit(registerHandler)}
                className="sm:w-[450px] w-[360px] bg-white shadow-lg py-8 sm:px-8 px-4 rounded-xl border border-gray-200">
                <h1 className="text-center font-Montserrat text-[#E44D26] font-bold lg:text-3xl text-2xl">
                    Register Here
                </h1>
    
                <hr className='mt-2 mb-5 border-[#E44D26]'/>
    
                <div className="flex flex-col gap-4">
                    <TextField
                        label="UserName"
                        required
                        id="username"
                        type="text"
                        message="*Username is required"
                        placeholder="Type your username"
                        register={register}
                        errors={errors}
                    />
    
                    <TextField
                        label="Email"
                        required
                        id="email"
                        type="email"
                        message="*Email is required"
                        placeholder="Type your email"
                        register={register}
                        errors={errors}
                    />
    
                    <TextField
                        label="Password"
                        required
                        id="password"
                        type="password"
                        message="*Password is required"
                        placeholder="Type your password"
                        register={register}
                        min={6}
                        errors={errors}
                    />
                </div>
    
                <button
                    disabled={loader}
                    type='submit'
                    className='bg-[#E44D26] font-semibold text-white w-full py-2 hover:bg-[#D74220] transition-all duration-200 rounded-lg my-4 shadow-md'>
                    {loader ? "Loading..." : "Register"}
                </button>
    
                <p className='text-center text-sm text-gray-700 mt-6'>
                    Already have an account? 
                    <Link className='font-semibold underline hover:text-[#E44D26]' to="/login">
                        <span className='text-[#E44D26]'> Login</span>
                    </Link>
                </p>
            </form>
        </div>
    )
}
    
export default RegisterPage;
