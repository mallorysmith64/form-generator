import React, { useContext } from "react";
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
   firstNameText?: any;
   lastNameText?: any;
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

   const headerTextStyle = {
      fontSize: `${headerSize}px`,
   };

   const nameTextStyle = {
      fontSize: `${nameSize}px`,
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

                        {headerText && <h3 style={headerTextStyle}>{headerText}</h3>}
                        {emailText && (
                           <div>
                              <h3 className="email-text">{emailText} </h3>
                              <input type="email" className="input is-small" readOnly />
                           </div>
                        )}

                        {firstNameText && lastNameText && (
                           <>
                              <div className="name-container" style={nameTextStyle}>
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

                        {text && !headerText && !emailText && !firstNameText && !lastNameText && (
                           <p>{text}</p>
                        )}

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
