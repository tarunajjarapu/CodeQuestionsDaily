import { useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const onSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <section className="heading text-center mt-5">
                <h1>
                    <FaSignInAlt />
                </h1>
                <p style={{ fontSize: '24px', fontFamily: 'Arial, sans-serif' }}>Login</p>
            </section>
            <section className="form mt-3">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <form onSubmit={onSubmit}>
                                <div className="form-group mb-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={email}
                                        placeholder="Enter your email"
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={password}
                                        placeholder="Enter password"
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;
