import React from 'react';

function EditNote() {
  return (
    <div className="container m-t-20">
      <h1 className="page-title">Edit Note</h1>
      <div className="newnote-page m-t-20">
        <form>
          <div className="field">
            <label className="label">Note Title</label>
            <div className="control">
              <input className="input" type="text" placeholder="Note Title" />
            </div>
          </div>
          <div className="field">
            <label className="label">Note Content</label>
            <div className="control">
              <textarea
                className="textarea"
                rows="10"
                placeholder="Note Content here..."
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
