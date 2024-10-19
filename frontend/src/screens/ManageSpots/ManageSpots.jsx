import "./ManageSpots.css"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getSpotByUserThunk } from '../../store/spots';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FaStar } from "react-icons/fa";
import OpenModalButton from '../../components/OpenModalButton/OpenModalButton';
import DeleteSpotModal from './DeleteSpot';

export default function ManageSpots() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)
  const spots = useSelector((state) => state.spotState.userSpots);

  const [isLoaded, setIsLoaded] = useState(false);

  // USE EFFECTS
  useEffect(() => {
    const getData = async() => {
      // grab the data from the backend
      await dispatch(getSpotByUserThunk(user.id));
      setIsLoaded(true);
    }

    // we are not loaded
    if(!isLoaded && !spots.length) {
      getData()
    }
  }, [dispatch, isLoaded, spots, user.id])

  const goToSpot = (e, spot) => {
    e.preventDefault();
    e.stopPropagation();

    navigate(`/spots/${spot.id}`)
  }

  const updateSpot = (e, spot) => {
    e.preventDefault();
    navigate(`/spots/${spot.id}/update`);
  }

  const createSpot = (e) => {
    e.preventDefault();
    navigate('/spots');
  }

  return (
    <div className='manage-spots-page'>
      <div className='manage-spots-top'>
        <h2>Manage Your Spots</h2>
        <button 
        onClick={createSpot}>Create a New Spot</button>
      </div>
      <div className="manage-spot-section">
        {spots.map((spot, idx)=> (
            <div
              className="spot-card"
              key={`${idx}-${spot.id}`}
              >
                <div onClick={e => goToSpot(e, spot)}>
                  <span className="tooltip-text" id="top">{spot.name}</span>
                  <div className="spotCardInfo">
                    <img className="spotCardInfoImg" src={spot.previewImage} />
                    <div className="spotCardText">
                      <span>{spot.city}, {spot.state}</span>
                      <span className="starRating"><FaStar /> {spot.avgRating ? spot.avgRating.toFixed(1) : "New"}</span>
                    </div>
                  </div>
                <div>
                  <span className="spotCardPrice">${spot.price} </span>
                  <span>night</span>
                </div>
                </div>
              <div className='manage-buttons'>
                <button onClick={e => updateSpot(e, spot)}>Update</button>
                <OpenModalButton 
                  buttonText={"Delete"}
                  modalComponent={<DeleteSpotModal spot={spot}/>}
                  preventDefault
                  stopPropagation
                />
              </div>
            </div>
        ))}
      </div>
    </div>
  )
}