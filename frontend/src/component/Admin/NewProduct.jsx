import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // ✅ React Router v6
import { clearErrors, createProduct } from "../../actions/productAction";
import { toast } from "react-toastify"; // ✅ Using react-toastify
import { Button } from "@mui/material"; // ✅ Updated Material UI import
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SideBar from "./SideBar";
import "react-toastify/dist/ReactToastify.css"; // ✅ Toastify styles
import { resetCreateProduct } from "../../reducers/productReducer";

const NewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ React Router v6 friendly

  const { loading, error, success } = useSelector((state) => state.createProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Studio Ghibli",
    "Anime Figurines",
    "Clothing & Accessories",
    "Home Decor",
    "Stationery",
    "Toys & Collectibles",
    "Music & Media",
    "Limited Edition",
    "Gift Sets",
    "Manga",
    "Manhwa",
  ];

  useEffect(() => {
    if (error) {
      toast.error(error); // ✅ Toastify error message
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Product Created Successfully"); // ✅ Toastify success message
      navigate("/admin/dashboard"); // ✅ Navigate after success
      dispatch(resetCreateProduct()); // ✅ Dispatch reset action correctly
    }
  }, [dispatch, error, success, navigate]);

  // ✅ Handle image upload
  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  // ✅ Handle form submission
  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("category", category);
    formData.set("stock", stock);

    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(createProduct(formData));
  };

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form className="createProductForm" encType="multipart/form-data" onSubmit={submitHandler}>
            <h1>Create Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />
              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select required value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input type="file" accept="image/*" multiple onChange={createProductImagesChange} />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button id="createProductBtn" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
