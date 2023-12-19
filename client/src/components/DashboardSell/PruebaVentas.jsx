import React from 'react'
import {Card, CardBody} from "@nextui-org/react";
import iconProduct from "../../img/productsIcon.png"
import QuantityProductSell from '../Graficos/QuantityProductSell';
import RankingVentaProductos from '../Graficos/RankingVentaProductos';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import axios from 'axios';
import { useState, useEffect } from 'react';
import VentasPorMes from '../Graficos/VentasPorMes';
import { getMonthGains, getAllGains, getImprovementPercentage, getTotalYearMoneyFactured, getTotalMonthMoneyFactured, bestSells} from './FunctionsGetDataOfSells';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { formatePrice } from '../../functions/formatPrice';
import start from "../../img/star.png"
import factured from "../../img/factured.png"
import arrowDash from "../../img/arrowDashboard.png"
import arrowGreen from "../../img/arrowGreen.png"



const PruebaVentas = () => {

    const [totalMonthGains, setTotalMonthGains] = useState(null);
    const [totalEverGains, setTotalEverGains] = useState(null);
    const [porcentage, setPorcentage] = useState(null);
    const [totalAnualFactured, setTotalAnualFactured] = useState(null);
    const [totalMonthFactured, setTotalMonthFactured] = useState(null);
    const [bestFiveSells, setBestFiveSells] = useState([]);
    const [showTotalAnualFactured, setShowTotalAnualFactured] = useState(true)
    const [showTotalMonthFactured, setShowTotalMonthFactured] = useState(false)
    const [selectedOption, setSelectedOption] = useState(" Monto total Anual Facturado ")


    useEffect(() => {
        const fetchData = async () => {
          try {
            const gains = await getMonthGains();
            const gainsFormated =  formatePrice(gains)
            setTotalMonthGains(gainsFormated);
          } catch (error) {
            console.error(error);
          }
        };
        fetchData();
      }, []); 
    
    
    
      useEffect(() => {
        
        const getPorcentage = async () => {
          try {
            const thePorcentage = await getImprovementPercentage();
    
            setPorcentage(thePorcentage);
          } catch (error) {
            console.error(error);
          }
        };
        getPorcentage();
      }, []); 
    
    
    
      useEffect(() => {
        const getEverGains = async () => {
          try {
            const allGains = await getAllGains();
            const formatedPrice = formatePrice(allGains)
            setTotalEverGains(formatedPrice);
          } catch (error) {
            console.error(error);
          }
        };
        getEverGains();
      }, []); 
    
    
    
      useEffect(() => {
        const getTotalAnualFactured = async () => {
          try {
            const totalAnualFacturedAtTheMoment = await getTotalYearMoneyFactured();
            const totalFormated = formatePrice(totalAnualFacturedAtTheMoment)
            setTotalAnualFactured(totalFormated);
          } catch (error) {
            console.error(error);
          }
        };
        getTotalAnualFactured();
      }, []); 
    
    
      useEffect(() => {
        const getTotalMonthFacturedNow = async () => {
          try {
            const totalMonthFacturedAtTheMoment = await getTotalMonthMoneyFactured();
            const totalFormated = formatePrice(totalMonthFacturedAtTheMoment)
            setTotalMonthFactured(totalFormated);
          } catch (error) {
            console.error(error);
          }
        };
        getTotalMonthFacturedNow();
      }, []); 
    
      
      useEffect(() => {
        const getBestSells = async () => {
          try {
            const bestFive = await bestSells();
            setBestFiveSells(bestFive);
          } catch (error) {
            console.error(error);
          }
        };
        getBestSells();
      }, []); 
    
       
      useEffect(() => {
          console.log(bestFiveSells)
      }, [bestFiveSells]); 
    
    
      const showOneData = (first, second) => { 
        setShowTotalAnualFactured(first)
        setShowTotalMonthFactured(second)
    
      }  
    
      const handleClick = (opcion) => {
        setSelectedOption(opcion);
      };
    
    
    
      const getMonthName = () => {
        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        const fechaActual = new Date();
        const numeroMes = fechaActual.getMonth();
        return meses[numeroMes];
      };
    
      const monthName = getMonthName();
    
      const getActualYear = () => {
        const fechaActual = new Date();
        const anio = fechaActual.getFullYear();
        return anio;
      };
      
      const actualYear = getActualYear();



  return ( 

     <div className='flex flex-col  text-center items-center justify-center ml-44 mt-24 2xl:mt-2'>
         <div class="grid grid-cols-3 gap-4 ">
            <div class="col-span-2">
                <div className='flex gap-4'>
                      <div className='w-4/5 '>
                          <Card isHoverable={true} className='bg-white h-72 flex flex-col items-center justify-center' style={{ boxShadow:"0px 0px 25px 8px rgba(37, 79, 159, 0.14)"}}> 
                              <CardBody>
                              <div className='flex items-start justify-start ml-4'>
                                  <p className='font-medium text-gray-500 text-lg'>Ventas Mensuales</p>
                              </div>
                              <div className='flex items-center justify-center flex-grow mt-4'>
                                  <div className='flex items-center justify-center mt-4  h-full w-full'>                          
                                              <VentasPorMes/>                            
                                  </div>
                              </div>
                              </CardBody>
                          </Card>
                      </div>
                      <div className='w-1/5 '>
                          <Card isHoverable={true} className='bg-white h-72 flex items-center justify-center w-full'  style={{ boxShadow:"0px 0px 25px 8px rgba(37, 79, 159, 0.14)"}}> 
                              <CardBody>
                                      <div className='flex items-start justify-start gap-2'>
                                        <Dropdown>                                      
                                          <DropdownTrigger>                                           
                                            <div className='flex items-center cursor-pointer'> 
                                              <img src={arrowGreen} className='h-2 w-2 mr-2'/> 
                                              <small className='font-medium text-lg text-gray-500'>{selectedOption}</small> 
                                            </div>
                                          </DropdownTrigger>
                                          <DropdownMenu aria-label="Dynamic Actions">
                                            <DropdownItem onClick={() => { handleClick('Monto total Anual Facturado'); showOneData(true, false); }}>
                                              Monto total Anual Facturado 
                                            </DropdownItem> 
                                            <DropdownItem onClick={() => { handleClick('Monto total Mensual Facturado'); showOneData(false, true); }}>
                                              Monto total Mensual Facturado
                                            </DropdownItem> 
                                          </DropdownMenu>
                                        </Dropdown>
                                      </div>
                                  <div className='flex items-center justify-center mt-4'>
                                          {showTotalAnualFactured ?    
                                            <div className='flex flex-col items-center justify-center mt-4 '>
                                                 <p className='font-medium text-xl border rounded-lg border-green-400' style={{color:"#327D65"}}>{totalAnualFactured} </p>   
                                                 <img src={factured} className='w-16 h-16 mt-4 object-fit-contain'/>
                                            </div>                                                                         
                                                                
                                          :   
                                          null}

                                          {showTotalMonthFactured ?                                            
                                             <div className='flex flex-col items-center justify-center mt-4'>
                                                 <p className='font-medium text-xl' style={{color:"#327D65"}}>{totalMonthFactured} </p>   
                                                 <img src={factured} className='w-16 h-16 mt-4 object-fit-contain'/>
                                             </div>                                            
                                          : 
                                          null}
                                  </div>                 
                              </CardBody>
                          </Card>
                      </div>
                </div>
            </div>

            <div class="col-span-2 "> 
              <div className='flex '>
                <div className='w-2/5 '>
                    <div className='flex flex-col items-center justify-center'>
                      <div className='mt-2 w-full'>
                   
                      <Card isHoverable={true} className=' bg-white h-24 flex items-center justify-center  w-80'  style={{ boxShadow:"0px 0px 25px 8px rgba(37, 79, 159, 0.14)"}}>  

                              <CardBody className='flex '>              
                                  <div className='flex flex-col '>
                                    <div className='flex w-full justify-between'>
                                        <div className='flex items-center justify-start'>
                                            <img src={arrowDash} className='h-2 w-2 object-fit-contain'/>
                                            <p className='text-xs ml-2'>Ganancia NETA Anual</p>   
                                         </div>
                                         <div className='flex items-center justify-end'>
                                            <p className='text-xs'>{actualYear}</p>
                                          </div>
                                    </div>
                                    <div className='flex items-center justify-center mt-4'>
                                    <p className='text-xl font-bold' style={{color:"#568CCB"}}> {totalEverGains !== null ? totalEverGains : 'Cargando...'}</p>
                                    </div>
                                  </div>
                                </CardBody>
                          </Card>
                      </div>
                      <div className='mt-2 w-full'>
                          <Card isHoverable={true} className=' bg-white h-24 flex items-center justify-center w-80'  style={{ boxShadow:"0px 0px 25px 8px rgba(37, 79, 159, 0.14)"}}>  
                              <CardBody className='flex '>
                                <div className='flex flex-col '>
                                  <div className='flex w-full justify-between '>
                                    <div className='flex items-center justify-start'>
                                      <img src={arrowDash} className='h-2 w-2 object-fit-contain'/>
                                      <p className='text-xs ml-2'>Ganancia NETA Mensual</p>   
                                    </div>
                                    <div className='flex items-center justify-end'>
                                      <p className='text-xs'>{monthName}</p>
                                    </div>
                                  </div>
                                  <div className='flex items-center justify-center mt-4'>
                                    <p className='text-xl font-bold' style={{color:"#568CCB"}}> {totalMonthGains !== null ? totalMonthGains : 'Cargando...'}</p>
                                  </div>
                                </div>
                                <div>
                                </div>
                              </CardBody>
                          </Card>
                      </div>
                        <div className='mt-2 w-full'>
                             <Card isHoverable={true} className=' bg-white h-24 rounded-xl flex items-center justify-center w-80'  style={{ boxShadow:"0px 0px 25px 8px rgba(37, 79, 159, 0.14)"}}>
                                <CardBody className="flex">
                                   <div className='flex items-center justify-start'>
                                      <img src={arrowDash} className='h-2 w-2 object-fit-contain'/>
                                      <p className='text-xs ml-2'>Porcentaje de Crecimiento en Comparacion al mes Pasado</p>   
                                    </div>
                                    {porcentage === null ? 
                                      <div className='flex items-center justify-center mt-4'>
                                          <p className='font-bold' style={{color:"#728EC3"}}>Cargando</p>
                                      </div>
                                            :
                                        <div className='flex items-center justify-center mt-2'>
                                            <p className='text-xl font-bold' style={{color:"#56CB69"}}>+ {porcentage} %</p>
                                          </div>
                                        }
                                  </CardBody>
                               </Card>
                         </div>
                    </div>
                </div>
                <div className='w-3/5 '>
                    <Card isHoverable={true} className='bg-white h-full flex items-center justify-center' style={{ boxShadow:"0px 0px 25px 8px rgba(37, 79, 159, 0.14)"}}> 
                        <CardBody>
                            <div className='flex items-center justify-start gap-2'>
                                <p className='text-md font-medium text-gray-500'>Ventas por Categoria</p>
                            </div>
                            <div className='flex items-center justify-center mt-4  h-full w-full'>                          
                              <QuantityProductSell/>                            
                            </div>
                        </CardBody>
                    </Card>
                </div>
              </div>
            </div>

            <div class="col-start-3 row-start-1 row-span-2 w-72 ">
                       <Card  isHoverable={true} 
                              style={{ boxShadow: "0px 0px 25px 8px rgba(31, 95, 217, 0.16)", background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.89) 28.43%, #DAE8FD 100%)' }} 
                              className=' max-h-full overflow-y-auto flex items-center justify-center w-full'>
                            <CardBody>
                                <div className='flex items-center justify-start gap-2 mt-2'>
                                    <img src={arrowDash} className='h-2 object-fit w-2'/>
                                    <p className='font-medium text-gray-500 text-sm'>TOP 5 VENTAS</p>
                                </div>
                                 {bestFiveSells.length !== 0 ?
                                  <div className='flex flex-col items-center justify-start text-start mt-4'>
                                      {bestFiveSells.map((b, index) => (                                     
                                              <div className='flex flex-col items-center justify-start mt-4 '>
                                                  <div className=' flex flex-col gap-2 mt-2 text-xs font-bold' key={index}  style={{color:"#728EC3"}}>
                                                      <div className='flex flex-col justify-start items-center gap-2'>
                                                          <div className='flex gap-2 items-center'>
                                                              <img src={start} className='h-4 w-4 object-fit-contain'/>
                                                              <p style={{color:"#728EC3"}} className='text-md'>{b.nombreCliente}</p>
                                                          </div>
                                                          <div className='flex flex-col justify-center items-center'>
                                                              <p className='text-sm' style={{color:"#728EC3"}}>{b.nombreProducto}</p>
                                                          </div> 
                                                            <div className='mt-2'>
                                                              <p className='text-lg font-bold' style={{color:"#4C83EA"}}>{formatePrice(b.total)}</p>
                                                            </div>                                               
                                                      </div>
                                                                                            
                                                  </div>  
                                              </div>  
                                                                                                                                  
                                      ))}
                                  </div>
                                :
                                <div className='flex items-center justify-center mt-6'>
                                  <p className='font-bold' style={{color:"#728EC3"}}>Cargando..</p>
                                </div>
                                } 
                            </CardBody>
                        </Card>
            </div>

         </div>
     </div>
  
  )
}

export default PruebaVentas


/*

  <div class="grid grid-cols-3 gap-4">

        <div class="col-span-2 bg-blue-300">
          <div className='flex gap-2'>
             <div className='w-4/5 border bg-red-500'>
                 Ventas mensuales
             </div>
             <div className='w-1/5 border bg-red-200'>
                Monto total Anual Facturado
             </div>
          </div>
        </div>



        <div class="col-span-2 bg-yellow-300"> 
           <div className='flex gap-2'>
             <div className='w-1/5 border bg-red-500'>
                 Ganancia Neta Anual
                 Ganancia Neta Mensual  
                 Porcentaje de Ganancias
             </div>
             <div className='w-4/5 border bg-red-200'>
                Ventas por Categoria
             </div>
          </div>
        </div>



        <div class="bg-red-300 col-start-3 row-start-1 row-span-2">
          Top 5 ventas
        </div>

    </div>

*/
