import React, { useEffect, useState } from "react";
import axios from "axios";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import obtenerFechaActual from "../../functions/actualDate";

export default function EmailToProvider() {

  const {isOpen, onOpen, onClose} = useDisclosure();
  const [size, setSize] = React.useState('3xl')

  const [email, setEmail] = useState([])
  const [message, setMessage] = useState("") 
  const [noShowSucces, setNoShowSucces] = useState(true)
  const [actualDate, setActualDate] = useState(obtenerFechaActual())

  const [proveedores, setProveedores] = useState({
    proveedor: '',
  });

  const sendMyEmail = () => { 
    const emailData = ({ 
       addressee: email,
       message: message,
       type: "Proveedor",
       date: actualDate
    })
    axios.post("http://localhost:3000/email", emailData)
         .then((res) => { 
            console.log(res.data)
            if(res.data.mensaje === 'Correo electrónico enviado y almacenado con éxito') { 
              setNoShowSucces(false)
            }
            setTimeout(() => { 
              onClose()
              setNoShowSucces(true)
            }, 4500)
         })
         .catch((err) => console.log(err))
  }

  const handleOpen = (size) => {
    setSize(size)
    onOpen();
  }

  useEffect(() => { 
    console.log(email)
  }, [email])

  
  useEffect(() => { 
    console.log(proveedores)
  }, [proveedores])

  return (
    <>
      <div className="flex flex-wrap gap-3">
          <small className="font-medium text-black" key={size} onClick={() => handleOpen(size)}>Email a Proveedores</small>
      </div>
      <Modal size={size} isOpen={isOpen} onClose={onClose} className="bg-white text-black">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-medium" style={{color:"#728EC3"}}>Email</ModalHeader>
            {noShowSucces ? 
              <ModalBody>
                 <div className="w-full flex flex-col items-center justify-center">
                      <div className="w-full">
                        
                         <input type="text" className="w-full h-7 rounded-lg border border-zinc-200 focus:outline-none focus:ring-0" placeholder="Provedor.." onChange={(e) => setEmail(e.target.value)}/>
                       
                      </div>
                      <div className="w-full h-full mt-6">
                        <textarea className="w-full h-full rounded-lg border border-zinc-200 focus:outline-none focus:ring-0" onChange={(e) => setMessage(e.target.value)}></textarea>
                      </div>
                 </div>
                 <div className="flex items-center justify-end mt-4">
                     <button className="text-sm font-bold text-white" style={{backgroundColor:"#728EC3"}} onClick={() => sendMyEmail()}>Enviar</button>
                 </div>
               
              </ModalBody> 
              :
              <div className="flex items-center justify-center m-8">
                <p style={{color:"#728EC3"}} className="text-md font-bold">Correo electronico enviado con exito a: {email}</p>
              </div>
              }
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
