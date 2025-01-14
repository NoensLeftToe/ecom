const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");
//create product admin
exports.createProduct = catchAsyncErrors( async (req, res, next) => {
    // let images = [];
  
    // if (typeof req.body.images === "string") {
    //   images.push(req.body.images);
    // } else {
    //   images = req.body.images;
    // }
  
    // const imagesLinks = [];
  
    // for (let i = 0; i < images.length; i++) {
    //   const result = await cloudinary.v2.uploader.upload(images[i], {
    //     folder: "products",
    //   });
  
    //   imagesLinks.push({
    //     public_id: result.public_id,
    //     url: result.secure_url,
    //   });
    // }
  
    // req.body.images = imagesLinks;
    req.body.user = req.user.id;
  
    const product = await Product.create(req.body);
  
    res.status(201).json({
      success: true,
      product,
    });
  });
  


  // get all product
exports.getAllProducts = catchAsyncErrors(async(req, res)=>{
 
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
  const products = await apiFeature.query;


    res.status(200).json({
      success:true,
      products,
      productCount
    })
});


//get product details
exports.getProductDetails = catchAsyncErrors( async(req,res,next)=>{
  const product = await Product.findById(req.params.id);
  if(!product){
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success:true,
    product
  })
})

//update product--admin
exports.updateProduct = catchAsyncErrors(async(req,res,next)=>{
  let product =await Product.findById(req.params.id);

  if(!product){
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body,{new:true,
    runValidators:true,
    useFindAndModify:false
  });
  res.status(200).json({
    success:true,
    product
  })
})


//delete product

exports.deleteProduct = catchAsyncErrors(async(req,res,next)=>{
const product = await Product.findById(req.params.id);

if(!product){
  return res.status(500).json({
    success:false,
    message:"product not found"
  })
}
await product.deleteOne();

res.status(200).json({
  success:true,
  message:"product deleted successfully "
})
})