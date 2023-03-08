import React, { useRef, useState } from "react";
import NavBar from "./NavBar";
import { useDrag, useDrop } from "react-dnd";
import { Card } from "./Card";

interface CardProps {
   id: string;
   name: string;
   text: string;
   icon: string;
}

interface DragItem {
   type: string;
   id: string;
}

const cardList: CardProps[] = [
   {
      id: "2",
      name: "paragraph",
      text: "Paragraph Text",
      icon: "fas fa-paragraph",
   },
   {
      id: "1",
      name: "header",
      text: "Header Text",
      icon: "fas fa-heading",
   },
];

const FormBuilder = () => {
   const [cards] = useState<CardProps[]>(cardList);
   const dropRef = useRef<HTMLDivElement>(null);
   const [dropzone, setDropZone] = useState([]);
   const [draggingCard, setDraggingCard] = useState<string>("");

   const [{ isOver }, drop] = useDrop(() => ({
      accept: "card",
      drop: (item: DragItem) => addCard(item.id),
      collect: (monitor) => ({
         isOver: !!monitor.isOver(),
      }),
   }));

   const addCard = (id: string) => {
      console.log("Hit addcard");
      const list = cards.find((card) => id === card.id);
      console.log(list);
      setDropZone((dropzone) => [...dropzone, list]);
   };

   return (
      <>
         <NavBar />

         <div className="card-container">
            {cards.map((card: CardProps) => {
               return (
                  <Card
                     key={card.id}
                     id={card.id}
                     name={card.name}
                     icon={card.icon}
                     text={card.text}
                  />
               );
            })}
         </div>

         <div ref={dropRef} className="dropzone">
            {isOver ? "Release to drop" : "Drag a card here"}
         </div>
      </>
   );
};

export default FormBuilder;
