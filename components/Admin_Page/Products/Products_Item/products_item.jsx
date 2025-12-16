import Image from 'next/image';
import { PhilippinePeso, Pencil, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import View_Product from '../../Modal/View_Product/View_Product';
import Edit_Product from '../../Modal/Edit_Product/Edit_Product';
import DeleteModal from '../../Modal/Delete_Product/Delete_Product';

export default function Products_Item() {
    const [products, setProducts] = useState([]);
    const [isViewProduct, setIsViewProduct] = useState(false);
    const [isEditProduct, setIsEditProduct] = useState(false);
    const [name, setName] = useState("");
    const [multipleImage, setMultipleImage] = useState([]);
    const [variants, setVariants] = useState([]);
    const [item_price, setItem_Price] = useState("");
    const [size_chart, setSize_chart] = useState("");
    const [total_stock, setTotalStock] = useState("");
    const [description, setDescription] = useState("");
   

    //EDIT MODAL STATES AND DATA
    const [variantsEdit, setVariantsEdit] = useState([
        { size: "", color: "", stock_quantity: "" }
    ]);
    const [product_idEDIT, setProductIdEDIT] = useState("");
    const [item_nameEDIT, setItem_nameEDIT] = useState("");
    const [item_priceEDIT, setItem_PriceEDIT] = useState("");
    const [descriptionEDIT, setDescriptionEDIT] = useState("");
    const [discount_pct, setDiscount_pct] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);

    //DELETE MODAL STATES AND DATA
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [product_id, setProductID] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get('/api/admin_page/products/fetch_products',);
                if(response.status === 200){
                    setProducts(response.data.result);
                }
            }catch(err){
                if(err.response){
                    switch(err.response.status){
                        case 404:
                            console.log(err.response.data.message);
                            break;
                        case 500:
                            console.log(err.response.data.message);
                            break;
                        default:
                            console.log("Unexpected error", err.response.status);
                    }
                }
            }
        }
        fetchData()
    }, [])
    
    const ViewProduct = async (name, multipleImage, item_price, size_chart, total_stock, description, product_id) => {
        setIsViewProduct(true);
        setName(name);
        const parsedImage = multipleImage ? JSON.parse(multipleImage) : multipleImage;
        setMultipleImage(parsedImage);
        setItem_Price(item_price);
        setSize_chart(size_chart);
        setTotalStock(total_stock);
        setDescription(description);
        try{
            const response = await axios.get('/api/admin_page/products/fetch_variants', {
                params: {product_id}
            });
            if(response.status === 200){
                setVariants(response.data.result);
            }
        }catch(err){
            console.error(err);
        }
    }

    const ViewEditProduct = async (product_id, item_name, description, item_price, discount_pct) => {
        setIsEditProduct(true);
        setProductIdEDIT(product_id);
        setItem_nameEDIT(item_name);
        setDescriptionEDIT(description);
        setItem_PriceEDIT(item_price);
        setDiscount_pct(discount_pct);
        try{
            const response = await axios.get('/api/admin_page/products/fetch_variants', {
                params: {product_id}
            });
            if(response.status === 200){
                setVariantsEdit(response.data.result);
            }
        }catch(err){
            console.error(err);
        }
    }
    
    const handleEditProductSubmit = async (e) => {
        e.preventDefault();
        setIsSubmit(true);
        try{
            const response = await axios.post('/api/admin_page/products/edit_products',{
                product_id: product_idEDIT,
                item_name: item_nameEDIT,
                description: descriptionEDIT,
                item_price: item_priceEDIT,
                discount_pct: discount_pct,
                variants: variantsEdit
            });
            if(response.status === 200){
                window.location.reload();
            }
        }catch(err){
            if(err.response){
                switch(err.response.status){
                    case 404:
                        console.log(err.response.message);
                        setIsSubmit(false);
                        break;
                    case 400:
                        console.log(err.response.message);
                        setIsSubmit(false);
                        break;
                    case 500:
                        console.log(err.response.data.message);
                        setIsSubmit(false);
                        break;
                    default:
                        console.log("Unexpected error", err.response.status);
                        setIsSubmit(false);
                }
            }
        }
    }


    const handleVariantValue = (index, field, value) => {
        const newVariants = [...variantsEdit];
        newVariants[index][field] = value;
        setVariantsEdit(newVariants);
    }


    const Delete_Product = (product_id) => {
        setProductID(product_id);
        setOpenDeleteModal(true);
    }
    return (
        <>
            <div className={`grid gap-5 place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  ${isViewProduct || isEditProduct ? ' overflow-hidden' : 'overflow-auto'}`}>
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <div className="" key={index}>
                            <div className="w-86 md:w-60  bg-white dark:bg-gray-900 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
                                <div className='flex items-center justify-center'>
                                    <div className="relative w-60 h-[250px] rounded-t-xl overflow-hidden group">
                                        <Image 
                                            src={`/uploads/${encodeURIComponent(product.image_url)}`}
                                            alt={product.item_name}
                                            fill
                                            className="object-cover"
                                        />
                                        {product.discount_pct > 0 && <p className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">{Number(product.discount_pct)}% OFF</p>}
                                        <div className='bg-black/50 absolute inset-0 flex items-center justify-center opacity-0 transition duration-500 group-hover:opacity-100'>
                                            <button className='bg-black/65 px-12 py-3 text-white rounded-md cursor-pointer hover:bg-black' onClick={() => ViewProduct(product.item_name, product.additional_image, product.item_price, product.size_chart, product.total_quantity, product.description, product.product_id)}>View</button>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="px-10 md:px-4 py-3">
                                    <p className="font-semibold text-lg">{product.item_name}</p>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">Category: {product.category}</p>
                                    <div className='flex flex-row just items-center'>
                                        {product.total_quantity > 0 ? (<p className="text-gray-600 dark:text-gray-300 text-sm">Status: Active </p>) :  (<p className="text-gray-600 dark:text-gray-300 text-sm">Status: Out of Stock </p>)}
                                        {product.total_quantity > 0 ? (<p className='bg-yellow-500 rounded-full w-3 h-3 ml-1'></p>) :  (<p className='bg-red-500 rounded-full w-3 h-3 ml-1'></p>)}
                                    </div>
                                
                                    <div className="flex justify-between mt-2">
                                        <div className=' h-15'>
                                            <p className="text-sm text-gray-500">Price:</p>
                                            {product.discount_pct > 0 ? (<p className="text-sm text-gray-500 flex items-center justify-end mr-1 line-through">{product.item_price}</p>) : ('')}
                                            {product.discount_pct > 0 ? (<p className="flex items-center font-semibold"><PhilippinePeso size={18} className="mr-1" /> {product.discount_price}</p>) : (<p className="flex items-center font-semibold"><PhilippinePeso size={18} className="mr-1" /> {product.item_price}</p>)}
                                            
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Stock:</p>
                                            <p className="font-semibold text-center">{product.total_quantity}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* ACTION BUTTONS */}
                                <div className="flex justify-between px-10 md:px-4 pb-4">
                                    <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-5 py-1.5 rounded-md text-sm cursor-pointer" onClick={() => ViewEditProduct(product.product_id, product.item_name, product.description, product.item_price, product.discount_pct)}>
                                        <Pencil size={16} /> Edit
                                    </button>
                                    <button className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-sm cursor-pointer" onClick={() => Delete_Product(product.product_id)}>
                                        <Trash2 size={16} /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>  
                    ))
                    ) : (
                        <div className='absolute top-[80%] md:top-[50%]'>
                            <div className='flex flex-col items-center'>
                                <Image src="/Logo/nodata.png" width={300} height={100} alt='No Data Found'/>
                                <p>No products found!</p>
                            </div>
                        </div>
                    )
                }
            </div>
            <View_Product isViewProduct={isViewProduct}
                product_name={name}
                multipleImage={multipleImage}
                item_price={item_price}
                size_chart={size_chart}
                total_stock={total_stock}
                description={description}
                variants={variants}
                closeModal={() => setIsViewProduct(false)}
            />

            <Edit_Product 
                isEdit_ProductOpen={isEditProduct} 
                item_name={item_nameEDIT}
                setItem_name={setItem_nameEDIT}
                description={descriptionEDIT}
                setDescription={setDescriptionEDIT}
                item_price={item_priceEDIT}
                setItem_price={setItem_PriceEDIT}
                discount_pct={discount_pct}
                setDiscount_pct={setDiscount_pct}
                handleEditProductSubmit={handleEditProductSubmit}
                variants={variantsEdit}
                isSubmit={isSubmit}
                handleVariantValue={handleVariantValue}
                closeModal={() => setIsEditProduct(false)}
            />

            <DeleteModal 
                deleteModal={openDeleteModal}
                closeModal={() => setOpenDeleteModal(false)}
                product_id={product_id}
            />
        </>
       
    );
}
