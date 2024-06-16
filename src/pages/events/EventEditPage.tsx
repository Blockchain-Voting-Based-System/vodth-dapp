import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { EventFormType } from "../../utils/formType";
import { eventStorage, firestore } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getDoc,
  doc,
  updateDoc,
  collection,
  query,
  getDocs,
  where,
  DocumentData,
} from "firebase/firestore";
import CandidatesList from "../../components/candidatesList/CandidateList";
const EventDetailsPage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { event_id } = useParams();
  const [image, setImage] = useState<File>();
  const [imageName, setImageName] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [candidates, setCandidates] = useState<DocumentData>([]);
  const [formState, setFormState] = useState<EventFormType>({
    name: "",
    type: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
  });

  async function getEvent(param: any) {
    const docRef = doc(firestore, "events", param);
    const event = await getDoc(docRef);
    if (event.exists()) {
      const eventForm: EventFormType = {
        name: event.data().name,
        type: event.data().type,
        description: event.data().description,
        startDate: event.data().startDate,
        endDate: event.data().endDate,
      };
      const imageRef = ref(eventStorage, `events/${event.data().image_name}`);
      await getDownloadURL(imageRef).then((r) => {
        setImagePreviewUrl(r);
      });
      setFormState(eventForm);
      setImageName(event.data().image_name);
    }
  }

  async function getCandidatesImages(image_name: any) {
    const imageRef = ref(eventStorage, `candidates/${image_name}`);
    const url = await getDownloadURL(imageRef);
    return url;
  }

  async function getCandidates(eventId: any) {
    const candidates: any = [];
    const candidatesCollection = collection(firestore, "candidates");
    const q = query(candidatesCollection, where("event_id", "==", eventId));
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.map(async (doc) => {
      const imageUrl = await getCandidatesImages(doc.data().image_name);
      candidates.push({ ...doc.data(), imageUrl });
    });
    setCandidates(candidates);
  }

  useEffect(() => {
    getEvent(event_id);
    getCandidates(event_id);
  }, []);

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
      status: true,
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
          result.status = false;
          console.log(e);
        });
    }
    return result;
  };

  const updateEvent = async (e: any) => {
    e.preventDefault();
    const imageUpload = await uploadImage();
    if (imageUpload.status == true && imageUpload.image_name != "") {
      const event = {
        ...formState,
        image_name: imageUpload.image_name,
      };
      console.log(event);

      if (event_id) {
        const docRef = doc(firestore, "events", event_id);
        try {
          await updateDoc(docRef, event).then(() => {
            console.log(true);
          }); // Pass the document reference and event object to the updateDoc function
        } catch (error) {
          console.log(error);
        }
      }
    }
    if (
      imageUpload.status == true &&
      imageUpload.image_name == "" &&
      event_id
    ) {
      const event = {
        ...formState,
        image_name: imageName,
      };
      console.log(event);

      const docRef = doc(firestore, "events", event_id);
      await updateDoc(docRef, event)
        .then(() => {
          alert("Event updated successfully");
        })
        .catch((e) => {
          alert("Event update failed");
        });
    }
  };
  return (
    <section className="bg-gray-100">
      <div className="mx-auto py-6 px-1 sm:px-2 lg:px-4">
        <div className="rounded-lg bg-white shadow-lg">
          <div className="text-2xl font-semibold my-4 ml-8 inline-block">
            Event Details
          </div>
          <hr />
          <form className="grid grid-cols-7 space-x-4 px-8 pt-4 pb-8">
            <div className="col-span-4">
              <div className="p-2 my-2">Event Name</div>
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

              <div className="p-2 my-2">Event Description</div>
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

              <div className="p-2 my-2">Event Duration</div>
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
                    value={formState.startDate.toString()}
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
                    value={formState.endDate.toString()}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-3">
              <div className="my-2 p-2">Event Image</div>
              <div>
                <div className="flex items-center justify-center">
                  <div
                    className={`border-2 border-dashed border-gray-40 text-center bg-white rounded-lg max-w-md w-full cursor-pointer ${!imagePreviewUrl && "p-24"}`}
                    onClick={() => {
                      fileInputRef.current?.click();
                    }}
                    style={{ height: "292px" }}
                  >
                    {imagePreviewUrl ? (
                      <img
                        className="w-full rounded-lg"
                        style={{ maxHeight: "400px", height: "100%" }}
                        src={imagePreviewUrl}
                        alt=""
                        onClick={() => {
                          fileInputRef.current?.click();
                        }}
                      />
                    ) : (
                      <div>
                        <p className="text-lg mb-2">
                          <strong>Add & Drop</strong> or{" "}
                          <span className="text-blue-500">Browse</span>
                        </p>
                        <p className="text-sm text-gray-600">
                          We currently support JPG, JPEG, PNG and make sure your
                          file size is not more than 500kb
                        </p>
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          onChange={handleImageChange}
                          accept=".jpg, .jpeg, .png"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="my-2 p-2">Poll Type</div>
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
                      checked={!!formState.type && formState.type === "private"}
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
                      checked={!!formState.type && formState.type === "public"}
                      onChange={handleRadioChange}
                    />

                    <span className="text-sm"> Public </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="col-span-4 mt-10"></div>
            <div className="col-span-3 mt-10 flex justify-end space-x-8">
              <button
                onClick={() => {
                  window.location.href = "/events";
                }}
                type="button"
                className="inline-block w-full rounded-lg bg-red-500 px-5 py-3 font-medium text-white sm:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={updateEvent}
                type="submit"
                className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
              >
                Update Event
              </button>
            </div>
          </form>
        </div>
      </div>
      <CandidatesList eventId={event_id} candidates={candidates} />
    </section>
  );
};

export default EventDetailsPage;
