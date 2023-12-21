
import { Card } from './model/Card';
import CardDisplay from './CardDisplay';
import { get } from 'http';

interface CardListProps {
    cards: Card[];
    onDeal: (param: any) => void;

}

function CardsList({ onDeal, cards }: CardListProps) {


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
                    onClick={onDeal}
                >
                    <span className="icon-edit "></span>
                    Deal
                </button>
            </div>
        </>
    )
}


export default CardsList;

