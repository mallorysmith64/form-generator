import React from 'react';
import { useDrag } from 'react-dnd';

interface CardProps {
   url:string;
   id:string;
}

export function Picture({url, id}:CardProps) {
    const [{isDragging}, drag] = useDrag(() => ({
        type: "image",
        item: {id: id},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))
    return (
        <>
            <img ref={drag} src={url} alt='' width={"150px"} style={{opacity: isDragging ? "0%" : "100%"}}/>
        </>
    )
}

