import "./styles.css";

type Variant = "primary" | "secondary" | "danger";

const VariantMap = {
  primary: "primary-button",
  secondary: "secondary-button",
  danger: "danger-button",
};

export const Button = ({
  onClick,
  label,
  variant = "primary",
}: {
  onClick: () => void;
  label: string;
  variant?: Variant;
}) => {
  const className = VariantMap[variant];
  return (
    <button type="button" className={className} onClick={onClick}>
      {label}
    </button>
  );
};
