import { useContext } from "react";
import AuthContext from "./Helper/AuthProvider";

const useAuth = () => {
    return useContext(AuthContext)
}


export default useAuth