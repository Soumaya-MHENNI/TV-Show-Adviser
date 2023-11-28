
import {StarFill,Star as StarEmpty, StarHalf} from "react-bootstrap-icons"
export  function FiveStarRating ({rating}) {
//Declarer un tab d'étoiles vide
const starList =[];
// stocker dans une variable le nombre d'étoile pleine
const starFillCount = Math.floor(rating);
// stocker dans une variable si oui ou nn il y'a une demi étoile 
const hasStarHalf = rating -starFillCount >= 0.5;
// stocker dans une variable le nombre d'étoile vide
const emptyStarCount = 5- starFillCount-(hasStarHalf? 1 : 0)
// pusher dans le tableau les étoiles pleines
for (let i=1 ; i<= starFillCount; i++){
    starList.push(<StarFill key={"star-fill"+i}/>)
}
// pusher dans le tableau les démi étoiles (s'il y'en a)
if (hasStarHalf){
    starList.push(<StarHalf key={"star-half"}/>)
}
// pusher dans le tableau les étoiles vides
for (let i=1 ; i<=emptyStarCount ; i++){
    starList.push(<StarEmpty key={"star-empty"+i}/>)
}

  return (
    <div>
      {starList}
    </div>
  )
};