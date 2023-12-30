import React, { useState } from 'react';
import { Player } from './model/Player';
import CardsList from './CardsList';
import { cardAPI } from './api/cardAPI';
import { Card } from './model/Card';

interface PlayerDisplayProps {
    player: Player;
    initialCards: Card[];
    loadCard: (playerId: number) => Promise<Card>;

}

function PlayerDisplay({ player, initialCards, loadCard }: PlayerDisplayProps) {
    const [cards, setCards] = useState<Card[]>([]);
 
    const handleClick = () => {
        console.log({ player });
    };

    console.log('size ', cards.length);
    if(cards.length == 0){
        setCards(prevCards => [...prevCards, ...initialCards]);
    }
    
    console.log("player display " + player.id + ' ' + player.name);
    return (
        <>
            <div className='row'>
                <h2>{player.name}</h2>

            </div>
            <div className='hidden'>
                <button
                    className=" bordered"
                    onClick={handleClick}
                >
                    <span className="icon-alert "></span>
                    player
                </button>
            </div>
            <div>
                <CardsList player={player} loadCard={loadCard} setCards={setCards} cards={cards} />
            </div>
        </>
    );
}

export default PlayerDisplay;