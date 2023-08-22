interface TemplateProps {
  children?: React.ReactNode
}

export default function Template({ children }:TemplateProps) {
  return(
    <>
      <h1 className="text-4xl bg-slate-100">Dashboard Template</h1>
      {children}
    </>
  );
}