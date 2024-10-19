// import SpotDetails from "../screens/SpotDetails/components/SpotDetails";
import { csrfFetch } from "./csrf";

//CONSTRANTS
const GET_ALL_SPOTS = "spots/getAllSpots"
const GET_SPOT = "spot/getSpot"
const GET_REVIEWS = "spot/getReviews"
const CREATE_SPOT = "spot/createSpot"
const MANAGE_SPOT = "spot/manageSpot"
const UPDATE_SPOT = "spot/UpdateSpot"
const DELETE_SPOT = "spot/DeleteSpot"
const POST_REVIEW = "spot/postReview"
const DELETE_REVIEW = "spot/DeleteReview"
// const ADD_IMAGE = 

//ACTION CREATORS
const getAllSpots = (spots) => ({
  type: GET_ALL_SPOTS,
  spots
})

const getSpot = (spot) => ({
  type: GET_SPOT,
  payload: spot
})

const getReviews = (reviews) => ({
  type: GET_REVIEWS,
  payload: reviews
})

const createSpot = (spot) => ({
  type: CREATE_SPOT,
  payload: spot
})

const updateSpot = (spot) => ({
  type: UPDATE_SPOT,
  payload: spot
})

const manageSpot = (spots) => ({
  type: MANAGE_SPOT,
  payload: spots
})

const deleteSpot = (deletedSpot) => ({
  type: DELETE_SPOT,
  payload: deletedSpot
})

const postReview = (review) => ({
  type: POST_REVIEW,
  payload: review
})

const deleteReview = (deletedReview) => ({
  type: DELETE_REVIEW,
  payload: deletedReview
})

//THUNK actions
export const getSpotsThunk = () => async(dispatch) => {
    const res = await csrfFetch('/api/spots');
    if(res.ok){
      const data = await res.json();
       dispatch(getAllSpots(data.Spots))
    } 
    
}

export const getSpotByUserThunk = () => async(dispatch) => {
  try {
    const res = await csrfFetch('/api/spots/current');
    if(res.ok) {
      const data = await res.json();
      await dispatch(manageSpot(data))
  
    } else {
      throw res;
    }
  } catch(e) {
    return e;
  }
}

export const getSpotsDetailsThunk = (id) => async(dispatch) => {
  try {
    const res = await csrfFetch(`/api/spots/${id}`);
    if(res.ok) {
      const data = await res.json();
      await dispatch(getSpot(data))
    } else {
      throw res;
    }
  } catch(e) {
    return e;
  }
}

export const createSpotThunk = (spot) => async(dispatch) => {
  try {

    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(spot)
    }
    const res = await csrfFetch("/api/spots", options)
    if(res.ok){
      const data = await res.json();
      dispatch(createSpot(data))
      return data;
    } else{
      throw res
    }
  } catch(e) {
    return e;
  }
}

export const updateSpotThunk = (id, spotForm) => async(dispatch) => {
  try {
      const options = {
          method: 'PUT',
          header: {'Content-Type': 'application/json'},
          body: JSON.stringify(spotForm)
      }
      const res = await csrfFetch(`/api/spots/${id}`, options)
      if(res.ok){
          // step 5
          const data = await res.json();
          dispatch(updateSpot(data))
        return data;
      } else{
          throw res;
      }
  } catch (error) {
      return error;
  }
}

export const deleteSpotThunk = (spot) => async(dispatch) => {
  try {
          const options = {
              method: 'DELETE',
              header: {'Content-Type': 'application/json'},
              body: JSON.stringify(spot)
          };

          const res = await csrfFetch(`/api/spots/${spot.id}`, options);
          if(res.ok){
              const data = await res.json();
              dispatch(deleteSpot(data));
            return data;
          } else{
              throw res;
          }

  } catch (error) {
      return error;
  }
}


export const getSpotReviewsThunk = (id) => async(dispatch) => {
  try {
    const res = await csrfFetch(`/api/spots/${id}/reviews`);
    if(res.ok) {
      const data = await res.json();
      await dispatch(getReviews(data))
      return data;

    } else {
      throw res;
    }
  } catch(e) {
    return e;
  }
}

