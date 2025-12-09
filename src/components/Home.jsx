import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  const loadBooks = () => {
    fetch("http://127.0.0.1:8000/api/all_books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleSearch = () => {
    if (!search.trim()) {
      alert("Enter book name");
      return;
    }

    fetch("http://127.0.0.1:8000/api/search_book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ book_name: search }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
          loadBooks();
        } else {
          setBooks(data);
        }
      });
  };

  const deleteBook = (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    fetch(`http://127.0.0.1:8000/api/delete_book/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        alert("Book deleted");
        loadBooks();
      });
  };

  return (
    <div className="home-container">

      <h2>Library Books</h2>

      <div className="top-section">
        <button className="add-btn" onClick={() => navigate("/add")}>
          + Add New Book
        </button>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search book by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Book Name</th>
            <th>Author</th>
            <th>Type</th>
            <th>Pages</th>
            <th>Publish Date</th>
            <th>Added Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.book_name}</td>
              <td>{book.author}</td>
              <td>{book.book_type}</td>
              <td>{book.page_no}</td>
              <td>{book.publish_date}</td>
              <td>{book.added_date}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => navigate(`/edit/${book.id}`)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteBook(book.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default Home;
