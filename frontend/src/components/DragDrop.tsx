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

const pictures = dragList.map((picture) => (
   <Picture
      key={picture.id}
      id={picture.id}
      text={picture.text}
      icon={picture.icon}
   />
));

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

   const addImage = (id: number) => {
      const droppedPictures = dragList.filter((picture) => id === picture.id);
      setBoard((board) => [...board, { ...droppedPictures[0], id: board.length + 1 }]);
      console.log(droppedPictures);
   };

   const boardImages = board.map((picture) => (
      <Picture
         key={picture.id}
         id={picture.id}
         text={picture.text}
         icon={picture.icon}
      />
   ));

   return (
      <>
         <section className="form-builder-page-container">
            <div className="card-container">{pictures}</div>

            <div
               className="form-builder"
               ref={drop}
               style={{ border: isOver ? "1px solid red" : "1px solid black" }}
            >
               {boardImages}
            </div>
         </section>
      </>
   );
}

export default DragDrop;

// return (
//    <>
{
   /* <div className="card-container">
            {cards.map((card: CardProps) => {
               return <Card key={card.id} {...card} />;
            })}
         </div> */
}

{
   /* <div ref={drop} className="dropzone">
            {isOver ? "Release to drop" : "Drag item here"}
         </div> */
}

{
   /* <div className="card-container">
            {cardList.map((card) => (
               <Card key={card.id} id={card.id} text={card.text} />
            ))}
         </div>

         <div className="dropzone" ref={dropRef}>
            {dropZone.map(card => <Card key={card.id} id={card.id} text={card.text} /> )}
            {isOver ? "Release!" : "Drop Here"}
         </div> */
}
//       </>
//    );
// };
