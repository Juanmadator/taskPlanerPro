const Product = require("../models/Product");

//crear producto

async function insertProduct(productData) {
  try {
    //creamos un nuevo objeto de tipo Product
    //haciendo uso del Schema de mongoose

    console.log("datos recibidos",productData)
    const product = new Product(productData);

    //hacemos la peticion para guardar el objeto
    const res = await product.save();
    console.log("Producto insertado:", res);
    //devolvemos la respuesta
    return res;
  } catch (error) {
    console.error("Error al insertar producto:", error);
    throw error;
  }
}

async function getProduct(id) {
  try {
    //hacemos la consulta y guardamos los productos
    const products = await Product.findById(id);
    console.log("Products:", products);

    //devolvemos los productos
    return products;
  } catch (error) {
    console.log("Error al obtener productos:", error);
  }
}

async function updateProduct(idProduct, data) {
  try {
    data.ultimaActualizacion = new Date();

    const producto = await Product.findByIdAndUpdate(idProduct, data, {
      new: true,
      runValidators: true,
      //ejecuta las validaciones del esquema
    });

    if (!producto) {
      throw new Error("Producto no encontrado");
    }

    console.log("Producto actualizado", producto);
    return producto;
  } catch (error) {
    console.error("Error al actualizar producto", error);
    throw error;
  }
}

async function deleteProduct(id) {
  try {
    const producto = await Product.findByIdAndDelete(id);

    if (!producto) {
      throw new Error("Producto no encontrado");
    }

    console.log("Producto eliminado", producto);

    return producto;
  } catch (error) {
    console.log("Error al eliminar usuario", error);
    throw error;
  }
}

module.exports = {
  insertProduct,
  getProduct,
  deleteProduct,
  updateProduct,
};
