import React from "react";
import { Button } from "../ui/button";

interface CustomButtonProps {
  variant?: "primary" | "primaryDisable" | "secondary" | "secondaryDisable";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  [key: string]: any;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  variant = "primary",
  children,
  onClick,
  className = "",
  ...props
}) => {
  const baseStyles =
    "px-[27px] py-[11px] rounded-lg font-semibold text-heading-s transition-all duration-200 ease-in-out";

  const variantStyles: { [key: string]: string } = {
    primary:
      "bg-primary-default text-white active:bg-primary-light hover:bg-primary-default",
    primaryDisable: "bg-primary-default opacity-25",
    secondary:
      "bg-white text-primary-default border border-primary-default active:bg-primary-lighter hover:bg-primary-default",
    secondaryDisable: "opacity-25",
  };

  return (
    <Button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
