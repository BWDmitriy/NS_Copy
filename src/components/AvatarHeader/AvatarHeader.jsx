
import sprite from "../../images/icons-sprite.svg";

import css from "./AvatarHeader.module.css";

export function AvatarHeader({ userName }) {
    
  return (
    <div className={css.wrapper} >

      <div className={css.container}>
      <svg className={css.avatar}>
                <use xlinkHref={`${sprite}#icon-avatar`}></use>
              </svg>
      </div>
      <div className={css.nannyNameDiv}>
      <p className={css.nannyName}>{userName}</p>
      </div>
    </div>
  );
}

