import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/UseAuth";
import Footer from "./component/Footer";
import Header from "./component/Header";

const RutaProtegida = () => {
  const {auth, cargando }= useAuth()



  if(cargando) return ("Cargando..")
  return (
    <>
      <Header />      
      {auth?._id ? (
        <main  className="container mx-auto mt-10">

         <Outlet /> 
        </main>
         )
         : <Navigate to="/" /> }
        <Footer />
    </>
  )
}

export default RutaProtegida