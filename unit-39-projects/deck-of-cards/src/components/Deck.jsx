import React, {useState, useEffect} from 'react';
import axios from "axios";
import Card from "./Card";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

// /new/draw/?count=1

// const res = axios.get("https://deckofcardsapi.com/api/deck/new/draw/?count=1")



const Deck = () => {
    const [deck, setDeck] = useState(null);
    const [drawn, setDrawn] = useState([]);

    // load API into deck state
    useEffect(() => {
        async function getData() {
            let res = await axios.get(`${API_BASE_URL}/new/shuffle/`);
            setDeck(res.data);
        }
        getData();
    }, [setDeck])

    useEffect(() => {
        async function drawCard() {
            let { deck_id } = deck;

            try {
                let drawRes = await axios.get(`${API_BASE_URL}/${deck_id}/draw/`);

                if (drawRes.data.remaining === 0) {
                    throw new Error("no cards remaining.");
                }

                const card = drawRes.data.cards[0];

                setDrawn(res => [
                    ...res,
                    {
                        id: card.code,
                        name: card.value + " of " + card.suit,
                        image: card.images.png
                    }
                ]);
            } catch (error) {
                alert(error);
            }
        }

        drawCard();
        // return () => {
        //     cleanup
        // }

    }, [deck])
    
    const cards = drawn.map(card => (
        <Card key={card.id} name={card.name} image={card.image} />
    ))

    return (
        <div className="deck">
            Ima Deck
            {deck && (
                <button className="get-card">Draw More Card</button>
            )}
            
            <div className="deck-cardarea">{cards}</div>
        </div>
    )
}

export default Deck;