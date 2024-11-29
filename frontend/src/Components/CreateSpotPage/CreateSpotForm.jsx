import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import './CreateSpotForm.css';
import { createSpot, getAllSpots, getOneSpot, addImageToSpot } from '../../store/spots';

// function CreateSpotForm() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [country, setCountry] = useState("");
//   const [address, setAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [lat, setLat] = useState(0);
//   const [lng, setLng] = useState(0);
//   const [description, setDescription] = useState("");
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState(0);

//   const [previewImage, setPreviewImage] = useState("");
//   const [image1, setImage1] = useState("https://i0.wp.com/castlewoodassistedliving.com/wp-content/uploads/2021/01/image-coming-soon-placeholder.png?fit=1000%2C1000&ssl=1");
//   const [image2, setImage2] = useState("https://i0.wp.com/castlewoodassistedliving.com/wp-content/uploads/2021/01/image-coming-soon-placeholder.png?fit=1000%2C1000&ssl=1");
//   const [image3, setImage3] = useState("https://i0.wp.com/castlewoodassistedliving.com/wp-content/uploads/2021/01/image-coming-soon-placeholder.png?fit=1000%2C1000&ssl=1");
//   const [image4, setImage4] = useState("https://i0.wp.com/castlewoodassistedliving.com/wp-content/uploads/2021/01/image-coming-soon-placeholder.png?fit=1000%2C1000&ssl=1");

//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     dispatch(getAllSpots());

//   }, [dispatch])



//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const errors = {};
//     if (!country.length) errors.country = "Country is required";
//     if (!address.length) errors.address = "Address is required";
//     if (!city.length) errors.city = "City is required";
//     if (!state.length) errors.state = "State is required";
//     if (!lat) errors.lat = "Latitude is required";
//     if (!lng) errors.lng = "Longitude is required";
//     if (description.length < 30)
//       errors.description = "Description needs a minimum of 30 characters";
//     if (!name.length) errors.name = "Name is required";
//     if (!price) errors.price = "Price is required";

//     if (!previewImage) errors.previewImage = "Preview image is required";

//     const newSpot = {
//       country,
//       address,
//       city,
//       state,
//       lat,
//       lng,
//       description,
//       name,
//       price,
//     };

//     const images = [image1, image2, image3, image4];

//     if (Object.keys(errors).length) {
//       setErrors(errors);
//       return;
//     }

//     const createdSpot = await dispatch(createSpot(newSpot));

//     await dispatch(
//       addImageToSpot(createdSpot.id, { preview: true, url: previewImage })
//     );
//     images.forEach((image) =>
//       dispatch(addImageToSpot(createdSpot.id, { preview: false, url: image }))
//     );

//     if (createdSpot) {
//       navigate(`/spots/${createdSpot.id}`);
//       getOneSpot(null);
//     }
//     reset();

//   }

//   const reset = () => {
//     setAddress("");
//     setCity("");
//     setCountry("");
//     setDescription("");
//     setLat(0);
//     setLng(0);
//     setName("");
//     setPrice(0);
//     setState("");
//   };
//   return (
//     <>

//       <form
//         onSubmit={handleSubmit}
//         className='full-form'
//       >
//         <div className='section-one'>
//           <h1>Create a new Spot</h1>
//           <h3>Where&apos;s your place located?</h3>
//           <p>Guests will only get your exact address once they booked a reservation.</p>
//           <label>Country</label>
//           <input
//             placeholder='Country'
//             value={country}
//             onChange={(e) => setCountry(e.target.value, "country")}
//           />
//           {errors.country && <p className="error-text">{errors.country}</p>}
//           <label>Street Address</label>
//           <input
//             placeholder='Address'
//             value={address}
//             onChange={(e) => setAddress(e.target.value, "address")}
//           />

