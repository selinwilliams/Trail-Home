import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = "spots/loadReviews";
const ADD_REVIEW = "spots/addReview";
const REMOVE_REVIEW = "spots/removeReview";

// ACTION CREATORS
const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    payload: reviews,
});

const addReview = (review) => ({
    type: ADD_REVIEW,
    payload: review,
});

const removeReview = (reviewId) => ({
    type: REMOVE_REVIEW,
    payload: reviewId,
});

// THUNKS
export const createReview = (review, spotId) => async (dispatch) => {
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(review),
        };
        const response = await csrfFetch(`/api/spots/${spotId}/reviews`, options);
        if (response.ok) {
            const data = await response.json();
            dispatch(addReview(data)); // Add the new review immediately
            await dispatch(getReviewBySpotId(spotId)); // Fetch the updated reviews
            return data;
        } else {
            throw response;
        }
    } catch (err) {
        console.error("Failed to create review:", err);
    }
};

export const getReviewBySpotId = (spotId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
        if (response.ok) {
            const data = await response.json();
            dispatch(loadReviews(data.Reviews));
        }
    } catch (err) {
        console.error("Failed to fetch reviews:", err);
    }
};

export const deleteReviewById = (reviewId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/reviews/${reviewId}`, {
            method: "DELETE",
        });

        if (response.ok) {
            dispatch(removeReview(reviewId));
        } else {
            const errorData = await response.json();
            console.error("Error deleting review:", errorData);
        }
    } catch (err) {
        console.error("Failed to delete review:", err);
    }
};

// INITIAL STATE
const initialState = { SpotReviews: [] };

// REVIEWS REDUCER FUNCTION
const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEWS:
            return { ...state, SpotReviews: action.payload };
        case ADD_REVIEW:
            return { ...state, SpotReviews: [...state.SpotReviews, action.payload] };
        case REMOVE_REVIEW:
            return {
                ...state,
                SpotReviews: state.SpotReviews.filter(
                    (review) => review.id !== action.payload
                ),
            };
        default:
            return state;
    }
};

export default reviewsReducer;
