import React, { useContext, useRef } from "react";
import { useDrag } from "react-dnd";
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
   firstNameText?: any;
   lastNameText?: any;
   alignHeader?: any;
   alignEmail?: any;
   alignName?: any;
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
   firstNameText,
   lastNameText,
}: CardProps) {
   const { headerSize } = useContext(FormContext);
   const { nameSize } = useContext(FormContext);
   const { alignHeader, alignEmail, alignName } = useContext(FormContext);

   const cardRef = useRef<HTMLDivElement>(null);

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

   drag(cardRef);

   const handleDelete = (index: number) => {
      onDelete?.(index);
   };

   const handleEdit = () => {
      onEdit?.();
   };

   const resizeHeaderText = {
      fontSize: headerSize,
   };

   const realignHeaderText = {
      textAlign: alignHeader,
   };

   const realignEmailText = {
      textAlign: alignEmail,
   };

   const realignNameText = {
      textAlign: alignName,
   };

   const resizeNameText = {
      fontSize: nameSize,
   };

   return (
      <>
         <div className="cards">
            <div className="card is-size-4" ref={cardRef}>
               {/* <div className="card-content"> */}
               {isToolbar && (
                  <div className="media-left">
                     <span className="icon">
                        <i className={icon} aria-hidden="true"></i>
                     </span>
                  </div>
               )}

               {!isToolbar && (
                  <div className="toolbar-header-btns">
                     <button className="btn" onClick={handleEdit}>
                        <i className="fas fa-edit"></i>
                     </button>

                     <button className="btn" onClick={() => handleDelete(index)}>
                        <i className="fas fa-trash"></i>
                     </button>
                  </div>
               )}

               <div style={{ ...realignHeaderText }}>
                  {headerText && (
                     <h3
                        style={{
                           ...resizeHeaderText,
                        }}
                     >
                        {headerText}
                     </h3>
                  )}
               </div>

               <div style={{ ...realignEmailText }}>
                  {emailText && (
                     <div>
                        <h5>{emailText}</h5>
                        <input type="email" className="input is-small" readOnly />
                     </div>
                  )}
               </div>

               <div>
                  {firstNameText && lastNameText && (
                     <>
                        <div className="name-container" style={{ ...realignNameText }}>
                           <div className="first-name-label-container">
                              <h2 className="name-label">{firstNameText}</h2>
                              <input type="text" className="input is-small" readOnly />
                           </div>
                           <div className="last-name-label-container">
                              <h5 className="name-label">{lastNameText} </h5>
                              <input type="text" className="input is-small" readOnly />
                           </div>
                        </div>
                     </>
                  )}
               </div>

               {text && !headerText && !emailText && !firstNameText && !lastNameText && (
                  <p>{text}</p>
               )}
            </div>
         </div>
      </>
   );
}