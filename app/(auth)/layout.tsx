import { LayoutProps } from '@/.next/types/app/layout';

export default function Layout({ children }:LayoutProps) {
  return (
    <>
      <h2 className="text-4xl bg-slate-100">
        Auth Layout: compartilhado entre as rotas na pasta auth
      </h2>
      {children}
    </>
  );
}