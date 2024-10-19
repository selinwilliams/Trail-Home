// frontend/src/components/LoginFormModal/LoginFormModal.jsx

import './PostReview.css'
import { getSpotReviewsThunk, getSpotsThunk, postReviewThunk } from '../../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../../context/Modal';
import { useState } from 'react';
import { FaRegStar } from "react-icons/fa";


function PostReviewModal({spotId}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user)

  const [rating, setRating] = useState(null);
  const [hoverVal, setHoverVal] = useState(null);

  const colors = {
    black: '#000000',
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

    await dispatch(postReviewThunk(form, spotId))
    await dispatch(getSpotsThunk())
    await dispatch(getSpotReviewsThunk(spotId))

    closeModal()
  };

  const handleClickStar = (value) => {
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
              onChange={(e => setRating(e.target.value))}
              color={(hoverVal || rating) > idx ? colors.black : colors.grey}
              onClick={() => handleClickStar(idx + 1)}
              onMouseOver={() => handleMouseOverStar(idx + 1)}
              onMouseLeave={() => handleMouseLeaveStar}
            /> 
          ))} Stars
        </div>
        <button 
        disabled={form.review.length < 10}
        onClick={handleSubmit} 
        className='submit-review-button'>Submit your review</button>
    </div>
  );
}

export default PostReviewModal;