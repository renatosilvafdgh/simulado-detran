import React, { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    label: string;
};

export default function AccessibleButton({ label, className, ...props }: Props) {
    return (
        <button
            {...props}
            aria-label={label}
            className={`p-3 min-w-[44px] min-h-[44px] rounded-lg ${className}`}
        />
    );
}
