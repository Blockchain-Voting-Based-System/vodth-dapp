import { useState } from "react";
const EventForm = () => {
  const [formState, setFormState] = useState({
    name: "",
    option: "",
    description: "",
    image: null,
    event_id: "",
  });

  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const handleInputChange = (event: any) => {
    setFormState({
      ...formState,
      [event.target.id]: event.target.value,
    });
  };

  const handleRadioChange = (event: any) => {
    setFormState({
      ...formState,
      option: event.target.id,
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(formState);
  };

  const handleImageChange = (event: any) => {
    let image = event.target.files[0];
    let imagePreviewUrl = URL.createObjectURL(image);

    setFormState({
      ...formState,
      image: image,
    });

    setImagePreviewUrl(imagePreviewUrl);
  };
  return (
    <>
      <section className="bg-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
              <form action="#" className="space-y-4">
                <div>
                  <label className="sr-only" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="w-full border rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Name"
                    type="text"
                    id="name"
                    value={formState.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="private"
                      className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
                      tabIndex={0}
                    >
                      <input
                        className="sr-only"
                        id="private"
                        type="radio"
                        tabIndex={-1}
                        name="option"
                        value={formState.option}
                        onChange={handleRadioChange}
                      />

                      <span className="text-sm"> Private </span>
                    </label>
                  </div>

                  <div>
                    <label
                      htmlFor="public"
                      className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
                      tabIndex={0}
                    >
                      <input
                        className="sr-only"
                        id="public"
                        type="radio"
                        tabIndex={1}
                        name="option"
                        value={formState.option}
                        onChange={handleRadioChange}
                      />

                      <span className="text-sm"> Public </span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="sr-only" htmlFor="description">
                    Description
                  </label>

                  <textarea
                    className="w-full border rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Description"
                    rows={8}
                    id="description"
                    value={formState.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div
                  className={` ${imagePreviewUrl && "border p-2"} border-gray-200`}
                >
                  <input
                    className="sr-only"
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <label
                    className="w-full rounded-lg p-2 text-sm cursor-pointer bg-black text-white"
                    htmlFor="image"
                  >
                    {formState.image ? "Change Image" : "Select Image"}
                  </label>
                  {imagePreviewUrl && (
                    <div className="mt-2">
                      <img
                        className="w-full rounded-lg"
                        src={imagePreviewUrl}
                        alt=""
                      />
                    </div>
                  )}
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onSubmit={handleSubmit}
                    onClick={handleSubmit}
                    type="submit"
                    className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                  >
                    Create Event
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EventForm;
