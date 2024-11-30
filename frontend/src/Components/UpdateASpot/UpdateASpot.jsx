import { useNavigate, useParams } from "react-router-dom";
import "./UpdateASpot.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots, updateSpot } from "../../store/spots";

const UpdateASpot = () => {
  // HOOKS
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {  spotId } = useParams();
  //Access all spots from the state
  const spots = useSelector((state) => state.spots.allSpots || {});
  const curSpot = Object.values(spots).find((spot) => spot.id === Number(spotId));

  //HOOKS - MANAGE STATE
  const [form, setForm] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    lat: 0,
    lng: 0,
    name: "",
    description: "",
    price: "",
    errors: {},
    isLoaded: false,
  });

  // USE EFFECTS
  useEffect(() => {
    if (!Object.keys(spots).length) {
      dispatch(getAllSpots());
    }
  }, [dispatch, spots]);

  

  useEffect(() => {
    if (curSpot) {
      setForm({
        address: curSpot.address || "",
        city: curSpot.city || "",
        country: curSpot.country || "",
        state: curSpot.state || "",
        lat: curSpot.lat || 0,
        lng: curSpot.lng || 0,
        name: curSpot.name || "",
        description: curSpot.description || "",
        price: curSpot.price || "",
        errors: {},
      });
    }
  }, [curSpot]);

  
  // CUSTOM FUNCS
  const updateForm = (val, key) => {
    setForm((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(updateSpot(spotId, form));
    
    if (res && !res.errors) {
      navigate(`/spots/${spotId}`);
    } else {
      setForm((prev) => ({
        ...prev,
        errors: res.errors || { general: "Failed to update spot" },
      }));
    }
  };

  
  return (
    <>
      <form onSubmit={handleSubmit} className="full-form">
        <div className="section-one">
          <h2>Update your Spot</h2>
          <h3>Where&apos;s your place located?</h3>
          <p>
            Guests will only get your exact address once they booked a
            reservation.
          </p>
          <label>Country</label>
          <input
            placeholder="Country"
            value={form.country}
            onChange={(e) => updateForm(e.target.value, "country")}
          />
          {form.errors.general && <p className="error-message">{form.errors.general}</p>}
          <label>Street Address</label>
          <input
            placeholder="Address"
            value={form.address}
            onChange={(e) => updateForm(e.target.value, "address")}
          />
          <div className="section-one-a">
            <div className="section-one-city">
              <label>City,</label>
              <br />
              <input
                placeholder="City"
                value={form.city}
                onChange={(e) => updateForm(e.target.value, "city")}
              />
            </div>
            <div className="section-one-state">
              <label>State</label>
              <br />
              <input
                placeholder="STATE"
                value={form.state}
                onChange={(e) => updateForm(e.target.value, "state")}
              />
              </div>
             
          </div>
          <div>
           <label>Latitude</label>
           <input placeholder="LATITUDE"
           value={form.lat}
           onChange={(e) => updateForm(e.target.value, "latitude")}
           
           />
           <label>Longtitude</label>
           <input placeholder="LONGITUDE"
           value={form.lng}
           onChange={(e) => updateForm(e.target.value, "longitude")}
           />
          </div>
        </div>
        <div className="section-two">
          <h3>Describe your place to guests</h3>
          <p>
            Mention the best features of your space, any special amentities like
            fast wif or parking, and what you love about the neighborhood.
          </p>
          <textarea
            className="description-textarea"
            placeholder="Description"
            value={form.description}
            onChange={(e) => updateForm(e.target.value, "description")}
          />
        </div>
        <div className="section-three">
          <h3>Create a title for your spot</h3>
          <p>
            Catch guests&apos; attention with a spot title that highlights what
            makes your place special.
          </p>
          <input
            placeholder="Name of your spot"
            value={form.name}
            onChange={(e) => updateForm(e.target.value, "name")}
          />
        </div>
        <div className="section-four">
          <h3>Set a base price for your spot</h3>
          <p>
            Competitive pricing can help your listing stand out and rank higher
            in search results.
          </p>
          <div className="section-four-price">
            <span className="dollar-sign">$</span>
            <input
              placeholder="Price per night (USD)"
              value={form.price}
              onChange={(e) => updateForm(e.target.value, "price")}
            />
          </div>
        </div>
        <div className="section-six">
          <button className="create-spot-button">Update your Spot</button>
        </div>
      </form>
    </>
  );
};

export default UpdateASpot;
