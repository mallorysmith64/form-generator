import React, { useCallback, useState } from "react";
import { Card } from "./Card";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";

interface CardProps {
   key: string;
   id: string;
   text: string;
   icon: string;
   index: number;
   // deleteByIndex?:any;
   onDelete?:number;
}

const cardList = [
   {
      id: uuidv4(),
      text: "Header",
      icon: "fas fa-heading",
   },
   {
      id: uuidv4(),
      text: "Paragraph",
      icon: "fas fa-paragraph",
   },
   {
      id: uuidv4(),
      text: "Email",
      icon: "fas fa-envelope",
   },
];

function DragDrop() {
   const [dropZone, setDropZone] = useState<CardProps[]>([]);
   const [{ isOver }, drop] = useDrop(() => ({
      accept: "card",
      drop: (item: { id: string; index: number; key: string }) =>
         addCard(item.id, item.index, item.key),
      collect: (monitor) => {
         const isOver = !!monitor.isOver();
         return { isOver };
      },
   }));

   const cards = cardList.map((card, index) => (
      <Card
         key={card.id}
         id={card.id}
         index={index}
         text={card.text}
         icon={card.icon}
         isToolbar={true}
      />
   ));

   console.log("Card key in toolbar: ", cards[0].key);
   console.log("Card id in toolbar: ", cards[0].props.id);

   console.log("Card key in toolbar: ", cards[1].key);
   console.log("Card id in toolbar: ", cards[1].props.id);

   const addCard = (id: string, index: number, key: string) => {
      const droppedCards = cardList.filter((card) => id === card.id);
      setDropZone((dropZone) => [
         ...dropZone,
         { ...droppedCards[0], isToolbar: false, index: dropZone.length, key: uuidv4() },
      ]);
   };

   // const handleDeleteCard = (key: any) => {
   //    setDropZone((prevCards) => prevCards.filter((card) => card.key !== key));
   //  };
    
   const handleDeleteCard = (index: number) => {
      setDropZone((prevCards) => {
        const newCards = [...prevCards];
        console.log(newCards)
        newCards.splice(index, 1);
        console.log(newCards)
        return newCards;
      });
    };
    

   const dropZoneCards = dropZone.map((card, index) => (
      <div className="dropZoneCards">
         <Card
            key={uuidv4()}
            id={card.id}
            index={index}
            text={card.text}
            icon={card.icon}
            isToolbar={false}
            onDelete={handleDeleteCard}
         />
      </div>
   ));

   console.log(dropZone)
   console.log("dropZoneCards: ", dropZoneCards);

   return (
      <>
         <section className="form-builder-page-container">
            <div className="card-container">{cards}</div>

            <div className="form-builder" ref={drop}>
               <div className="dropzone-container">
                  <div className="dropzone-cards">{dropZoneCards}</div>
               </div>
            </div>
         </section>
      </>
   );
}

export default DragDrop;

