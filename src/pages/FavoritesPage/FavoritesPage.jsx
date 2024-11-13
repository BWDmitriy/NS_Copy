import { useState, useEffect } from "react";
import { db } from "../../services/firebase";
import { ref, onValue } from "firebase/database";
import NannyCard from "../../components/NannyCard/NannyCard";
import css from "./FavoritesPage.module.css";
import Header from "../../components/Header/Header";
import FilterNannies from "../../components/FilterNannies/FilterNannies";

export default function FavoritesPage() {
  const [nannies, setNannies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    const dbRef = ref(db);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const allNannies = Object.values(data);
        const favoriteNannies = allNannies.filter((nanny) =>
          favorites.includes(nanny.id)
        );
        setNannies(favoriteNannies);
      } else {
        setNannies([]);
      }
      setLoading(false);
    });
  }, []);

  const handleRemoveFavorite = (nannyId) => {
    setNannies((prevNannies) =>
      prevNannies.filter((nanny) => nanny.id !== nannyId)
    );

    const updatedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    ).filter((id) => id !== nannyId);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className={css.wrapper}>
      <div className={css.header}>
        <Header />
      </div>
      <div className={css.filterDiv}>
        <FilterNannies />
      </div>
      <div className={css.likedCardsDiv}>
        {nannies && nannies.length > 0 ? (
          nannies.map((nanny) => (
            <NannyCard
              key={nanny.id}
              nanny={nanny}
              onRemoveFavorite={handleRemoveFavorite}
            />
          ))
        ) : (
          <p className={css.allort}>No favorite nannies yet.</p>
        )}
      </div>
    </div>
  );
}
