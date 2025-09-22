import { SectionCard as SectionCardType } from "@/types";

import Button from "../ui/Button";
import IconCaretRight from "@/assets/icons/icon-caret-right.svg";

export default function SectionCard({
  title,
  link,
  linkLabel,
  children,
  className = "",
}: SectionCardType) {
  return (
    <div
      className={`flex flex-col gap-space-250 py-space-300 px-space-250 bg-fill-two rounded-default md:p-space-400 ${className}`}
    >
      <div className="flex items-end justify-between">
        <h2>{title}</h2>
        <Button
          variant="link"
          isALink={true}
          link={link}
          className="flex items-center gap-space-150"
        >
          {linkLabel}
          <IconCaretRight />
        </Button>
      </div>
      {children}
    </div>
  );
}
