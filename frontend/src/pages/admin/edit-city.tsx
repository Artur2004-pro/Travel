// import { useForm } from "react-hook-form";
// import type { ICity } from "../../types";
import { useState } from "react";
import { UploadImages } from "../components";

export const UpdateCity = () => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  // const {
  //   register,
  //   reset,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<ICity>();
  // const submit = async (data: ICity) => {
  //   console.log("hello");
  // };
  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    if (newImages.length + files.length > 5) return;
    console.log();
    setNewImages((prev) => [...prev, ...files]);
  };
  const handleRemoveNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1>Update city</h1>
      {/* <form onChange={handleSubmit(submit)}>
        <label>Select Images</label>
        <button
          onClick={() => {
            inpRef.current?.click();
          }}
        >
          + add Images
          <input
            onChange={(e) => {
              const { files } = e.target;
              setFile([...files!]);
              // console.log(files?[0]);
              const images = URL.createObjectURL(files)
              setPreview([...preview, images]);
            }}
            type="file"
            className="hi"
            ref={inpRef}
          />
        </button>
      </form> */}
      <UploadImages
        label="Add new photos"
        images={newImages}
        previews={previews}
        onAdd={handleAddImage}
        onDelete={handleRemoveNewImage}
      />
      {previews && previews.map((preview) => <img src={`${preview}`} />)}
    </div>
  );
};
