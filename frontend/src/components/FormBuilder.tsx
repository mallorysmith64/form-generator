import React, { useState } from "react";
import NavBar from "./NavBar";

interface Card {
   id: number;
   type: string;
   text: string;
   icon: string;
}

const cardList: Card[] = [
   {
      id: 1,
      type: "header",
      text: "Header Text",
      icon: "fas fa-heading",
   },
   {
      id: 2,
      type: "paragraph",
      text: "Paragraph Text",
      icon: "fas fa-paragraph",
   },
];

const FormBuilder = () => {
   const [cards] = useState<Card[]>(cardList);

   return (
      <>
         <NavBar />

         <ul className="card-container">
            {cards.map((card: Card) => (
               <li key={card.id} className="is-4-mobile">
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
      </>
   );
};

export default FormBuilder
