import { useEffect, useState } from 'react'
import './List.css'
import { url, currency } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

// import delete icon
import { Trash2 } from "lucide-react"

const List = () => {
  const [list, setList] = useState([])

  // Fetch all foods
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`)
      if (response.data.success) {
        setList(response.data.data)
      } else {
        toast.error("Error fetching food list")
      }
    } catch (error) {
      toast.error("Server error")
    }
  }

  // Remove food
  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId })
      await fetchList()
      if (response.data.success) {
        toast.success(response.data.message)
      } else {
        toast.error("Error removing food")
      }
    } catch (error) {
      toast.error("Server error")
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className='list-table'>
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Kitchens</b>
          <b>Price</b>
          <b>Rating</b> {/* ⭐ New column */}
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className='list-table-format'>
            <img src={`${url}/images/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.kitchen?.name}</p>
            <p>{currency}{item.price}</p>
            <p>{item.rating ? `${item.rating} ⭐` : "No rating"}</p> {/* ⭐ New field */}
            <Trash2
              className="delete-icon"
              onClick={() => removeFood(item._id)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default List