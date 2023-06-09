import { useEffect, useRef, useState } from "react"
import { reqResApi } from "../../api/reqRes"
import { ReqResListado, Usuario } from '../../interfaces/reqRes';

export const useUsuarios = () => {

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    const paginaRef = useRef(1)

    useEffect(() => {
        //Llamado al API

        cargarUsuarios();


    }, [])

    //Función para poder hacer la paginación.
    const cargarUsuarios = async () => {
        const resp = await reqResApi.get<ReqResListado>('/users', {
            params: {
                page: paginaRef.current
            }
        })
        if (resp.data.data.length > 0) {
            setUsuarios(resp.data.data);
        } else {
            paginaRef.current--;
            alert('No hay mas registro')
        }


    }
    //Función que renderiza todos los items de la tabla.
    const renderItem = ({ id, first_name, last_name, email, avatar }: Usuario) => {
        return (
            <tr key={id.toString()}>
                <td>
                    <img src={avatar}
                        alt={first_name}
                        style={{
                            width: 35,
                            borderRadius: 100
                        }} />
                </td>
                <td>{first_name} {last_name}</td>
                <td>{email}</td>
            </tr>
        )
    }
    const paginaSiguiente = async () => {
        paginaRef.current++;
        cargarUsuarios();

    }
    const paginaAnterior = async () => {
        if (paginaRef.current > 1) {
            paginaRef.current--;
            cargarUsuarios();
        }

    }
    //Retornamos todos los componentes.
    return {
        usuarios,
        paginaSiguiente,
        paginaAnterior,
        renderItem

    }
}
