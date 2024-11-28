import { useNavigate } from "react-router-dom";

function CreateSpotButton() {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/new-spot")
    };

    return (
        <div >
            <button  className="new-spot-button"onClick={handleButtonClick}>
                Create A Spot
            </button>
        </div>
    );
}


export default CreateSpotButton;