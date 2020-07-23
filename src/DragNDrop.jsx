import React from 'react';
import { useDND } from './useDND';

function DragNDrop({data}){
  
  const { list, dragging, handleDragEnter, handleDragStart, getStyles } = useDND(data);

  return (
    <div className="drag-n-drop">
      {list.map((grp, grpI)  => (
        <div 
          key={grp.title} 
          className="dnd-group"
          onDragEnter={dragging && !grp.items.length ? (e) => {handleDragEnter(e, {grpI, itemI: 0})} : null}
        >
          <div className="group-title">{grp.title}</div>
          {grp.items.map((item, itemI) => (
            <div 
              draggable 
              onDragStart={(e) => {handleDragStart(e, {grpI, itemI})}}
              onDragEnter={dragging ? (e) => { handleDragEnter(e, {grpI, itemI}) } : null}
              key={item} 
              className={dragging ? getStyles({grpI, itemI}) : "dnd-item" }
            >
              {item}              
            </div>
          ))}
        </div> 
      ))}
    </div>
  );
}

export default DragNDrop;