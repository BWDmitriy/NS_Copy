import css from "./AuthNav.module.css";

export const AuthNav = ({ onLogInClick, onRegistrationClick }) => {
   
  return (
    <div className={css.container}>
    <button type='button' className={css.logIn} onClick={onLogInClick}>
        Log In
      </button>
      <button type='button' className={css.registration} onClick={onRegistrationClick}>
        Registration
      </button>
         
    </div>
  );
};