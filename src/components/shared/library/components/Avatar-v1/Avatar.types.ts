export interface AvatarProps {
  /**
   * The image source of the avatar if type is image
   */
  src?: any;
  /**
   * Type shape of the avatar. Default is square
   */
  shape?: "square" | "rounded";
  /**
   * Describes how big the avatar is
   */
  size?: "sm" | "md" | "lg";
  /**
   * The name  of the avatar,
   */
  name?: string;

  text?: string;

  type: "image" | "text";
}
