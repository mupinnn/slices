import { tv, type VariantProps } from "tailwind-variants";
import { Slot, Slottable } from "@radix-ui/react-slot";

const buttonVariants = tv({
  base: "cursor-pointer flex h-11 items-center justify-center gap-2 rounded-full border px-6 py-2 text-sm font-semibold whitespace-nowrap",
  variants: {
    variant: {
      primary: "bg-red text-white border-red",
      secondary: "bg-white text-rose-900 border-rose-500",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

type ButtonVariants = VariantProps<typeof buttonVariants>;
type ButtonProps = ButtonVariants &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
  };

export function Button({ asChild, children, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp {...props} className={buttonVariants(props)}>
      <Slottable>{children}</Slottable>
    </Comp>
  );
}
