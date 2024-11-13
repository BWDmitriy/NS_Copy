import sprite from "../../images/icons-sprite.svg";

import css from './ExperiencedNanniesModal.module.css'

export default function ExperiencedNanniesModal() {
return (
    <div className={css.wrapper}>
<div className={css.icoCheck}>
<svg className={css.icon}>
              <use xlinkHref={`${sprite}#icon-check`}></use>
            </svg>
</div>
<div className={css.modalText}>
    <p className={css.experiencedNannies}>Experienced nannies</p>
    <p className={css.amount}>
    15,000
    </p>
</div>
    </div>
)
}