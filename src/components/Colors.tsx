import { COLORS } from "@/constants";

type Props = {
  onChangeColor: (value: string) => void;
};

const Colors = (props: Props) => {
  const { onChangeColor } = props;

  return (
    <div className="absolute bottom-4 md:bottom-auto md:top-1/2 md:right-0 md:transform md:-translate-x-1/2 md:-translate-y-1/2 rounded-[30px] px-6 md:px-4 py-4 md:py-6 bg-[rgba(255,255,255,0.2)] grid grid-flow-col md:grid-flow-row gap-x-[10px] md:gap-y-[10px] shadow-[0_8px_32px_0px_rgba(31,38,135,0.37)] border border-[rgba(255,255,255,0.18)]">
      {COLORS.map((value: string) => {
        return (
          <div
            key={value}
            className="w-6 sm:w-[30px] h-6 sm:h-[30px] rounded-full cursor-pointer"
            style={{ backgroundColor: value }}
            onClick={() => onChangeColor(value)}
          />
        );
      })}
    </div>
  );
};

export default Colors;
