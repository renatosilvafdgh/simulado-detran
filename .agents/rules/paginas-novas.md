---
trigger: always_on
---

Para páginas novas a serem criadas verificar: 

1️⃣ robots.txt (colocar em public/robots.txt)
User-agent: *
Disallow:

Sitemap: https://souhabilitado.com/sitemap.xml
2️⃣ Layout global com Helmet (crie src/components/Layout/LayoutWrapper.tsx)
import React, { ReactNode } from "react";
import { Helmet } from "react-helmet";

type LayoutWrapperProps = {
  children: ReactNode;
  title?: string;
  description?: string;
};

export default function LayoutWrapper({ children, title, description }: LayoutWrapperProps) {
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
      </Helmet>
      <div className="min-h-screen text-slate-900 dark:text-slate-50 bg-slate-50 dark:bg-slate-900">
        {children}
      </div>
    </>
  );
}

✅ Qualquer página envolvida nesse layout terá title, description e metatags básicas automaticamente.

3️⃣ Botões e links acessíveis (exemplo de componentes globais)

Botão clicável (AccessibleButton.tsx)

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

Link acessível (AccessibleLink.tsx)

import React, { AnchorHTMLAttributes } from "react";

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

✅ Isso garante áreas de toque grandes, aria-label e foco visível.

4️⃣ Lazy Loading / Code Splitting (exemplo de página)
import React, { Suspense, lazy } from "react";
import LayoutWrapper from "../components/Layout/LayoutWrapper";

const SimuladoPage = lazy(() => import("../pages/Simulado"));

export default function Home() {
  return (
    <LayoutWrapper title="Página Inicial | Simulado Brasil" description="Faça simulados do Detran de forma prática e gratuita.">
      <Suspense fallback={<div>Carregando...</div>}>
        <SimuladoPage />
      </Suspense>
    </LayoutWrapper>
  );
}

✅ Isso ajuda a reduzir JavaScript não usado.

5️⃣ Contraste e cores

Use classes Tailwind para texto e fundos:

<p className="text-slate-900 dark:text-slate-50">
  Texto com contraste suficiente
</p>
<div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl">
  Conteúdo
</div>

Garante contraste mínimo para Lighthouse e acessibilidade.

6️⃣ Aplicação

Agora, para qualquer página nova:

Envolva o conteúdo no LayoutWrapper.

Use AccessibleButton ou AccessibleLink em vez de <button> ou <a> diretamente.

Adicione title e description se quiser sobrescrever os padrões.

Use lazy loading para componentes grandes.