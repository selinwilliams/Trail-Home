import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/loadSpots";
const LOAD_A_SPOT = "spots/loadASpot"
const ADD_SPOT = "spots/addSpot";
const ADD_IMAGE = "spots/addImage";
const EDIT_SPOT = "spots/editSpot";
const DELETE_SPOT = "spots/deleteSpot";


//ACTION CREATORS
const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots,
    };
};


const loadASpot = (spot) => {
    return {
        type: LOAD_A_SPOT,
        payload: spot,
    }
}

const addSpot = (spot) => {
    return {
        type: ADD_SPOT,
        spot,
    };
};


const addImage = (image) => {
    return {
        type: ADD_IMAGE,
        image,
    };
};

const editSpot = (spot) => {
    return {
        type: EDIT_SPOT,
        spot,
    };
};


const deleteSpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId,
    };
};


//THUNK
export const getAllSpots = () => async (dispatch) => {
    const response = await fetch("/api/spots");
    if (response.ok) {
        const data = await response.json();
        dispatch(loadSpots(data));
    }
};

export const getOneSpot = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}`);
    if (response.ok) {
        const spot = await response.json();
        dispatch(loadASpot(spot));
    } else {
        console.error("Failed to fetch spot data");
    }
};

export const addImageToSpot = (spotId, image) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(image),
    });
    if (response.ok) {
        const newImage = await response.json();
        dispatch(addImage(newImage));
        return newImage;
    }
};

export const createSpot = (spot) => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(spot),
    });
    const newSpot = await response.json();
    dispatch(addSpot(newSpot));
    return newSpot;
};

export const updateSpot = (spotId, spot) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spot),
    });
    const updatedSpot = await response.json();
    dispatch(editSpot(updatedSpot));
    // return updatedSpot;
};

export const deleteSpotById = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: "DELETE",
    });
    if (response.ok) {
        dispatch(deleteSpot(spotId));
    }
};



const initialState = {
    allSpots: [],
    currentSpot: null,
    newestSpot: null
};


//REDUCER FUNCTION 
const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS: {
            const sortedSpots = action.spots.Spots
                ? action.spots.Spots.sort(
                    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
                ) : [];
            return {
                ...state,
                allSpots: sortedSpots,
            };
        }
        case LOAD_A_SPOT: {
            return { ...state, currentSpot: action.payload };
        }
        case ADD_SPOT: {
            return {
                ...state,
                allSpots: [...state.allSpots, action.spot],
                newestSpot: action.spot,
            };
        }
        // case ADD_IMAGE: {

        // }
        case EDIT_SPOT: {
            const updatedSpots = state.allSpots.map((spot) =>
                spot.id === action.spot.id ? action.spot : spot
            );
            const sortedSpots = updatedSpots.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            return {
                ...state,
                allSpots: sortedSpots,
                currentSpot: action.spot,
            };
        }
        case DELETE_SPOT: {
            return {
                ...state,
                allSpots: state.allSpots.filter((spot) => spot.id !== action.spotId)
            }
        }

        default:
            return state;
    }
}

export default spotsReducer;