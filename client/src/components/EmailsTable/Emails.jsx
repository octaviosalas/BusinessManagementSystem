import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import axios from "axios";
import { useState, useEffect } from "react";
import DeleteProductModal from "../Modals/DeleteProductModal";


export default function Emails() {

  const {isOpen, onOpen, onClose} = useDisclosure();
  const [size, setSize] = React.useState("5xl") 
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([]);
  const [typeOfEmail, setTypeOfEmail] = useState("Proveedor")

  const showEmailsUpdated = () => {
    axios.get("http://localhost:3000/email")
         .then((res) => {
          const allData = res.data
          setData(allData)
          setTypeOfEmail("Proveedor")
        })
        .catch((err) => {
          console.log(err);
        });
  };


  useEffect(() => { 
    axios.get("http://localhost:3000/email")
         .then((res) => { 
            console.log("emailsss:", res.data)
            const emails = res.data
            const filteredEmails = emails.filter((em) => em.type === typeOfEmail)
            console.log(filteredEmails)
            setData(filteredEmails)

                  const columnLabelsMap = {
                      type: 'Tipo',
                      message: 'Mensaje',
                      date: 'Fecha',
                    };

                    const propiedades = Object.keys(res.data[0]).filter(propiedad => propiedad !== '__v' && propiedad !== '_id'  && propiedad !== 'addressee');
                    const columnObjects = propiedades.map(propiedad => ({
                        key: propiedad,
                        label: columnLabelsMap[propiedad] || propiedad.charAt(0).toUpperCase() + propiedad.slice(1),
                        allowsSorting: true
                      }));     

                    columnObjects.push({
                      key: 'Destinatario',
                      label: 'Destinatario',
                      cellRenderer: (cell) => { 
                        const filaActual = cell.row;
                        const id = filaActual.original._id;     
                        const addressee = filaActual.original.addressee;           
                        const getEmails = addressee.map((em) => em)
                        const emails = getEmails
                        const producto = {
                          id: id,
                        };
                        console.log(emails);
                        return (
                          <p>
                            {emails.length === 1 ? emails[0] : 
                            emails.length === 2 ? [emails[0], " ; " ,emails[1]] :  
                            emails.length >= 3 ? "Ver todos"  : null}
                          </p>
                        );
                      },
                    })         
  
                   columnObjects.push({
                    key: 'Eliminar',
                    label: 'Eliminar',
                    cellRenderer: (cell) => { 
                    const filaActual = cell.row;
                    const id = filaActual.original._id;
                    const producto = {
                    id: id
                    };
                    return (
                      <DeleteProductModal  producto={producto} type={"email"} showEmailsUpdated={showEmailsUpdated}/>
                    );
                  },
                  })                
             setColumns(columnObjects);
         })
         .catch((err) => { 
            console.log(err)
         })
  }, [typeOfEmail])

 
  const handleOpen = () => {
    onOpen();
  }

  return (
    <>
      <div className="flex flex-wrap gap-3">
          <small className="font-medium text-black" onClick={() => handleOpen()}>Ver Emails</small>

      </div>
      <Modal 
        size={size} 
        isOpen={isOpen} 
        onClose={onClose} 
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-medium" styler={{color:"#728EC3"}}>Emails Enviados</ModalHeader>
              <ModalBody>
                   <div>
                       {data.length !== 0 ?  
                       <div>   
                                <div className="flex h-14 justify-between items-start rounded-t-lg rounded-b-none w-full " style={{backgroundColor:"#E6EFFF"}}>
                                     <div className="flex justify-start items-center mt-4 ml-4 gap-8">
                                            <a className="tab text-white hover:text-white rounded-xl" style={{ backgroundColor: typeOfEmail === "Proveedor" ? "#728EC3" : "#A6BBE4" }} onClick={() => setTypeOfEmail("Proveedor")}>Proveedores</a>  
                                            <a className="tab text-white hover:text-white rounded-xl" style={{ backgroundColor: typeOfEmail === "Cliente" ? "#728EC3" : "#A6BBE4" }} onClick={() => setTypeOfEmail("Cliente")}>Clientes</a>                    
                                     </div>                                          
                                </div>                 
                                <Table aria-label="Example table with dynamic content" className="w-max-w max-h-[400px] 2xl:max-[600px] overflow-y-auto flex items-center text-center justify-center mt-4">
                                    <TableHeader columns={columns}>
                                    {(column) => (
                                        <TableColumn key={column.key} className="text-xs text-center items-center justify-center gap-6 ">
                                          {column.label}
                                        </TableColumn>
                                    )}
                                    </TableHeader>
                                    <TableBody items={data}>
                                    {(item) => (
                                        <TableRow key={item._id}>
                                        {columns.map(column => (
                                            <TableCell align="center" key={column.key}   className={`text-center text-black dark:text-black`}>
                                               {column.cellRenderer ? column.cellRenderer({ row: { original: item } }) : item[column.key]}
                                            </TableCell>
                                        ))}
                                        </TableRow>
                                    )}
                                    </TableBody>
                            </Table> 
                        </div>
                        : null}
                    </div>
             
              </ModalBody>
              <ModalFooter>
                <p className="font-medium text-black text-sm ">Cantidad de Emails: {data.length}</p>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}