import React, { useRef, useState } from "react";
import NavBar from "./NavBar";
import { useDrag, useDrop } from "react-dnd";

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
      id: "1",
      name: "header",
      text: "Header Text",
      icon: "fas fa-heading",
   },
   {
      id: "2",
      name: "paragraph",
      text: "Paragraph Text",
      icon: "fas fa-paragraph",
   },
];

const FormBuilder = () => {
   const dropRef = useRef<HTMLDivElement>(null);
   const [dropzone, setDropZone] = useState([]);

   const [cards] = useState<CardProps[]>(cardList);
   const [{ isDragging }, drag] = useDrag(() => ({
      type: "card",
      item: { id: "id" },
      collect: (monitor) => ({
         isDragging: !!monitor.isDragging(),
      }),
   }));

   const [{isOver}, drop] = useDrop(() => ({
      accept: "card",
      drop: (item: DragItem) => addCard(item.id),
      collect: (monitor) => ({
         isOver: !!monitor.isOver(),
      }),
   }));

   const addCard = (id: string) => {
      const list = cards.filter((card) => id === card.id);
      setDropZone((dropzone) => [...dropzone, list[0]]);
   };

   return (
      <>
         <NavBar />

         <ul className="card-container">
            {cards.map((card: CardProps) => (
               <li
                  key={card.id}
                  ref={drag}
                  className="is-4-mobile"
                  style={{ border: isDragging ? "5px solid pink" : "0px" }}
               >
                  <div className="card is-size-4">
                     <div className="card-content">
                        <div className="media">
                           <div className="media-left">
                              <span className="icon">
                                 <i className={card.icon} aria-hidden="true"></i>
                              </span>
                           </div>
                           <div className="media-content">{card.text}</div>
                        </div>
                     </div>
                  </div>
               </li>
            ))}
         </ul>

         <div ref={dropRef} className="dropzone">
            {isOver ? "Release to drop" : "Drag a card here"}
         </div>
      </>
   )
}

export default FormBuilder;
