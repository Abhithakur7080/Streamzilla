import React, { useState } from "react";

const Edit = ({ initialContent, onCancel, onSave }) => {
  const [editedContent, setEditedContent] = useState(initialContent);

  const handleSave = () => {
    onSave(editedContent);
  };
  return (
    <div className="w-full text-sm">
      <input
        className="bg-gray-200 outline-none border-b w-3/4 p-2"
        value={editedContent}
        autoFocus
        onChange={(e) => setEditedContent(e.target.value)}
      />
      <div>
        <span
          className="bg-gray-400 py-1 px-3 font-normal rounded-lg hover:bg-gray-300 cursor-pointer"
          onClick={onCancel}
        >
          Cancel
        </span>
        <button
          onClick={handleSave}
          className="bg-[#ff0000] text-white py-1 px-3 rounded-lg hover:bg-[#ff1000] cursor-pointer"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Edit;
