import { InputLabel, OutlinedInput, Button } from "@mui/material";

import "./Card.scss";

const Cart = () => {
    return (
        <div className="card px-4 pb-4">
            <div className="py-2">
                <InputLabel>Projeto</InputLabel>
                <OutlinedInput placeholder="Digite o nome do projeto"></OutlinedInput>
            </div>
            <div className="pt-2">
                <Button color="primary" variant="outlined">Enviar arquivo</Button>
            </div>
        </div>
    )
}

export default Cart;