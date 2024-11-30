import "./ManageSpots.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import OpenModalButton from "../OpenModalButton";
import DeleteSpotModal from "./DeleteSpot";
import { getAllSpots } from "../../store/spots";

export default function ManageSpots() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const spots = useSelector((state) => state.spots.allSpots);
    const currentSpots = spots.filter((spot) => spot.ownerId === user.id );
    // console.log("CURRENT SPOTS", currentSpots)
    // const [isLoaded, setIsLoaded] = useState(false);
  
    // // USE EFFECTS
    useEffect(() => {
      // const getData = async () => {
        dispatch(getAllSpots());
        // dispatch(getOneSpot(null));
        // setIsLoaded(true);
      // };
 
        // getData();
      
    }, [dispatch]);
     if(!currentSpots) return null;
     
     const goToSpot = (e, spot) => {
      e.preventDefault();
      e.stopPropagation();
  
      navigate(`/spots/${spot.id}`);
    };
  
    const updateSpot = (e, spot) => {
      e.preventDefault();
      navigate(`/spots/${spot.id}/update`);
    };
  
    const createSpot = (e) => {
      e.preventDefault();
      navigate("/new-spot");
    };
   
    return (
      <div className="manage-spots-page">
        <div className="manage-spots-top">
          <h2>Manage Your Spots</h2>
          <button onClick={createSpot}>Create a Spot</button>
        </div>
        <div className="manage-spot-section">
          {currentSpots.map((spot, idx) => (
            <div className="spot-card" key={`${idx}-${spot.id}`}>
              <div onClick={(e) => goToSpot(e, spot)}>
                <span className="tooltip-text" id="top">
                  {spot.name}
                </span>
                <div className="spotCardInfo">
                  <img className="spotCardInfoImg" src={spot.previewImage} />
                  <div className="spotCardText">
                    <span>
                      {spot.city}, {spot.state}
                    </span>
                    <span className="starRating">
                      <FaStar />{" "}
                      {spot.numReviews === 0
                        ? "New"
                        : spot.avgStarRating
                          ? `${spot.avgStarRating.toFixed(1)} · ${spot.numReviews !== 1
                            ? `${spot.numReviews} Review`
                            : `${spot.numReviews} Reviews`
                          }`
                          : "No rating"}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="spotCardPrice">${spot.price} </span>
                  <span>night</span>
                </div>
              </div>
              <div className="manage-buttons">
                <button onClick={(e) => updateSpot(e, spot)}>Update</button>
                <OpenModalButton
                  buttonText={"Delete"}
                  modalComponent={<DeleteSpotModal spot={spot} />}
                  preventDefault
                  stopPropagation
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  