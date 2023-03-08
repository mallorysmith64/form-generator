import React, { useState } from "react";
import { useDrag } from "react-dnd";

interface CardProps {
   id: string;
   name: string;
   text: string;
   icon: string;
}

const Card = ({ id, name, text, icon }: CardProps) => {
   const [{ isDragging }, drag] = useDrag(() => ({
      type: "card",
      item: { id: id },
      collect: (monitor) => ({
         isDragging: !!monitor.isDragging(),
      }),
   }));

   return (
      <>
         <ul className="cards">
            <li className="is-4-mobile">
               <div className="card is-size-4" ref={drag}>
                  <div className="card-content">
                     <div className="media">
                        <div className="media-left">
                           <span className="icon">
                              <i className={icon} aria-hidden="true"></i>
                           </span>
                        </div>
                        <div className="media-content">{text}</div>
                     </div>
                  </div>
               </div>
            </li>
         </ul>
      </>
   );
};

export { Card };
