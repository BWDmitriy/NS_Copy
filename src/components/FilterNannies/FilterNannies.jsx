import { useState } from 'react';
import sprite from "../../images/icons-sprite.svg";

import css from "./FilterNannies.module.css";
export default function FilterNannies({ sortCriteria, onSortChange }) {
    const [isContainerVisible, setIsContainerVisible] = useState(true);

    const toggleContainerVisibility = () => {
      setIsContainerVisible((prevState) => !prevState);
    };
  return (
    <div className={css.wrapper}>
      <p className={css.paragraph}>Filters</p>
      <div className={css.paragraph}>

      {isContainerVisible && (
             <div>
               <select
                 className={css.buttonDiv}
                 id="sort"
                 value={sortCriteria}
                 onChange={(e) => onSortChange(e.target.value)}
               >
                 <option className={css.container} value="alphabetical-asc">Alphabetical (A-Z)</option>
                 <option className={css.container} value="alphabetical-desc">Alphabetical (Z-A)</option>
                 <option className={css.container} value="price-asc">Price (Low to High)</option>
                 <option className={css.container} value="price-desc">Price (High to Low)</option>
                 <option className={css.container} value="rating-asc">Rating (Popular)</option>
                 <option className={css.container} value="rating-desc">Rating (Not popular)</option>
                 <option className={css.container} value="liked">Liked</option>
                 <option className={css.container} value="not-liked">Not Liked</option>
                 <option className={css.container} value="all">Show All</option>
               </select>

        </div>
          )}
      </div>
    </div>
  );
}
