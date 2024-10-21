import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import './LandingPage.css'
import { useNavigate } from "react-router-dom";
import { getSpotsThunk } from "../../../store/spots";

const LandingPage = () => {
  // HOOKS
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const spots = useSelector((state) => state.spots.allSpots);
  const [isLoaded, setIsLoaded] = useState(false);


  // USE EFFECTS
  useEffect(() => {
    const getData = async() => {
       await dispatch(getSpotsThunk());
      setIsLoaded(true);
     }

    // we are not loaded
    if(!isLoaded && !spots.length) {
      getData()
    }
  }, [dispatch, isLoaded, spots])

  // Custom FUNCTIONS and variables

  // const goToSpot = (e, spot) => {
  //   e.preventDefault();
  //   e.stopPropagation();

  //   navigate(`/spots/${spot.id}`)
  // }
  return (
    <>
      <div data-testid='spots-list'className="spotSection">
        {spots.map((spot, spotId)=> (
            <div data-testid='spot-tile'
              className="spot-card"
              key={`${spotId}-${spot.id}`}
              onClick={() => navigate(`/spots/${spot.id}`)}
              >
                <span data-testid='spot-tooltip'className="tooltip-text" id="top">{spot.name}</span>
                <div data-testid='spot-tile' className="spotCardInfo">
                  <img data-testid='spot-thumbnail-img' className="spotCardInfoImg" src={spot.previewImage.url} />
                  <div className="spotCardText">
                    <span data-testid='spot-city'>{spot.city}, {spot.state}</span>
                    <span className="starRating"><FaStar /> {spot.avgRating ? spot.avgRating.toFixed(1) : "New"}
                      </span>
                  </div>
                </div>
              <div data-testid='spot-price'>
                <span className="spotCardPrice">${spot.price} </span>
                <span >night</span>
              </div>
            </div>
            
        ))}
        
      </div>
    </>
  )
}

export default LandingPage;
