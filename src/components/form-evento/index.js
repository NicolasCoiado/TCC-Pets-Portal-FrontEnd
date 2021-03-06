import React, {useState} from 'react';
import { TextInput, Textarea, Select, Button } from 'react-materialize';
import { MdSend, MdDone } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import API from '../../api';
import './style.css'

function FormEvento (){

    const [nome, setNome] = useState('');
    const [local, setLocal] = useState('');
    const [data, setData] = useState('');
    const [observacao, setObservacao] = useState('');
    const [especies, setEspecies] = useState('geral');
    const [banner, setBanner] = useState('');

    const [btn, setBtn] = useState('');

    const [upload, setUpload] = useState('vazio');
    
    const history = useHistory();

    const handleSubmitEvento = (e) =>{
        e.preventDefault();
        setBtn('clickado');
        let evento = new FormData();
        evento.append('nome', nome)
        evento.append('local', local)
        evento.append('data', data)
        evento.append('especies',especies)
        evento.append('observacao',observacao)
        if(banner)
            evento.append('banner', banner , banner.name)

        API.post("/events/cadastro", evento, {
            headers: {
                'Authorization' : 'Bearer ' + window.localStorage.getItem('token'),
                'accept': 'application/json',
                'Content-Type': `multipart/form-data; boundary=${evento._boundary}`
            }
          })
          
            .then(res => {
                history.push("/");
            })
            .catch(err =>{
                console.log(err)    
                window.alert('O formulário possui erro(s)!')   
            })
        }
    
    const handleUpload= (e) => {
        e.preventDefault()
        setBanner (e.target.files[0])
        setUpload ('uploded')
    };

    return(
        <div id="form-areas">
            <form id="form-area"  onSubmit={e => handleSubmitEvento(e)}>
                <h3 className="title-cadastrar">Cadastrar Evento</h3>
                <TextInput            
                    label="Nome"
                    onChange={e => setNome (e.target.value)}
                />
                <TextInput            
                    label="Local do evento"
                    onChange={e => setLocal (e.target.value)}
                />
                <h1>
                    Data e Horário do Evento
                </h1>
                <TextInput               
                    type="datetime-local"  
                    onChange={e => setData (e.target.value)}
                />
                <Textarea
                    data-length={120}
                    label="Observações"
                    onChange={e => setObservacao(e.target.value)}
                />
                <Select
                    className="campo-form-pessoa"
                    multiple={false}
                    onChange={e => setEspecies (e.target.value)}
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

                >
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
                <p className="paragraph-cadastrar">A arte de divulgação deve possuir as dimenções de 1920px (largura) X 400px (altura).</p>
                {(upload !== "uploded")
                ?(
                <div className="upload-area-banner">
                    <label htmlFor="file-upload" className="custom-file-upload-banner">
                            Banner de divulgação
                    </label>
                    <input id="file-upload" onChange={e => handleUpload(e)} type="file" />    
                </div>
                ):(
                <>
                    <div className="upload-area-banner">
                        <label htmlFor="file-upload" className="custom-file-upload-banner">
                                Banner de divulgação
                        </label>
                        <input id="file-upload" onChange={e => handleUpload(e)} type="file" />    
                    </div>
                    <div className="center">
                        <Button
                            className="icon-file-upload-evento"
                            floating
                            icon={<MdDone />}
                            large
                            node="button"
                        />
                    </div>
                </>
                )}
                <div className="btn-area-cadEvento">
                    {btn=='' 
                    ?
                        <Button
                            className="btn-submit-form-Evento"
                            node="button"
                            type="submit"
                            waves="light"
                        >
                            <MdSend className="send-icon" />
                            Cadastrar Evento
                        </Button>
                    :
                        <Button
                            className="btn-submit-form-Evento"
                            node="button"
                            type="submit"
                            waves="light"
                            disabled
                        >
                            <MdSend className="send-icon" />
                            Cadastrar Evento
                        </Button>
                    }
                </div>
            </form>
        </div>
    );
}

export default FormEvento;