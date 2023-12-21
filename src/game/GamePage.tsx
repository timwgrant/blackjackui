import React, { useState, useEffect, } from 'react';
import CardsList from './CardsList';
import { cardAPI } from './api/cardAPI';
import { Card } from './model/Card';

function GamePage(props: any) {

    const [cards, setCards] = useState<Card[]>([]);
    const [dealtcard, setCard] = useState<Card>(new Card());;

    const onDeal = async (param: any) => {
        async function loadCard() {
            const aCard = await cardAPI
                .get();
            return aCard;
        }
        let aCard = await loadCard();
        setCard(aCard as Card)
        console.log('my card ' + aCard);
        const newArray: Card[] = cards.map((item) => item);
        newArray.push(aCard);
        setCards(newArray);
    }

    return (
        <>
            <div className="row">
                <button
                    className=" bordered"
                    onClick={onDeal}
                >
                    <span className="icon-edit "></span>
                    Init Game
                </button>
            </div>
            <div>
                <>
                    <h1>Project Detail</h1>
                    <CardsList onDeal={onDeal} cards={cards} />
                </>
            </div>
        </>
    );
}

export default GamePage;