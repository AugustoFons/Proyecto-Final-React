
import { Spinner, Flex } from "@chakra-ui/react";
import CardListDestacados from './CardListDestacados'
import './seccionDestacados.css'

const SeccionDestacados = ({producto, addToCart}) => {
    return (
        <div className='seccionDestacados' id="SeccionDestacados" >
            <h2 data-aos="zoom-out-right">Destacados</h2>
                {
                    producto.length === 0 ? 
                    <Flex
                        w="100%"
                        flexDir="column"
                        justify="center"
                        align="center"
                        >  
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='--backg-color'
                            size='xl'
                            margin='50px'
                            />
                    </Flex>

                    :
                    <CardListDestacados producto={ producto} addToCart={addToCart}/>
                }
        </div>
    )
}

export default SeccionDestacados