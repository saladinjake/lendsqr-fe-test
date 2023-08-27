
import { useContext, useRef, useEffect, useState } from "react";
import NotificationContext from "../../../contexts/NotificationContext";

const NotificationBar = () => {
  const notificationCtx = useContext(NotificationContext);
  const toast = useRef<HTMLDivElement>(null);
  const progressBar = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, [notificationCtx]);
  return (
    notificationCtx.notification !== null ? (
      <>
        <div
          ref={toast}
          className={notificationCtx.notification + " toast active"}
        >
          <div className="toast-content">
            <i className="fas fa-solid fa-check check"></i>

            <div className="message">
              <span className="text text-1">
                {notificationCtx.notification}
              </span>
              <span className="text text-2">
                {notificationCtx.notificationMessage}{" "}
              </span>
            </div>
          </div>
          <i ref={closeBtn} className="fa-solid fa-xmark close">
            x
          </i>
          <div ref={progressBar} className="progress active"></div>
        </div>
      </>
    ): (<></>)
  );
};
export default NotificationBar;
