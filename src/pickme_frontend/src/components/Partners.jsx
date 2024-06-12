import { useState } from 'react';

let listPartner = [
    { id: 0, img: 'src/assets/theme/images/logo/coinbase.svg' },
    { id: 1, img: 'src/assets/theme/images/logo/binance.svg' },
    { id: 2, img: 'src/assets/theme/images/logo/opensea.svg' },
    { id: 3, img: 'src/assets/theme/images/logo/metamask.svg' },
    { id: 4, img: 'src/assets/theme/images/logo/bitgo.svg' },
    { id: 5, img: 'src/assets/theme/images/logo/coindcx.svg' },
];

export default function Partners() {

    const [partners, setPartners] = useState(listPartner);
    
    return (
        <div className="container pb-lg-5">
            <div className="row align-items-lg-center g-4 client-logos">
                {partners.map(partner => (
                    <div key={partner.id} className="text-center col-6 col-md-2 flex-fill"><img className="card-bg-dark px-4 w-100" src={partner.img} alt="Partner" height="100"/></div>
                ))}
            </div>
        </div>
    )
}