import React from "react";
import { useDrag } from "react-dnd";
import { v4 as uuidv4 } from "uuid";

interface CardProps {
   id: string;
   text: string;
   icon: string;
   index: number;
   isToolbar: boolean;
}

export function Card({ id, text, icon, isToolbar }: CardProps) {
   const [{ isDragging }, drag] = useDrag(() => ({
      type: "card",
      item: () => {
         return { id, isToolbar };
      },
      collect: (monitor) => {
         const isDragging = !!monitor.isDragging();
         return { isDragging };
      },
   }));

   return (
      <>
         <ul className="cards">
            <li className="is-4-mobile" key={uuidv4()}>
               <div
                  className="card is-size-4"
                  ref={drag}
                  // style={{ opacity: isDragging ? "0%" : "100%" }}
               >
                  <div className="card-content">
                     <div className="media">
                        {isToolbar && (
                           <div className="media-left">
                              <span className="icon">
                                 <i className={icon} aria-hidden="true"></i>
                              </span>
                           </div>
                        )}
                        <div className="media-content">{text}</div>
                        {/* {!isToolbar && (
                           <div className="media-right">
                              <button className="delete"></button>
                           </div>
                        )} */}
                     </div>
                  </div>
               </div>
            </li>
         </ul>
      </>
   );
}
