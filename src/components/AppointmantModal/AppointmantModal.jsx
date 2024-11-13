import { useEffect, useState } from "react";
import { useAuth } from "../../services/AuthContext";
import { useForm } from 'react-hook-form';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import sprite from "../../images/icons-sprite.svg";

import css from "./AppointmantModal.module.css";
const validationSchema = Yup.object().shape({
  address: Yup.string().required("Address is required"),
  phone: Yup.string()
    .required("Phone is required")
    .matches(/^\+?\d{10,15}$/, "Phone number is not valid"),
  childAge: Yup.number()
    .required("Child age is required")
    .min(0, "Age must be a positive number"),
  time: Yup.string().required("Time is required"),
  parentName: Yup.string().required("Parent name is required"),
  comment: Yup.string().max(500, "Comment must be less than 500 characters"),
});

export function AppointmantModal({ onClose, nannyName, nannyAvatar  }) {
    const { user } = useAuth();
  
    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.code === "Escape") {
          onClose();
        }
      };
  
      window.addEventListener("keydown", handleKeyDown);
  
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [onClose]);
  
    const handleBackdropClick = (e) => {
      if (e.currentTarget === e.target) {
        onClose();
      }
    };
    const handleSubmit = (values, actions) => {
      console.log("Appointment request payload:", values);
      // Here you can dispatch an action or make an API call
      toast.success("Appointment scheduled successfully!");
      actions.resetForm();
      onClose();
    };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>

      <div className={css.container}>
        <svg className={css.iconClose} onClick={onClose}>
          <use xlinkHref={`${sprite}#icon-close`}></use>
        </svg>
        <div className={css.titleDiv}>
          <p className={css.mainTitle}>Make an appointment with a babysitter</p>
          <p className={css.summary}>
            Arranging a meeting with a caregiver for your child is the first
            step to creating a safe and comfortable environment. Fill out the
            form below so we can match you with the perfect care partner.
          </p>
        </div>
        <div className={css.personalInformation}>
          <div>
          {nannyAvatar && (
              <img 
                src={nannyAvatar} 
                alt={nannyName} 
                className={css.avatar}
              />
            )}
          </div>
          <div className={css.yourNanny}>
            <p className={css.yourNannyTitle}>Your nanny</p>
            <p className={css.nannyName}>{nannyName}</p>
            </div>
        </div>
        {/* <form className={css.form}  onSubmit={handleSubmit}> 
          <div className={css.someInfoDiv}>
            <input
              className={css.someInfo}
              type="text"
              placeholder="Address"
              {...register('address')}

              required
            />
    {errors.address && <p className={css.error}>{errors.address.message}</p>}

            <input
              className={css.someInfo}
              type="tel"
              name="phone"
              placeholder="+380"
              {...register('phone')}

                required
            />
                      {errors.phone && <p className={css.error}>{errors.phone.message}</p>}

            <input
              className={css.someInfo}
              type="text"
              placeholder="Child's age"
              {...register('childAge')}

            />
                      {errors.childAge && <p className={css.error}>{errors.childAge.message}</p>}

            <div>
              <input
                className={`${css.someInfo} ${css.clock}`}
               type="time"
                  name="time"
                  {...register('time')}
                  />
                        {errors.time && <p className={css.error}>{errors.time.message}</p>}

          
            </div>
            <input
            className={css.parents}
            type="text"
              name="parentName"
              placeholder="Father's or mother's name"
              {...register('parentName')}
              />
                        {errors.parentName && <p className={css.error}>{errors.parentName.message}</p>}

             <input
            className={css.comment}
            name="comment"
            placeholder="Comment"

            id=""
            {...register('comment')}

            />
                      {errors.comment && <p className={css.error}>{errors.comment.message}</p>}

          </div>
        </form> */}
{/*         
        <button className={css.btn} type="submit">Send</button> */}
 <Formik
          initialValues={{
            address: "",
            phone: "",
            childAge: "",
            time: "",
            parentName: "",
            comment: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className={css.form}>
            <div className={css.someInfoDiv}>
           <div  className={css.errorMessage}>
           <Field
                className={css.someInfo}
                type="text"
                name="address"
                placeholder="Address"
              />
              <ErrorMessage
                className={css.error}
                name="address"
                component="p"
              />
           </div>
           <div className={css.errorMessage}>
              <Field
                className={css.someInfo}
                type="tel"
                name="phone"
                placeholder="+380"
              />
              <ErrorMessage
                className={css.error}
                name="phone"
                component="p"
              />
           </div>
           <div className={css.errorMessage}>

              <Field
                className={css.someInfo}
                type="text"
                name="childAge"
                placeholder="Child's age"
              />
              <ErrorMessage
                className={css.error}
                name="childAge"
                component="p"
              />
           </div>
           <div className={css.errorMessage}>

              <Field
                className={`${css.someInfo} ${css.clock}`}
                type="time"
                name="time"
              />
              <ErrorMessage
                className={css.error}
                name="time"
                component="p"
              />
           </div>
           <div className={css.errorMessage}>

              <Field
                className={css.parents}
                type="text"
                name="parentName"
                placeholder="Father's or mother's name"
              />
              <ErrorMessage
                className={css.error}
                name="parentName"
                component="p"
              />
           </div>
           <div className={css.errorMessage}>

              <Field
                className={css.comment}
                name="comment"
                placeholder="Comment"
                as="textarea"
              />
              <ErrorMessage
                className={css.error}
                name="comment"
                component="p"
              />
                         </div>

            </div>
            <button className={css.btn} type="submit">
              Send
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

