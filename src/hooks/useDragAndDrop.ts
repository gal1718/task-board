import React, { useEffect, useRef } from "react";

function useDragAndDrop(id: string, handleDrop: (id: string) => void) {

  const isClicked = useRef<boolean>(false);

  
  const cords = useRef({startX: 0, startY: 0, lastX: 0, lastY: 0});

  
  useEffect(()=>{
    // if(!targetRef.current || !containerRef.current) return

    console.log("id is: " + id);
    const target = document.getElementById(id);
    console.log("Target element:", target);
    console.log("getClientRects of target " + target?.getClientRects);
    if(!target) throw new Error("Element with given id does not exist");
    //if(!target) return;
    console.log("2");

    const container = target.parentElement?.parentElement?.parentElement;
    console.log("Container element:", container);
    if(!container) throw new Error("Target element must have a parent");

    const onMouseDown = (e: MouseEvent) =>{
      isClicked.current = true;
      cords.current.startX = e.clientX;
      cords.current.startY = e.clientY;
      target.style.zIndex = "1000";
      target.classList.add("dragging");
      cords.current.lastX = target.offsetLeft;
      cords.current.lastY = target.offsetTop;
      target.style.zIndex = "1000";
      console.log("onMouseDown cords.current.startX : " + cords.current.startX + " cords.current.startY " + cords.current.startY)

    }

    const onMouseUp = (e: MouseEvent) =>{
      isClicked.current = false;
      cords.current.lastX = target.offsetLeft;
      cords.current.lastY = target.offsetTop;
      
      handleDrop(id);
      // target.style.zIndex = "auto";
      console.log("onMouseUp cords.current.startX : " + cords.current.startX + " cords.current.startY " + cords.current.startY)
    }

    const onMouseMove = (e: MouseEvent) =>{
      //isClicked.current = false;
      //console.log("mouse move in the containeer")
     // console.log(isClicked.current);
      if(!isClicked.current) return;
      //console.log("continunt to change target posiytion")

      target.style.top = `${e.clientY - cords.current.startY + cords.current.lastY}px`
      target.style.left = `${e.clientX - cords.current.startX + cords.current.lastX}px`
      console.log("onMouseMove cords.current.startX : " + cords.current.startX + " cords.current.startY " + cords.current.startY + " AND: mouse x position: " + e.clientX + " mouse y position: " + e.clientY + " AND: target new y  location: " + (e.clientY - cords.current.startY) +  " target new x location: " + (e.clientX - cords.current.startX))
      
    }


    console.log("GBFCVhgf")
    target.addEventListener('mousedown', onMouseDown);
    target.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseUp);

    //need to clean up the event listenert when the comp is unmounted. bacause of the stricmode it runs twice
    const cleanUp = () => {
      target.removeEventListener('mousedown',onMouseDown);
      target.removeEventListener('mouseup',onMouseUp);
      container.removeEventListener('mousemove',onMouseMove);
      container.removeEventListener('mousemove',onMouseUp);
    }
    return cleanUp;

  },[id])
 
}

  export default useDragAndDrop;
