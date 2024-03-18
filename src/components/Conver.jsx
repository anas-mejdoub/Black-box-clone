import '../App.css'
import { motion, AnimatePresence  } from 'framer-motion';
import Markdown from 'react-markdown'
import Highlight from 'react-highlight'

function helper(message) {
    if (message.sender == "ChatGPT") 
        return "ChatGPT:";
    else
        return "You:";
}

function checker(message) {
    if (message.message)
    if (message.sender == "ChatGPT" && message.message == "")
        return 0;
    else
        return 1;
}

function Conver(props) {
    const message1 = "Welcome to ChatGPT";
    const message2 = "How Can I Assist You Today ?";

    const delayBetweenMessages = message1.length * 0.06;

    return (
        <div className='messages'>
            {props.messages && props.messages.map((message, i) => (
                checker(message) ?
                <div key={i} className='message'> 
                    <div>{helper(message)}</div>
                    <Markdown>{message.message}</Markdown>  <hr />
                </div> : null
            ))}
            {
             props.messages[0] && props.messages[0].message=="" ? 
             <motion.div className='slogan'>
                <h2>
                    <AnimatePresence>
                        {message1.split("").map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.06, delay: i * 0.06 }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </AnimatePresence>
                </h2>
                <h2>
                    <AnimatePresence>
                        {message2.split("").map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.06, delay: delayBetweenMessages + i * 0.06 }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </AnimatePresence>
                </h2>
             </motion.div> : null
            }
                {props.isTyping && 
    <div>
        ChatGPT is typing
        <span>
            <motion.span
                animate={{ opacity: [0, 1, 1, 1, 0] }}
                transition={{ times: [0, 0.2, 0.4, 0.6, 1], duration: 1, repeat: Infinity }}
            >
                .
            </motion.span>
            <motion.span
                animate={{ opacity: [0, 0, 1, 1, 0] }}
                transition={{ times: [0, 0.2, 0.4, 0.6, 1], duration: 1, repeat: Infinity }}
            >
                .
            </motion.span>
            <motion.span
                animate={{ opacity: [0, 0, 0, 1, 0] }}
                transition={{ times: [0, 0.2, 0.4, 0.6, 1], duration: 1, repeat: Infinity }}
            >
                .
            </motion.span>
        </span>
    </div>
}
        </div>
    );
}
export default Conver;