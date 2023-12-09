import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, Button } from '@nextui-org/react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
import { PlusIcon } from '../icons/PlusIcon'
import axios from "axios"



const AddClientModal = ({ type, colorSelected, updateList }) => {
  const { isOpen, onOpen, onClose } = useDisclosure("");


  const [name, setName] = useState("")
  const [telephone, setTelephone] = useState("")
  const [email, setEmail] = useState("")
  const [dni, setDni] = useState("")
  const [error, setError] = useState(false)
  const [succesMessage, setSuccesMessage] = useState(false)

  useEffect(() => { 
    axios.get("http://localhost:3000/clientes")
         .then((res) => { 
          console.log(res.data)
         })
         .catch((err) => { 
          console.log(err)
         })
  }, [])

  const createNewUser = () => { 
    if (name.length <= 3 || telephone.length <= 3 || dni.length <= 3) {
      setError(true)
    } else { 
      const userData = ({ 
        nombre: name,
        telefono: telephone,
        dni: dni,
        email: email,
      })
      axios.post("http://localhost:3000/clientes", userData)
           .then((res) => { 
               console.log(res.data)
               setSuccesMessage(true)
               setTimeout(() => { 
                onClose()
               }, 2200)
               })
       .catch((err) => { 
       console.log(err)
       })

    }
  }
 
 


  return (
    <>
      {type === "sideBar" ? 
      <small onClick={onOpen} className={`font-bold cursor-pointer ${colorSelected === 'white' ? 'text-black' : 'text-white'}`}>
       Crear Cliente
      </small> : 
       type === "table" ? 
       <Button onClick={onOpen} className="bg-foreground text-background font-bold cursor-pointer shadow-lg shadow-bottom-lg" style={{backgroundColor:"#60BCFF"}} endContent={<PlusIcon />} size="sm"> AÑADIR CLIENTE </Button>
      : null
       }
      <Modal isOpen={isOpen} onClose={onClose} className='max-w-max bg-white text-black'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-start justify-start text-center gap-1" style={{ color: "#728EC3" }}>
              Crear Cliente
              <div className='border border-gray-200 mt-2'></div>
              </ModalHeader>
               
              <ModalBody>
                  <div className='flex flex-col items-center justify-center text-center'>
                  <div className='flex flex-col mt-6 items-center justify-center'>
                     <input placeholder='Nombre' className='w-72 text-sm mt-6 rounded-lg'  style={{backgroundColor:"#E6EEFF"}} onChange={(e) => setName(e.target.value)}/>
                     <input placeholder='DNI' className='w-72 text-sm mt-6 rounded-lg'  style={{backgroundColor:"#E6EEFF"}} onChange={(e) => setDni(e.target.value)}/>
                     <input placeholder='Telefono' className='w-72 text-sm mt-4 rounded-lg'  style={{backgroundColor:"#E6EEFF"}}  onChange={(e) => setTelephone(e.target.value)}/>
                     <input placeholder='Email' className='w-72 text-sm mt-4 rounded-lg'  style={{backgroundColor:"#E6EEFF"}}  onChange={(e) => setEmail(e.target.value)}/>
                </div>

                 {succesMessage? 
                  
                  <p className='mt-12 font-bold' style={{ color: "#728EC3" }}>Cliente añadido con exito</p>

                 : 
                 <div className='flex justify-end w-full mt-4'>
                       <Button style={{backgroundColor:"#728EC3"}} className='text-white font-bold' onClick={() => createNewUser()}>Añadir Nuevo Cliente </Button>
                   </div>
                  
                  }
                  </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddClientModal;
