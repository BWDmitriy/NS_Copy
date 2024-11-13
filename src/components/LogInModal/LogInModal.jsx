import  { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { loginUser } from "../../services/authService";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import sprite from "../../images/icons-sprite.svg";
import css from "./LogInModal.module.css";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
export default function LogInModal({ onClose }) {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);
      toast.success('Successfully logged in!');
      onClose();
      navigate('/nannies');
    } catch (error) {
      toast.error(error.message);
    }
  };


  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };


  return (
    <div className={css.backdrop} onClick={(e) => e.target === e.currentTarget && onClose()}>
<div className={css.wrapper}>
      <div className={css.closeBtn}>
        <svg className={css.iconClose} onClick={onClose}>
          <use xlinkHref={`${sprite}#icon-close`}></use>
        </svg>
      </div>
      <div className={css.mainInfo}>
        <div className={css.registrationParagraphDiv}>
          <p className={css.registrationParagraph}>Log In</p>
          <p className={css.registrationParagraphDescription}>
            Welcome back! Please enter your credentials to access your account
            and continue your babysitter search.
          </p>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
            <div>
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className={css.inputs}
                required
              />
              {errors.email && (
                <p className={css.error}>{errors.email.message}</p>
              )}
            </div>
            <div>
              <input
               type={showPassword ? "text" : "password"}
              placeholder="Password"
                {...register("password")}
                className={`${css.inputs} ${css.eye}`
              }
              required
              />
              <svg className={css.iconEyeOff} onClick={togglePasswordVisibility}>
              <use xlinkHref={`${sprite}#${showPassword ? 'icon-eye' : 'icon-eye-off'}`}></use>
              </svg>
              {errors.password && (
                <p className={css.error}>{errors.password.message}</p>
              )}
            </div>
            <button className={css.btn} type="submit">
            Log in
          </button>
          </form>
          <ToastContainer />

        </div>
        <div className={css.btnDiv}>
        
        </div>
      </div>

    </div>

    </div>
  );
}
