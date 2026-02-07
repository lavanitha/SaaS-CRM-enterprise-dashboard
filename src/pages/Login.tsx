import LoginModal from "../components/auth/LoginModal";

const Login = () => {
  return (
    <div className="relative min-h-screen bg-slate-100">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <LoginModal />
      </div>
    </div>
  );
};

export default Login;
