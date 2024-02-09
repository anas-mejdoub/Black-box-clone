import { useState } from 'react';
import SendButton from './SendButton'; // adjust the path as needed
import '../App.css';

function CustomInput(props) {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
        if (props.onChange) {
            props.onChange(event.target.value);
        }
    };

    const handleSend = () => {

        if (inputValue!= '' &&props.onSend) {
            props.onSend(inputValue);
            setInputValue('');
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className='input-container'>
            <input 
                type="text" 
                value={inputValue} 
                onChange={handleChange}
                placeholder='Message ChatGPT...'
                onKeyPress={handleKeyPress}
                className='message-input'
            />
            <SendButton onClick={handleSend} />
        </div>
    );
}

export default CustomInput;