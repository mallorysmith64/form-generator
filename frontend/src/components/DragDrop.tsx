import React, { useContext, useState } from "react";
import { Card } from "./Card";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import Header from "./Header";
import Email from "./Email";
import Name from "./Name";
import { FormContext } from "./FormContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

interface CardProps {
   key: string;
   id: string;
   text: string;
   icon: string;
   index: number;
   placeholder: string;
   onDelete?: number;
   onEdit?: (id: string) => void;
}

const cardList = [
   {
      id: uuidv4(),
      text: "Header",
      icon: "fas fa-heading",
      placeholder: "Type Header",
   },
   {
      id: uuidv4(),
      text: "Email",
      icon: "fas fa-envelope",
      placeholder: "Type Email",
   },
   {
      id: uuidv4(),
      text: "Name",
      icon: "fas fa-user",
      placeholder: "First Name",
      placeholder_two: "Last Name",
   },
];

function DragDrop() {
   const [dropZone, setDropZone] = useState<CardProps[]>([]);
   const [showEditor, setShowEditor] = useState(false);
   const [activeCard, setActiveCard] = useState("");

   const { headerText } = useContext(FormContext);
   const { emailText } = useContext(FormContext);
   const { firstNameText, lastNameText } = useContext(FormContext);
   const [activeEditCard, setActiveEditCard] = useState<string>(null);
   const navigate = useNavigate();
   const { formId } = useParams();
   console.log(formId);

   const [{ isOver }, drop] = useDrop(() => ({
      accept: "card",
      drop: (item: { id: string; index: number; key: string }) =>
         addCard(item.id, item.index, item.key),
      collect: (monitor) => {
         const isOver = !!monitor.isOver();
         return { isOver };
      },
   }));

   const formValues = {
      header: headerText,
      email: emailText,
      firstName: firstNameText,
      lastName: lastNameText,
   };

   const baseUrl = "http://localhost:5000/Publish";

   const handleSubmit = async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      try {
         const resp = await axios.post(`${baseUrl}`, formValues);
         const formId = resp.data.form_id;
         navigate(`/Publish/${formId}`);
      } catch (error) {
         console.error("Unsuccessful form submission", error);
      }
   };

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
         case "Name":
            setShowEditor(true);
            setActiveEditCard(key);
            cardName = "Name";
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
            text={card.placeholder}
            headerText={card.text == "Header" && card.key == activeEditCard ? headerText : null}
            emailText={card.text == "Email" && card.key == activeEditCard ? emailText : null}
            firstNameText={card.text == "Name" && card.key == activeEditCard ? firstNameText : null}
            lastNameText={card.text == "Name" && card.key == activeEditCard ? lastNameText : null}
         />
      </div>
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

            {showEditor && (
               <div id="side-panel-container">
                  {activeCard === "Header" ? <Header /> : null}
                  {activeCard === "Email" ? <Email /> : null}
                  {activeCard === "Name" ? <Name /> : null}

                  <button
                     className="editor-close-btn button is-info"
                     onClick={() => setShowEditor(false)}
                  >
                     Save & Close
                  </button>
               </div>
            )}

            <form
               action="/Publish"
               method="post"
               onSubmit={handleSubmit}
               className="submit-btn-container"
            >
               <button type="submit" className="submit-btn button is-success">
                  Publish
               </button>
            </form>
         </section>
      </>
   );
}

export default DragDrop;
