import { useState, useRef } from 'react';

export const useDND = (data) => {
  const [list, setList] = useState(data);
  const [dragging, setDragging] = useState(false);
  const [countItems, setCountItems] = useState(1);

  const dragItem = useRef();
  const dragNode = useRef();

  const handleDragStart = (e, params) => {
    //console.log('drag starting', params);
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener('dragend', handleDragEnd);

    setTimeout(() => {
      setDragging(true);      
    }, 0);
  }

  const handleDragEnter = (e, params) => {
    //console.log('handleDragEnter', params);
    const currentItem = dragItem.current;
    
    if (e.target !== dragNode.current) {
      //console.log('TARGET IS NOT THE SAME');
      setList(oldList => {
        let newList = JSON.parse(JSON.stringify(oldList));

        const indexCurrentItem = currentItem.grpI;
        const currentItemSelected = newList[indexCurrentItem];

        const currentItemIndex = currentItem.itemI;
        
        const newListSplice = currentItemSelected.items.splice(currentItemIndex, 1)[0];
        //console.log('newListSplice', newListSplice);
        
        newList[params.grpI].items.splice(params.itemI, 0, newListSplice);

        dragItem.current = params;
        return newList;
      });
    }
  }

  const handleDragEnd = () => {
    //console.log('ending drag');
   
    setDragging(false);
    dragNode.current.removeEventListener('dragend', handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;

  }

  const getStyles = (params) => {
    const currentItem = dragItem.current;
    //console.log('currentItem', currentItem);
    
    if (currentItem.grpI === params.grpI && currentItem.itemI === params.itemI)
      return 'current dnd-item';
      
    return 'dnd-item';
  }

  const addItem = () => {
    let newList = list.find(x => x.id === 1);
    let newList2 = list.find(x => x.id === 2);
    newList.items.push(countItems.toString());
    setCountItems(countItems + 1);
    
    setList([newList, newList2]);
  }

  return {
    list,
    dragging,
    handleDragEnter,
    handleDragStart,
    getStyles,
    addItem,
  }
}