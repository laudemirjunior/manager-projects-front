import { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router";
import api from "../services";

interface ProviderProps {
  children: ReactNode;
}

interface LoginUser {
  email: string;
  password: string;
}

interface RegisterUser {
  name: string;
  email: string;
  password: string;
}

interface PatchUser {
  name?: string;
  email?: string;
  password?: string;
}

interface DataUserContext {
  login: (data: LoginUser) => Promise<void>;
  register: (data: RegisterUser) => Promise<void>;
  getUser: () => Promise<void>;
  patchUser: (data: PatchUser) => Promise<void>;
  token: string;
  headers: {
    headers: {
      Authorization: string;
    };
  };
  user: string;
  setToken: (token: string) => void;
}

const UserContext = createContext<DataUserContext>({} as DataUserContext);
const UserProvider = ({ children }: ProviderProps) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(
    localStorage.getItem("@superplay:token") || ""
  );
  const [user, setUser] = useState<string>("");

  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const login = async (data: LoginUser) =>
    await api
      .post("/user/login", data)
      .then((res) => {
        navigate("/dashboard");
        localStorage.setItem("@superplay:token", res.data.token);
        setToken(res.data.token);
      })
      .catch((err) => alert(err));

  const register = () =>
    api
      .post("/user/register")
      .then((res) => navigate("/login"))
      .catch((err) => alert(err));

  const getUser = () =>
    api
      .get("/user", headers)
      .then((res) => setUser(res.data.name))
      .catch((err) => alert(err));

  const patchUser = () =>
    api
      .patch("/user", headers)
      .then((res) => {})
      .catch((err) => alert(err));

  return (
    <UserContext.Provider
      value={{
        login,
        register,
        getUser,
        patchUser,
        token,
        headers,
        user,
        setToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

function UseUser() {
  const context = useContext(UserContext);

  return context;
}

export { UserProvider, UserContext, UseUser };
