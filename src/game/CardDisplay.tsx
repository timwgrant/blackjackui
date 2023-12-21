import React from 'react';
import { Card } from './model/Card';

interface CardDisplayProps {
    card: Card;
}

function CardDisplay(props: CardDisplayProps) {
    const { card} = props;



    return (
        <div className="card">
            {<img src={card.imageUrl} alt={card.imageUrl} />}
        </div>
    );
}

export default CardDisplay;