import { useState, useRef, useContext } from 'react';
import './Add.css';
import { assets, url } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { StoreContext } from "../../Context/StoreContext";

const Add = () => {
    const { kitchens } = useContext(StoreContext); // ✅ get kitchens from context
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        kitchen: "", // ✅ store kitchenId instead of category name
        rating: ""
    });

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (!image) {
            toast.error('Image not selected');
            return;
        }

        if (data.price <= 0) {
            toast.error("Price must be greater than 0");
            return;
        }
        if (data.rating && (data.rating < 0 || data.rating > 5)) {
            toast.error("Rating must be between 0 and 5");
            return;
        }

        const formData = new FormData();
        formData.append("name", data.name.trim());
        formData.append("description", data.description.trim());
        formData.append("price", Number(data.price));
        formData.append("kitchen", data.kitchen); // ✅ send kitchenId
        formData.append("rating", Number(data.rating || 0));
        formData.append("image", image);

        try {
            setLoading(true);
            const response = await axios.post(`${url}/api/food/add`, formData);

            if (response.data.success) {
                toast.success(response.data.message);

                // reset form
                setData({
                    name: "",
                    description: "",
                    price: "",
                    kitchen: "",
                    rating: ""
                });
                setImage(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Error adding food");
        } finally {
            setLoading(false);
        }
    };

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                {/* Image upload */}
                <div className='add-img-upload flex-col'>
                    <p>Upload image</p>
                    <input
                        ref={fileInputRef}
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file"
                        accept="image/*"
                        id="image"
                        hidden
                    />
                    <label htmlFor="image">
                        <img
                            src={!image ? assets.upload_area : URL.createObjectURL(image)}
                            alt="preview"
                        />
                    </label>
                </div>

                {/* Product name */}
                <div className='add-product-name flex-col'>
                    <p>Product name</p>
                    <input
                        name='name'
                        onChange={onChangeHandler}
                        value={data.name}
                        type="text"
                        placeholder='Type here'
                        required
                    />
                </div>

                {/* Description */}
                <div className='add-product-description flex-col'>
                    <p>Product description</p>
                    <textarea
                        name='description'
                        onChange={onChangeHandler}
                        value={data.description}
                        rows={6}
                        placeholder='Write content here'
                        required
                    />
                </div>

                <div className='add-category-price'>
                    {/* Kitchen dropdown */}
                    <div className='add-category flex-col'>
                        <p>Select Kitchen</p>
                        <select
                            name='kitchen'
                            onChange={onChangeHandler}
                            value={data.kitchen}
                            required
                        >
                            <option value="">-- Select Kitchen --</option>
                            {kitchens.map((kitchen) => (
                                <option key={kitchen._id} value={kitchen._id}>
                                    {kitchen.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Price */}
                    <div className='add-price flex-col'>
                        <p>Product Price</p>
                        <input
                            type="number"
                            name='price'
                            onChange={onChangeHandler}
                            value={data.price}
                            placeholder='25'
                            required
                        />
                    </div>

                    {/* Rating */}
                    <div className='add-rating flex-col'>
                        <p>Product Rating</p>
                        <input
                            type="number"
                            step="0.1"
                            max="5"
                            min="0"
                            name='rating'
                            onChange={onChangeHandler}
                            value={data.rating}
                            placeholder='4.5'
                        />
                    </div>
                </div>

                <button
                    type='submit'
                    className='add-btn'
                    disabled={loading}
                >
                    {loading ? "Adding..." : "ADD"}
                </button>
            </form>
        </div>
    );
};

export default Add;
