"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "@/assets/icons/logo-large.svg";
import LogoSmall from "@/assets/icons/logo-small.svg";
import IconOverview from "@/assets/icons/icon-nav-overview.svg";
import IconTransaction from "@/assets/icons/icon-nav-transactions.svg";
import IconBudgets from "@/assets/icons/icon-nav-budgets.svg";
import IconPots from "@/assets/icons/icon-nav-pots.svg";
import IconRecurringBills from "@/assets/icons/icon-nav-recurring-bills.svg";
import IconMinimizeMenu from "@/assets/icons/icon-minimize-menu.svg";
import Button from "@/components/ui/Button";

const Header = () => {
  const links = [
    { id: 0, name: "overview", icon: IconOverview, href: "/" },
    {
      id: 1,
      name: "transactions",
      icon: IconTransaction,
      href: "/transactions",
    },
    { id: 2, name: "budgets", icon: IconBudgets, href: "/budgets" },
    { id: 3, name: "pots", icon: IconPots, href: "/pots" },
    {
      id: 4,
      name: "recurring bills",
      icon: IconRecurringBills,
      href: "/recurring-bills",
    },
  ];

  const path = usePathname();
  const [minMenu, setMinMenu] = useState(false);

  const activeStyles =
    "bg-menu-link-active-bg text-menu-link-active-color border-menu-link-active-border-color";
  const interactiveStyles =
    "group-hover:bg-menu-link-active-bg group-hover:text-menu-link-active-color group-hover:border-menu-link-active-border-color group-focus-within:bg-menu-link-active-bg group-focus-within:text-menu-link-active-color group-focus-within:border-menu-link-active-border-color";

  return (
    <header
      className={`flex flex-col bg-header h-auto sticky z-10 bottom-0 pt-space-100 px-space-200 rounded-t-menu-mobile md:px-space-500 lg:h-screen lg:top-0 lg:py-space-500 lg:pl-0 lg:pr-space-300 lg:rounded-t-none lg:rounded-r-menu custom-transition-width ${
        minMenu ? "lg:w-22" : "lg:w-75"
      }`}
    >
      {minMenu ? (
        <div className="flex justify-end pr-space-150">
          <LogoSmall className="hidden lg:block lg:mb-16" />
        </div>
      ) : (
        <Logo className="hidden lg:block lg:ml-space-400 lg:mb-16" />
      )}

      <nav>
        <ul className="flex md:gap-10.5 lg:flex-col lg:gap-space-50">
          {links.map((link) => {
            const activeLink = path === link.href;
            return (
              <li key={link.id} className="group flex flex-1">
                <Link
                  href={link.href}
                  className={`flex flex-col flex-1 items-center pt-space-100 pb-space-150 px-5.5 font-heading-xs-bold border-b-4 rounded-t-menu-mobile ${
                    activeLink
                      ? activeStyles
                      : "bg-transparent text-menu-link-color border-transparent"
                  } ${interactiveStyles} md:px-2.5 lg:flex-row lg:py-space-200 lg:px-space-400 lg:border-b-0 lg:border-l-4 lg:rounded-t-none lg:rounded-r-menu custom-transition-width ${
                    minMenu ? "lg:w-[64px]" : "lg:w-[276px]"
                  }`}
                >
                  <div className="flex flex-shrink-0 items-center justify-center w-6 h-6 mb-space-50 lg:mr-space-200">
                    <link.icon
                      className={`${
                        activeLink
                          ? "[&>path]:fill-menu-link-active-icon-color"
                          : "[&>path]:fill-menu-link-icon-color"
                      } group-hover:[&>path]:fill-menu-link-active-icon-color group-focus-within:[&>path]:fill-menu-link-active-icon-color`}
                    />
                  </div>
                  <span
                    className={`custom-transition-opacity ${
                      minMenu
                        ? "opacity-0 invisible text-[0px]"
                        : "opacity-100 visible text-heading-xs lg:text-heading-m"
                    } sr-only capitalize tracking-heading-xs leading-heading-xs md:not-sr-only md:whitespace-nowrap lg:tracking-heading-m lg:leading-heading-m`}
                  >
                    {link.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <Button
        variant="sidebar"
        state={minMenu}
        icon={IconMinimizeMenu}
        onClick={() => setMinMenu(!minMenu)}
      >
        Minimize Menu
      </Button>
    </header>
  );
};

export default Header;
