import React, { MouseEventHandler, useContext, useState } from "react";
import { useDrag } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import { FormContext } from "./FormContext";

interface CardProps {
   id: string;
   text?: string;
   icon: string;
   index: number;
   isToolbar: boolean;
   onDelete?: (index: number) => void;
   onEdit?: () => void;
   value?: string;
   setValue?: (value: string) => void;
   activeCard?: (id: string) => void;
   headerText?: any;
   emailText?: any;
}

export function Card({
   id,
   index,
   text,
   icon,
   isToolbar,
   onDelete,
   onEdit,
   headerText,
   emailText,
}: CardProps) {
   const { defaultHeaderSize } = useContext(FormContext);
   const { defaultFontSize } = useContext(FormContext);

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

   const handleDelete = (index: number) => {
      onDelete(index);
   };

   const handleEdit = () => {
      onEdit && onEdit();
   };

   return (
      <>
         <ul className="cards">
            <li className="is-4-mobile" key={uuidv4()}>
               <div className="card is-size-4" ref={drag}>
                  <div className="card-content">
                     <div className="media">
                        {isToolbar && (
                           <div className="media-left">
                              <span className="icon">
                                 <i className={icon} aria-hidden="true"></i>
                              </span>
                           </div>
                        )}

                        <div className="media-content">
                           {headerText && (
                              <h3 style={{ fontSize: defaultHeaderSize }}>{headerText}</h3>
                           )}
                           {emailText && <p style={{ fontSize: defaultFontSize }}>{emailText}</p>}
                           {text && !headerText && !emailText && <p>{text}</p>}
                        </div>

                        {!isToolbar && (
                           <div className="toolbar-header-btns">
                              <button className="btn" onClick={onEdit}>
                                 <i className="fas fa-edit"></i>
                              </button>

                              <button className="btn" onClick={() => onDelete(index)}>
                                 <i className="fas fa-trash"></i>
                              </button>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </li>
         </ul>
      </>
   );
}
