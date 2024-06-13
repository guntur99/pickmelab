import { useState } from 'react';

let listStep = [
    { id: 0, img: '../theme/images/icons/1.svg', title: 'Create a Free Account', desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium quos ipsam placeat fuga tenetur earum.' },
    { id: 1, img: '../theme/images/icons/2.png', title: 'Manage your wallet', desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium quos ipsam placeat fuga tenetur earum.' },
    { id: 2, img: '../theme/images/icons/3.svg', title: 'Buy/sell ticket', desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium quos ipsam placeat fuga tenetur earum.' },
];

export default function HowToUse() {

    const [steps, setSteps] = useState(listStep);

    return (
        <div>
            <div className="line"></div>

            <div className="container py-lg-5">
                <div className="row g-4">
                    <div className="col-12 text-center mb-lg-5">
                        <div className="text-uppercase color ls-3 fw-bold mb-2">How to do</div>
                        <h2 className="display-5 fw-bold text-white mb-0">Simple steps to get your ticket</h2>
                    </div>
                    <div className="clear"></div>

                    {steps.map(step => (
                        <div key={step.id} className="col-md-4">
                            <div className="card rounded-6 card-bg-dark text-center">
                                <div className="card-body p-5">
                                    <img src={step.img} alt="..." height="150" className="mb-5"/>
                                    <h3 className="text-white mb-3">{step.title}</h3>
                                    <p className="text-white-50">{step.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}