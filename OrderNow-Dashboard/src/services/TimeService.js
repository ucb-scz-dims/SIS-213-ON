const TimeService = {

    convertToTime(textTime) {
        const [hours, minutes, seconds] = textTime.split(':').map((textNumber) => parseInt(textNumber));
        
        return {
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }
}


export default TimeService