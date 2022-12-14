import { useEffect, useState } from "react";
import React from "react";
import "./App.css";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

// import MyApp from "./components/meterial ui navbar/navbar";

let baseUrl = ``;
if (window.location.href.split(":")[0] === "http") {
  baseUrl = `http://localhost:5001`;
}

function App() {
  const [products, setProducts] = useState([]);
  const [loadProduct, setLoadProduct] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/products`);

      console.log("response: ", response.data);
      setProducts(response.data.data);
    } catch (err) {
      console.log("error in getting all products: ", err);
      alert("error in getting all products:");
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/product/${id}`);

      console.log("response: ", response.data);
      setLoadProduct(!loadProduct);
    } catch (err) {
      console.log("error in getting all products: ", err);
      alert("error in getting all products:");
    }
  };

  const editMode = (product) => {
    setIsEditMode(!isEditMode);
    setEditingProduct(product);

    updateFormik.setFieldValue("productName", product.name);
    updateFormik.setFieldValue("productDescription", product.description);
    updateFormik.setFieldValue("productPrice", product.price);
  };

  useEffect(() => {
    getAllProducts();
  }, [loadProduct]);

  const myFormik = useFormik({
    initialValues: {
      productName: "",
      productDescription: "",
      productPrice: "",
    },
    validationSchema: yup.object({
      productName: yup
        .string("Enter your product name")
        .required("This field is required")
        .min(3, "product name minimum 3 characters ")
        .max(30, "product name maximum  30 characters "),

      productDescription: yup
        .string("Enter your product discription")
        .required("This field is required")
        .min(3, "product discription minimum 3 characters ")
        .max(500, "product discription maximum 500 characters "),

      productPrice: yup
        .number("Enter your product price")
        .required("This field is required")
        .positive("enter possitive price"),
    }),

    onSubmit: (values) => {
      console.log("values: ", values);

      axios
        .post(`${baseUrl}/product`, {
          name: values.productName,
          description: values.productDescription,
          price: values.productPrice,
        })
        .then((response) => {
          console.log("response: ", response.data);

          getAllProducts();

          // setProducts(response.data.data);
        })
        .catch((err) => {
          console.log("error: ", err);
        });
    },
  });

  const updateFormik = useFormik({
    initialValues: {
      productName: "",
      productDescription: "",
      productPrice: "",
    },
    validationSchema: yup.object({
      productName: yup
        .string("Enter your product name")
        .required("This field is required")
        .min(3, "product name minimum 3 characters ")
        .max(30, "product name maximum  30 characters "),

      productDescription: yup
        .string("Enter your product discription")
        .required("This field is required")
        .min(3, "product discription minimum 3 characters ")
        .max(500, "product discription maximum 500 characters "),

      productPrice: yup
        .number("Enter your product price")
        .required("This field is required")
        .positive("enter possitive price"),
    }),

    onSubmit: (values) => {
      console.log("values: ", values);

      axios
        .put(`${baseUrl}/product/${editingProduct.id}`, {
          name: values.productName,
          description: values.productDescription,
          price: values.productPrice,
        })
        .then((response) => {
          console.log("response: ", response.data);

          getAllProducts();
          setIsEditMode(false);

          // setProducts(response.data.data);
        })
        .catch((err) => {
          console.log("error: ", err);
        });
    },
  });

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            E/Commerce
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-placeholder="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto">
              <a
                className="nav-link active my-3 mx-3"
                aria-current="page"
                href="#"
              >
                Home
              </a>
              <a className="nav-link active my-3 mx-3" href="#">
                Services
              </a>
              <a className="nav-link active my-3 mx-3" href="#">
                Pricing
              </a>
              <a className="nav-link active my-3 mx-3" href="#">
                shop
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* ==================================  ======================================= */}

      <div>
        <form onSubmit={myFormik.handleSubmit}>
          <input
            id="productName"
            placeholder="Product Name"
            value={myFormik.values.productName}
            onChange={myFormik.handleChange}
          />
          {myFormik.touched.productName &&
          Boolean(myFormik.errors.productName) ? (
            <span style={{ color: "red" }}>{myFormik.errors.productName}</span>
          ) : null}

          <br />

          <input
            id="productDescription"
            placeholder="Product Description"
            value={myFormik.values.productDescription}
            onChange={myFormik.handleChange}
          />
          {myFormik.touched.productName &&
          Boolean(myFormik.errors.productDescription) ? (
            <span style={{ color: "red" }}>
              {myFormik.errors.productDescription}
            </span>
          ) : null}

          <br />

          <input
            id="productPrice"
            placeholder="Product Price"
            value={myFormik.values.productPrice}
            onChange={myFormik.handleChange}
          />
          {myFormik.touched.productName &&
          Boolean(myFormik.errors.productPrice) ? (
            <span style={{ color: "red" }}>{myFormik.errors.productPrice}</span>
          ) : null}

          <br />

          <button type="submit"> Submit </button>
        </form>

        <br />
        <br />
        <div>
          {products.map((eachProduct, i) => (
            <div
              className="container"
              key={i}
              style={{ padding: "20px", margin: "10px" }}
            >
              <div className="card">
                <div className="card-body">
                  <h1 className="card-title">{eachProduct.name}</h1>
                  <p className="card-text">{eachProduct.description}</p>
                  <p className="card-title">{eachProduct.id}</p>
                  <h5 className="card-title">{eachProduct.price}</h5>
                  <button
                    onClick={() => {
                      deleteProduct(eachProduct.id);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      editMode(eachProduct);
                    }}
                  >
                    Edit
                  </button>

                  {isEditMode && editingProduct.id === eachProduct.id ? (
                    <div>
                      <form onSubmit={updateFormik.handleSubmit}>
                        <input
                          id="productName"
                          placeholder="Product Name"
                          value={updateFormik.values.productName}
                          onChange={updateFormik.handleChange}
                        />
                        {updateFormik.touched.productName &&
                        Boolean(updateFormik.errors.productName) ? (
                          <span style={{ color: "red" }}>
                            {updateFormik.errors.productName}
                          </span>
                        ) : null}

                        <br />

                        <input
                          id="productDescription"
                          placeholder="Product Description"
                          value={updateFormik.values.productDescription}
                          onChange={updateFormik.handleChange}
                        />
                        {updateFormik.touched.productName &&
                        Boolean(updateFormik.errors.productDescription) ? (
                          <span style={{ color: "red" }}>
                            {updateFormik.errors.productDescription}
                          </span>
                        ) : null}

                        <br />

                        <input
                          id="productPrice"
                          placeholder="Product Price"
                          value={updateFormik.values.productPrice}
                          onChange={updateFormik.handleChange}
                        />
                        {updateFormik.touched.productName &&
                        Boolean(updateFormik.errors.productPrice) ? (
                          <span style={{ color: "red" }}>
                            {updateFormik.errors.productPrice}
                          </span>
                        ) : null}

                        <br />

                        <button type="submit"> Submit </button>
                      </form>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
