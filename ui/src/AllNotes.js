import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

const NOTES_QUERY = gql`
  {
    allNotes {
      _id
      title
      content
      date
    }
  }
`;

const AllNotes = () => {
  const { loading, error, data } = useQuery(NOTES_QUERY);

  if (loading) {
    return 'Loading...';
  }

  if (error) {
    return `Error! ${error.message}`;
  }

  return (
    <div className="container m-t-20">
      <h1 className="page-title">All Notes</h1>
      <div className="allnotes-page">
        <div className="columns is-multiline">
          {data.allNotes.length > 0
            ? data.allNotes.map(note => (
                <div className="column is-one-third" key={note._id}>
                  <div className="card">
                    <header className="card-header">
                      <p className="card-header-title">{note.title}</p>
                    </header>
                    <div className="card-content">
                      <div className="content">
                        {note.content}
                        <br />
                      </div>
                    </div>
                    <footer className="card-footer">
                      <Link
                        to={`note/${note._id}`}
                        className="card-footer-item"
                      >
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
