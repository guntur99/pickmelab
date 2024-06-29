import { useState } from 'react';

let listStep = [
    { id: 0, img: '../theme/images/icons/1.svg', title: 'Secure & Flexible', desc: 'Secure because blockchain and ICP are secure. Flexible means events can be created by anyone and anyone can become anything.' },
    { id: 1, img: '../theme/images/icons/2.png', title: 'Manage Wallet & NFT', desc: 'Manage a digital wallet for ticket payments and can carry out limited NFT buying and selling transactions and get lots of benefits.' },
    { id: 2, img: '../theme/images/icons/3.svg', title: 'Buy & Sell Ticket', desc: 'Be a committee and sell your tickets. Resellers have many benefits that can be obtained and Buyers can attend various extraordinary events.' },
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
                        <h2 className="display-5 fw-bold text-white mb-0">Simple steps to get your heart</h2>
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