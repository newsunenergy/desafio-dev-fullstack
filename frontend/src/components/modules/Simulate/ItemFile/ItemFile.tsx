import Image from "next/image";
import React from "react";
import pdf from "@/public/svgs/pdf.svg";
import check from "@/public/svgs/check.svg";

const ItemFile = ({ name }: { name: string }) => {
  return (
    <div className="flex justify-between rounded-xl border border-textInput p-3">
      <div className="flex items-center gap-4">
        <Image src={pdf} alt="pdf icone" />
        <p className="text-xs text-white font-bold">{name}</p>
      </div>
      <Image src={check} alt="check" />
    </div>
  );
};

export default ItemFile;
