import React, { useState } from "react";
import { Card } from "./Card";
import { useDrop } from "react-dnd";

interface CardProps {
   id: number;
   text: string;
   icon: string;
   isToolbar:boolean;
}

const cardList = [
   {
      id: 1,
      text: "Header",
      icon: "fas fa-heading",
   },
   {
      id: 2,
      text: "Paragraph",
      icon: "fas fa-paragraph",
   },
];

function DragDrop() {
   const [dropZone, setDropZone] = useState<CardProps[]>([]);
   const [{ isOver }, drop] = useDrop(() => ({
      accept: "card",
      drop: (item: { id: number, isToolbar:boolean }) => addCard(item.id, item.isToolbar),
      collect: (monitor) => {
         const isOver = !!monitor.isOver();
         return { isOver };
      },
   }));

   const cards = cardList.map((card) => (
      <Card key={card.id} id={card.id} text={card.text} icon={card.icon} isToolbar={true}/>
   ));

   const addCard = (id: number, isToolbar:boolean) => {
      const droppedCards = cardList.filter((card) => id === card.id);
      setDropZone((dropZone) => [...dropZone, { ...droppedCards[0], isToolbar:false }]);
   };

   const dropZoneCards = dropZone.map((card) => (
      <Card key={card.id} id={card.id} text={card.text} icon={card.icon} isToolbar={false}/>
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
