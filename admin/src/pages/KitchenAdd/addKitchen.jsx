import { useState, useRef } from 'react';
// import './AddKitchen.css';
import { assets, url } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddKitchen = () => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    const [data, setData] = useState({
        name: ""
    });

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (!image) {
            toast.error('Please select an image');
            return;
        }
        if (!data.name.trim()) {
            toast.error('Kitchen name is required');
            return;
        }

        const formData = new FormData();
        formData.append("name", data.name.trim());
        formData.append("image", image);

        try {
            setLoading(true);
            const response = await axios.post(`${url}/api/kitchen/addKitchen`, formData);

            if (response.data.success) {
                toast.success(response.data.message);

                // reset form
                setData({ name: "" });
                setImage(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Error adding kitchen");
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
                    <p>Upload Kitchen Image</p>
                    <input
                        ref={fileInputRef}
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file"
                        accept="image/*"
                        id="kitchen-image"
                        hidden
                    />
                    <label htmlFor="kitchen-image">
                        <img
                            src={!image ? assets.upload_area : URL.createObjectURL(image)}
                            alt="preview"
                        />
                    </label>
                </div>

                {/* Kitchen name */}
                <div className='add-product-name flex-col'>
                    <p>Kitchen Name</p>
                    <input
                        name='name'
                        onChange={onChangeHandler}
                        value={data.name}
                        type="text"
                        placeholder='Enter kitchen name'
                        required
                    />
                </div>

                <button
                    type='submit'
                    className='add-btn'
                    disabled={loading}
                >
                    {loading ? "Adding..." : "ADD KITCHEN"}
                </button>
            </form>
        </div>
    );
};

export default AddKitchen;
