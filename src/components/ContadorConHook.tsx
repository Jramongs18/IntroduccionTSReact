import { useCounter } from './hooks/useCounter';

export const ContadorConHook = () => {

    const { contador, acumular } = useCounter();

    return (
        <>
            <h3>Contador con Hook <small>{contador}</small></h3>
            <button onClick={() => acumular(1)} className="btn btn-primary">+1</button>
            &nbsp;
            <button onClick={() => acumular(-1)} className="btn btn-primary">-1</button>
        </>
    );
}
