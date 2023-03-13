import React, { useState } from 'react'
import { Picture } from './Picture'
import { useDrop } from 'react-dnd'

const dragList = [
    {
        id: "1",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYfkKJywC2TJjE8kuJpPJf9UW3ai6sA27R6g&usqp=CAU"
    },
    {
        id: "2",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkVmXr28usuQyn2VTvvA1pOopLkMWz_J-85g&usqp=CAU"
    },
    {
        id: "3",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwQl1K64iaP-Scgn56GGAWJcvHGTNwpC2HPQ&usqp=CAU"
    }
]

const pictures = dragList.map(picture => <Picture url={picture.url} id={picture.id} />)

function DropZone() {
    const [board, setBoard] = useState([])
    const [{isOver}, drop] = useDrop(() => ({
        accept: "image",
        drop: (item: {id:string}) => addImage(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }))

    const addImage = (id:string) => {
        const droppedPictures = dragList.filter(picture => id === picture.id.toString())
        setBoard(board => [...board, droppedPictures[0]])
    }

    const boardImages = board.map(picture => <Picture url={picture.url} id={picture.id} />)
    return (
        <div className='container'>
            <div className='drag-box'>
                {pictures}
            </div>
            <div className="drop-board" ref={drop} style={{border: isOver ? '3px solid red' : '1px solid black'}}>
                {boardImages}
            </div>
        </div>
    )
}

export default DropZone

   // return (
   //    <>
         {/* <div className="card-container">
            {cards.map((card: CardProps) => {
               return <Card key={card.id} {...card} />;
            })}
         </div> */}

         {/* <div ref={drop} className="dropzone">
            {isOver ? "Release to drop" : "Drag item here"}
         </div> */}

         {/* <div className="card-container">
            {cardList.map((card) => (
               <Card key={card.id} id={card.id} text={card.text} />
            ))}
         </div>

         <div className="dropzone" ref={dropRef}>
            {dropZone.map(card => <Card key={card.id} id={card.id} text={card.text} /> )}
            {isOver ? "Release!" : "Drop Here"}
         </div> */}
//       </>
//    );
// };

