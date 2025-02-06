const Testimonial = ({ name, quote}) => {
    return(
        <div>
            <p><i>"{quote}"</i></p>
            <p><i>— {name}</i></p>
        </div>
    );
};

export default Testimonial;