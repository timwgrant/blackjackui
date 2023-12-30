import React from 'react';
import { Card } from './model/Card';

interface CardDisplayProps {
    card: Card;
    hideCard: boolean;

}

function CardDisplay(props: CardDisplayProps) {
    const { card, hideCard} = props;
    const hiddenCard = '/assets/smallcards/back.png';



  return (
    <div className='card'>
      {hideCard ? (
        <img width="50%" height="50%" src={hiddenCard} alt="Hidden Card" />
      ) : (
        <img width="50%" height="50%" src={card.imageUrl} alt={card.imageUrl} />
      )}
    </div>
  );
}

export default CardDisplay;