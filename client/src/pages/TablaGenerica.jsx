import React from "react";
import {Table,TableHeader,TableColumn,TableBody,TableRow,TableCell, Button, Input, Pagination} from "@nextui-org/react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios"
import { useRef } from "react";
import Loading from "../components/LoadingComponent/Loading";
import FiltersModal from "../components/Modals/FiltersModal";
import AddProductModal from "../components/Modals/AddProductModal";
import { SearchIcon } from "../components/icons/SearchIcon";
import DeleteProductModal from "../components/Modals/DeleteProductModal";
import EditModal from "../components/Modals/EditModal";
import AddProviderModal from "../components/Modals/AddProviderModal";
import AddSellModal from "../components/Modals/AddSellModal"
import BuysTable from "../components/BuysTable/BuysTable";
import PaginationTable from "../components/Pagination/Pagination"
import ChooseBranch from "../components/Branch/ChooseBranch";
import AddClientModal from "../components/Modals/AddClientModal";
import ViewBuyDetail from "../components/Modals/ViewBuyDetail";
import AddBuyModal from "../components/Modals/AddBuyModal";
import { formatePrice } from "../functions/formatPrice";

const Tabla = () => {
    const tableRef = useRef(null);
    const [activeTab, setActiveTab] = useState('productos');
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [selectionBehavior, setSelectionBehavior] = React.useState("toggle");
    const [load, setLoad] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [showBuyTable, setShowBuyTable] = useState(false)
    const [sliceData, setSliceData] = useState([])
    const [firstNumberOfSlice, setFirstNumberOfSlice] = useState(0)
    const [secondNumberOfSlice, setSecondNumberOfSlice] = useState(10)

    const showBuysUpdated = () => {
      axios.get("http://localhost:3000/compras")
           .then((res) => {
            const allData = res.data
            const newArrayFiltered = allData.slice(firstNumberOfSlice, secondNumberOfSlice)
            setSliceData(newArrayFiltered)
          })
          .catch((err) => {
            console.log(err);
          });
    };

    const showProductsUpdated = () => {
      axios.get("http://localhost:3000/productos")
           .then((res) => {
            const allData = res.data
            const newArrayFiltered = allData.slice(firstNumberOfSlice, secondNumberOfSlice)
            setSliceData(newArrayFiltered)
          })
          .catch((err) => {
            console.log(err);
          });
    };

    const showClientsUpdated = () => {
      axios.get("http://localhost:3000/clientes")
           .then((res) => {
            const allData = res.data
            const newArrayFiltered = allData.slice(firstNumberOfSlice, secondNumberOfSlice)
            setSliceData(newArrayFiltered)
          })
          .catch((err) => {
            console.log(err);
          });
    };

    const showProvidersEdited = () => {
      axios.get("http://localhost:3000/proveedores")
           .then((res) => {
            const allData = res.data
            const newArrayFiltered = allData.slice(firstNumberOfSlice, secondNumberOfSlice)
            setSliceData(newArrayFiltered)
          })
          .catch((err) => {
            console.log(err);
          });
    };

    const showSaleEdited = () => {
      axios.get("http://localhost:3000/venta")
           .then((res) => {
            const allData = res.data
            const newArrayFiltered = allData.slice(firstNumberOfSlice, secondNumberOfSlice)
            setSliceData(newArrayFiltered)
          })
          .catch((err) => {
            console.log(err);
          });
    };

  
    useEffect(() => { 
      axios.get(`http://localhost:3000/${activeTab}`)
        .then((res) => {
            setData(res.data);
            console.log(res.data)
            const newArrayFiltered = res.data.slice(firstNumberOfSlice, secondNumberOfSlice)
            setSliceData(newArrayFiltered)
            const propiedades = Object.keys(res.data[0]).filter(propiedad => propiedad !== '__v' && propiedad !== '_id' && propiedad !== 'idCliente' && propiedad !== 'idProducto' && propiedad !== 'productosComprados'  && propiedad !== 'compraId');
            const columnObjects = propiedades.map(propiedad => ({
                key: propiedad,
                label: propiedad.charAt(0).toUpperCase() + propiedad.slice(1),
                allowsSorting: true
          }));

                {activeTab === "compras" ? 
                columnObjects.push({
                  key: 'Vendedor',
                  label: 'Proveedores',
                  cellRenderer: (cell) => { 
                    const filaActual = cell.row;
                    const id = filaActual.original._id;
                    const buyDetail = filaActual.original.productosComprados;
                    const dateOfBuy = filaActual.original.fechaCompra;
                    const total = filaActual.original.total;
                    const purchasedProducts = filaActual.original.productosComprados;
                    const getProviders = purchasedProducts.map((prod) => prod.proveedor)
                    const providers = getProviders
                    const producto = {
                      id: id,
                      detail: buyDetail,
                      date: dateOfBuy,
                    };
                    console.log(providers);
                    return (
                      <p>
                        {providers.length === 1 ? providers[0] : 
                        providers.length === 2 ? [providers[0], " - " ,providers[1]] :  
                        providers.length >= 3 ? <ViewBuyDetail  producto={producto} totalAmount={total}/>  : null}
                      </p>
                    );
                  },
                }) 
              : null}

              {activeTab === "compras" && columnObjects.push({
                key: 'VerDetalle',
                label: 'Detalle de Compra',
                cellRenderer: (cell) => { 
                  const filaActual = cell.row;
                  const id = filaActual.original._id;
                  const buyDetail = filaActual.original.productosComprados;
                  const dateOfBuy = filaActual.original.fechaCompra;
                  const total = filaActual.original.total;
                  const producto = {
                    id: id,
                    detail: buyDetail,
                    date: dateOfBuy,
                  };
              
                  return <ViewBuyDetail producto={producto} totalAmount={total} type={"table"}/> ;
                },
              })}
              
              {activeTab === "compras" && columnObjects.push({
                key: 'Editar',
                label: 'Editar',
                cellRenderer: (cell) => {
                  const filaActual = cell.row;
                  const compraId = filaActual.original.compraId;
                  const productosComprados = filaActual.original.productosComprados;
                  const fechaCompra = filaActual.original.fechaCompra;
                  const total = filaActual.original.total;
                  const id = filaActual.original._id;
              
                  const producto = {
                    compraId: compraId,
                    productosComprados: productosComprados,
                    fechaCompra: fechaCompra,
                    total: total,
                    id: id,
                  };
              
                  return <EditModal producto={producto} type={"compras"} />;
                },
              })}

              {activeTab === "compras" ?    
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
                      <DeleteProductModal producto={producto} type={"compras"}  updateBuysList={showBuysUpdated}/>
                      );
                },
                    }) :
                null}

              {activeTab === "productos" ?    
              columnObjects.push({
                    key: 'Eliminar',
                    label: 'Eliminar',
                    cellRenderer: (cell) => { 
                      const filaActual = cell.row;
                      const name = filaActual.original.nombre;
                      const id = filaActual.original._id;
                      const producto = {
                      nombre: name,
                      productId: id
                      };
                      return (
                        <DeleteProductModal producto={producto} type={"productos"} showProductsUpdated={showProductsUpdated}/>
                        );
                  },
                    }) :
                null}

              {activeTab === "clientes" ?    
              columnObjects.push({
                    key: 'Eliminar',
                    label: 'Eliminar',
                    cellRenderer: (cell) => { 
                      const filaActual = cell.row;
                      const name = filaActual.original.nombre;
                      const id = filaActual.original._id;
                      const producto = {
                      nombre: name,
                      productId: id
                      };
                      return (
                        <DeleteProductModal producto={producto} type={"clientes"} showClientsUpdated={showClientsUpdated}/>
                        );
                  },
                    }) :
                null}

              {activeTab === "proveedores" ?    
                columnObjects.push({
                      key: 'Eliminar',
                      label: 'Eliminar',
                      cellRenderer: (cell) => { 
                        const filaActual = cell.row;
                        const nombre = filaActual.original.nombre;
                        const id = filaActual.original._id;
                        const producto = {
                        nombre: nombre,
                        proveedorId: id
                        };
                        return (
                          <DeleteProductModal producto={producto} type={"proveedores"} showProvidersUpdated={showProvidersEdited}/>
                          );
                    },
                      }) :
                  null}

              {activeTab === "venta" ?    
                columnObjects.push({
                      key: 'Eliminar',
                      label: 'Eliminar',
                      cellRenderer: (cell) => { 
                        const filaActual = cell.row;
                        const id = filaActual.original._id
                        const producto = {
                        ventaId: id
                        };
                        return (
                          <DeleteProductModal producto={producto} type={"venta"} showSaleUpdated={showSaleEdited}/>
                          );
                    },
                      }) :
                null}

                  

      
         {activeTab === "productos" ?    
                columnObjects.push({
                    key: 'Editar',
                    label: 'Editar',
                    cellRenderer: (cell) => { 

                        const filaActual = cell.row;
                        const name = filaActual.original.nombre;
                        const description = filaActual.original.descripcion;
                        const price = filaActual.original.precio;
                        const quantity = filaActual.original.cantidad;
                        const category = filaActual.original.categoria;
                        const priceBuy = filaActual.original.precioCompra;
                        const stock = filaActual.original.stock;
                        const id = filaActual.original._id;
                        
                        const producto = {
                        nombre: name,
                        descripcion: description,
                        precio: price,
                        cantidad: quantity,
                        categoria: category,
                        stock: stock,
                        productPriceBuy: priceBuy,
                        productId: id
                        };
                        
                        return (
                        <EditModal producto={producto} type={"productos"}  showUsersUpdated={showProductsUpdated}/>
                        );
                    },
                }) :
            null}

            {activeTab === "clientes" ?    
            columnObjects.push({
                key: 'Editar',
                label: 'Editar',
                cellRenderer: (cell) => { 

                    const filaActual = cell.row;
                    const name = filaActual.original.nombre;
                    const telephone = filaActual.original.telefono;
                    const email = filaActual.original.email;
                    const dni = filaActual.original.dni;
                    const id = filaActual.original._id;
                    
                    const producto = {
                    nombre: name,
                    telefono: telephone,
                    email: email,
                    dni: dni,
                    productId: id,                  
                    };
                    
                    return (
                    <EditModal producto={producto} type={"clientes"}  showClientsUpdated={showClientsUpdated}/>
                    );
                },
            }) :
        null}

            {activeTab === "proveedores" ?    
                columnObjects.push({
                    key: 'Editar',
                    label: 'Editar',
                    cellRenderer: (cell) => { 

                        const filaActual = cell.row;
                        const proveedorId = filaActual.original.proveedorId;
                        const nombre = filaActual.original.nombre;
                        const telefono = filaActual.original.telefono;
                        const id = filaActual.original._id;
                        
                        const producto = {
                        proveedorId: proveedorId,
                        nombre: nombre,
                        telefono: telefono,
                        proveedorIdUnique: id
                        };
                        
                        return (
                         <EditModal producto={producto} type={"proveedores"} showProviderEdited={showProvidersEdited}/>
                        );
                    },
                }) :
            null}

            {activeTab === "venta" ?    
                columnObjects.push({
                    key: 'Editar',
                    label: 'Editar',
                    cellRenderer: (cell) => { 

                        const filaActual = cell.row;
                        const nombreProducto = filaActual.original.nombreProducto;
                        const nombreCliente = filaActual.original.nombreCliente;
                        const precio = filaActual.original.precio;
                        const cantidad = filaActual.original.cantidad;
                        const total = filaActual.original.total;
                        const fechaCreacion = filaActual.original.fechaCreacion;
                        const id = filaActual.original._id
                        
                        const producto = {
                        nombreProducto: nombreProducto,
                        nombreCliente: nombreCliente,
                        precio: precio,
                        cantidad: cantidad,
                        total: total,
                        fechaCreacion: fechaCreacion,
                        id: id
                        };
                        
                        return (
                         <EditModal producto={producto} type={"venta"} showSaleEditedNow={showSaleEdited}/>
                        );
                    },
                }) :
            null}
          
          setColumns(columnObjects);

            if (tableRef.current) {
              tableRef.current.updateColumns(columnObjects);
            }
            setTimeout(() => { 
              setLoad(false)
            }, 1000)
          })
          .catch((err) => {
            console.log(err); 
          });
       }, [activeTab, secondNumberOfSlice, firstNumberOfSlice]);


    const filteredData = sliceData.filter((item) => {
        return Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      });

      useEffect(() => { 
        console.log(filteredData)
      }, [filteredData])


      const returnToTablaGenerica = () => { 
        setShowBuyTable(false)
      }

      function sortData(sliceData, columnKey, sortDirection) {
        const sortedData = [...sliceData];
        console.log("aaa")
      
        if (columnKey === "total") {
          sortedData.sort((a, b) => (sortDirection === "asc" ? a.total - b.total : b.total - a.total));
        } else if (columnKey === "precio") {
          sortedData.sort((a, b) => (sortDirection === "asc" ? a.precio - b.precio : b.precio - a.precio));
        } else if (columnKey === "stock") {
          sortedData.sort((a, b) => (sortDirection === "asc" ? a.stock - b.stock : b.stock - a.stock));
        }
      
        return sortedData; 
      }

      let sortDirection = "asc";

      function getStockClass(stock, columnName) {
        return stock < 5 ? 'text-red-500' : '';
      }

      const firstNumSlice = (x) => { 
        setFirstNumberOfSlice(x)
      }

      const secondNumSlice = (x) => { 
        setSecondNumberOfSlice(x)
      }
      

  
    return (
        <>
     
     {!showBuyTable && (
    <>
      {load ? (
        <div className="flex items-center justify-center mt-44">
          <Loading text={activeTab === "productos" ? "Cargando Productos.." : activeTab === "proveedores" ? "Cargando Proveedores.." : activeTab === "venta" ? "Cargando Ventas" : null} />
        </div>
      ) : (
        <div className="w-full">
            <div className="w-full flex justify-start items-start ">
              <ChooseBranch/>
            </div>
            <div className="flex h-14 justify-between items-center rounded-t-lg rounded-b-none w-full mt-2 xl:mt-8 3xl:mt-12 " style={{backgroundColor:"#E6EFFF"}}>
               <div className="flex justify-start items-center m-4 gap-8">
                  <FiltersModal />
                        <div className="tabs tabs-boxed gap-8 ml-8" style={{backgroundColor:"#E6EFFF"}}>
                            <a className="tab text-white hover:text-white rounded-xl" style={{ backgroundColor: activeTab === "productos" ? "#728EC3" : "#A6BBE4" }}  onClick={() => setActiveTab("productos") }>Productos</a>
                            <a className="tab text-white hover:text-white rounded-xl" style={{ backgroundColor: activeTab === "proveedores" ? "#728EC3" : "#A6BBE4" }} onClick={() => setActiveTab("proveedores")}>Proveedores</a>
                            <a className="tab text-white hover:text-white rounded-xl" style={{ backgroundColor: activeTab === "clientes" ? "#728EC3" : "#A6BBE4" }} onClick={() => setActiveTab("clientes")}>Clientes</a>
                            <a className="tab text-white hover:text-white rounded-xl" style={{ backgroundColor: activeTab === "venta" ? "#728EC3" : "#A6BBE4" }} onClick={() => setActiveTab("venta")}>Ventas</a>
                            <a className="tab text-white hover:text-white rounded-xl" style={{ backgroundColor: activeTab === "compras" ? "#728EC3" : "#A6BBE4" }} onClick={() => setActiveTab("compras")}>Compras</a>
                        </div>
                </div>    
                <div className="flex justify-end items-center mr-20">
                  {activeTab === "productos" ? 
                  <AddProductModal updateList={showProductsUpdated} showLike={"likeButton"}/>
                   : activeTab === "proveedores" ? <AddProviderModal updateList={showProvidersEdited}/> 
                   : activeTab === "venta" ? <AddSellModal updateList={showSaleEdited}/> 
                   : activeTab === "clientes" ? <AddClientModal type={"table"} updateList={showClientsUpdated}/> 
                   : activeTab === "compras" ? <AddBuyModal  updateList={showBuysUpdated}/> 
                   : null}
                </div>      
            </div>
            <div className="flex items-start m-2">
                   <input
                    className="w-[35%] border border-gray-200  focus:border-gray-300 focus:ring-0 h-10 rounded-xl"
                    style={{background:"#FFFFFF"}}
                    placeholder="Buscador.."
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                    />
                    
            </div>
          <Table  
            columnAutoWidth={true}
            columnSpacing={10}
            aria-label="Selection behavior table example with dynamic content"
            selectionMode="none"
            selectionBehavior={selectionBehavior}
            className="w-full lg:w-[800px] xl:w-[1100px] 2xl:w-[1400px] h-auto text-center  shadow-left-right max-h-[280px] 2xl:max-h-[none]"
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  key={column.key}
                  className="text-center text-sm"
                  allowsSorting={column.key === "total" || column.key === "precio" || column.key === "stock"}
                  onClick={() => {
                    if (column.key === "total" || column.key === "precio" || column.key === "stock") {
                      const newSortDirection = sortDirection === "asc" ? "desc" : "asc";
                      const sortedData = sortData(sliceData, column.key, newSortDirection);
                      setSliceData(sortedData);
                      sortDirection = newSortDirection;
                    }
                  }}
                >
                  {column.label}
                </TableColumn>
              )}
            </TableHeader>

            <TableBody items={filteredData} className="flex items-start justify-start">
  {(item) => (
    <TableRow key={item._id} className="">
      {columns.map((column) => (
        <TableCell
          align="center"
          key={column.key}
          className={`text-center text-black dark:text-black ${getStockClass(item.stock, column.key)}`}
        >
          {column.cellRenderer ? (
            column.cellRenderer({ row: { original: item } })
          ) : (
            (column.key === "precio" ||
              column.key === "precioCompra" ||
              column.key === "total" ||
              column.key === "gananciaNeta") ? (
                formatePrice(item[column.key])
            ) : (
              item[column.key]
            )
          )}
        </TableCell>
      ))}
    </TableRow>
  )}
</TableBody>
          </Table>
            <div className="flex items-center justify-center text-center mt-2">
               <PaginationTable firstNumberToSliceData={firstNumSlice} secondNumberToSliceData={secondNumSlice}/>
            </div>
        </div>
      )}
    </>
  )}


      
        </>
      
    );
  };
  
  export default Tabla;