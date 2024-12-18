import React, { useState } from "react";

const Edit = ({ initialContent, onCancel, onSave }) => {
  const [editedContent, setEditedContent] = useState(initialContent);

  const handleSave = () => {
    onSave(editedContent);
  };
  return (
    <div className="w-full text-sm">
      <input
        className="bg-gray-200 outline-none border-b w-3/4 p-2 text-black"
        value={editedContent}
        autoFocus
        onChange={(e) => setEditedContent(e.target.value)}
      />
      <div className="mt-2 flex gap-2">
        <span
          className="bg-gray-200 py-1 px-3 font-normal rounded-lg hover:bg-gray-300 text-black cursor-pointer"
          onClick={onCancel}
        >
          Cancel
        </span>
        <button
          onClick={handleSave}
          className="bg-purple-900 text-white py-1 px-3 rounded-lg hover:bg-purple-700 cursor-pointer"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Edit;
