const Divider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (children === undefined)
    return <div className="container my-24 h-1.5 border-y-2 border-y-fg/10" />;

  return (
    <div className="flex w-full flex-row items-center gap-x-2">
      <div className="h-1.5 flex-grow border-y-2 border-y-fg/10" />
      {children}
      <div className="h-1.5 flex-grow border-y-2 border-y-fg/10" />
    </div>
  );
};

export default Divider;
