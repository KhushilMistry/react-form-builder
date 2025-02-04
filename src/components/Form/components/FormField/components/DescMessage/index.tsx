import "./styles.css";

export const DescMessage: React.FC<{message?: string}> = ({message}) => {
  if (!message) {
    return null;
  }

  return <span className="desc-message">{message}</span>;
};
