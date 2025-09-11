import { Avatar } from "@/components/ui/avatar";
import React from "react";

type Props = {};

const MessageUsed = ({ count }: { count: number }) => {
  return (
    <div>
      <Avatar />
      You have used {count} of 10 messages
    </div>
  );
};

function TitleSection({}: Props) {
  return (
    <section className="relative px-4 py-20 md:pt-28 md:pb-20">
      <div className="max-w-7xl mx-auto text-center">
        <div className="opacity: 1; transform: none;">
          <MessageUsed count={10} />
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Get your AI Portfolio
          </h1>
        </div>
      </div>
    </section>
  );
}

export default TitleSection;
