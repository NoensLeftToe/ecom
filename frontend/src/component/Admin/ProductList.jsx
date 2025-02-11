import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid"; // ✅ Updated MUI import
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material"; // ✅ Updated MUI import
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit"; // ✅ Updated MUI import
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./SideBar";
import { clearErrors, getAdminProduct, deleteProduct} from "../../actions/productAction"; // ✅ Import deleteProduct
import { resetDeleteProduct } from "../../reducers/productReducer"
const ProductList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  // ✅ Ensure correct state keys
  const { error, products } = useSelector((state) => state.productList); // `productList` should match `store.js`
  const { error: deleteError, isDeleted } = useSelector((state) => state.product);

 // ✅ Define deleteProductHandler
  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch(resetDeleteProduct()); // ✅ Reset delete state
    }

    dispatch(getAdminProduct());
  }, [dispatch, alert, error,deleteError, isDeleted, navigate]);

  // ✅ Fix renderCell to use `params.row.id`
  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    { field: "name", headerName: "Name", minWidth: 350, flex: 1 },
    { field: "stock", headerName: "Stock", type: "number", minWidth: 150, flex: 0.3 },
    { field: "price", headerName: "Price", type: "number", minWidth: 270, flex: 0.5 },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/product/${params.row.id}`}> ✅ Fixed
              <EditIcon />
            </Link>

           <Button onClick={() => deleteProductHandler(params.row.id)}> {/* ✅ Fixed */}
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  // ✅ Map `products` correctly
  const rows = products?.map((product) => ({
    id: product._id,   // Ensure `_id` exists in API response
    name: product.name,
    stock: product.stock,
    price: product.price,
  })) || [];
  

  return (
    <Fragment>
      <MetaData title="ALL PRODUCTS - Admin" />
      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight 
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
