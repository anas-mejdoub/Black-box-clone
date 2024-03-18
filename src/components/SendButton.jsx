import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
function SendButton(props) {
    return (
        <button className='send-button' onClick={props.onClick}>
            <FontAwesomeIcon icon={faPaperPlane} />
        </button>
    );
}

export default SendButton; 