import React, { useEffect, useState} from 'react'
import axios from 'axios'
import { alertaSuccess, alertaError, alertaWarning } from '../funciones'
import Swal from "sweetalert2"
import withReactContent from 'sweetalert2-react-content' 

const Users = () => {
    const [users, setUsers] = useState([])
    const [id, setId] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [role, setRole] = useState('')
    const [avatar, setAvatar] = useState('')
    const [titleModal, setTitleModal] = useState('')
    const [operation, setOperation] = useState(1)

    const url = 'https://api.escuelajs.co/api/v1/users'

    /**
     * Obtiene listado de productos desde la API
     */
    const getUsers = async () => {
        const response = await axios.get(url);
        setUsers(response.data)
    }

    useEffect(() => { 
        getUsers()
    })

    /**
     * Abre el modal con los atributos del producto, si se va a editar, se cargan los datos
     * @param {Number} operation - 1. Agregar, 2. Editar 
     * @param {Number} id - Identificador del producto
     * @param {String} email - Correo electronico del usuario
     * @param {String} password - Contraseña de usuario
     * @param {String} name - nombre del usuario
     * @param {String} role - tipo de usuario
     *  @param {img} avatar - foto del usuario
     */
    const openModal = (operation, id, email, password, name, role, avatar) => {
        setId('')
        setEmail('')
        setPassword('')
        setName('')
        setRole('')
        setAvatar('')

        if (operation === 1) {
            setTitleModal('Registrar Usuario')
            setOperation(1)
        } else if(operation === 2) {
            setTitleModal('Editar Editar')
            setOperation(2)
            setId(id)
            setEmail(email)
            setPassword(password)
            setName(name)
            setRole(role)
            setAvatar(avatar)
        }
    }
    /**
     * Permite el uso de la API dependiendo el tipo de operación
     * 
     * @param {string} url - URL de la API a consumir
     * @param {string} metodo - Tipo de método a utilizar: POST, PUT, PATCH o DELETE
     * @param {JSON} parametros - Objeto JSON que se enviará a la API
     */
    const enviarSolicitud = async (url, metodo, parametros = {}) => {
        let obj = {
            method: metodo,
            url: url,
            data: parametros,
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        }

        await axios(obj).then(() => {
            let mensaje

            if (metodo === "POST") {
                mensaje = 'Se guardó el usuario'
            } else if (metodo === "PUT") {
                mensaje = 'Se editó el usuario'
            } else if (metodo === "DELETE") {
                mensaje = 'Se eliminó el usuario'
            }
            alertaSuccess(mensaje)
            document.getElementById('btnCerrarModal').click()
            getUsers()
        }).catch((error) => {
            alertaError(error.response.data.message)
        })
    }

    /**
     * Valida que cada uno de los campos del formulario no vayan vacíos
     */
    const validar = () => {
        let payload
        let metodo
        let urlAxios

        if (email === '') {
            alertaWarning('Correo eLectrónico del usuario en blanco', 'email')
        } else if (name === '') {
            alertaWarning('Nombre del usuario en blanco', 'Nombre')
        } else if (password === '') {
            alertaWarning('Contraseña del usuario en blanco', 'password')
        } else {
            payload = {
                email: email,
                password: password,
                name: name,
                role: 'admin',
                avatar:'https://c8.alamy.com/compes/r3yw81/el-icono-de-imagen-no-disponible-vector-plana-r3yw81.jpg'
            }

            if (operation === 1) {
                metodo = 'POST'
                urlAxios = 'https://api.escuelajs.co/api/v1/users/'
            } else {
                metodo = 'PUT'
                urlAxios = `https://api.escuelajs.co/api/v1/users/${id}`
            }

            enviarSolicitud(urlAxios, metodo, payload)
        }
    }

    /**
     * Proceso para eliminar un producto
     * 
     * @param {Number} id - Identificador del producto a eliminar 
     */
    const deleteUsers = (id) => {
        let urlDelete = `https://api.escuelajs.co/api/v1/users/${id}`

        const MySwal = withReactContent(Swal)

        MySwal.fire({
            title: '¿Está seguro de eliminar el producto?',
            icon: 'question',
            text: 'No habrá marcha atrás',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                setId(id)
                enviarSolicitud(urlDelete, 'DELETE')
            }
        }).catch((error) => {
            alertaError(error)
        })
    }

    return(
        <div className="App">
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-md-4 offset-md-4">
                        <div className="d-grid mx-auto">
                            <button onClick={() => openModal(1)} className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#modalUsers">
                                <i className="fa-solid fa-circle-plus" /> Añadir
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col*-12 col-lg-8 offset-0 offset-lg-2">
                    <div className="table-responsive">
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Correo Electronico</th>
                                    <th>Contraseña</th>
                                    <th>Nombre</th>
                                    <th>Rol</th>
                                    <th>Foto</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody className='table-group-divider'>
                                {
                                    users.map((users, i) => (
                                        <tr key={users.id}>
                                            <td>{i + 1}</td>
                                            <td>{users.email}</td>
                                            <td>************</td>
                                            <td>{users.name}</td>
                                            <td>{users.role}</td>
                                            <td><img src= {users.avatar} alt='imagen'/></td>
                                            <td>
                                                <button onClick={() => openModal(2, users.id, users.email, users.password, users.name) } className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalUsers' >
                                                    <i className='fa-solid fa-edit' />
                                                </button>
                                                <button onClick={() => deleteUsers(users.id)} className='btn btn-danger' >
                                                    <i className='fa-solid fa-trash' />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div id='modalUsers' className='modal fade' area-hidden='true'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <label className='h5'>{titleModal}</label>
                            <button className='btn-close' data-bs-dismiss='modal' aria-label='close' />
                        </div>
                        <div className='modal-body'>
                            <input type='hidden' id='id' />
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-gift' /></span>
                                <input type='text' id='email' className='form-control' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-comment' /></span>
                                <input type='password' id='password' className='form-control' placeholder='Contraseña' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-dollar-sign' /></span>
                                <input type='text' id='Nombre' className='form-control' placeholder='Nombre' value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-dollar-sign' /></span>
                                <input type='text' id='Rol' className='form-control' placeholder='Rol' value={role} onChange={(e) => setRole(e.target.value)} />
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-dollar-sign' /></span>
                                <input type='text' id='Foto' className='form-control' placeholder='Foto' value={avatar} onChange={(e) => setAvatar(e.target.value)} />
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button onClick={() => validar()} className='btn btn-success'>
                                <i className='fa solid fa-floppy-disk' /> Guardar
                            </button>
                            <button id='cerrarModal' className='btn btn-danger' data-bs-dismiss='modal' > Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Users;