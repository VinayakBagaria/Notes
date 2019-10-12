import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { notify } from 'react-notify-toast';

const NOTE_QUERY = gql`
  query getNote($_id: ID!) {
    getNote(_id: $_id) {
      _id
      title
      content
      date
    }
  }
`;

const UPDATE_NOTE = gql`
  mutation updateNote($_id: ID!, $title: String, $content: String) {
    updateNote(_id: $_id, input: { title: $title, content: $content }) {
      _id
      title
      content
    }
  }
`;

function EditNote({ match }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { loading, error, data: note } = useQuery(NOTE_QUERY, {
    variables: {
      _id: match.params.id,
    },
  });

  const [updateNote] = useMutation(UPDATE_NOTE);

  function handleFormSubmit(e) {
    e.preventDefault();
    updateNote({
      variables: {
        _id: note.getNote._id,
        title: title ? title : note.getNote.title,
        content: content ? content : note.getNote.content,
      },
    });
    notify.show('Note was edited successfully');
  }

  if (loading) {
    return 'Fetching note...';
  }
  if (error) {
    return 'Error fetching note';
  }

  return (
    <div className="container m-t-20">
      <h1 className="page-title">Edit Note</h1>
      <div className="newnote-page m-t-20">
        <form onSubmit={handleFormSubmit}>
          <div className="field">
            <label className="label">Note Title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Note Title"
                defaultValue={note.getNote.title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Note Content</label>
            <div className="control">
              <textarea
                className="textarea"
                rows="10"
                placeholder="Note Content here..."
                defaultValue={note.getNote.content}
                onChange={e => setContent(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-link">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditNote;
