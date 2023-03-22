import React, { useCallback, useState } from "react";
import { Card } from "./Card";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";

interface CardProps {
   id: string;
   text: string;
   icon: string;
   index: number;
   // moveCard?: (dragIndex: number, hoverIndex: number) => void;
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
];

function DragDrop() {
   const [dropZone, setDropZone] = useState<CardProps[]>([]);
   const [{ isOver }, drop] = useDrop(() => ({
      accept: "card",
      drop: (item: { id: string; index: number }) => addCard(item.id, item.index),
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

   const addCard = (id: string, index: number) => {
      const droppedCards = cardList.filter((card) => id === card.id);
      setDropZone((dropZone) => [
         ...dropZone,
         { ...droppedCards[0], isToolbar: false, index: dropZone.length },
      ]);
   };

   const dropZoneCards = dropZone.map((card, index) => (
      <Card
         key={uuidv4()}
         id={card.id}
         index={index}
         text={card.text}
         icon={card.icon}
         isToolbar={false}
      />
   ));

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
