import NavBar from '../../components/navbar/';
import EsqueciSenha from '../../components/esqueci-senha';
import Rodape from '../../components/rodape';
import { Fragment } from 'react';

function EditarSenha (){
    return(
    <Fragment>
        <header>
            <NavBar />
        </header>
        <main>
            <EsqueciSenha />
        </main>
        <footer>
            <Rodape />
        </footer>
    </Fragment>
    );
}

export default EditarSenha;