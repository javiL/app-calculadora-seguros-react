import { createContext, useState } from 'react'
import {obtenerDiferenciaYears, calcularMarca, calcularPlan, formatearDinero} from '../helpers'

const CotizadorContext = createContext()

const CotizadorProvider = ({children}) => {
    //Aqui se pueden definir funciones, States, Effects...

    //setState con objeto de datos
    const [datos, setDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    })

    const [error, setError] = useState('')
    const [resultado, setResultado] = useState(0)
    const [cargando, setCargando] = useState(false)

    

    //setea el State cogiendo una copia del array y añadiendo el evento
    const handleChangeDatos = e => {
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    const CotizarSeguro = () => {
        // Base
        let resultado = 2000
        // Obt diferencia de año
        const diferencia = obtenerDiferenciaYears(datos.year)
        
        // Hay que restar el 3% por cada año
        resultado -= ((diferencia * 3) * resultado) / 100

        // Americano 15%
        // Europeo 30%
        // Asiatico 5%

        resultado *= calcularMarca(datos.marca)

        //Basico 30%
        //Completo 50%
        resultado *= calcularPlan(datos.plan)

        //Formatear dinero
        resultado = formatearDinero(resultado)

        setCargando(true)

        setTimeout(() => {
            setResultado(resultado)
            setCargando(false)
        }, 3000);
        

    }

    return(
        <CotizadorContext.Provider
            value={{
                datos,
                handleChangeDatos,
                error,
                setError,
                CotizarSeguro,
                resultado,
                cargando
            }}
        >
            {children}
        </CotizadorContext.Provider>
    )
}

export {
    CotizadorProvider
}

export default CotizadorContext