// import { getAllSpots } from "../../store/spots";
import './PostReview.css'
import { getReviewBySpotId, createReview } from "../../store/reviews";
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../Context/Modal";
import { useState } from 'react';
import { FaRegStar } from "react-icons/fa";
import { getOneSpot } from '../../store/spots';


function PostReviewModal({ spotId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const sessionUser = useSelector((state) => state.session.user)
  
    const [rating, setRating] = useState(0);
    const [hoverVal, setHoverVal] = useState(null);
  
    const colors = {
      black: '#FFC107',
      grey: '#A9A9A9',
    }
  
    const [form, setForm] = useState({
      userId: sessionUser.id,
      spotId: spotId,
      review: "",
      stars: rating
    })
  
    const updateForm = (val, key) => {
      return setForm((prev) => {
        const newPrev = { ...prev };
        newPrev[key] = val
        return newPrev
      })
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      await dispatch(createReview(form, spotId))
      await dispatch(getReviewBySpotId(spotId))
      await dispatch(getOneSpot(spotId))
      closeModal()
    };
  
    const handleClickStar = (value) => {
      setRating(value);
      updateForm(value, "stars")
    }
  
    const handleMouseOverStar = (value) => {
      setHoverVal(value)
    }
  
    const handleMouseLeaveStar = () => {
      setHoverVal(undefined)
    }
  
    return (
      <div
       className='spot-review-form'
       >
        <h1>How was your stay?</h1>
        <div className='describe-review'>
            <textarea
              className='description-textarea'
              placeholder='Leave your review here...'
              value={form.review}
              onChange={(e) => updateForm(e.target.value, "review")}
            />
          </div>
          <div className='star-div'>
            {[...Array(5)].map((_star, idx) => (
              <FaRegStar
                className='star'
                key={idx}
                size={25}
                color={(hoverVal || rating) > idx ? colors.black : colors.grey}
                onClick={() => handleClickStar(idx + 1)}
                onMouseOver={() => handleMouseOverStar(idx + 1)}
                onMouseLeave={() => handleMouseLeaveStar}
              /> 
            ))} Stars
          </div>
          <button 
          disabled={form.review.length < 8 }
          onClick={handleSubmit} 
          className='submit-review-button'>Submit your review</button>
      </div>
    );
  }
  
  export default PostReviewModal;