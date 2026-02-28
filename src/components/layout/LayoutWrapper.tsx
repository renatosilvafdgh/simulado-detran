import React, { ReactNode } from "react";
import { Helmet } from "react-helmet";

type LayoutWrapperProps = {
    children: ReactNode;
    title?: string;
    description?: string;
    schema?: string;
};

export default function LayoutWrapper({ children, title, description, schema }: LayoutWrapperProps) {
    return (
        <>
            <Helmet>
                <title>{title || "Simulado Brasil"}</title>
                <meta
                    name="description"
                    content={description || "Plataforma de simulados do Detran, grátis e atualizada."}
                />
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="robots" content="index, follow" />
                {schema && (
                    <script type="application/ld+json">
                        {schema}
                    </script>
                )}
            </Helmet>
            <div className="min-h-screen text-slate-900 dark:text-slate-50 bg-slate-50 dark:bg-slate-900">
                {children}
            </div>
        </>
    );
}
