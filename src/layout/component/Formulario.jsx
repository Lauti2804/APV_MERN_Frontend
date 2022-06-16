import { useState, useEffect } from "react"
import Alerta from "./Alerta"
import usePacientes from "../../../hooks/usePacientes";


const Formulario = () => {
    const [nombre,setNombre] = useState("");
    const [propietario, setPropietario] = useState("");
    const [email,setEmail]= useState("");
    const [fecha,setFecha]= useState("");
    const [sintomas,setSintomas] = useState("");
    const [id,setId] = useState(null)

    const [alerta,setAlerta] = useState({});

    const { guardarPacientes, paciente } = usePacientes();

    useEffect(()=>{
        if(paciente?.nombre){
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
            setId(paciente._id)
        }
    },[paciente])

    const handleSubmit = e =>{
        e.preventDefault();

        if([nombre, propietario, email, fecha, sintomas].includes("")){
            setAlerta({
                msg:"Todos los campos son obligatorios",
                error:true
            })
            return
        }

        setAlerta({})
        guardarPacientes({nombre, propietario, email, fecha, sintomas, id})
        setAlerta({
            msg:"Guardado Correctamente"
          })
    
          setNombre("")
          setPropietario("")
          setFecha("")
          setEmail("")
          setSintomas("")
          setId("")
    }
    const {msg} = alerta

    return (
        <>
         <h2 className="font-black text-3xl text-center">Administrador de Pacientes</h2>

            <p className="text-lg text-center mb-10 text-gray-500">Añade tus pacientes y <span className="font-bold text-indigo-600 text-black">Administralos</span></p>

            {msg && <Alerta alerta={alerta} />}
            <form
            className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow rounded-md"
            onSubmit={handleSubmit}
            >
                <div className="mb-5">
                    <label htmlFor="nombre"
                        className="uppercase font-bold text-gray-700"
                    >Nombre Mascota</label>
                    <input
                        type="text"
                        id="nombre"
                        placeholder="Nombre de tu Mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="propietario"
                        className="uppercase font-bold text-gray-700"
                    >Nombre Propietario</label>
                    <input
                        type="text"
                        id="propietario"
                        placeholder="Nombre del Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={propietario}
                        onChange={e => setPropietario(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="email"
                        className="uppercase font-bold text-gray-700"
                    >E-mail</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email del Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={e => setEmail(e.target.value)}

                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="fecha"
                        className="uppercase font-bold text-gray-700"
                    >Fecha de Alta</label>
                    <input
                        type="date"
                        id="fecha"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fecha}
                        onChange={e => setFecha(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="sintomas"
                        className="uppercase font-bold text-gray-700"
                    >Sintomas</label>
                    <textarea
                        id="sintomas"
                        placeholder="Describe los sintomas "
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={sintomas}
                        onChange={e => setSintomas(e.target.value)}
                    />
                </div>

                <input
                type="submit"
                className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-800 cursor-pointer transition-colors"
                value={id ? "Guardar Cambios" : "Agregar Pacientes"}

                />

            </form>
        </>


    )
}

export default Formulario