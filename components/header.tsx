import { Separator } from "./ui/separator";

export const Header = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <>
      <div className="flex flex-col mb-0 lg:mb-2">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="font-light">{description}</p>
      </div>
      <Separator className="bg-gray-500" />
    </>
  );
};
