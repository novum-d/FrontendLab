import { Button, ButtonProps } from "@mui/material";

const CommonButton = ({
  color,
  disabled,
  size,
  variant,
  sx,
  children,
}: ButtonProps) => {
  return (
    <Button
      color={color}
      disabled={disabled}
      size={size}
      variant={variant}
      sx={sx}
    >
      {children}
    </Button>
  );
};

export default CommonButton;
