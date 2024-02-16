const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" relative h-[90%] flex items-center justify-center">{children}</div>
  );
};

export default AuthLayout;
