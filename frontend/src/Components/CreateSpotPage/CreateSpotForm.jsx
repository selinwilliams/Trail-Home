import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import './CreateSpotForm.css';
import { createSpot, getAllSpots, addImageToSpot } from '../../store/spots';

function CreateSpotForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [lat, setLat] = useState(85);
  const [lng, setLng] = useState(140);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  const [previewImage, setPreviewImage] = useState("");
  const [image1, setImage1] = useState("https://i0.wp.com/castlewoodassistedliving.com/wp-content/uploads/2021/01/image-coming-soon-placeholder.png?fit=1000%2C1000&ssl=1");
  const [image2, setImage2] = useState("https://i0.wp.com/castlewoodassistedliving.com/wp-content/uploads/2021/01/image-coming-soon-placeholder.png?fit=1000%2C1000&ssl=1");
  const [image3, setImage3] = useState("https://i0.wp.com/castlewoodassistedliving.com/wp-content/uploads/2021/01/image-coming-soon-placeholder.png?fit=1000%2C1000&ssl=1");
  const [image4, setImage4] = useState("https://i0.wp.com/castlewoodassistedliving.com/wp-content/uploads/2021/01/image-coming-soon-placeholder.png?fit=1000%2C1000&ssl=1");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getAllSpots());

  }, [dispatch])



  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!country.length) errors.country = "Country is required";
    if (!address.length) errors.address = "Address is required";
    if (!city.length) errors.city = "City is required";
    if (!state.length) errors.state = "State is required";
    if (!lat) errors.lat = "Latitude is required";
    if (!lng) errors.lng = "Longitude is required";
    if (description.length < 20)
      errors.description = "Description needs a minimum of 20 characters";
    if (!name.length) errors.name = "Name is required";
    if (!price) errors.price = "Price is required";

    if (!previewImage) errors.previewImage = "Preview image is required";

    const newSpot = {
      country,
      address,
      city,
      state,
      lat,
      lng,
      description,
      name,
      price,
    };

    const images = [image1, image2, image3, image4];

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const createdSpot = await dispatch(createSpot(newSpot));
    if (createdSpot) {
      await dispatch(addImageToSpot(createdSpot.id, { preview: true,  url: previewImage }));
      await dispatch(addImageToSpot(createdSpot.id, {preview: false, url: image1}))
      await dispatch(addImageToSpot(createdSpot.id, {preview: false, url: image2}))
      await dispatch(addImageToSpot(createdSpot.id, {preview: false, url: image3}))
      await dispatch(addImageToSpot(createdSpot.id, {preview: false, url: image4}))
      navigate(`/spots/${createdSpot.id}`);
    }
    reset();
  }

  const reset = () => {
    setAddress("");
    setCity("");
    setCountry("");
    setDescription("");
    setLat(85);
    setLng(140);
    setName("");
    setPrice("");
    setState("");
    setErrors({});
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='full-form'
      >
        <div className='section-one'>
          <h1>Create a new Spot</h1>
          <h3>Where&apos;s your place located?</h3>
          <p>Guests will only get your exact address once they booked a reservation.</p>
          <label>Country</label>
          <input
            placeholder='Country'
            value={country}
            onChange={(e) => {
              const value = e.target.value;
              setCountry(value);
              if (value.trim()) {
                setErrors((prevErrors) => {
                  const updatedErrors = { ...prevErrors };
                  delete updatedErrors.country;
                  return updatedErrors;
                });
              }
            }}
          />
          {errors.country && <p className="error-message">{errors.country}</p>}
          <div>
            <label>Latitude</label>
            <input
              type="number"
              placeholder="Latitude"
              value={lat}
              onChange={(e) => {
                const value = e.target.value;
                setLat(value);
                if (value.trim()) {
                  setErrors((prevErrors) => {
                    const updatedErrors = { ...prevErrors };
                    delete updatedErrors.lat;
                    return updatedErrors;
                  });
                }
              }}
            />
             {errors.lat && <p className="error-message">* {errors.lat}</p>}
             <label>Longitude</label>
            <input
              type="number"
              placeholder="Longitude"
              value={lng}
              onChange={(e) => {
                const value = e.target.value;
                setLng(value);
                if (value.trim()) {
                  setErrors((prevErrors) => {
                    const updatedErrors = { ...prevErrors };
                    delete updatedErrors.lng;
                    return updatedErrors;
                  });
                }
              }}
            />
             {errors.lng && <p className="error-message">* {errors.lng}</p>}
          </div>
          <label>Street Address</label>
          <input
            placeholder='Address'
            value={address}
            onChange={(e) => {
              const value = e.target.value;
              setAddress(value);
              if (value.trim()) {
                setErrors((prevErrors) => {
                  const updatedErrors = { ...prevErrors };
                  delete updatedErrors.address;
                  return updatedErrors;
                });
              }
            }}
          />
          {errors.address && <p className="error-message">* {errors.address}</p>}
          <div className='section-one-a'>
            <div className='section-one-city'>
              <label>City,</label>
              <br />
              <input
                placeholder='City'
                value={city}
                onChange={(e) => {
                  const value = e.target.value;
                  setCity(value);
                  if (value.trim()) {
                    setErrors((prevErrors) => {
                      const updatedErrors = { ...prevErrors };
                      delete updatedErrors.city;
                      return updatedErrors;
                    });
                  }
                }}
              />
            {errors.city && <p className="error-message">* {errors.city}</p>}
            </div>
            <div className='section-one-state'>
              <label>State</label>
              <br />
              <input
                placeholder='STATE'
                value={state}
                onChange={(e) => {
                  const value = e.target.value;
                  setState(value);
                  if (value.trim()) {
                    setErrors((prevErrors) => {
                      const updatedErrors = { ...prevErrors };
                      delete updatedErrors.state;
                      return updatedErrors;
                    });
                  }
                }}
              />
            {errors.state && <p className="error-message">* {errors.state}</p>}
            </div>
          </div>
        </div>
        <div className='section-two'>
          <h3>Describe your place to guests</h3>
          <p>Mention the best features of your space, any special amentities like
            fast wif or parking, and what you love about the neighborhood.</p>
          <textarea
            className='description-textarea'
            placeholder='Description'
            value={description}
            onChange={(e) => {
              const value = e.target.value;
              setDescription(value);
              if (value.trim()) {
                setErrors((prevErrors) => {
                  const updatedErrors = { ...prevErrors };
                  delete updatedErrors.description;
                  return updatedErrors;
                });
              }
            }}
          />
          {errors.description && <p className="error-message">* {errors.description}</p>}
        </div>
        <div className='section-three'>
          <h3>Create a title for your spot</h3>
          <p>Catch guests&apos; attention with a spot title that highlights what makes
            your place special.</p>
          <input
            placeholder='Name of your spot'
            value={name}
            onChange={(e) => {
              const value = e.target.value;
              setName(value);
              if (value.trim()) {
                setErrors((prevErrors) => {
                  const updatedErrors = { ...prevErrors };
                  delete updatedErrors.name;
                  return updatedErrors;
                });
              }
            }}
          />
          {errors.name && <p className="error-message">* {errors.name}</p>}
        </div>
        <div className='section-four'>
          <h3>Set a base price for your spot</h3>
          <p>Competitive pricing can help your listing stand out and rank higher
            in search results.</p>
          <div className='section-four-price'>
            <span className='dollar-sign'>$</span>
            <input
              placeholder='Price per night (USD)'
              value={price}
              onChange={(e) => {
                const value = e.target.value;
                setPrice(value);
                if (value.trim()) {
                  setErrors((prevErrors) => {
                    const updatedErrors = { ...prevErrors };
                    delete updatedErrors.price;
                    return updatedErrors;
                  });
                }
              }}
            />
          {errors.price && <p className="error-message">* {errors.price}</p>}
          </div>
        </div>
        <div className='section-five'>
          <h3>Liven up your spot with photos</h3>
          <p>Submit a link to at least one photo to publish your spot</p>
          <input
            placeholder='Preview Image URL'
            value={previewImage}
            onChange={(e) => {
              const value = e.target.value;
              setPreviewImage(value);
              if (value.trim()) {
                setErrors((prevErrors) => {
                  const updatedErrors = { ...prevErrors };
                  delete updatedErrors.previewImage;
                  return updatedErrors;
                });
              }
            }}
          />
          {errors.previewImage && <p className="error-message">* {errors.previewImage}</p>}
          <br />
          <input
            placeholder='Image URL'
            value={image1}
            onChange={(e) => setImage1(e.target.value, "image1")}
          />
          <br />
          <input
            placeholder='Image URL'
            value={image2}
            onChange={(e) => setImage2(e.target.value, "image2")}
          />
          <br />
          <input
            placeholder='Image URL'
            value={image3}
            onChange={(e) => setImage3(e.target.value, "image3")}
          />
          <br />
          <input
            placeholder='Image URL'
            value={image4}
            onChange={(e) => setImage4(e.target.value, "image4")}
          />
        </div>
        <div className='section-six'>
          <button className='create-spot-button'>Create Spot</button>
        </div>
      </form>
    </>
  )
}

export default CreateSpotForm;