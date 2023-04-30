import React, {
    useState
} from "react"
const NotificationContext = React.createContext({
    notification: null,
    notificationMessage: null,
    success: (text?: string):void => {} ,
    error: (text?: string):void => {},
    clear:():void => {},
  });

  const STATES = {
    SUCCESS: 'success',
    ERROR: 'error',
  };



  const NotificationProvider = (props) => {
    const [notification, setNotification] = useState(null);
    const [notificationMessage, setNotificationText] = useState(null);
  const success = (text): void => {
      window.scroll(0, 0);
      setNotificationText(text);
      setNotification(STATES.SUCCESS);
    };
  const error = (text): void => {
      window.scroll(0, 0);
      setNotificationText(text);
      setNotification(STATES.ERROR);
    };
  const clear = () => {
      setNotificationText(null);
      setNotification(null);
    };
  return (
      <NotificationContext.Provider
        value={{
          success, error, clear, notification, notificationMessage,
        }}
      >
        {props.children}
      </NotificationContext.Provider>
    );
  };


export { NotificationProvider };
export default NotificationContext;