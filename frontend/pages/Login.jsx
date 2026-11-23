import { useState } from "react";
import logo from "../assets/Logo.png";
import illustration from "../assets/login-illustration.jpg";
 
import {
  User,
  LockKeyhole,
  Eye,
  EyeOff,
  LogOut,
  ArrowRight,
  Mail,
  UserRound,
} from "lucide-react";
 
const Login = ({
  onLogin,
  onRegister,
  onLogout,
  isAuthenticated = false,
  user,
}) => {
  const [isRegister, setIsRegister] = useState(false);
 
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
 
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
 
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
 
    if (!username.trim() || !password) return;
 
    onLogin?.({
      username: username.trim(),
      password,
    });
  };
 
  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
 
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
 
    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }
 
    onRegister?.({
      fullName: fullName.trim(),
      username: username.trim(),
      email: email.trim(),
      password,
    });
  };
 

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-5">
        <div className="w-full max-w-4xl min-h-[500px] overflow-hidden rounded-[30px] bg-white shadow-2xl grid grid-cols-1 md:grid-cols-2">
 
          <div className="relative bg-[#f9fcfc] flex flex-col items-center p-10 text-center overflow-hidden">
 
            <img
              src={illustration}
              alt="Shopping illustration"
              className="absolute inset-0 w-full h-full object-cover object-bottom"
            />
 
            <div className="relative z-10">
              <img
                src={logo}
                alt="DzShopi Logo"
                className="w-48 h-auto object-contain mx-auto mb-8"
              />
 
              <h2 className="text-3xl font-bold text-[#214d3d]">
                Welcome to DzShopi
              </h2>
 
              <p className="mt-3 text-gray-500">
                Shop Smarter, Live Better!
              </p>
            </div>
 
          </div>
 
          <div className="bg-[#214d3d] text-white flex flex-col justify-center items-center p-8 sm:p-12 text-center">
 
            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-6">
              <User size={40} />
            </div>
 
            <h1 className="text-3xl font-bold">
              Welcome Back!
            </h1>
 
            <p className="mt-4 text-white/70">
              Hello, {user?.username || username}
            </p>
 
            <p className="text-sm text-white/60 mt-2">
              You are successfully logged in.
            </p>
 
            <button
              type="button"
              onClick={onLogout}
              className="mt-10 flex items-center justify-center gap-3 w-full max-w-xs rounded-full bg-[#69b3ad] py-3 font-semibold hover:bg-[#80c5bf] transition"
            >
              <LogOut size={19} />
              Logout
            </button>
 
          </div>
        </div>
      </div>
    );
  }
 
  // =========================
  // LOGIN / REGISTER PAGE
  // =========================
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-8">
 
      <div className="w-full max-w-[1150px] min-h-[620px] overflow-hidden rounded-[30px] shadow-2xl grid grid-cols-1 md:grid-cols-2">
 
        {/* LEFT SECTION */}
        <div className="relative bg-[#f9fcfc] flex flex-col justify-between p-8 sm:p-12 overflow-hidden min-h-[520px]">
 
          {/* BACKGROUND ILLUSTRATION */}
          <img
            src={illustration}
            alt="Shopping illustration"
            className="absolute inset-0 w-full h-full object-cover object-bottom"
          />
 
          {/* TOP: LOGO + TEXT */}
          <div className="relative z-10 text-center">
            <img
              src={logo}
              alt="DzShopi Logo"
              className="w-40 h-auto object-contain mx-auto"
            />
 

 

          </div>
 
          {/* FOOTER */}
          <div className="relative z-10 text-xs text-center text-white/80">
            © 2026 DzShopi. All rights reserved.
          </div>
 
        </div>
 
        {/* RIGHT SECTION */}
        <div className="bg-[#214d3d] flex items-center justify-center p-8 sm:p-12 md:p-14">
 
          <div className="w-full max-w-sm text-white">
 
            <h1 className="text-4xl font-bold mb-2">
              {isRegister ? "Create Account" : "Login"}
            </h1>
 
            <p className="text-sm text-white/60 mb-7">
              {isRegister
                ? "Create your account and start shopping."
                : "Welcome back! Please enter your details."}
            </p>
 
            {/* LOGIN FORM */}
            {!isRegister ? (
 
              <form onSubmit={handleSubmit} className="space-y-5">
 
                {/* USERNAME */}
                <div>
                  <label className="text-sm text-white/80 mb-2 block">
                    Username
                  </label>
 
                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50"
                    />
 
                    <input
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      autoComplete="username"
                      required
                      className="w-full rounded-full bg-[#153c30] py-3 pl-11 pr-5 text-sm outline-none placeholder:text-white/40 focus:ring-2 focus:ring-[#69b3ad] transition"
                    />
                  </div>
                </div>
 
                {/* PASSWORD */}
                <div>
                  <label className="text-sm text-white/80 mb-2 block">
                    Password
                  </label>
 
                  <div className="relative">
                    <LockKeyhole
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50"
                    />
 
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      required
                      className="w-full rounded-full bg-[#153c30] py-3 pl-11 pr-12 text-sm outline-none placeholder:text-white/40 focus:ring-2 focus:ring-[#69b3ad] transition"
                    />
 
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>
 
                <div className="text-right">
                  <a
                    href="/forgot-password"
                    className="text-xs text-[#80bcb7] hover:underline"
                  >
                    Forgot Password?
                  </a>
                </div>
 
                <button
                  type="submit"
                  className="w-full rounded-full bg-[#69b3ad] py-3 font-semibold text-white hover:bg-[#80c5bf] transition flex items-center justify-center gap-2"
                >
                  Login
                  <ArrowRight size={18} />
                </button>
 
              </form>
 
            ) : (
 
              /* REGISTER FORM */
              <form onSubmit={handleRegister} className="space-y-4">
 
                {/* FULL NAME */}
                <div>
                  <label className="text-sm text-white/80 mb-2 block">
                    Full Name
                  </label>
 
                  <div className="relative">
                    <UserRound
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50"
                    />
 
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      autoComplete="name"
                      required
                      className="w-full rounded-full bg-[#153c30] py-3 pl-11 pr-5 text-sm outline-none placeholder:text-white/40 focus:ring-2 focus:ring-[#69b3ad] transition"
                    />
                  </div>
                </div>
 
                {/* USERNAME */}
                <div>
                  <label className="text-sm text-white/80 mb-2 block">
                    Username
                  </label>
 
                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50"
                    />
 
                    <input
                      type="text"
                      placeholder="Choose a username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      autoComplete="username"
                      required
                      className="w-full rounded-full bg-[#153c30] py-3 pl-11 pr-5 text-sm outline-none placeholder:text-white/40 focus:ring-2 focus:ring-[#69b3ad] transition"
                    />
                  </div>
                </div>
 
                {/* EMAIL */}
                <div>
                  <label className="text-sm text-white/80 mb-2 block">
                    Email Address
                  </label>
 
                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50"
                    />
 
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      required
                      className="w-full rounded-full bg-[#153c30] py-3 pl-11 pr-5 text-sm outline-none placeholder:text-white/40 focus:ring-2 focus:ring-[#69b3ad] transition"
                    />
                  </div>
                </div>
 
                {/* PASSWORD */}
                <div>
                  <label className="text-sm text-white/80 mb-2 block">
                    Password
                  </label>
 
                  <div className="relative">
                    <LockKeyhole
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50"
                    />
 
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="new-password"
                      minLength={8}
                      required
                      className="w-full rounded-full bg-[#153c30] py-3 pl-11 pr-12 text-sm outline-none placeholder:text-white/40 focus:ring-2 focus:ring-[#69b3ad] transition"
                    />
 
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>
 
                {/* CONFIRM PASSWORD */}
                <div>
                  <label className="text-sm text-white/80 mb-2 block">
                    Confirm Password
                  </label>
 
                  <div className="relative">
                    <LockKeyhole
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50"
                    />
 
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      autoComplete="new-password"
                      required
                      className="w-full rounded-full bg-[#153c30] py-3 pl-11 pr-5 text-sm outline-none placeholder:text-white/40 focus:ring-2 focus:ring-[#69b3ad] transition"
                    />
                  </div>
                </div>
 
                {/* ERROR MESSAGE */}
                {error && (
                  <p className="text-sm text-red-300 text-center">
                    {error}
                  </p>
                )}
 
                {/* REGISTER BUTTON */}
                <button
                  type="submit"
                  className="w-full rounded-full bg-[#69b3ad] py-3 font-semibold text-white hover:bg-[#80c5bf] transition flex items-center justify-center gap-2"
                >
                  Create Account
                  <ArrowRight size={18} />
                </button>
 
              </form>
 
            )}
 
            {/* SWITCH LOGIN / REGISTER */}
            <div className="text-center mt-7 text-sm text-white/80">
 
              {isRegister
                ? "Already have an account?"
                : "Don't have an account?"}
 
              <button
                type="button"
                onClick={() => {
                  setIsRegister(!isRegister);
                  setError("");
                  setPassword("");
                  setConfirmPassword("");
                }}
                className="block mx-auto text-[#80bcb7] underline mt-1 hover:text-white transition"
              >
                {isRegister ? "Login Now" : "Register Now"}
              </button>
 
            </div>
 
            {/* FOOTER */}
            <div className="mt-10 text-center">
 
              <a
                href="/terms"
                className="text-xs text-white/50 hover:text-white underline transition"
              >
                Terms and Services
              </a>
 
              <p className="text-[10px] text-white/40 mt-7">
                Need help? Contact our support team.
              </p>
 
            </div>
 
          </div>
        </div>
 
      </div>
    </div>
  );
};
 
export default Login;