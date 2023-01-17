import { ChangeEvent, FormEvent, useState } from 'react';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { api } from '../lib/axios';
import { getCookieFromServer, setCookie } from '../utils/cookie';
import { GetServerSidePropsContext } from 'next';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
type LoginDetails = {
  username: string;
  password: string;
};
const Login = ({ login }: { login: any }) => {
  const [loginDetails, setLoginDetails] = useState<LoginDetails>();
  const [passwordShown, setPasswordShown] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);
  const togglePassword = () => {
    setPasswordShown((p) => !p);
  };
  const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoginError(false);
    setLoginDetails((p) => ({ ...p, [e.target.name]: e.target.value }));
  };
  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { username, password } = loginDetails;
      const res = await api.post(`/auth/token/login/`, {
        username,
        password,
      });
      login(true);

      console.log('res = ', res.data);
      const { auth_token } = res.data;
      axios.defaults.headers.common['Authorization'] = `Token ${auth_token}`;
      setCookie('userToken', auth_token);
    } catch (error) {
      console.log('error : ', error);
      login(false);
      const errors = error as Error | AxiosError;
      setIsLoginError(true);
      console.error(errors);
    }
  };
  return (
    <div className=" z-10    bg-black/[45%]  inset-0 fixed items-center justify-center ">
      <div className=" flex items-center justify-center h-full">
        <div className=" flex flex-col p-10 pb-12 bg-[#F5F5F5] text-[14px] font-bold rounded-[10px] w-[328px] h-[495px]  ">
          <h1 className=" text-xl text-center ">Account Login</h1>
          <div className=" flex flex-col mt-7 space-y-[10px]">
            <h2>Account Name:</h2>
            <input
              onChange={handleChangeForm}
              name={'username'}
              type="text"
              className="h-11 px-[10px] rounded-md inner-shadow2  border-b-2 border-r-2 border-white shadow-black"
            />
          </div>
          <div className=" flex flex-col mt-7 space-y-[10px]">
            <h2>Password:</h2>
            <div className=" w-full relative">
              <input
                onChange={handleChangeForm}
                name={'password'}
                type={passwordShown ? 'text' : 'password'}
                className="h-11 px-[10px] w-full rounded-md inner-shadow2  border-b-2 border-r-2 border-white shadow-black relative"
              />
              <div
                onClick={togglePassword}
                className="  cursor-pointer absolute right-2 bottom-1/2 translate-y-[50%]"
              >
                {passwordShown ? <AiFillEye /> : <AiFillEyeInvisible />}
              </div>
            </div>
            {isLoginError && (
              <p className=" text-[#FF0000]">Something Went Wrong</p>
            )}
          </div>
          <button
            onClick={handleSubmitForm}
            className="styled  mt-[50px]  py-[13px]"
          >
            Login
          </button>
          <button className="styled mt-7  py-[13px]">
            Send Password to Email
          </button>
        </div>
      </div>
    </div>
  );
};
export default Login;
