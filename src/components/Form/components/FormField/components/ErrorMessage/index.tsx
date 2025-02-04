import "./styles.css";

export const ErrorMessage: React.FC<{message?: string}> = ({message}) => {
  if (!message) {
    return null;
  }

  return <span className="error-message">{message}</span>;
};
