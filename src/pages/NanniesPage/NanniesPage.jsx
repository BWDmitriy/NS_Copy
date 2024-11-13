import FilterNannies from "../../components/FilterNannies/FilterNannies";
import Header from "../../components/Header/Header";
import NannyCard from "../../components/NannyCard/NannyCard";
import { useState, useEffect } from "react";
import { db } from "../../services/firebase";
import { ref, onValue } from "firebase/database";
import Loader from "../../components/Loader/Loader";

import css from "./NanniesPage.module.css";
// import { AppointmantModal } from "../../components/AppointmantModal/AppointmantModal";

export default function NanniesPage() {
  const [nannies, setNannies] = useState([]);
  const [sortedNannies, setSortedNannies] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("all");

  const [visibleNannyCard, setVisibleNannyCard] = useState(3);
  const [loading, setLoading] = useState(true); // Додаємо стан для лоадера

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // Додаємо стан для помилок



  const handleLoadMore = () => {
    setLoading(true); // Встановлюємо loading в true перед запитом

    setVisibleNannyCard((prev) => prev + 3);
  };

  useEffect(() => {
    const dbRef = ref(db);

    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const nanniesList = Object.values(data);
          setNannies(nanniesList);
          setLoading(false);

        } else {
          setNannies([]);

        }
      },
      (error) => {
        setError(error);
        setLoading(false); 

      }
    );

    return () => unsubscribe();
  }, []);
// loader
useEffect(() => {
  const fetchNannies = async () => {
    setIsLoading(true);
    try {
      const dbRef = ref(db);
      const unsubscribe = onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const nanniesList = Object.values(data);
          setNannies(nanniesList);
          setSortedNannies(nanniesList);
        } else {
          setNannies([]);
        }
        setIsLoading(false);
      });
      return unsubscribe;
    } catch (error) {
      setIsLoading(false);
    }
  };

  fetchNannies();
}, []);
// sort data
useEffect(() => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

  let filteredNannies = [...nannies];
  switch (sortCriteria) {
    case 'alphabetical-asc':
      filteredNannies.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'alphabetical-desc':
      filteredNannies.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'price-asc':
      filteredNannies.sort((a, b) => a.price_per_hour - b.price_per_hour);
      break;
    case 'price-desc':
      filteredNannies.sort((a, b) => b.price_per_hour - a.price_per_hour);
      break;
    case 'rating-asc':
      filteredNannies.sort((a, b) => a.rating - b.rating);
      break;
    case 'rating-desc':
      filteredNannies.sort((a, b) => b.rating - a.rating);
      break;
    case 'liked':
      filteredNannies = nannies.filter(nanny => favorites.includes(nanny.id));
      break;
    case 'not-liked':
      filteredNannies = nannies.filter(nanny => !favorites.includes(nanny.id));
      break;
    case 'all':
    default:
      filteredNannies = [...nannies];
      break;
  }
  setSortedNannies(filteredNannies);
}, [sortCriteria, nannies]);

const handleSortChange = (newSortCriteria) => {
  setSortCriteria(newSortCriteria);
};

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }


  return (
    <div className={css.wrapper}>
      <div className={css.header}>
        <Header />
      </div>
      <div className={css.divInfo}>
      <FilterNannies sortCriteria={sortCriteria} onSortChange={handleSortChange} />
      {
        isLoading ? (<Loader/>) :(
          <div className={css.loadMoreDiv}>
          {sortedNannies.slice(0, visibleNannyCard).map((nanny, index) => (
            <NannyCard key={nanny.id || index} nanny={nanny} />
          ))}
          {visibleNannyCard < nannies.length && (
            <button
              className={css.loadMoreBtn}
              type="button"
              onClick={handleLoadMore}
            >
              Load more
            </button>
          )}
        </div>
        )
      }
      </div>
    </div>
  );
}
