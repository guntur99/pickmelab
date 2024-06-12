import { useState } from 'react';
import { pickme_backend } from 'declarations/pickme_backend';

export default function Greeting () {

    const [greeting, setGreeting] = useState('');
    
    function handleSubmit(event) {
        event.preventDefault();
        const name = event.target.elements.name.value;
        pickme_backend.greet(name).then((greeting) => {
        setGreeting(greeting);
        });
        return false;
    }
    
    return (

        <div>
            <form action="#" onSubmit={handleSubmit}>
                <label htmlFor="name">Enter your name: &nbsp;</label>
                <input id="name" alt="Name" type="text" />
                <button type="submit">Click Me!</button>
            </form>
            <section id="greeting">{greeting}</section>
        </div>
    )
}