import React from 'react';

const fetchCats = async (input: string): Promise<any[]> => {
    const apiKey = process.env.CAT_API_KEY as string;
    
    const response = await fetch(
        `https://api.thecatapi.com/v1/images/search?breed_ids=${input}&api_key=${apiKey}`
    );

    return response.json();
};

export const Form: React.FC = () => {
    const inputValue = React.useRef<HTMLInputElement>(null);
    const [cats, setCats] = React.useState<any[]>([]);

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (inputValue.current) {
            const result = await fetchCats(inputValue.current.value);
            setCats(result);
            console.log(result);
        }
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <input ref={inputValue} type='text'/>
                <button>Submit</button>
            </form>

            <div>
                {cats.map((cat) => (
                    <div key={cat.id}>
                        <img src={cat.url}/>
                    </div>
                ))}
            </div>
        </>
        
    );
};