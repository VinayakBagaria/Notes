import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const NEW_NOTE = gql`
  mutation createNoteMutation($title: String!, $content: String!) {
    createNote(input: { title: $title, content: $content }) {
      _id
      title
      content
      date
    }
  }
`;

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

const NewNote = withRouter(({ history }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [createNote] = useMutation(NEW_NOTE, {
    update(cache, { data: createdNewNote }) {
      const { allNotes } = cache.readQuery({ query: NOTES_QUERY });
      cache.writeQuery({
        query: NOTES_QUERY,
        data: { allNotes: allNotes.concat([createdNewNote]) },
      });
    },
  });

  function handleFormSubmit(e) {
    e.preventDefault();
    createNote({
      variables: {
        title,
        content,
        date: Date.now(),
      },
    });
    history.push('/');
  }

  return (
    <div className="container m-t-20">
      <h1 className="page-title">New Note</h1>
      <div className="newnote-page m-t-20">
        <form onSubmit={handleFormSubmit}>
          <div className="field">
            <label className="label">Note Title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Note Title"
                value={title}
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
                value={content}
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
});

export default NewNote;
