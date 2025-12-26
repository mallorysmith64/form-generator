import React, { useContext, useState } from "react";
import { Card } from "./Card";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import Header from "./Header";
// import Editor from "./Editor";
import Email from "./Email";
import Name from "./Name";
import { AlignType, FormContext } from "./FormContext";
import axios from "axios"; // <--- IMPORT AXIOS
import { useNavigate } from "react-router-dom"; // <--- IMPORT NAVIGATE
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
   // {
   //    id: uuidv4(),
   //    text: "Paragraph",
   //    icon: "fas fa-paragraph",
   //    placeholder: "Type Paragraph",
   // },
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
   // const [dropZone, setDropZone] = useState<CardProps[]>([]);
   const { formElements, setFormElements } = useContext(FormContext);
   // ADD THIS LINE:
   const navigate = useNavigate();
   const [showEditor, setShowEditor] = useState(false);
   const [activeCard, setActiveCard] = useState("");

   // const { headerText } = useContext(FormContext);
   // const { emailText } = useContext(FormContext);
   // const { firstNameText, lastNameText } = useContext(FormContext);

   const {
      headerText,
      emailText,
      firstNameText,
      lastNameText
   } = useContext(FormContext);


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
      // setShowEditor(true);
   };

   const addCard = (id: string, index: number, key: string) => {
      const droppedCards = cardList.filter((card) => id === card.id);

      // The error happens here. Saving FormContext.tsx fixes it.
      setFormElements((prev) => {
         const newItem = {
            ...droppedCards[0],
            isToolbar: false,
            index: prev.length,
            key: uuidv4(),
         };
         return [...prev, newItem];
      });
   };
   //    setDropZone((dropZone) => [
   //       ...dropZone,
   //       {
   //          ...droppedCards[0],
   //          isToolbar: false,
   //          index: dropZone.length,
   //          key: uuidv4(),
   //       },
   //    ]);
   // };

   // const handleDeleteCard = (index: number) => {
   //    setDropZone((prevCards) => {
   //       const newCards = [...prevCards];
   //       console.log(newCards);
   //       newCards.splice(index, 1);
   //       console.log(newCards);
   //       return newCards;
   //    });
   // };

   // --- 3. DELETE CARD (Fixed to use Context) ---
   const handleDeleteCard = (index: number) => {
      setFormElements((prev) => {
         const newCards = [...prev];
         newCards.splice(index, 1);
         return newCards;
      });
   };

   const dropZoneCards = formElements.map((card, index) => (
      <div className="dropZoneCards" key={card.key}>
         <Card
            key={uuidv4()}
            id={String(card.id)}
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

   // --- 4. PUBLISH FUNCTION (New) ---
   const handlePublish = async () => {
      const payload = {
         title: headerText || "Untitled Form",
         schema: formElements,
         ui_settings: { emailText, firstNameText, lastNameText }
      };

      try {
         // Make sure your Python server is running on port 5000
         const response = await axios.post("http://localhost:5000/Publish/", payload);

         // Redirect to the publish page using the ID from backend
         if (response.data.form_id) {
            navigate(`/Publish/${response.data.form_id}`);
         }
      } catch (error) {
         console.error("Error publishing:", error);
         alert("Failed to publish form. Is the backend running?");
      }
   };

   return (
      <>
         <section className="form-builder-page-container">
            <button className="submit-btn button is-success"
               style={{ zIndex: 9999, cursor: 'pointer' }}
               onClick={() => {
                  handlePublish();
               }}
            >Publish</button>
            <div className="card-container">{cards}</div>

            <div className="form-builder" ref={drop as any}>
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
         </section>
      </>
   );
}

export default DragDrop;
