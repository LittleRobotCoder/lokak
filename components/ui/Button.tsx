import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type Variant = "filled" | "outline";

type ButtonLinkProps = {
  as?: "a";
  href: string;
  /** Preferred prop */
  variant?: Variant;
  /** Back-compat with earlier usage */
  ["data-variant"]?: Variant;
  className?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonButtonProps = {
  as: "button";
  /** Preferred prop */
  variant?: Variant;
  /** Back-compat with earlier usage */
  ["data-variant"]?: Variant;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type Props = ButtonLinkProps | ButtonButtonProps;

export default function Button(props: Props) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D8FF] focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  // Primary/filled: Purple gradient with glow
  const filled =
    "text-white font-medium relative overflow-hidden " +
    "bg-gradient-to-br from-[#6C63FF] to-[#402A95] " +
    "hover:opacity-90 hover:shadow-[0_8px_24px_rgba(108,99,255,0.4),0_4px_12px_rgba(0,216,255,0.2)] " +
    "active:opacity-95";

  // Secondary/outline: Glass style with purple/cyan border on hover
  const outline =
    "glass text-foreground border-white/10 " +
    "hover:border-[#6C63FF]/50 hover:bg-white/[0.06] hover:shadow-[0_4px_16px_rgba(108,99,255,0.15),0_2px_8px_rgba(0,216,255,0.1)] " +
    "hover:bg-gradient-to-br hover:from-white/[0.03] hover:to-white/[0.06]";

  const chosenVariant: Variant = (("variant" in props && props.variant) ||
    (props as any)["data-variant"] ||
    "filled") as Variant;

  const className =
    ("className" in props && props.className ? props.className + " " : "") +
    base +
    " " +
    (chosenVariant === "outline" ? outline : filled);

  if ("as" in props && props.as === "button") {
    // strip our custom props before spreading
    const {
      as,
      variant,
      ["data-variant"]: _dv,
      className: _c,
      ...rest
    } = props as ButtonButtonProps & Record<string, unknown>;
    return <button {...rest} className={className} />;
  }

  const {
    href,
    variant,
    ["data-variant"]: _dv2,
    className: _c2,
    ...rest
  } = props as ButtonLinkProps & Record<string, unknown>;
  return <Link href={href} {...(rest as any)} className={className} />;
}
