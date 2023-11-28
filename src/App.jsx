
import { useEffect, useState } from "react";
import { TVShowAPI } from "./api/tv-show";
import "./global.css"
import s from "./style.module.css"
import { BACKDROP_BASE_URL } from "./config";
import { TVShowDetail } from "./components/TVShowDetail/TVShowDetail";
import { Logo } from "./components/Logo/Logo";
import logo from "./assets/images/logo.png"
import { TVShowListItem } from "./components/TVShowListItem/TVShowListItem";
import { TVShowList } from "./components/TVShowList/TVShowList";
import { SearchBar } from "./components/SearchBar/SearchBar";




//

function App() {
  const [currentTVShow, setCurrentTVShow] = useState();
  const [recommendationList, setRecommendationList] = useState([]);

  //search popular movie
  async function fetchPopulars() {
    try{

    const populars = await TVShowAPI.fetchPopulars();
    if (populars.length > 0) {
      setCurrentTVShow(populars[0])
    }
  }catch(error){

    alert("Erreur durant la recherche des séries populaires")
  }
  }

  async function fetchRecommendations(tvShowId) {
    try{
    const Recommendations = await TVShowAPI.fetchRecommendations(tvShowId);
    if (Recommendations.length > 0) {
      setRecommendationList(Recommendations.slice(0, 10))

    }
  }catch(error){

    alert("Erreur durant la recherche des séries recommendées")
  }
  }

  useEffect(() => {
    fetchPopulars();
  }, []);

  useEffect(() => {
    if (currentTVShow) {
      fetchRecommendations(currentTVShow.id)
    }
  }, [currentTVShow]);
  // console.log('***', currentTVShow);
  // console.log('***', recommendationList);



  async function searchTVShow(tvShowName) {
    try{
    const searchResponse = await TVShowAPI.fetchByTitle(tvShowName);
    if (searchResponse.length > 0) {
      setCurrentTVShow(searchResponse[0]);
    }
  }catch(error){

    alert("Erreur durant la recherche de la série"+ error.message)
  }
  }

  return (
    <div className={s.main_container}
      style={{
        background: currentTVShow
          ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`
          : "black",
      }}>

      {/* header */}
      <div className={s.header}>
        <div className="row">
          <div className="col-4">
            <Logo image={logo} title="Watowatch" subtitle="Find a show you may like" />
          </div>
          <div className="col-sm-12 col-md-4">
            {/* SearchBar */}
            <SearchBar onSubmit={searchTVShow} />
          </div>

        </div>

      </div>
      {/* Details */}
      <div className={s.tv_show_detail}>
        {currentTVShow && <TVShowDetail tvShow={currentTVShow} />}</div>
      {/* Recommentations */}
      <div className={s.recommentations}>
        {recommendationList && recommendationList.length > 0 &&
          (<TVShowList
            onClickItem={setCurrentTVShow}
            tvShowList={recommendationList} />)}
      </div>

    </div>
  );
}

export default App;
