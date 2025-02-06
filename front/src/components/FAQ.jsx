import { container } from "../styles/FAQ.module.css";

const FAQ = ({question, answer}) => {
    return(
        <div className={container}>
            <q><strong>{question}</strong></q>
            <q><i>{answer}</i></q>
        </div>
    );
};

export default FAQ;