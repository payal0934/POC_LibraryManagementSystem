// src/components/BookCard.jsx
import React from "react";

const BookCard = ({ book, onAction, actionText }) => {
  return (
    <div className="card mb-3" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{book.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
        <p className="card-text">Category: {book.category}</p>
        <p className="card-text">Quantity: {book.quantity}</p>
        {onAction && <button className="btn btn-primary" onClick={() => onAction(book.id)}>{actionText}</button>}
      </div>
    </div>
  );
};

export default BookCard;
