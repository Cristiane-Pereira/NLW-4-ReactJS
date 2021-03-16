import { useState } from 'react';

// exemplos de componentes,estados e propriedade no React

interface ButtonProps {
    color: string;
    children: string;
}

export function Button(props: ButtonProps){
    const [counter, setCounter] = useState(1)


    function increment() {
        setCounter(counter +1);
    }
    return (
        <button type="button" 
        style= {{ backgroundColor: props.color }}
        onClick={increment}
        >
           { props.children } <strong>{counter}</strong>
        </button>
    );
}