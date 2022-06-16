import { createContext, useEffect, useState } from "react";
import clienteAxios from "../config/axios";

const PacientesContext = createContext();

const PacientesProvider = ({children}) =>{
    const [pacientes, setPacientes] = useState([]);

    const [paciente, setPaciente] = useState({})
    useEffect(()=>{
        const obtenerPacientes = async () =>{
          
            try {
                const token = localStorage.getItem("token");
                if(!token) return
                const config = {
                    headers: {
                        "Content-Type" : "application/json",
                        Authorization : `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios("/pacientes", config)
                setPacientes(data)
    
            } catch (error) {
                console.log(error)
            }
        }
        obtenerPacientes();
    },[])

    const guardarPacientes = async (paciente) =>{
        console.log(paciente)

        const token = localStorage.getItem("token")
        const config = {
            headers: {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${token}`
            }
        }
        if(paciente.id){
            try {
                const { data } = await clienteAxios.patch(`/pacientes/${paciente.id}`, paciente, config)
                const pacientesActulizados = pacientes.map( pacienteState => pacienteState._id === data._id ? data : pacienteState)
                setPacientes(pacientesActulizados)
            } catch (error) {
                console.log(error)
            }
        }else{
            try {   
            
                const {data} = await clienteAxios.post("/pacientes", paciente, config )
                const {createdAt, updatedAt, __v, ...pacienteAlmacenado} = data
    
                setPacientes([pacienteAlmacenado, ...pacientes])
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
    }

    const setEdicion= (paciente)=>{
      setPaciente(paciente)
     

    }
    const eliminarPaciente= async (id) =>{
       const confirmar = confirm("¿Seguro que quieres elimnar el paciente?");
       console.log(confirmar)

       try {
        const token = localStorage.getItem("token")
        const config = {
            headers: {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${token}`
            }
        }
        const { data } = await clienteAxios.delete(`/pacientes/${id}` , config)
        const pacientesActulizados = pacientes.filter(pacientesState=> pacientesState._id !== id)
        setPacientes(pacientesActulizados)
       } catch (error){
        console.log(error)
       }
    }

    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPacientes,
                setEdicion,
                paciente,
                eliminarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}

export {
    PacientesProvider
}
export default PacientesContext