import Header from "../../components/Header/Header";
import ExperiencedNanniesModal from '../../components/ExperiencedNanniesModal/ExperiencedNanniesModal'
import { useNavigate } from 'react-router-dom'; 

import sprite from "../../images/icons-sprite.svg";


import css from "./HomePage.module.css";
export default function HomePage() {
  const navigate = useNavigate(); 

  const handleGetStartedClick = () => {
    navigate('/nannies'); 
  };
  return (
    <>
      <div className={css.wrapper}>
        <div className={css.header}><Header /></div>
        <div className={css.divider}></div>
        <div className={css.modal}>
            <ExperiencedNanniesModal/>
        </div>
        <div className={css.container}>
          <div className={css.mainInfo}>
            <h1 className={css.title}>Make Life Easier for the Family:</h1>
            <p className={css.paragraph}>
              Find Babysitters Online for All Occasions
            </p>
            <button className={css.btnGetStarted} type="button" onClick={handleGetStartedClick}>
            Get started
            <svg className={css.icon}>
              <use xlinkHref={`${sprite}#icon-arrow-up-right`}></use>
            </svg>
          </button>
          </div>
        </div>
        <div className={css.backgroundImage}></div>
      </div>
    </>
  );
}
