import {Link} from "react-router-dom";
import Testimonial from "../components/Testimonial";
import FAQ from "../components/FAQ";
import testimonials from "../helpers/testimonials";
import faqs from "../helpers/faqs";
import { container, mySection, myArticle, subtitle, joinUs } from "../styles/Home.module.css";

const Home = () => {
    return (
        <div className={container}>
            <section className={mySection}>
                <article className={myArticle}>
                    <h2 className={subtitle}>Welcome to Liberty Bank</h2>
                    <p><strong>Say goodbye to long lines and hello to hassle-free banking!</strong> Managing your bank appointments has never been easier! At Liberty Bank, we believe in making banking simple, fast, and stress-free.</p>
                </article>
                <article className={myArticle}>
                    <h3 className={subtitle}>Our Mission</h3>
                    <p>We’re not just about transactions—we’re about people. Our mission is to provide a seamless banking experience, so you can focus on what really matters.</p>
                </article>
                <article className={myArticle}>
                    <h3 className={subtitle}>Why choose Liberty Bank?</h3>
                    <ul>
                        <li>✅ <strong>Fast & Easy</strong> – Book your appointments online in just a few clicks.</li>
                        <li>🔒 <strong>Secure & Reliable</strong> – Your data is protected with industry-leading security.</li>
                        <li>⏳ <strong>No More Waiting</strong> – Save time by scheduling in advance and avoiding long lines.</li>
                    </ul>
                    <p>💬 <q><i>"We’ve been helping our customers for years with a seamless banking experience. Join us today and take control of your time!"</i></q></p>
                    <p><i>🔹 Book your appointment today and skip the wait!</i></p>
                    <Link to="/register" className={joinUs} ><strong>Join Liberty Bank Today!</strong></Link>
                </article>
            </section>
            <section className={mySection}>
                <article className={myArticle}>
                    <h2 className={subtitle}>🌟 What Our Customers Are Saying</h2>
                    <p>At <strong><i>Liberty Bank</i></strong>, we believe in making banking easy and stress-free. But don’t just take our word for it—here’s what some of our customers have to say about their experience with us:</p>
                </article>
                {
                    testimonials.map(testimonial => {
                        return <article key={testimonial.id}>
                            <Testimonial
                            name={testimonial.name}
                            quote={testimonial.quote} />
                        </article>
                    })
                }
                <article className={myArticle}>
                    <p>We’re proud to help thousands of customers enjoy a faster, easier, and more secure banking experience. Ready to experience it for yourself?</p>
                </article>
            </section>
            <section className={mySection}>
                <article className={myArticle}>
                    <h2 className={subtitle}>❓ Frequently Asked Questions (FAQ)</h2>
                    <p>Here are some of the most common questions about Liberty Bank and our services. If you have any other inquiries, feel free to contact us!</p>
                </article>
                {
                    faqs.map(faq => {
                        return <article key={faq.id} >
                            <FAQ
                            question={faq.question}
                            answer={faq.answer} />
                        </article>
                    })
                }
            </section>
        </div>
    );
};

export default Home;