import { useState } from 'react';

let listStep = [
    { id: 0, img: 'src/assets/theme/images/icons/1.svg', title: 'Create a Free Account', desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium quos ipsam placeat fuga tenetur earum.' },
    { id: 1, img: 'src/assets/theme/images/icons/2.png', title: 'Manage your wallet', desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium quos ipsam placeat fuga tenetur earum.' },
    { id: 2, img: 'src/assets/theme/images/icons/3.svg', title: 'Buy/sell ticket', desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium quos ipsam placeat fuga tenetur earum.' },
];

export default function HowToUse() {

    const [steps, setSteps] = useState(listStep);

    return (
        <div>
            <div class="line"></div>

            <div class="container py-lg-5">
                <div class="row g-4">
                    <div class="col-12 text-center mb-lg-5">
                        <div class="text-uppercase color ls-3 fw-bold mb-2">How to do</div>
                        <h2 class="display-5 fw-bold mb-0">Simple steps to get your ticket</h2>
                    </div>
                    <div class="clear"></div>

                    {steps.map(step => (
                        <div class="col-md-4">
                            <div class="card rounded-6 card-bg-dark text-center">
                                <div class="card-body p-5">
                                    <img src={step.img} alt="..." height="150" class="mb-5"/>
                                    <h3 class="text-white mb-3">{step.title}</h3>
                                    <p class="text-white-50">{step.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}