const Notification = ({ message, type }) => {
  if (!message) {
    return null;
  }

  const notificationStyle =
    type === "error" ? "notification error" : "notification";
  return <div className={notificationStyle}>{message}</div>;
};

export default Notification;
