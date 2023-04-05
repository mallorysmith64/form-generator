import React, { useState } from "react";
import { Card } from "./Card";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import Header from "./Header";
import Editor from "./Editor";
import Paragraph from "./Paragraph";
import Email from "./Email";

interface CardProps {
   key: string;
   id: string;
   text: string;
   icon: string;
   index: number;
   onDelete?: number;
   activeCard?: any;
   showEditor?: boolean;
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
   const [showEditor, setShowEditor] = useState(false);
   const [activeCard, setActiveCard] = useState("");

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
         // onEdit={() => handleEdit(card.id)}
      />
   ));

   const handleEdit = (editCard: string) => {
      console.log("handleEdit called with:", editCard);
      let cardName = "";
      switch (editCard) {
         case "Header":
            setShowEditor(true);
            cardName = "Header";
            break;
         case "Paragraph":
            setShowEditor(true);
            cardName = "Paragraph";
            break;
         case "Email":
            setShowEditor(true);
            cardName = "Email";
            break;
         default:
            setShowEditor(false);
            cardName = "";
            break;
      }
      setActiveCard(cardName);
   };

   const addCard = (id: string, index: number, key: string) => {
      const droppedCards = cardList.filter((card) => id === card.id);
      setDropZone((dropZone) => [
         ...dropZone,
         { ...droppedCards[0], isToolbar: false, index: dropZone.length, key: uuidv4() },
      ]);
   };

   const handleDeleteCard = (index: number) => {
      setDropZone((prevCards) => {
         const newCards = [...prevCards];
         console.log(newCards);
         newCards.splice(index, 1);
         console.log(newCards);
         return newCards;
      });
   };

   const dropZoneCards = dropZone.map((card, index) => (
      <div className="dropZoneCards" key={card.key}>
         <Card
            key={uuidv4()}
            id={card.id}
            index={index}
            text={card.text}
            icon={card.icon}
            isToolbar={false}
            onDelete={handleDeleteCard}
            onEdit={() => handleEdit(card.text)}
         />
      </div>
   ));

   return (
      <>
         <section className="form-builder-page-container">
            <button className="submit-btn button is-success">Publish</button>
            <div className="card-container">{cards}</div>

            <div className="form-builder" ref={drop}>
               <div className="dropzone-container">
                  <div className="dropzone-cards">{dropZoneCards}</div>
               </div>
            </div>

            {showEditor && (
               <div id="side-panel-container">
                  {" "}
                  {activeCard === "Header" ? <Header /> : null}
                  {activeCard === "Paragraph" ? <Editor /> : null}
                  {activeCard === "Email" ? <Email /> : null}
               </div>
            )}
         </section>
      </>
   );
}

export default DragDrop;
