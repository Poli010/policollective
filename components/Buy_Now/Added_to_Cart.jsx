export default function Added_to_Cart({isAddtoCart}){
    return(
        <>
            <div className={`fixed top-1/2 left-1/2 transform -translate-1/2 bg-black/70 py-5 px-10 rounded-md transition-all duration-500  ${isAddtoCart ? 'scale-100' : 'scale-0'}`}>
                <h1 className="text-sm text-white text-center">Added to cart successfully!</h1>
            </div>
        </>
    );
}