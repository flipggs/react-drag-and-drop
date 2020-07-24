import React, { useState } from 'react';
import { useDND } from './useDND';

function DragNDrop({data}){
  
  const { list, dragging, handleDragEnter, handleDragStart, getStyles, addItem } = useDND(data);

  return (
    <>
    <button onClick={() => addItem()}>Add item</button>
    <div className="drag-n-drop">
      {list.map((grp, grpI)  => {
        return (
          <div 
            key={grp.title} 
            className="dnd-group"
            onDragEnter={dragging && !grp.items.length ? (e) => {handleDragEnter(e, {grpI, itemI: 0})} : null}
          >
            <div className="group-title">{grp.title}</div>
            {grp.items.map((item, itemI) => (
              <div 
                key={item} 
                draggable 
                onDragStart={(e) => {handleDragStart(e, {grpI, itemI})}}
                onDragEnter={dragging ? (e) => { handleDragEnter(e, {grpI, itemI}) } : null}
                className={dragging ? getStyles({grpI, itemI}) : "dnd-item" }
              >
                {item}
              </div>
            ))}
          </div> 
        )
      })}
    </div>
    </>
  );
}

export default DragNDrop;