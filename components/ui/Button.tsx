import { ButtonProps } from "@/types";
import Link from "next/link";
import clsx from "clsx";

const Button = <T,>({
  children,
  variant = "primary",
  isALink,
  link,
  onClick,
  className,
}: ButtonProps<T>) => {
  const variantStyles: Record<
    NonNullable<ButtonProps<T>["variant"]>,
    string
  > = {
    primary: "",
    secondary: "",
    tertiary: "",
    destroy: "",
    sidebar:
      "group items-end text-left text-heading-m tracking-heading-m leading-heading-m font-heading-m text-button hidden lg:flex lg:mt-auto lg:ml-space-400 lg:mb-14.5",
    link: "flex flex-col flex-1 items-center w-fit pt-space-100 pb-space-150 px-5.5 font-heading-xs-bold border-b-4 rounded-t-menu-mobile md:px-2.5 lg:flex-row lg:w-full lg:py-space-200 lg:px-space-400 lg:border-b-0 lg:border-l-4 lg:rounded-t-none lg:rounded-r-menu",
  };

  return isALink ? (
    <Link href={link} className={clsx(variantStyles[variant], className)}>
      {children}
    </Link>
  ) : (
    <button
      className={clsx(variantStyles[variant], className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
