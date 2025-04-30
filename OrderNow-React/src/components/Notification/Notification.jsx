import React, {useState} from 'react';
import { COLORS } from '../../assets/constants';
import { ICONS } from '../../assets/constants';

const Notification = ({
    message = 'message',
    subMessage = 'submessage',
    success = true ,
    full = false,
    visible = false
}) => {
    const topOffset = '80px';
    const [icon, setIcon] = useState(ICONS.check);
    const [bgColor, setBgColor] = useState(COLORS.green);
    if(!success){
        setIcon(ICONS.error);
        setBgColor(COLORS.red);
    }
    if(full && visible){
        return (
            <div style={{ backgroundColor: bgColor }}
                className="w-screen h-screen flex flex-col justify-center items-center text-white text-center p-4 fixed top-0 left-0 z-50"
            >
                <div className="text-6xl mb-6">{icon}</div>
                <h1 className="text-2xl font-bold">{message}</h1>
                <p className="text-md mt-2">{subMessage}</p>
            </div>
        );
    }
    if(!full && visible){ 	
        return (
            <div style={{ backgroundColor: bgColor, top: topOffset, color: '#fff'}}
                className="w-full max-w-md mx-auto py-3 px-4 flex items-center justify-between gap-3 shadow-lg rounded-md fixed left-0 right-0 z-50"
            >
                <div className="flex items-center gap-3">
                    <span className="text-xl">{icon}</span>
                    <span className="text-sm font-medium">{message}</span>
                </div>
            </div>
        );
    }
};

export default Notification;