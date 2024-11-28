import './PostReview.css'
import { useDispatch } from 'react-redux';
import { useModal } from '../Context/Modal';
import './DeleteReviewModal.css'
import { getOneSpot } from '../../store/spots';
import { getReviewBySpotId, deleteReviewById } from '../../store/reviews';

function DeleteReviewModal({review, setHasReviewed}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();


  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(deleteReviewById(review.id))
    await dispatch(getReviewBySpotId(review.spotId))
     await dispatch(getOneSpot(review.spotId))

    setHasReviewed(false);
    closeModal()
  };

  return (
    <div className='delete-review'>
      <h1>Confirm Delete</h1>
      <span>Are you sure you want to delete this review?</span>
      <button 
      className='delete-yes'
      onClick={handleSubmit}
      >Yes (Delete Review)</button>
      <button 
      className='delete-no'
      onClick={closeModal}
      >No (Keep Review)</button>
    </div>
  );
}

export default DeleteReviewModal;