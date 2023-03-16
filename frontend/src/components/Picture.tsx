import React from "react";
import { useDrag } from "react-dnd";
interface CardProps {
   id: number;
   text: string;
   icon: string;
}

export function Picture({ id, text, icon }: CardProps) {
   const [{ isDragging }, drag] = useDrag(() => ({
      type: "image",
      item: () => {
         return { id };
      },
      collect: (monitor) => {
         const isDragging = !!monitor.isDragging();
         return { isDragging };
      },
   }));

   return (
      <>
         <ul className="cards">
            <li className="is-4-mobile">
               <div
                  className="card is-size-4"
                  ref={drag}
                  style={{ opacity: isDragging ? "0%" : "100%" }}
               >
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
}
