const Appointment = ({id, date, time, status}) => {
    return(
        <div key={id}>
            <div>
                <p>{status}</p>
            </div>
            <div>
                <p>{date} {time}</p>
            </div>
            <div>
                <button>Cancel</button>
            </div>
        </div>
    );
};

export default Appointment;