// frontend/src/components/LoginFormModal/LoginFormModal.jsx
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './DeleteSpot.css';
import { deleteSpotThunk } from '../../store/spots';

function DeleteSpotModal({ spot }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(deleteSpotThunk(spot))

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