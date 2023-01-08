import React, { useState } from "react";
import { Link, Box, Flex, Stack } from "@chakra-ui/react";
import '../../css/navBar.css'
import Buscador from "./Buscador";
import BotonShopping from "./ShoppingBoton";
import Logo from "./Logo";
import menu from "../../img/NavIconos/menu.png";
import close from "../../img/NavIconos/close.png"


    const MenuIcon = () => ( //menu hamburguesa icono
        <img className="hoverIcon" src={menu} alt="Menu" title="Menú" width={["35px", "55px","55px"]} />
    );

    const CloseIcon = () => ( //close menu hamburguesa icono
        <img className="hoverIcon" src={close} alt="close" title="close" width={["35px", "55px"]} />
    );


    const MenuToggle = ({ toggle, isOpen}) => { 
    return ( //entre sm y lg es visible el icono menu, si isOpen es verdadero es visible el boton close
            <Box display={{ base: "block", lg: "none" }} onClick={toggle}>
                {isOpen ? <CloseIcon /> : <MenuIcon />}
            </Box>
    );
};

    const MenuLinks = ({ isOpen }) => {
    return (
        <Box  
            display={{ base: isOpen ? "812px" : "none", lg: "block" }}  //MenuLinks es visible si estamos en los breakpoints md/lg o si isOpen es true, si isOpen es true es visible el segundo llamado de MenuLinks
            >
            <Stack
                spacing={[0, 0, 0, 7]}
                align="center"
                direction={["column", "column", "column", "row"]}   //entre sm y lg los links se agrupan en columnas (menu hamburguesa) a partir de lg se agrupan en fila (antes de que aparezca el menu hamburguesa)
                fontSize={["24px", "24px", "24px", "20px"]}
                letterSpacing="2px"
                color="white"
                fontFamily= "--first-font"
                fontWeight="600"
                boxSizing="border-box"
                className="stackIn"
                >
                <Link href="/" className="links" _hover={{ textDecoration: "none" }}>Destacados</Link> 
                <Link href="/" className="links" _hover={{ textDecoration: "none" }}>SmartPhone</Link>
                <Link href="/" className="links" _hover={{ textDecoration: "none" }}>TV</Link>
                <Link href="/" className="links" _hover={{ textDecoration: "none" }}>Audio</Link>
                <Link href="/" className="links" _hover={{ textDecoration: "none" }}>Nosotros</Link>
            </Stack>
        </Box>
    );
};

    const NavBar = () => {  //Componente NavBar principal
        
        const [isOpen, setIsOpen] = useState(false);
        const toggle = () => setIsOpen(!isOpen);  //funcion manejadora de estado


    return (
        <>
            <Flex
                as="nav"
                alignItems="center"
                justify={["space-around", "space-between"]}
                wrap= "wrap"
                w="100%"
                p={6}
                bg="--backg-color"
                color="white"
                rowGap="15px"
                >
                <Logo />  
                <Box       
                    display="flex" 
                    alignItems="center"
                    >
                    
                    <Box    //este box se ve cuando  cuando aparece el menu hambuerguesa
                        display={["flex", "flex", "flex", "none"]} 
                        px="20px"
                        alignItems="center"
                        >
                        <Buscador />
                        <BotonShopping/>
                    </Box>

                    <MenuToggle toggle={toggle} isOpen={isOpen} //toogle intercambia el boton de menu y el de close
                    /> 
                    <MenuLinks  //solo visible entre md y lg
                    /> 
                </Box>
                <Box  //se llama dos veces este box ya que la version mobile y la de escritorio intercambian sus lugares 
                    //el menu con el buscador y el boton, este box se ve antes que aparezca el menu hamburguesa
                    display={["none", "none", "none", "flex"]}
                    alignItems="center"
                    >
                    <Buscador />
                    <BotonShopping/>
                </Box>
            </Flex>

            <Box 
                display={["block", "block", "block", "none"]}
                borderBottom="2px solid"
                borderBottomColor="--backg-color"
                bg="--backg-second-color"
                >
                <MenuLinks isOpen={isOpen}  //MenuLinks dentro del menu hambuerguesa, visible cuando isOpen es true entre sm y md
                />                         
            </Box>
        </>
    );
};

export default NavBar;
