import { useContext, useEffect } from "react";
import {UserContext} from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import validateSchedule from "../helpers/validateSchedule";
import useAxiosAppointment from "../hooks/useAxiosAppointment";

const ScheduleForm = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const { refetch } = useAxiosAppointment("schedule", null)

    const handleOnSubmit = ({date, time, subject}) => {
        const appointment = {date, time, reason: subject, userId: user.id};
        refetch(appointment);
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
            <Form>
                <label>Date</label>
                <Field type="date" name="date" />
                <ErrorMessage name="date" />

                <label>Time</label>
                <Field type="time" name="time" min="8:00" max="18:00" step={900} />
                <ErrorMessage name="time" />

                <label>Subject</label>
                <Field as="select" name="subject" >
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
                <ErrorMessage name="subject" />

                <button type="submit" >Submit</button>

            </Form>
        </Formik>
        </>
    );
};

export default ScheduleForm;