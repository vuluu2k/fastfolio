import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslations } from "next-intl";

type Props = {};

const MessageUsed = ({ count }: { count: number }) => {
  return (
    <div>
      <div className="flex gap-2">
        {[0, 0, 0].map((_, index) => (
          <Avatar key={index}>
            <AvatarImage src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=80&h=80&fit=crop&crop=faces" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        ))}
      </div>
      You have used {count} of 10 messages
    </div>
  );
};

function TitleSection({}: Props) {
  const t = useTranslations("home");

  return (
    <section className="relative px-4 py-20 md:pt-28 md:pb-20">
      <div className="max-w-7xl mx-auto text-center">
        <div className="opacity: 1; transform: none;">
          <MessageUsed count={10} />
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            {t("get_your_ai_portfolio")}
          </h1>
        </div>
      </div>
    </section>
  );
}

export default TitleSection;
