import { useNavigate } from 'react-router-dom';
import './CreateASpot.css'
import {  useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSpotThunk } from '../../store/spots';


const CreateASpot = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    lat: "85",
    lng: "100",
    name: "",
    description: "",
    price: "",
    previewImage: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    errors: {}
  })


  useEffect(() => {
    if(!form.city.length) form.errors['city'] = "City is required";
  }, [form.city, form.errors])


  const updateForm = (val, key) => {
    return setForm((prev) => {
      const newPrev = { ...prev };
      newPrev[key] = val
      return newPrev
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form, "step 2");
    const res = await dispatch(createSpotThunk(form))
    if(res.ok || res.ok === undefined){
      navigate(`/spots/${res.id}`)
    } else {
      //do the code for error
    }
  }


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
              value={form.country}
              onChange={(e) => updateForm(e.target.value, "country")}
            />
            <label>Street Address</label>
            <input
              placeholder='Address'
              value={form.address}
              onChange={(e) => updateForm(e.target.value, "address")}
            />
            <div className='section-one-a'>
              <div className='section-one-city'>
                <label>City</label>
                <br />
                <input
                  placeholder='City'
                  value={form.city}
                  onChange={(e) => updateForm(e.target.value, "city")}
                />
              </div>
              <span className='comma'>,</span>
              <div className='section-one-state'>
                <label>State</label>
                <br />
                <input
                  placeholder='STATE'
                  value={form.state}
                  onChange={(e) => updateForm(e.target.value, "state")}
                />
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
            value={form.description}
            onChange={(e) => updateForm(e.target.value, "description")}
          />
        </div>
        <div className='section-three'>
          <h3>Create a title for your spot</h3>
          <p>Catch guests&apos; attention with a spot title that highlights what makes
          your place special.</p>
          <input
              placeholder='Name of your spot'
              value={form.name}
              onChange={(e) => updateForm(e.target.value, "name")}
            />
        </div>
        <div className='section-four'>
          <h3>Set a base price for your spot</h3>
          <p>Competitive pricing can help your listing stand out and rank higher
          in search results.</p>
          <div className='section-four-price'>
            <span className='dollar-sign'>$</span>
            <input
              placeholder='Price per night (USD)'
              value={form.price}
              onChange={(e) => updateForm(e.target.value, "price")}
            />
          </div>
        </div>
        <div className='section-five'>
          <h3>Liven up your spot with photos</h3>
          <p>Submit a link to at least one photo to publish your spot</p>
          <input
            placeholder='Preview Image URL'
            value={form.previewImage}
            onChange={(e) => updateForm(e.target.value, "previewImage")}
          />
          <br />
          <input
            placeholder='Image URL'
            value={form.image1}
            onChange={(e) => updateForm(e.target.value, "image1")}
          />
          <br />
          <input
            placeholder='Image URL'
            value={form.image2}
            onChange={(e) => updateForm(e.target.value, "image2")}
          />
          <br />
          <input
            placeholder='Image URL'
            value={form.image3}
            onChange={(e) => updateForm(e.target.value, "image3")}
          />
          <br />
          <input
            placeholder='Image URL'
            value={form.image4}
            onChange={(e) => updateForm(e.target.value, "image4")}
          />
        </div>
      <div className='section-six'>
        <button className='create-spot-button'>Create Spot</button>
      </div>
      </form>
    </>
  )
}

export default CreateASpot;