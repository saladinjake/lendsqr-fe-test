import React, { useRef, useState } from "react";
import "./notify.scss"
const NotificationContext = React.createContext({
  notification: null,
  notificationMessage: null,
  success: (text) => {},
  error: (text) => {},
  clear: () => {},
});

const STATES = {
  SUCCESS: "success",
  ERROR: "error",
};

const NotificationProvider = (props) => {
  const [notification, setNotification] = useState(null);
  const [notificationMessage, setNotificationText] = useState(null);
  const refKey = useRef()
  const success = (text) => {
    window.scroll(0, 0);
    setNotificationText(text);
    setNotification(STATES.SUCCESS);
    refKey.current = (new Date()).getMilliseconds()
  };
  const error = (text) => {
    window.scroll(0, 0);
    setNotificationText(text);
    setNotification(STATES.ERROR);
    refKey.current = (new Date()).getMilliseconds()
  };
  const clear = () => {
    setNotificationText(null);
    setNotification(null);
    refKey.current = (new Date()).getMilliseconds()
  };
  return (
    <NotificationContext.Provider
      key={refKey}
      value={{
        success,
        error,
        clear,
        notification,
        notificationMessage,
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export { NotificationProvider };
export default NotificationContext;
