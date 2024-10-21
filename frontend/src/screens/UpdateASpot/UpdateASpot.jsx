import { useNavigate, useParams } from "react-router-dom";
import "./UpdateASpot.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotsThunk, updateSpotThunk } from "../../store/spots";

const UpdateASpot = () => {
  // HOOKS
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: spotId } = useParams();

  //Access all spots from the state
  const spots = useSelector((state) => state.spots.allSpots);
  const curSpot = Array.isArray(spots)
    ? spots.find((spot) => spot.id === Number(spotId))
    : null;

  //HOOKS - MANAGE STATE
  const [form, setForm] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    name: "",
    description: "",
    price: "",
    errors: {},
    isLoaded: false,
  });

  // USE EFFECTS
  useEffect(() => {
    const getData = async () => {
      await dispatch(getSpotsThunk());

      //   updateForm(true, "isLoaded");
    };

    // if(curSpot) {
    //   updateForm(curSpot.country, "country");
    //   updateForm(curSpot.address, "address");
    //   updateForm(curSpot.city, "city");
    //   updateForm(curSpot.state, "state");
    //   updateForm(curSpot.name, "name");
    //   updateForm(curSpot.price, "price");
    //   updateForm(curSpot.description, "description");
    // }
    getData();
  }, [dispatch]);

  useEffect(() => {
    if (curSpot) {
      setForm({
        address: curSpot.address,
        city: curSpot.city,
        state: curSpot.state,
        country: curSpot.country,
        name: curSpot.name,
        description: curSpot.description,
        price: curSpot.price,
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
    const res = await dispatch(updateSpotThunk(spotId, form));
    if (res.ok || res.ok === undefined) {
      // navigate
      navigate(`/spots/${res.id}`);
    } else {
      // do the code for error handling
    }
  };

  // JSX
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
