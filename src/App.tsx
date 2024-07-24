import React, { useEffect, useRef, useState } from 'react';
import mainLogo from'./assets/defog.png';
import './App.css';
import {Box, Button, styled, TextField, CircularProgress, Typography} from "@mui/material";
import axios from 'axios';
import {getOutputMessageApi} from "./Routes";

function App() {
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const [chatInput, setChatInput] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<null | HTMLDivElement>(null);

    const handleChatInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChatInput(event.target.value);
    };

    async function sendMessageToApi(chatInput: string) {
        try {
            console.log(getOutputMessageApi)
            const response = await axios.post(getOutputMessageApi, {chatInput});
            console.log(response)
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleSendClickLive = async () => {
        setIsLoading(true);
        try {
            const responseMessage = await sendMessageToApi(chatInput);
            let i = 0;
            const intervalId = setInterval(() => {
                if (i < responseMessage.length) {
                    setMessage(prevMessage => prevMessage + responseMessage[i]);
                    i++;
                } else {
                    setIsLoading(false);
                    clearInterval(intervalId);
                }
            }, 10);
        } catch (error) {
            console.error('Error sending message:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [message]); // Call scrollIntoView whenever the message state variable changes

    return (
        <div className="App">
            <div className="header">
                <img className="frogIcon" src={mainLogo} alt="DefogTheLog"/>
                <Typography variant="h2" component="h2" fontFamily="Nunito">
                    Defog The Log
                </Typography>
            </div>
            <Box
                component="form"
                className="messageDisplay"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="outlined-multiline-flexible"
                    label="Chat"
                    multiline
                    minRows={15}
                    style={{width: '70rem'}}
                    value={message}
                    InputProps={{
                        readOnly: true
                    }}>
                </TextField>
            </Box>
            <div className="TextInputBox">
                <TextField
                    className="ChatInput"
                    label="Ask a question..."
                    variant="outlined"
                    value={chatInput}
                    onChange={handleChatInputChange}
                    style={{width: '60rem'}}
                />
                <Button variant="contained" disabled={chatInput === ''} onClick={handleSendClickLive}>Send</Button>
                {isLoading && <CircularProgress  />}
            </div>
        </div>
    );
}

export default App;