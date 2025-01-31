const Appointment = ({date, time, reason, status}) => {
    return(
        <div>
            <div>
                <p>{status}</p>
            </div>
            <div>
                <p>{date}</p>
                <p>{time}</p>
                <p>{reason}</p>
            </div>
            <div>
                <button>Cancel</button>
            </div>
        </div>
    );
};

export default Appointment;