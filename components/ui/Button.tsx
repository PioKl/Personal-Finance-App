import { ButtonProps } from "@/types";
import Link from "next/link";
import clsx from "clsx";

const Button = <T,>({
  children,
  variant,
  isALink,
  link,
  onClick,
  className,
  icon: Icon,
  state,
}: ButtonProps<T>) => {
  const variantStyles: Record<
    NonNullable<ButtonProps<T>["variant"]>,
    string
  > = {
    //Standard Button
    primary:
      "p-space-200 rounded-alt bg-fill-one text-fill-two text-preset-4 tracking-preset-4 leading-preset-4 font-preset-4-bold hover:bg-fill-pagination focus-visible:border-primary-button-active focus-visible:bg-fill-pagination focus-visible:outline-none",
    secondary:
      "p-space-200 border-1 border-transparent rounded-alt bg-fill-three text-fill-one text-preset-4 tracking-preset-4 leading-preset-4 font-preset-4-bold hover:bg-fill-two hover:border-current focus-visible:border-primary-button-active focus-visible:bg-fill-two focus-visible:outline-none",
    tertiary: "",
    destroy: "",
    //Sidebar
    sidebar:
      "group w-fit items-end text-left text-heading-m tracking-heading-m leading-heading-m font-heading-m text-button hidden lg:flex lg:mt-auto lg:ml-space-400 lg:mb-14.5",
    //Link
    link: "text-preset-4 tracking-preset-4 leading-[149%] font-preset-4 text-link",
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
      {variant === "sidebar" ? (
        <>
          {Icon && (
            <Icon
              className={`flex-shrink-0 ${
                state ? "mr-0 ml-space-50 rotate-180" : "mr-space-200 rotate-0"
              } group-hover:[&>path]:fill-button-active group-focus-visible:[&>path]:fill-button-active`}
            />
          )}
          <span
            className={`transition-opacity duration-200 delay-400 ${
              state
                ? "opacity-0 invisible text-[0px]"
                : "opacity-100 visible text-heading-m"
            } whitespace-nowrap group-hover:text-button-active group-focus-visible:text-button-active`}
          >
            {children}
          </span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
