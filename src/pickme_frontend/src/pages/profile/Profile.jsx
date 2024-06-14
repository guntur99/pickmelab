import { Navigate } from "react-router-dom";

export default function Profile() {

    const data = window.localStorage.getItem('auth');
    if ( data == null ) {
        return <Navigate to="/" />;
    };

    return (
            <div className="container pt-6">
                <div className="row pt-6">
                    <div className="col-md-6">
                        <div className="card rounded-6 card-bg-dark text-center">
                            <div className="card-body p-5">
                                <img src={`../theme/images/products/3.jpg`} alt="..." className="rounded-5 mb-5 w-50 h-auto"/>
                                <h3 className="text-white mb-3">Ken Abdullah</h3>
                                <p className="text-white-50">Lorem ipsum dolor sit amet</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8"></div>
                </div>
            </div>
    )
}