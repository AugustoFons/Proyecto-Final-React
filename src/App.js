import { Box } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useReducer } from "react";
import { shoppingReducer, initialState } from "./hooks/reducer/shoppingReducer";
import imagenes from './img/nosotros/imagenes';
import { TYPES } from "./hooks/actions/actionsCarrito";
import Rutas from "./components/Routes/Rutas";

const {READ_STATE ,ADD_TO_CART, REMOVE_ALL_PRODUCT, REMOVE_ONE_PRODUCT, CLEAR_CART, ADD_TO_FAV, REMOVE_FAV} = TYPES

const image = imagenes;


const App = () => {

  const [state, dispatch] = useReducer(shoppingReducer, initialState)

  const read_state = async () => {
    const ENDPOINTS = {
      smartphone: "https://django-json-server.vercel.app/productosSmartphone",
      tvs: "https://django-json-server.vercel.app/productosTvs",
      audio: "https://django-json-server.vercel.app/productosAudio",
      destacados: "https://django-json-server.vercel.app/productosDestacados/",
      carrito: "https://django-json-server.vercel.app/carrito/",
      favoritos: "https://django-json-server.vercel.app/favoritos/"     
    };
    const resSmartphone = await axios.get(ENDPOINTS.smartphone),
      resTvs = await axios.get(ENDPOINTS.tvs),
      resAudio = await axios.get(ENDPOINTS.audio),
      resCarrito = await axios.get(ENDPOINTS.carrito),
      resFavoritos = await axios.get(ENDPOINTS.favoritos),
      resDestacados = await axios.get(ENDPOINTS.destacados),
      productosSmart = resSmartphone.data,
      productosTvs = resTvs.data,
      productosAudio = resAudio.data,
      productosDestacados = resDestacados.data,
      productosCarrito = resCarrito.data,
      productosFavoritos = resFavoritos.data

    dispatch({type: READ_STATE, payload: {
        productosSmart,
        productosTvs,
        productosAudio,
        productosDestacados,
        productosCarrito,
        productosFavoritos
  }})
    
  }

  useEffect(() => {
    read_state()
  }, []);

  const addToCart = async (data) => {

    //Unifico el estado
    const objetoUnificador = state.productosSmartphone.concat(state.productosTvs, state.productosAudio, state.productosDestacados, state.productosFavoritos)

    //Buscar el producto
    let nuevoProd = objetoUnificador.find(producto => producto.id === data.id)

    //Ver si el producto existe en el carrito
    let itemInCarrito = state.carrito.find(item => item.id === nuevoProd.id)

    if(itemInCarrito){
      let ENDPOINTS = `https://django-json-server.vercel.app/carrito/${data.id}/`

      let OPTIONS = {
        method: 'PUT',
        headers: {"content-type": "application/json"},
        data: JSON.stringify({...data, cantidad: itemInCarrito.cantidad + 1, precioT: itemInCarrito.precio.toFixed(3) * (itemInCarrito.cantidad + 1)})
      },
      res = await axios(ENDPOINTS, OPTIONS),
      itemData = data.id

      dispatch({type: ADD_TO_CART, payload: {itemData}});
    }
    else {
      let OPTIONS = {
        method: 'POST',
        headers: {"content-type": "application/json"},
        data: JSON.stringify({ ...data, cantidad: 1, precioT: data.precio})
      };
      let res = await axios("https://django-json-server.vercel.app/carrito/", OPTIONS),
      itemData = data.id

      dispatch({type: ADD_TO_CART, payload: {itemData}});
    }
  };

  const deleteFromCart = async (data, all = false) => {

    if(all) {
    
      let ENDPOINTS = `https://django-json-server.vercel.app/carrito/${data.id}/`

      let OPTIONS = {
        method: 'DELETE',
        headers: {"content-type": "application/json"},
      },
      
      res = await axios(ENDPOINTS, OPTIONS)

      dispatch({type: REMOVE_ALL_PRODUCT, payload: data.id});
    } 
    else {
    
      let itemAEliminar = state.carrito.find(item => item.id === data.id);

      if(itemAEliminar.cantidad > 1){

        let ENDPOINTS = `https://django-json-server.vercel.app/carrito/${data.id}/`

        let OPTIONS = {
          method: 'PUT',
          headers: {"content-type": "application/json"},
          data: JSON.stringify({...data, cantidad: itemAEliminar.cantidad - 1, precioT: itemAEliminar.precio.toFixed(3) * (itemAEliminar.cantidad - 1)})
        },

        res = await axios(ENDPOINTS, OPTIONS)

        dispatch({type: REMOVE_ONE_PRODUCT, payload: data.id});
      }
      else {

        let ENDPOINTS = `https://django-json-server.vercel.app/carrito/${data.id}/`

        let OPTIONS = {
          method: 'DELETE',
          headers: {"content-type": "application/json"},
        },

        res = await axios(ENDPOINTS, OPTIONS)

        dispatch({type: REMOVE_ONE_PRODUCT, payload: data.id});

      }
    }
  };

  const clearCart = async () => {


    state.carrito.map((prod) => {

      let ENDPOINTS = `https://django-json-server.vercel.app/carrito/${prod.id}/`

      let OPTIONS = {
        method: 'DELETE',
        headers: {"content-type": "application/json"},
      },

      res = axios(ENDPOINTS, OPTIONS)

    })

    dispatch({type: CLEAR_CART});
  }

  const addToFav = async (data) => {
        //Unifico el estado
        const objetoUnificador = state.productosSmartphone.concat(state.productosTvs, state.productosAudio)

        let nuevoProd = objetoUnificador.find(producto => producto.id === data.id)
    
        let itemInFav = state.favoritos.find(item => item.id === nuevoProd.id)
        
        if  (!itemInFav){
          let OPTIONS = {
            method: 'POST',
            headers: {"content-type": "application/json"},
            data: JSON.stringify({ ...data })
          };
          let res = await axios("https://django-json-server.vercel.app/favoritos/", OPTIONS),
          itemData = data.id
      
          dispatch({type: ADD_TO_FAV, payload: {itemData}});
        }
  }

  const deleteFromFav = async (data) => {

        let ENDPOINTS = `https://django-json-server.vercel.app/favoritos/${data.id}`

        let OPTIONS = {
          method: 'DELETE',
          headers: {"content-type": "application/json"},
        },

        res = await axios(ENDPOINTS, OPTIONS)

        dispatch({type: REMOVE_FAV, payload: data.id});

  };

return (
    <Box>
        <Rutas 
          producto={state} 
          addToCart={addToCart} 
          deleteFromCart={deleteFromCart}
          deleteFromFav={deleteFromFav} 
          clearCart={clearCart} 
          addToFav={addToFav} 
          image={image}
          />
    </Box>
  )
}


export default App