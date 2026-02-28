import type { AnchorHTMLAttributes } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
    label: string;
};

export default function AccessibleLink({ label, className, ...props }: Props) {
    return (
        <a
            {...props}
            aria-label={label}
            className={`underline focus:outline-none focus:ring-2 focus:ring-emerald-500 ${className}`}
        />
    );
}
