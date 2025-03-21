import {React,   useState } from 'react'
import { useForm } from 'react-hook-form'
import TextField from './TextField';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import toast from 'react-hot-toast';
import { useStoreContext } from "../contextApi/ContextApi";


const LoginPage = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const { setToken } = useStoreContext();
    

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

    const loginHandler = async (data) => {
        setLoader(true);
        try {
            const { data: response } = await api.post(
                "/api/auth/public/login",
                data
            );
            console.log(response.token);
            setToken(response.token);
            localStorage.setItem("JWT_TOKEN", JSON.stringify(response.token));
            toast.success("Login Successful!");
            reset();
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
            toast.error("Login Failed!")
        } finally {
            setLoader(false);
        }
    };
    return (
        <div className='min-h-[calc(100vh-64px)] flex justify-center items-center bg-gradient-to-br from-[#FDEFEF] to-[#EAF6F6]'>
            <form onSubmit={handleSubmit(loginHandler)}
                className="sm:w-[450px] w-[360px] bg-white shadow-lg py-8 sm:px-8 px-4 rounded-xl border border-gray-200">
                <h1 className="text-center font-Montserrat text-[#E44D26] font-bold lg:text-3xl text-2xl">
                    Login Here
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
                    {loader ? "Loading..." : "Login"}
                </button>
    
                <p className='text-center text-sm text-gray-700 mt-6'>
                        Don't have an account? 
                    <Link className='font-semibold underline hover:text-[#E44D26]' to="/register">
                        <span className='text-[#E44D26]'> Sign up</span>
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default LoginPage;
