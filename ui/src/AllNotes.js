import React from 'react';
import { Link } from 'react-router-dom';

const AllNotes = () => {
  let data = [1, 2, 3, 4, 5];
  return (
    <div className="container m-t-20">
      <h1 className="page-title">All Notes</h1>
      <div className="allnotes-page">
        <div className="columns is-multiline">
          {data.length > 0
            ? data.map((item, i) => (
                <div className="column is-one-third" key={i}>
                  <div className="card">
                    <header className="card-header">
                      <p className="card-header-title">Component</p>
                    </header>
                    <div className="card-content">
                      <div className="content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Phasellus nec iaculis mauris. Lorem ipsum dolor sit
                        amet.
                        <br />
                      </div>
                    </div>
                    <footer className="card-footer">
                      <Link to={`note/${i}`} className="card-footer-item">
                        Edit
                      </Link>
                      <a href="#" className="card-footer-item">
                        Delete
                      </a>
                    </footer>
                  </div>
                </div>
              ))
            : 'No Notes yet'}
        </div>
      </div>
    </div>
  );
};

export default AllNotes;
