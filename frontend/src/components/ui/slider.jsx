import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef(({ className, value, defaultValue, ...props }, ref) => {
  // Render one Thumb per value in the array (supports both single and range sliders)
  const thumbsCount = (value ?? defaultValue ?? [0]).length;

  return (
    <SliderPrimitive.Root
      ref={ref}
      value={value}
      defaultValue={defaultValue}
      className={cn(
        "relative flex w-full touch-none select-none items-center py-2",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-[#f0e2d2]">
        <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-[#FF7847] to-[#FF5722] transition-[width] duration-150 ease-out" />
      </SliderPrimitive.Track>
      {Array.from({ length: thumbsCount }).map((_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          data-testid={`slider-thumb-${i}`}
          className="block h-5 w-5 rounded-full border-2 border-[#FF5722] bg-white shadow-[0_2px_8px_rgba(255,87,34,0.35)] cursor-grab active:cursor-grabbing transition-transform duration-150 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FF5722]/25 disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
