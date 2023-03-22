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
        
        contenedor_productos.innerHTML = ""
        
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
        
        contenedor_carrito.innerHTML = ""
        
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


const controladorProductos = new ProductoController()
const controladorCarrito = new CarritoController()


controladorProductos.levantar()
controladorCarrito.levantar()


const contenedor_productos = document.getElementById("contenedor_productos")
const contenedor_carrito = document.getElementById("contenedor_carrito")


controladorProductos.mostrarEnDOM(contenedor_productos)
controladorCarrito.mostrarEnDOM(contenedor_carrito)


controladorProductos.listaProductos.forEach( producto => {
    const productoEnEsperaDeSerAnadido = document.getElementById(`cpu${producto.id}`)

    productoEnEsperaDeSerAnadido.addEventListener("click",()=>{
        
        controladorCarrito.anadir(producto)
        controladorCarrito.levantar()
        controladorCarrito.mostrarEnDOM(contenedor_carrito)
    })
})