export const postReviewThunk = (reviewForm, spotId) => async(dispatch) => {
  try {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(reviewForm)
    }

    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, options)
    if(res.ok){
      const data = await res.json();
      dispatch(postReview(data))
      return data;
    } else{
      throw res
    }
  } catch(e) {
    return e;
  }
}

export const deleteReviewThunk = (review) => async(dispatch) => {
  try {
          const options = {
              method: 'DELETE',
              header: {'Content-Type': 'application/json'},
              body: JSON.stringify(review)
          };
          const res = await csrfFetch(`/api/reviews/${review.id}`, options);
          if(res.ok){
              const data = await res.json();
              dispatch(deleteReview(data));
            return data;
          } else{
              throw res;
          }

  } catch (error) {
      return error;
  }
}

//REDUCER

const initialState = {
  allSpots: [],
  userSpots: [],
  allReviews: [],
  byId: {},
  byReviewId: {},
  userReviews: [],
  spotDetails: null
}

function spotsReducer(state = initialState, action) {

  let newState;
  switch (action.type) {
    case GET_ALL_SPOTS: {
      newState = {...state, allSpots: action.spots}
      // newState.allSpots = action.payload;       
      return newState;
    }

    case GET_SPOT: {
      newState = {...state, spotDetails: action.payload}
      newState.allSpots = [action.payload]
      newState.byId = action.payload;
      return newState;
    }

    case UPDATE_SPOT: {
      newState = {...state};

      const spotId = action.payload.id  
      const newAllSpots = []  
      for(let i = 0; i < newState.allSpots.length; i++){
          let currSpot = newState.allSpots[i];
          if(currSpot.id === spotId){
              newAllSpots.push(action.payload);
          } else{
              newAllSpots.push(currSpot)
          }
        }
         
      newState.allSpots = newAllSpots;
      newState.byId = {...newState.byId, [spotId]: action.payload};
       return newState;
    }
      
    case MANAGE_SPOT:
      newState = {...state}
      newState.userSpots = action.payload.Spots
      for(let spot of action.payload.Spots) {
        newState.byId[spot.id] = spot;
      }
      return newState;
    
    case DELETE_SPOT: {
        newState = {...state};

        const filteredSpots = newState.allSpots.filter((spot)=> {
          return spot.id !== action.payload.id
        })
        const filteredUserSpots = newState.userSpots.filter((spot)=> {
          return spot.id !== action.payload.id
        })
        newState.allSpots = filteredSpots;
        newState.userSpots = filteredUserSpots;

        const newById = {...newState.byId};
        delete newById[action.payload.id];
        newState.byId = newById;

        return newState;
      }

    case GET_REVIEWS: {
      newState = {...state}
      newState.allReviews = action.payload.Reviews;

      for(let review of action.payload.Reviews) {
        newState.byReviewId[review.id] = review;
      }
      return newState;
    }

    case CREATE_SPOT: {
      newState = {...state};

      newState.allSpots = [action.payload, ...newState.allSpots];
  
      newState.byId = {...newState.byId, [action.payload.id]: action.payload}

      return newState

    }

    case POST_REVIEW: {
      newState = {...state};

      newState.allReviews.Reviews = [action.payload, ...newState.allReviews];
  
      newState.byReviewId[action.payload.id] = action.payload;

      return newState
    }

    case DELETE_REVIEW: {
      newState = {...state};

      const filteredReviews = newState.allReviews.filter((review)=> {
        return review.id !== action.payload.id
      })
      const filteredUserReviews = newState.userReviews.filter((review)=> {
        return review.id !== action.payload.id
      })
      newState.allReviews = filteredReviews;
      newState.userReviews = filteredUserReviews;

      const newByReviewId = {...newState.byReviewId};
      delete newByReviewId[action.payload.id];
      newState.byReviewId = newByReviewId;

      return newState;
    }

    default:
      return state;
  }
}

export default spotsReducer;