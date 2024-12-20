import { useDispatch, useSelector } from 'react-redux';
import './LandingPage.css'
import { useEffect } from 'react';
import { getAllSpots, getOneSpot } from '../../store/spots';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { getReviewBySpotId } from '../../store/reviews';

function LandingPage() {
    const dispatch = useDispatch();
    const spots = useSelector((state) => state.spots.allSpots)
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllSpots());
        getOneSpot(null)
        getReviewBySpotId()
    }, [dispatch]);

    if (!spots || spots.length === 0) {
        return <p>Loading spots...</p>;
      }

    const goToSpot = (e, spot) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/spots/${spot.id}`)
       
    }

    return (
        <>
        <div id="spots-lists">
            {spots.map((spot, spotId) => (
                <div className="spot-card"
                    key={`${spotId}-${spot.id}`}
                    onClick={e => goToSpot(e, spot)}
                >
                    <span className="tooltip-text" id="top">{spot.name}</span>
                    <div className="spotCardInfo">
                        <img className="spotCardInfoImg" src={spot.previewImage?.url ||  "https://placehold.co/600x400"} alt={spot.name || "Spot preview"} />
                        <div className="spotCardText">
                            <span>{spot.city}, {spot.state}</span>
                            <span className="starRating"><FaStar /> {spot.avgRating ? spot.avgRating.toFixed(1) : "New"}
                            </span>
                        </div>
                    </div>
                    <div>
                        <span className="spotCardPrice">${spot.price} </span>
                        <span >night</span>
                    </div>
                </div>
            ))}
        </div>
        </>
    );
}


export default LandingPage;




