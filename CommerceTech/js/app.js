// const listaProductos = [
//     {id:1, nombre:"IPHONE 14 PRO MAX", precio: 1200000, descripcion: "Dynamic Island. Detección de Choques. Cámara de 48 MP con una resolución hasta 4 veces mayor.", cantidad: 1, img: "../img/celulares/iphone/iphone14promax.jpg", alt: "imagen iphone 14 pro max"},
//     {id:2, nombre:"13 PRO MAX", precio: 1000000, descripcion: "Pantalla Super Retina XDR con ProMotion · Pantalla OLED de 6,7 pulgadas", cantidad: 1, img: "../img/celulares/iphone/iphone13promax.jpg", alt: "imagen iphone 13 pro max"},
//     {id:3, nombre:"IPHONE 12 red (256 gb)", precio: 600000, descripcion: "5G. Chip A14 Bionic. Pantalla Super Retina XDR. Ceramic Shield.", cantidad: 1, img: "../img/celulares/iphone/iphone 12.jpg", alt: "imagen iphone 12"},
//     {id:4, nombre:"SAMSUNG GALAXY S23 ULTRA", precio: 500000, descripcion: "S Pen incorporado, cámara nocturna y un chip potente para juegos épico", cantidad: 1, img: "../img/celulares/samsung/galaxy s23 ultra.jpg", alt: "imagen samsung s23 ultra"},
//     {id:5, nombre:"SAMSUNG GALAXY S22 ULTRA", precio: 400000, descripcion: "5G, con un S Pen integrado, una cámara nocturna y una batería que dura más que todo el día", cantidad: 1, img: "../img/celulares/samsung/galaxy s22 ultra.jpg", alt: "imagen samsung s22 ultra"},
//     {id:6, nombre:"SAMSUNG GALAXY S21 fe", precio: 250000, descripcion: "5G con procesador de bajo consumo y batería duradera. ", cantidad: 1, img: "../img/celulares/samsung/galaxy s21 fe.jpg", alt: "imagen samsung s21 fe"},
//     {id:7, nombre:"MSI AMD Radeon RX 580 ARMOR OC 8Gb GDDR5", precio: 270000, descripcion: "Juega con estilo y atrévete a ser diferente con las tarjetas gráficas ARMOR únicas de MSI.", cantidad: 1, img: "../img/placasdevideos/MSI AMD Radeon RX 580.jpg", alt: "imagen amd radeon rx 580"},
//     {id:8, nombre:"MSI NVIDIA GEFORCE RTX 3090 VENTUS 3X OC 24GB GDDR6", precio: 650000, descripcion: "Es una Gran GPU Feroz con desempeño de clase TITAN.", cantidad: 1, img: "../img/placasdevideos/GEFORCE RTX 3090.jpg", alt: "imagen NVIDIA GEFORCE RTX 3090"},
// ]

// const contenedor_producto = document.getElementById("contenedor_productos")

// listaProductos.forEach ( producto => {

//     contenedor_productos.innerHTML += `
//     <div class="card" style="width: 18rem;">
//         <img src="https://http2.mlstatic.com/D_NQ_NP_659520-MLM51338788281_082022-O.webp" class="card-img-top" alt="...">
//         <div class="card-body">
//             <h5 class="card-title">${producto.nombre}</h5>
//             <p class="card-text">
//                 ${producto.precio}
//             </p>
//             <a href="#" class="btn btn-primary">Añadir al carrito</a>
//         </div>
//     </div>
//     `
// })

class ProductoController{
    constructor(){
        this.listaProductos = []
    }

    levantar(){
        let obtenerListaJSON = localStorage.getItem("listaProductos")

        if(obtenerListaJSON){
            this.listaProductos = JSON.parse(obtenerListaJSON)
        }
    }
    
    mostrarEnDOM(contenedor_productos){
        //limpio
        contenedor_productos.innerHTML = ""
        //muestro toda la lista
        this.listaProductos.forEach( producto => {
            contenedor_productos.innerHTML += `
            <div class="card" style="width: 18rem;">
                <img src="${producto.img}" class="card-img-top" alt="${producto.alt}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">
                        ${producto.descripcion}
                    </p>
                    <p class="card-text">
                        ${producto.precio}
                    </p>
                    <a href="#" class="btn btn-primary" id="cpu${producto.id}">Añadir al carrito</a>
                </div>
            </div>
            `
        })
    }
}

class CarritoController{
    constructor(){
        this.listaCarrito = []
    }

    levantar(){
        let obtenerListaJSON = localStorage.getItem("listaCarrito")

        if(obtenerListaJSON){
            this.listaCarrito = JSON.parse(obtenerListaJSON)
        }
    }

    anadir(producto){
        this.listaCarrito.push(producto)
        let arrFormatoJSON = JSON.stringify(this.listaCarrito)
        localStorage.setItem("listaCarrito",arrFormatoJSON)
    }

    mostrarEnDOM(contenedor_carrito){
        //limpio el contenedor
        contenedor_carrito.innerHTML = ""
        //muestro todo
        this.listaCarrito.forEach( producto => {
            contenedor_carrito.innerHTML += `
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${producto.img}" class="img-fluid rounded-start" alt="${producto.alt}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">$${producto.descripcion}</p>
                            <p class="card-text">$${producto.precio}</p>
                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
            </div>
            `
        })
    }
}

//Objetos controladores
const controladorProductos = new ProductoController()
const controladorCarrito = new CarritoController()

//Verificar STORAGE
controladorProductos.levantar()
controladorCarrito.levantar()

//DOM
const contenedor_productos = document.getElementById("contenedor_productos")
const contenedor_carrito = document.getElementById("contenedor_carrito")

//APP JS
controladorProductos.mostrarEnDOM(contenedor_productos)
controladorCarrito.mostrarEnDOM(contenedor_carrito)

//Añadimos Eventos a los botones de cada CARD
controladorProductos.listaProductos.forEach( producto => {
    const productoEnEsperaDeSerAnadido = document.getElementById(`cpu${producto.id}`)

    productoEnEsperaDeSerAnadido.addEventListener("click",()=>{
        
        controladorCarrito.anadir(producto)
        controladorCarrito.levantar()
        controladorCarrito.mostrarEnDOM(contenedor_carrito)
    })
})
