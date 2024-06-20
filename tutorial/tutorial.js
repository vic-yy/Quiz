function capslock(props){
    const textoInserido = props.texto;
    const textoEmCapslock = textoInserido.toUpperCase();
    return <div>{textoEmCapslock}   </div>
}

function Pagina(){
    return <capslock texto="Massinha"/>
}