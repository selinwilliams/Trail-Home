import './DeleteSpot.css';
import { useDispatch } from 'react-redux';
import { useModal } from '../Context/Modal';
import { deleteSpotById } from '../../store/spots';

function DeleteSpotModal({ spot }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
     dispatch(deleteSpotById(spot.id))
    closeModal()
  };

  return (
    <div className='delete-spot'>
      <h1>Confirm Delete</h1>
      <span>Are you sure you want to remove this spot from the listings?</span>
      <button 
      className='delete-yes'
      onClick={handleSubmit}
      >Yes (Delete Spot)</button>
      <button 
      className='delete-no'
      onClick={closeModal}
      >No (Keep Spot)</button>
    </div>
  );
}

export default DeleteSpotModal;