
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { registerUser } from '../../services/authService';
import * as yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import sprite from "../../images/icons-sprite.svg";
import css from "./RegistrationModal.module.css";

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

export default function RegistrationModal ({onClose, onRegister}) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const onSubmit = async (data) => {
    try {
      await registerUser(data.email, data.password, data.name);
      toast.success('Successfully registered!');
      onClose();
      navigate('/nannies');
    } catch (error) {
      toast.error(error.message);
    }
  };
      // логыка закриття вікна 
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
    
    
    return (
       <div  className={css.backdrop}  onClick={(e) => e.target === e.currentTarget && onClose()}>
              <div className={css.wrapper}>
        <div className={css.closeBtn} onClick={onClose}>
        <svg className={css.iconClose}>
                <use xlinkHref={`${sprite}#icon-close`}></use>
              </svg>
        </div>
        <div className={css.mainInfo}>
            <div className={css.registrationParagraphDiv}>
                <p className={css.registrationParagraph}>Registration</p>
                <p className={css.registrationParagraphDescription}>Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information.</p>
            </div>
            <div >
            <form onSubmit={handleSubmit(onSubmit)} className={css.form} >
        <div >
          <input 
            type="text"
            placeholder="Name"
            {...register('name')}
            className={css.inputs}
            required
          />
          {errors.name && <p className={css.error}>{errors.name.message}</p>}
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register('email')}
            className={css.inputs}
            required
          />
          {errors.email && <p className={css.error}>{errors.email.message}</p>}
        </div>
        <div>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            {...register('password', { required: 'Password is required' })}
            className={`${css.inputs} ${css.eye}`}
            required
          />
               <svg className={css.iconEyeOff} onClick={togglePasswordVisibility}>
               <use xlinkHref={`${sprite}#${showPassword ? 'icon-eye' : 'icon-eye-off'}`}></use>
               </svg>
          {errors.password && <p className={css.error}>{errors.password.message}</p>}
        </div>
        <div className={css.btnDiv}>
          <button className={css.btn} type="submit">Sign Up</button>
        </div>
      </form>
      <ToastContainer />

            </div>
           
        </div>
        </div>
       </div>
    )
}