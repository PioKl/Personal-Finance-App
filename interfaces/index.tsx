export interface Button<T> {
  children: React.ReactNode;
  isALink?: boolean;
  onClick?: () => void;
  className?: string;
  icon?: React.ElementType;
  state?: T;
}

export interface LinkButton<T> extends Button<T> {
  isALink: true;
  link: string;
  variant: "link";
}

export interface StandardButton<T> extends Button<T> {
  isALink?: false;
  link?: never;
  variant: "primary" | "secondary" | "tertiary" | "destroy" | "sidebar";
}
