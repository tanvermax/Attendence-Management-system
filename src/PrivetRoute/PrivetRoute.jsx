import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivetRoute = ({ children }) => {


    const { loading,user } = useAuth();


 if (loading) {
    return <div className="text-center py-8">Checking login...</div>;
  }



    if (user) {
        return children

    }
    return <Navigate to={"/login"} replace></Navigate>;
}



export default PrivetRoute;