import React, { useEffect, useState } from 'react';
import { Collection, CollectionItem, Modal, Button, TextInput } from 'react-materialize';
import { ImCross } from 'react-icons/im';
import { FaFilter } from 'react-icons/fa';
import API from '../../../api';

function OngsValidation (){

    const [nome, setNome] = useState();

    const [ongs, setOngs] = useState();

    useEffect(() => {
        
        let tokens = {}
        if(window.localStorage.getItem('token'))
        {
            tokens.headers= {Authorization : 'Bearer ' + window.localStorage.getItem('token')}
        }

        API.post(`admin/validate/ong`, {limit: 1}, tokens)
        .then(res => {
            console.log(res.data)
            setOngs(res.data.ongs)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const verificar = (e, id) => {
        e.preventDefault();
        let tokens = {}
        if(window.localStorage.getItem('token'))
        {
            tokens.headers= {Authorization : 'Bearer ' + window.localStorage.getItem('token')}
        }

        API.post("/admin/validate/ong/validate", {ong : id}, tokens)
        .then(res => {
            window.location.reload();
            console.log("Deu bom")
        })
        .catch(err =>{
            console.log(err)
        })
    }

    const filtrarOngs = (e , skip) =>{
        e.preventDefault();
        let tokens = {}
        if(window.localStorage.getItem('token'))
        {
            tokens.headers= {Authorization : 'Bearer ' + window.localStorage.getItem('token')}
        }
        let filtro = {
            nome,
            limit : 5,
            skip, 
            btn: true
        }
        API.post("/admin/validate/ong", filtro, tokens )
        .then(res => {
            console.log("Deu bom")
            console.log(res.data.ongs);
            if(skip==0)
                setOngs(res.data.ongs)
            else    
                setOngs(ongs.concat(res.data.ongs))
        })
        .catch(err =>{
            console.log(err)
        })
    }

    return(
    <>
        <div id="filters-area">
            <h1 id="filters-title">Filtros:</h1>
            <Modal
                actions={[
                    <Button className="close-modal" flat modal="close" node="button"><ImCross /></Button>
                ]}
                bottomSheet={false}
                fixedFooter={false}
                open={false}
                options={{
                    dismissible: true,
                    endingTop: '10%',
                    inDuration: 250,
                    onCloseEnd: null,
                    onCloseStart: null,
                    onOpenEnd: null,
                    onOpenStart: null,
                    opacity: 0.5,
                    outDuration: 250,
                    preventScrolling: true,
                    startingTop: '4%'
                }}
                trigger={<Button className="btn-filtros" node="button"><FaFilter className="icon-btn-filter" />Aplicar</Button>}
                >
                <div className="area-filter">
                    <h1 className="title-filter">FILTRO DE ADOÇÕES:</h1>
                    <form onSubmit={e=>filtrarOngs(e, 0)}>
                        <TextInput
                            label="Nome da ONG"
                            onChange={e => setNome(e.target.value)}
                        />
                        
                        <Button className="subbmit-filtros" type="submmit">Aplicar filtro</Button>
                    </form>
                </div>
            </Modal>
        </div>
        <div className="reqs-component">
            <Collection className="cltn-reqs">
                {ongs&&
                    ongs.map(ong => 
                    ( 
                        <CollectionItem key={ong._id} className="cltni-reqs">
                            {ong.nome}
                            <Button
                                //TODO: Descomente linha abaixo para funfar
                                //Lembre de avisar o Théo, para mandar somente as infos que tu quer
                                //onClick={e=>verificar(e, ong._id)}
                            >
                                button
                            </Button>
                        </CollectionItem>
                    ))
                }
            </Collection>
            <Button
                onClick={e => filtrarOngs (e, ongs.length)}
            >
                button
            </Button>
        </div>
    </>
    );
}

export default OngsValidation;