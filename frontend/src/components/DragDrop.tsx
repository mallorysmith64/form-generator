import React, { useContext, useState } from "react";
import { Card } from "./Card";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import Header from "./Header";
import Editor from "./Editor";
// import Paragraph from "./Paragraph";
import Email from "./Email";
import { FormContext } from "./FormContext";

interface CardProps {
   key: string;
   id: string;
   text: string;
   icon: string;
   index: number;
   placeholder:string;
   onDelete?: number;
   onEdit?: (id: string) => void;
}

const cardList = [
   {
      id: uuidv4(),
      text: "Header",
      icon: "fas fa-heading",
      placeholder:"Type Header",
   },
   {
      id: uuidv4(),
      text: "Paragraph",
      icon: "fas fa-paragraph",
      placeholder:"Type Paragraph",
   },
   {
      id: uuidv4(),
      text: "Email",
      icon: "fas fa-envelope",
      placeholder:"Type Email",
   },
];

function DragDrop() {
   const [dropZone, setDropZone] = useState<CardProps[]>([]);
   const [showEditor, setShowEditor] = useState(false);
   const [activeCard, setActiveCard] = useState("");
   const { headerText } = useContext(FormContext);
   const { emailText } = useContext(FormContext);
   const [activeEditCard, setActiveEditCard] = useState<string>(null);

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

   const handleEdit = (editCard: string, key: string) => {
      console.log("handleEdit called with:", editCard);
      let cardName = "";
      switch (editCard) {
         case "Header":
            setShowEditor(true);
            setActiveEditCard(key);
            cardName = "Header";

            break;
         case "Paragraph":
            setShowEditor(true);
            setActiveEditCard(key);
            cardName = "Paragraph";
            break;
         case "Email":
            setShowEditor(true);
            setActiveEditCard(key);
            cardName = "Email";
            break;
         default:
            setShowEditor(false);
            setActiveEditCard(null);
            cardName = "";
            break;
      }
      setActiveCard(cardName);
   };

   const addCard = (id: string, index: number, key: string) => {
      const droppedCards = cardList.filter((card) => id === card.id);
      setDropZone((dropZone) => [
         ...dropZone,
         {
            ...droppedCards[0],
            isToolbar: false,
            index: dropZone.length,
            key: uuidv4(),
         },
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
            icon={card.icon}
            isToolbar={false}
            onDelete={handleDeleteCard}
            onEdit={() => handleEdit(card.text, card.key)}
            // text={card.text}
            headerText={card.text == "Header" && card.key == activeEditCard ? headerText : card.placeholder}
            emailText={card.text == "Email" && card.key == activeEditCard ? emailText : null}
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