//           <div className='section-one-a'>
//             <div className='section-one-city'>
//               <label>City,</label>
//               <br />
//               <input
//                 placeholder='City'
//                 value={city}
//                 onChange={(e) => setCity(e.target.value, "city")}
//               />
//             </div>
//             <div className='section-one-state'>
//               <label>State</label>
//               <br />
//               <input
//                 placeholder='STATE'
//                 value={state}
//                 onChange={(e) => setState(e.target.value, "state")}
//               />
//             </div>
//           </div>
//         </div>
//         <div className='section-two'>
//           <h3>Describe your place to guests</h3>
//           <p>Mention the best features of your space, any special amentities like
//             fast wif or parking, and what you love about the neighborhood.</p>
//           <textarea
//             className='description-textarea'
//             placeholder='Description'
//             value={description}
//             onChange={(e) => setDescription(e.target.value, "description")}
//           />
//         </div>
//         <div>
//           <input
//             type="number"
//             placeholder="Latitude"
//             value={lat}
//             onChange={(e) => setLat(Number(e.target.value))}
//           />
//            <input
//             type="number"
//             placeholder="Longitude"
//             value={lng}
//             onChange={(e) => setLng(Number(e.target.value))}
//           />
//         </div>
//         <div className='section-three'>
//           <h3>Create a title for your spot</h3>
//           <p>Catch guests&apos; attention with a spot title that highlights what makes
//             your place special.</p>
//           <input
//             placeholder='Name of your spot'
//             value={name}
//             onChange={(e) => setName(e.target.value, "name")}
//           />
//         </div>
//         <div className='section-four'>
//           <h3>Set a base price for your spot</h3>
//           <p>Competitive pricing can help your listing stand out and rank higher
//             in search results.</p>
//           <div className='section-four-price'>
//             <span className='dollar-sign'>$</span>
//             <input
//               placeholder='Price per night (USD)'
//               value={price}
//               onChange={(e) => setPrice(e.target.value, "price")}
//             />
//           </div>
//         </div>
//         <div className='section-five'>
//           <h3>Liven up your spot with photos</h3>
//           <p>Submit a link to at least one photo to publish your spot</p>
//           <input
//             placeholder='Preview Image URL'
//             value={previewImage}
//             onChange={(e) => setPreviewImage(e.target.value, "previewImage")}
//           />
//           <br />
//           <input
//             placeholder='Image URL'
//             value={image1}
//             onChange={(e) => setImage1(e.target.value, "image1")}
//           />
//           <br />
//           <input
//             placeholder='Image URL'
//             value={image2}
//             onChange={(e) => setImage2(e.target.value, "image2")}
//           />
//           <br />
//           <input
//             placeholder='Image URL'
//             value={image3}
//             onChange={(e) => setImage3(e.target.value, "image3")}
//           />
//           <br />
//           <input
//             placeholder='Image URL'
//             value={image4}
//             onChange={(e) => setImage4(e.target.value, "image4")}
//           />
//         </div>
//         <div className='section-six'>
//           <button className='create-spot-button'>Create Spot</button>
//         </div>
//       </form>
//     </>
//   )
// }

const CreateSpotForm = () => {
  //hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  
  //hooks ----manage state
  const [form, setForm] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    lat: "85",
    lng: "150",
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
    const formattedImages = [form.previewImage, form.image1, form.image2, form.image3, form.image4]
    
    const res = await dispatch(createSpot(form, formattedImages))
    if(res.ok || res.ok === undefined){
      //navigate
      navigate(`/spots/${res.id}`)
    } else if (res.errors) {
      // Set the errors to the form's error state if they exist
      setForm((prev) => ({ ...prev, errors: res.errors }));
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
                <div>
           <input
             type="number"
             placeholder="Latitude"
             value={form.lat}
             onChange={(e) => updateForm(Number(e.target.value))}
           />
            <input
             type="number"
             placeholder="Longitude"
             value={form.lng}
             onChange={(e) => updateForm(Number(e.target.value))}
           />
         </div>
            <label>Street Address</label>
            <input
              placeholder='Address'
              value={form.address}
              onChange={(e) => updateForm(e.target.value, "address")}
            />
            
            <div className='section-one-a'>
              <div className='section-one-city'>
                <label>City,</label>
                <br />
                <input
                  placeholder='City'
                  value={form.city}
                  onChange={(e) => updateForm(e.target.value, "city")}
                />
              </div>
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

export default CreateSpotForm;