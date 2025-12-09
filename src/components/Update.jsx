import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/AddBook.css";

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    book_name: "",
    author: "",
    book_type: "",
    page_no: "",
    publish_date: "",
  });

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/update_book/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://127.0.0.1:8000/api/update_book/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    alert("Book updated successfully!");
    navigate("/");
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Update Book</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Book Name</label>
            <input type="text" name="book_name" value={formData.book_name} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Author</label>
            <input type="text" name="author" value={formData.author} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Book Type</label>
            <input type="text" name="book_type" value={formData.book_type} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Page Number</label>
            <input type="number" name="page_no" value={formData.page_no} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Publish Date</label>
            <input type="date" name="publish_date" value={formData.publish_date} onChange={handleChange} />
          </div>

          <button type="submit" className="submit-btn">Update Book</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBook;
