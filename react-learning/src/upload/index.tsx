import * as React from "react";
import * as ReactDOM from "react-dom";
import { useRef } from "react";

const UploadBtn = () => {
  const uploadEl = useRef<any>(null);
  const handleFileData = (data: any) => {
    const file = data.currentTarget.files[0];
    const formData = new FormData();
    formData.append("image", file, file.name);
  };

  return (
    <div>
      <input
        type="file"
        ref={uploadEl}
        onChange={handleFileData}
        style={{ display: "none" }}
      />
      <button onClick={() => uploadEl.current.click()}>Upload</button>
    </div>
  );
};

ReactDOM.render(<UploadBtn />, document.getElementById("app"));
