import { useSelector } from "react-redux";
import './CreateASpotButton.css'

export default function CreateASpotButton() {
  const sessionUser = useSelector(state => state.session.user)

  return (
    <>
      {sessionUser ? (<button className="new-spot-button">
        Create a New Spot
      </button>) : null}
    </>
  )
}