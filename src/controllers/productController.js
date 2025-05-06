const {
  getProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
} = require("../services/productServices");

const {
  createProductValidations,
  updateProductValidations,
  getProductValidations,
} = require("../validations/productValidations");

const productController = {
  getProductController: [
    ...getProductValidations,
    async (req, res) => {
      try {
        const { id } = req.params;

        const data = await getProduct(id);
        res.status(200).json(data);
      } catch (error) {
        console.log("Error al recoger producto de la BBDD", error);
        res.status(500).json({
          error: "Error al recoger producto de la BBDD",
        });
      }
    },
  ],
  createProduct: [
    ...createProductValidations,
    async (req, response) => {
      try {
        const newProduct = await insertProduct(req.body);
        response.status(201).json(newProduct);
      } catch (e) {
        console.log("Error al crear producto", e);
        response.status(500).json({ error: e.message });
      }
    },
  ],
  updateProduct: [
    ...updateProductValidations,
    async (req, response) => {
      try {
        const { id } = req.params;
        const ProductData = req.body;
        const updatedProduct = await updateProduct(id, ProductData);
        response.status(200).json(updatedProduct);
      } catch (e) {
        console.log("Error al actualizar producto", e);
        response.status(500).json({ error: "Error al actualizar producto" });
      }
    },
  ],
  deleteProduct: [
    async (req, response) => {
      try {
        const { id } = req.params;
        const deletedProduct = await deleteProduct(id);
        response.status(200).json(deletedProduct);
      } catch (error) {
        console.log("Error al eliminar producto", error);
        response.status(500).json({ error: "Error al eliminar producto" });
      }
    },
  ],
};

module.exports = productController;
