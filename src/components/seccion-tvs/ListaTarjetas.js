import { Box, Flex } from "@chakra-ui/react";
import TarjetaMobile from "./TarjetaMobile";
import SwiperTvs from "./SwiperTvs";



const ListaTarjetas = ({ producto, addToCart}) => {


    return (
        <Flex
            justify="center"
            align="center"
            >
            <Box
                h="100vh"
                display={["none", "none", "flex"]}
                justifyContent="center"
                alignItems="center"
                flexWrap="wrap"
                columnGap="40px"
                rowGap="30px"
                >
                {
                    producto.map(prod => <TarjetaMobile key={ prod.id } prod={ prod } addToCart={addToCart}/>)
                }
            </Box>
            <Box
                display={["flex", "flex", "none"]}
                h="480px"
                w="350px"
                m="50px 0 50px 0"
                >
                    <SwiperTvs producto={producto} addToCart={addToCart} />
            </Box>
        </Flex>
    )
}

export default ListaTarjetas
