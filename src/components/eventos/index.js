import 'materialize-css';
import React, { useRef, useEffect, useState } from 'react';
import { Modal, Button, Select, TextInput, Collection, CollectionItem } from 'react-materialize';
import { Link } from "react-router-dom";
import { ImCross } from 'react-icons/im';
import { GiSittingDog } from 'react-icons/gi'
import { IoIosPeople } from 'react-icons/io'
import { FaFilter } from 'react-icons/fa';
import ViewerImgPro from '../viewer-img-pro/'
import API from '../../api';
import './style.css';


function Eventos (){

    const [nome, setNome] = useState();
    const [local, setLocal] = useState();
    const [especie, setEspecie] = useState();

    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        
        let tokens = {}
        if(window.localStorage.getItem('token'))
        {
            tokens.headers= {Authorization : 'Bearer ' + window.localStorage.getItem('token')}
        }

        API.post(`/search/eventos`, {limit: 10}, tokens)
        .then(res => {
            console.log(res.data)
            setEventos(res.data.eventos)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const filtrarEventos = (e) =>{
        e.preventDefault();
        let tokens = {}
        if(window.localStorage.getItem('token'))
        {
            tokens.headers= {Authorization : 'Bearer ' + window.localStorage.getItem('token')}
        }
        let filtro = {
            nome, 
            local,
            especie
        }
        API.post("/search/eventos", filtro, tokens )
        .then(res => {
            console.log("Deu bom")
            console.log(res.data.eventos);
            setEventos(res.data.eventos)
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
                    <h1 className="title-filter">FILTRO EVENTOS:</h1>
                    <form onSubmit={filtrarEventos}>
                        <TextInput
                            label="Nome específico de evento"
                            onChange={e => setNome(e.target.value)}
                        />
                        <TextInput
                            label="Local de evento"
                            onChange={e => setLocal(e.target.value)}
                        />
                        <Select
                            multiple={false}
                            onChange={e => setEspecie(e.target.value)}
                            options={{
                                classes: '',
                                dropdownOptions: {
                                alignment: 'left',
                                autoTrigger: true,
                                closeOnClick: true,
                                constrainWidth: true,
                                coverTrigger: true,
                                hover: false,
                                inDuration: 150,
                                onCloseEnd: null,
                                onCloseStart: null,
                                onOpenEnd: null,
                                onOpenStart: null,
                                outDuration: 250
                                }
                            }}
                            value=""
                            >
                                <option
                                    value="geral"
                                    disabled
                                >
                                    Espécies disponíveis
                                </option>
                                <option
                                    value="geral"
                                >
                                    Geral
                                </option>
                                <option
                                    value="cg"
                                >
                                    Cães e Gatos
                                </option>
                                <option value="c">
                                    Somente cães
                                </option>
                                <option value="g">
                                    Somente gatos
                                </option>
                        </Select>
                        <Button className="subbmit-filtros" type="submmit"><IoIosPeople  className="icon-btn-filter" />Aplicar filtro</Button>
                    </form>
                </div>
            </Modal>
        </div>
        <div className="reqs-component">
            <Collection className="cltn-reqs">
                {eventos &&
                    /* TODO: Colocar load enquanto os animais não carregarem */
                    eventos.map(evento => (
                        <CollectionItem className="cltni-reqs">
                            <Link to={evento}>
                                <ViewerImgPro /*uploadUrl={}*/ />
                            </Link>
                            <div className="itens-cltn">
                                <div className="animal-name">
                                    <h3 className="title-cltn"> Nome do animal: </h3>
                                    <h1 className="name-cltn">{evento.nome}</h1>
                                </div>
                                <div className="itens-cltn-obs">
                                    <h1 className="title-cltn-obs"> Observacao: </h1>
                                    <h1 className="name-cltn-obs">{evento.observacao || 'Nenhuma'}</h1>
                                </div>
                            </div>
                            <Link to={'/evento/'+evento._id}>
                                <Button>
                                    Ver animal
                                </Button>
                            </Link>
                        </CollectionItem>
                    ))
                }
            </Collection>
        </div>
    </>
    );
}

export default Eventos;