import axios from "axios";

const Appointment = ({id, date, time, reason, status}) => {
    const handleCancel = async () => {
        try {
            console.log(id)
            const res = await axios.put(`http://localhost:3000/appointments/cancel/${id}`);
        } catch (error) {
            console.log(error);
        }
    };

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
                <button onClick={handleCancel} >Cancel</button>
            </div>
        </div>
    );
};

export default Appointment;