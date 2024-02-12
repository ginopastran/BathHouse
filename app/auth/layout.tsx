const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" h-[90%] flex items-center justify-center">{children}</div>
  );
};

export default AuthLayout;
