import React, { useState } from "react";
import { Picture } from "./Picture";
import { useDrop } from "react-dnd";

interface CardProps {
   id: number;
   text: string;
   icon: string;
}

const dragList = [
   {
      id: 1,
      text: "Header",
      icon: "fas fa-heading",
   },
   {
      id: 2,
      text: "Paragraph",
      icon: "fas fa-paragraph",
   },
];

function DragDrop() {
   const [board, setBoard] = useState<CardProps[]>([]);
   const [{ isOver }, drop] = useDrop(() => ({
      accept: "image",
      drop: (item: { id: number }) => addImage(item.id),
      collect: (monitor) => {
         const isOver = !!monitor.isOver();
         console.log("isOver:", isOver);
         return { isOver };
      },
   }));

   const pictures = dragList.map((picture) => (
      <Picture key={picture.id} id={picture.id} text={picture.text} icon={picture.icon} />
   ));

   const addImage = (id: number) => {
      const droppedPictures = dragList.filter((picture) => id === picture.id);
      setBoard((board) => [...board, { ...droppedPictures[0] }]);
   };

   const boardImages = board.map((picture) => (
      <Picture key={picture.id} id={picture.id} text={picture.text} icon={picture.icon} />
   ));

   return (
      <>
         <section className="form-builder-page-container">
            <div className="card-container">{pictures}</div>

            <div className="form-builder" ref={drop}>
               <div className="dropzone-container">
                  <div className="dropzone-cards">{boardImages}</div>
               </div>
            </div>
         </section>
      </>
   );
}

export default DragDrop;
