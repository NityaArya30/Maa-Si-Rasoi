import { useEffect, useState } from 'react'
import './List.css'
import { url } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

// import delete icon
import { Trash2 } from "lucide-react"

const KitchenList = () => {
    const [list, setList] = useState([])

    // Fetch all kitchens
    const fetchKitchens = async () => {
        try {
            const response = await axios.get(`${url}/api/kitchen/listKitchen`)
            if (response.data.success) {
                setList(response.data.data)
            } else {
                toast.error("Error fetching kitchens")
            }
        } catch (error) {
            toast.error("Server error")
        }
    }

    // Remove kitchen
    const removeKitchen = async (kitchenId) => {
        try {
            const response = await axios.post(`${url}/api/kitchen/removeKitchen`, { id: kitchenId })
            await fetchKitchens()
            if (response.data.success) {
                toast.success(response.data.message)
            } else {
                toast.error("Error removing kitchen")
            }
        } catch (error) {
            toast.error("Server error")
        }
    }

    useEffect(() => {
        fetchKitchens()
    }, [])

    return (
        <div className='list add flex-col'>
            <p>All Kitchens List</p>
            <div className='list-table'>
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Action</b>
                </div>
                {list.map((item, index) => (
                    <div key={index} className='list-table-format'>
                        <img src={`${url}/images/kitchens/${item.image}`} alt={item.name} />
                        <p>{item.name}</p>
                        <Trash2
                            className="delete-icon"
                            onClick={() => removeKitchen(item._id)}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default KitchenList
