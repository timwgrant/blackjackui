
import React, { useState, useEffect, } from 'react';
import { Card } from './model/Card';
import CardDisplay from './CardDisplay';
import { get } from 'http';
import { cardAPI } from './api/cardAPI';
import { Player } from './model/Player';

interface CardListProps {
    player: Player;
    loadCard: (playerId: number) => Promise<Card>;
    cards: Card[];
    setCards: React.Dispatch<React.SetStateAction<Card[]>>;

  }

  function CardsList({ player, loadCard, cards, setCards  }: CardListProps) {

  
    const handleClick = async () => {
      try {
        const aCard = await loadCard(player.id);
        console.log('My card: ', aCard);
  
        const newArray: Card[] = [...cards, aCard];
        setCards(newArray);
      } catch (error) {
        console.error('Error loading card:', error);
      }
    };

    return (
        <>
            <div className="row">
                {cards.map((card) => (
                    <div key={card.id} className="cols-sm">
                        <CardDisplay card={card} />
                    </div>
                ))}
            </div>

            <div className="row">
                <button
                    className=" bordered"
                    onClick={handleClick}
                >
                    <span className="icon-alert "></span>
                    Hit
                </button>
            </div>
        </>
    )
}


export default CardsList;

