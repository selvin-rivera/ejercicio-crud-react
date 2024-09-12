import React, { useEffect, useState} from 'react'
import axios from 'axios'

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

    return(
        <div className="App">
            <div className="row mt-3">
                <div className="col*-12 col-lg-8 offset-0 offset-lg-2">
                    <div className="table-responsive">
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Email</th>
                                    <th>Contraseña</th>
                                    <th>Nombre</th>
                                    <th>Usuario</th>
                                    <th>Foto</th>
                                </tr>
                            </thead>
                            <tbody className='table-group-divider'>
                                {
                                    users.map((users, i) => (
                                        <tr key={users.id}>
                                            <td>{i + 1}</td>
                                            <td>{users.email}</td>
                                            <td>{users.password}</td>
                                            <td>{users.name}</td>
                                            <td>{users.role}</td>
                                            <td>{users.avatar}</td>
                                            <td>
                                                <button onClick={() => openModal(2, users.id, users.email, users.password, users.name, users.role, users.avatar) } className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalProductos' >
                                                    <i className='fa-solid fa-edit' />
                                                </button>
                                                <button className='btn btn-danger' >
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
                                <input type='text' id='password' className='form-control' placeholder='Constraseña' value={password} onChange={(e) => setPassword(e.target.value)} />
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
                                <input type='text' id='Perfil' className='form-control' placeholder='Perfil' value={avatar} onChange={(e) => setAvatar(e.target.value)} />
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button className='btn btn-success'>
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