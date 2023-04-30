import React from "react";

export interface ButtonProps {
  /**
   * Specifies the size of the button, if it's small, medium or large
   */
  size?: "sm" | "md" | "lg";
  /**
   * The variant of the button
   */
  variant?: "text" | "solid" | "outline";
  /**
   * The button color
   */
  color?: "primary" | "secondary" | "danger";
  /**
   * if true, display a loader
   */
  loading?: boolean | { delay: number };
  /**
   *
   */
  onClick?: () => void;
  /**
   * I
   */

  iconLeft?: React.ReactNode;
  /**
   * Specifies the size of the button, if it's small, medium or large
   */

  iconRight?: React.ReactNode;

  /**
   * If true, button is greyed out
   */
  disabled?: boolean;

  children: React.ReactNode;
  /**
   * Specifies the width of the button
   */
  width?: string;
  height?: string;

  margin?: string;

  type?: "submit" | "reset" | "button";
}
