import React from "react";
import { useDrag, useDrop } from "react-dnd";
import platforms from "@/utils/logos";
import Link from "next/link";

interface LinkField {
  platform: string;
  link: string;
}

export const ItemType = {
  LINK: "LINK",
};

interface DraggableLinkProps {
  link: LinkField;
  index: number;
  moveLink: (dragIndex: number, hoverIndex: number) => void;
}

const DraggableLink: React.FC<DraggableLinkProps> = ({
  link,
  index,
  moveLink,
}) => {
  const [{ isDragging }, ref] = useDrag({
    type: ItemType.LINK,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType.LINK,
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveLink(item.index, index);
        item.index = index;
      }
    },
  });

  const dragDropRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      ref(node);
      drop(node);
    },
    [ref, drop]
  );

  return (
    <div
      ref={dragDropRef}
      className="w-full h-[3rem] flex items-center justify-between px-4 rounded-lg"
      style={{
        backgroundColor: getPlatformColor(link.platform),
        boxShadow: `0px 2px 4px ${getPlatformColor(link.platform)}`,
        textDecoration: "none",
        color: "white",
        opacity: isDragging ? 0.5 : 1,
        border: link.platform === "Frontend Mentor" ? "1px solid gray" : "none",
      }}
    >
      <div className="flex items-center">
        <div>{getPlatformLogo(link.platform)}</div>
        <span
          className={
            link.platform === "Frontend Mentor"
              ? "text-gray-dark"
              : "text-white"
          }
        >
          {link.platform}
        </span>
      </div>
      <a
        className={
          link.platform === "Frontend Mentor" ? "text-gray-dark" : "text-white"
        }
        href={link.link}
        target="_blank"

      >
        →
      </a>
    </div>
  );
};

const getPlatformColor = (platformValue: string) => {
  const platform = platforms.find((p) => p.value === platformValue);
  return platform ? platform.color : "#EEEEEE";
};

const getPlatformLogo = (platformValue: string) => {
  const platform = platforms.find((p) => p.value === platformValue);
  return platform ? <div>{platform.logo}</div> : null;
};

export default DraggableLink;
