// import CsvUploader from "../../components/csv/CsvUploader";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { eventStorage, firestore } from "./../../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { EventFormType } from "../../utils/formType";
import { loadAccounts } from "./../../utils/sui";
import { NewEvent } from "../../utils/newEvent";
import { AccountData } from "../../utils/suiType";
import { useRef } from "react";

const NewEventPage = () => {
  const accounts = useRef<AccountData[]>(loadAccounts());
  const account = accounts.current[0];
  const [formState, setFormState] = useState<EventFormType>({
    name: "",
    type: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
  });
  const [image, setImage] = useState<File>();

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
      type: event.target.id,
    });
  };
  const handleImageChange = (event: any) => {
    let image = event.target.files[0];
    let imagePreviewUrl = URL.createObjectURL(image);

    setImage(image);

    setImagePreviewUrl(imagePreviewUrl);
  };

  const uploadImage = async () => {
    let result = {
      status: false,
      image_name: "",
    };
    if (image != null) {
      const imageName = image.name;
      const ImageRef = ref(eventStorage, `events/${imageName}`);
      await uploadBytes(ImageRef, image)
        .then(() => {
          result.status = true;
          result.image_name = imageName;
        })
        .catch((e) => {
          console.log(e);
        });
    }
    return result;
  };

  const createEvent = async (e: any) => {
    e.preventDefault();
    const eventCollection = collection(firestore, "events");
    const suiEvent = await NewEvent(account).catch((e) => {
      alert("Error creating event");
    });
    const imageUpload = await uploadImage().catch((e) => {
      alert("Error uploading image");
    });
    if (imageUpload?.status == true && suiEvent?.success == true) {
      const event = {
        ...formState,
        image_name: imageUpload.image_name,
        event_id: suiEvent?.event_id,
      };
      await addDoc(eventCollection, event)
        .then(() => {
          alert("Event created successfully");
        })
        .catch((e) => {
          alert("Error creating event");
        });
    }
  };

  return (
    <>
      <section className="bg-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
            <form action="#" className="space-y-4">
              <div>
                <label className="sr-only" htmlFor="name">
                  Name
                </label>
                <input
                  required
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
                      required
                      className="sr-only"
                      id="private"
                      type="radio"
                      tabIndex={-1}
                      name="type"
                      value={formState.type}
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
                      required
                      className="sr-only"
                      id="public"
                      type="radio"
                      tabIndex={1}
                      name="type"
                      value={formState.type}
                      onChange={handleRadioChange}
                    />

                    <span className="text-sm"> Public </span>
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="sr-only" htmlFor="startDate">
                    Start Date
                  </label>
                  <input
                    required
                    className="w-full border rounded-lg border-gray-200 p-3 text-sm"
                    type="date"
                    id="startDate"
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="sr-only" htmlFor="endDate">
                    End Date
                  </label>
                  <input
                    required
                    className="w-full border rounded-lg border-gray-200 p-3 text-sm"
                    type="date"
                    id="endDate"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <label className="sr-only" htmlFor="description">
                  Description
                </label>

                <textarea
                  required
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
                  required
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
                  {image ? "Change Image" : "Select Image"}
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
                  onClick={createEvent}
                  type="submit"
                  className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                >
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewEventPage;
