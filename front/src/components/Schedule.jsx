import { useContext, useEffect } from "react";
import {UserContext} from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import validateSchedule from "../helpers/validateSchedule";
import useAxiosAppointment from "../hooks/useAxiosAppointment";
import { myForm, small, medium, large, myButon, borderBottom, myInput, myError } from "../styles/Schedule.module.css";
import useAlert from "../hooks/useAlert";

const Schedule = ({ setShowForm }) => {
    const { user, refetchAppointments } = useContext(UserContext);
    const navigate = useNavigate();
    const { refetch } = useAxiosAppointment("schedule", null);
    const { showAlert } = useAlert();

    const handleOnSubmit = async ({date, time, subject}) => {
        try {
            setShowForm(false);
            const appointment = {date, time, reason: subject, userId: user.id};
            await refetch(appointment);
            showAlert("Done", "Appointment scheduled successfully", "success")
            refetchAppointments();
        } catch (err) {
            showAlert("Error", err.response.data.error, "error");
        }
    };

    useEffect(() => {
        if (!user.id) navigate("/");
    }, [])

    return (
        <>
        <Formik
        initialValues={{date: "", time: "", subject: ""}}
        validate={validateSchedule}
        onSubmit={handleOnSubmit} >
        {({values}) => (
            <Form className={myForm} >

                <div className={small}></div>

                <div className={medium}>
                    <Field type="date" name="date" className={myInput} />
                    <div className={myError}>
                        <ErrorMessage name="date" />
                    </div>
                </div>

                <div className={medium}>
                    <Field type="time" name="time" className={myInput} />
                    <div className={myError}>
                        <ErrorMessage name="time" />
                    </div>
                </div>

                <div className={large}>
                    <Field as="select" name="subject" className={myInput} >
                        <option value="Default">Select one</option>
                        <option value="Mortgage Inquiry">Mortgage Inquiry</option>
                        <option value="Loan Application">Loan Application</option>
                        <option value="Credit Card Request">Credit Card Request</option>
                        <option value="Investment Advisory">Investment Advisory</option>
                        <option value="Fraud Report">Fraud Report</option>
                        <option value="Document Submission">Document Submission</option>
                        <option value="Banking Assistance">Banking Assistance</option>
                        <option value="Check Deposit Issue">Check Deposit Issue</option>
                        <option value="Transaction Dispute">Transaction Dispute</option>
                        <option value="Foreign Currency Exchange">Foreign Currency Exchange</option>
                        <option value="Debit Card Replacement">Debit Card Replacement</option>
                    </Field>
                    <div className={myError}>
                        <ErrorMessage name="subject" />
                    </div>
                </div>

                <div className={medium}>
                    <button type="submit" className={myButon} disabled={!values.date || !values.time || !values.subject ? true : false} >Schedule</button>
                </div>

            </Form>
        )}
        </Formik>
                <div className={borderBottom}></div>
        </>
    );
};

export default Schedule;