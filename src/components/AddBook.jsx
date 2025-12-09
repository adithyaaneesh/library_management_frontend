import { useState } from 'react';
import "../styles/AddBook.css";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/add_book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      alert("Book added successfully!");

      setFormData({
        book_name: "",
        author: "",
        book_type: "",
        page_no: "",
        publish_date: "",
      });

    } catch (error) {
      alert("Failed to add book");
    }
  };

  return (
    <div className='container'>
      <div className='form-box'>
        <h2>Add New Book</h2>
        <form onSubmit={handleSubmit}>

          <div className='form-group'>
            <label>Book Name</label>
            <input type="text" name="book_name" value={formData.book_name} onChange={handleChange} />
          </div>

          <div className='form-group'>
            <label>Author</label>
            <input type="text" name="author" value={formData.author} onChange={handleChange} />
          </div>

          <div className='form-group'>
            <label>Book Type</label>
            <input type="text" name="book_type" value={formData.book_type} onChange={handleChange} />
          </div>

          <div className='form-group'>
            <label>Page No</label>
            <input type="number" name="page_no" value={formData.page_no} onChange={handleChange} />
          </div>

          <div className='form-group'>
            <label>Publish Date</label>
            <input type="date" name="publish_date" value={formData.publish_date} onChange={handleChange} />
          </div>

          <button type="submit" className='submit-btn'>Add Book</button>

        </form>
      </div>
    </div>
  );
};

export default AddBook;
