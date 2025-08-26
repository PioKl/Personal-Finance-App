export interface Button<T> {
  children: React.ReactNode;
  variant:
    | "primary"
    | "secondary"
    | "tertiary"
    | "destroy"
    | "sidebar"
    | "link";
  isALink?: boolean;
  onClick?: () => void;
  className?: string;
  state?: T;
}

export interface LinkButton<T> extends Button<T> {
  isALink: true;
  link: string;
}

export interface StandardButton<T> extends Button<T> {
  isALink?: false;
  link?: never;
}
