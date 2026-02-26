import React, { useState } from "react";

const Folders = ({ folders, setActiveFolderId, createFolder }) => {
  const [showNewFolder, setShowNewFolder] = useState(false);

  return (
    <div className="screen">
      <div className="screen-header">
        <div className="header-top">
          <div className="circle-placeholder" />
        </div>

        <h1 className="screen-title">Folders</h1>
      </div>

      <div className="screen-scroll">
        {folders.map((folder) => (
          <div
            key={folder.id}
            className="card-row"
            onClick={() => setActiveFolderId(folder.id)}
          >
            {showNewFolder}
            <div className="folder-left">
              <span className="folder-icon">📁</span>
              <span className="folder-name">{folder.name}</span>
            </div>

            <div className="folder-right">
              <span className="folder-count">{folder.notes.length}</span>
              <span className="chevron">›</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Folders;
