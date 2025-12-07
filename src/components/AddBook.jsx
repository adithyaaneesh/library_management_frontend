import { useState } from 'react'
import "../styles/AddBook.css"

const AddBook = () => {
    const [formData, setFormData] = useState({
        book_name: "",
        author: "",
        book_type: "",
        page_no: "",
        publish_date: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData); //  Django API using fetch/axios
    };

  return (
    <div className='container'>
        <div className='form-box'>
            <h2>Add New Book</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Book Name</label>
                    <input 
                    type="text" 
                    name="book_name" 
                    placeholder="Enter book name"
                    value={formData.book_name}
                    onChange={handleChange} 
                    />
                </div>
                <div className='form-group'>
                    <label>Author</label>
                    <input 
                    type="text" 
                    name="author" 
                    placeholder="Enter author name"
                    value={formData.author}
                    onChange={handleChange} 
                    />
                </div>
                <div className='form-group'>
                    <label>Book Type</label>
                    <input 
                    type="text" 
                    name="book_type" 
                    placeholder="Enter book type"
                    value={formData.book_type}
                    onChange={handleChange} 
                    />
                </div>
                <div className='form-group'>
                    <label>Page No</label>
                    <input 
                    type="number" 
                    name="page_no" 
                    placeholder="Enter number of pages"
                    value={formData.page_no}
                    onChange={handleChange} 
                    />
                </div>
                <div className='form-group'>
                    <label>Publish Date</label>
                    <input 
                    type="date" 
                    name="publish_date" 
                    placeholder="Enter publish date"
                    value={formData.publish_date}
                    onChange={handleChange} 
                    />
                </div>
                <button type="submit" className='submit-btn'>Add Book</button>
            </form>
        </div>
    </div>
  )
}

export default AddBook
