import React from 'react';
import { useContext, useRef, useEffect, useState } from 'react';
import NotificationContext from 'context/NotificationContext';
import styled from 'styled-components';
const NotificationBar = () => {
  const notificationCtx = useContext(NotificationContext);
  const toast = useRef<HTMLDivElement>(null);
  const progressBar = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLDivElement>(null);

 
  useEffect(() =>{

    toast?.current?.classList.add("active");
    progressBar?.current?.classList.add("active");
  
    const timer1 = setTimeout(() => {
      toast?.current?.classList.remove("active");
    }, 5000); //1s = 1000 milliseconds
  
    const timer2 = setTimeout(() => {
      progressBar?.current?.classList.remove("active");
    }, 5300);

    closeBtn?.current?.addEventListener("click", () => {
        toast?.current?.classList.remove("active");
      
        setTimeout(() => {
          progressBar?.current?.classList.remove("active");
        }, 300);
      
        clearTimeout(timer1);
        clearTimeout(timer2);
      });
   
  },[notificationCtx])
return (
    notificationCtx.notification !== null && (
     
<NotificationToastComponent>
<div  ref={toast} className={notificationCtx.notification + " toast active"}>
  
<div className="toast-content">
  <i className="fas fa-solid fa-check check"></i>

  <div className="message">
    <span className="text text-1">{notificationCtx.notification}</span>
    <span className="text text-2">{notificationCtx.notificationMessage} </span>
  </div>
</div>
<i ref={closeBtn} className="fa-solid fa-xmark close">x</i>
<div ref={progressBar} className="progress active"></div>
</div>
</NotificationToastComponent>
    )
  );
};
export default NotificationBar;

const NotificationToastComponent =styled.div`

.toast {
  position: absolute;
  top: 25px;
  right: 30px;
  border-radius: 12px;
  background: #fff;
  padding: 20px 35px 20px 25px;
  box-shadow: 0 6px 20px -5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transform: translateX(calc(100% + 30px));
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.35);
}

.toast.active {
  transform: translateX(0%);
}

.toast .toast-content {
  display: flex;
  align-items: center;
}

.toast-content .check {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  min-width: 35px;
  background-color: #2770ff;
  color: #fff;
  font-size: 20px;
  border-radius: 50%;
}

.toast-content .message {
  display: flex;
  flex-direction: column;
  margin: 0 20px;
}

.message .text {
  font-size: 16px;
  font-weight: 400;
  color: #666666;
}

.message .text.text-1 {
  font-weight: 600;
  color: #333;
}

.toast .close {
  position: absolute;
  top: 10px;
  right: 15px;
  padding: 5px;
  cursor: pointer;
  opacity: 0.7;
  font-size:12px;
}

.toast .close:hover {
  opacity: 1;
}

.toast .progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 100%;

}

.toast .progress:before {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background-color: #2770ff;
}

.progress.active:before {
  animation: progress 5s linear forwards;
}

@keyframes progress {
  100% {
    right: 100%;
  }
}

button {
  padding: 12px 20px;
  font-size: 20px;
  outline: none;
  border: none;
  background-color: #2770ff;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background-color: #2770ff;
}

.toast.active ~ button {
  pointer-events: none;
}


`