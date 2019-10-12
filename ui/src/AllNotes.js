import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { notify } from 'react-notify-toast';

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

const DELETE_NOTE = gql`
  mutation deleteNote($_id: ID!) {
    deleteNote(_id: $_id) {
      _id
      title
      content
      date
    }
  }
`;

const AllNotes = () => {
  const { loading, error, data } = useQuery(NOTES_QUERY);

  const [deleteNote] = useMutation(DELETE_NOTE, {
    update(
      cache,
      {
        data: { deleteNote: deletedNote },
      }
    ) {
      const { allNotes } = cache.readQuery({ query: NOTES_QUERY });
      const newNotes = allNotes.filter(note => note._id !== deletedNote._id);
      cache.writeQuery({
        query: NOTES_QUERY,
        data: { allNotes: newNotes },
      });
    },
  });

  function handleNoteDelete(e, noteId) {
    e.preventDefault();
    deleteNote({ variables: { _id: noteId } });
    notify.show('Note was deleted successfully');
  }

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
                      <button
                        onClick={e => handleNoteDelete(e, note._id)}
                        className="card-footer-item"
                      >
                        Delete
                      </button>
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
