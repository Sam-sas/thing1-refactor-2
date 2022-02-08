import React, { useEffect, useState } from "react";
import { Button, ButtonToolbar, Form, Message, toaster } from "rsuite";
import { useAuth } from "../../utilities/contexts/authContext";
import { db, storage } from "../../utilities/Firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { UPDATEUSERLINKS } from "../../utilities/utilities";
import FormLayout from "../layouts/FormLayout";
import NavigationLayout from "../layouts/NavigationLayout";
import Logo from "../Logo";
import SinglePageNavigation from "../navigation/SinglePageNavigation";

export default function UpdateExpertise() {
  const { currentUser } = useAuth();
  const initialUser = {
    displayName: "",
    experience: "",
    expertTitle: "",
    location: "",
  };
  const [expertProfile, setExpertProfile] = useState(initialUser);
  const [expertDoc, setExpertDoc] = useState("");
  const [credenitalFiles, setCredentialFiles] = useState([]);
  const [displayName, setDisplayName] = useState(expertProfile.displayName);
  const [experience, setExperience] = useState(expertProfile.experience);
  const [expertTitle, setExpertTitle] = useState(expertProfile.expertTitle);
  const [location, setLocation] = useState(expertProfile.location);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const uploadCredentialFiles = () => {
    const promises = [];
    credenitalFiles.map((image) => {
        // test was not in storage originally and it was added later
        const uploadTask = storage.ref(`${currentUser.uid}/credential-files/${image.name}`).put(image);
        promises.push(uploadTask);
        uploadTask.on(
            "state_changed",
            snapshot => {
              console.log(snapshot);
            },
            error => {
                console.log(error);
            },
            async () => {
                await storage.ref(`${currentUser.uid}/credential-files/`).child(image.name).getDownloadURL().then(urls => {
                    console.log(urls);
                });
            }
        );
    })
    Promise.all(promises).then().catch((err) => console.log(err));
   
  };

  const addFiles = (e) => {
    for(let i=0; i<e.target.files.length; i++) {
    const files = e.target.files[i];
    setCredentialFiles((prevState) => [...prevState, files]);
    }
  }

  useEffect(() => {
    const subscription = { unsubscribe: () => undefined };

    const getUser = async () => {
      let currentProfile;
      setLoading(true);
      try {
        const profilesRef = collection(db, "experts");
        const profileQuery = query(
          profilesRef,
          where("loginUid", "==", currentUser.uid)
        );
        const profileQuerySnapshot = await getDocs(profileQuery);
        profileQuerySnapshot.forEach((profileFound) => {
          currentProfile = profileFound.data();
          setExpertProfile(currentProfile);
          setExpertDoc(profileFound.id);
        });
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(err.message);
        setLoading(false);
      }
      subscription.unsubscribe();
    };

    if (currentUser) {
      getUser();
    }

    return () => {
      subscription.unsubscribe();
    };
  }, [currentUser, setExpertDoc, setExpertProfile]);

  const handleUpdateProfile = async () => {
    uploadCredentialFiles();
    try {
      const newData = {
        displayName: displayName,
        experience: experience + 'years',
        expertTitle: expertTitle,
        location: location,
      };
      const expertDocRef = doc(db, "experts", expertDoc);
      await updateDoc(expertDocRef, newData);
      toaster.push(
        <Message type="info" closable>
          Updated! {expertProfile.displayName}
        </Message>
      );
    } catch (err) {
      <Message type="error" closable>
        Could not update!
      </Message>;
      console.log(err);
    }
  };

  return (
    <NavigationLayout>
      <SinglePageNavigation links={UPDATEUSERLINKS} />
      <FormLayout>
        <Form onSubmit={handleUpdateProfile}>
          <div className="d-flex justify-content-center flex-column align-items-center">
            <h2 className="z-999">
              {expertProfile.isExpert && <span>Create your expert profile</span>}
              {!expertProfile.isExpert && <div>Update your expert profile</div>}
            </h2>
            <Form.Group controlId="name">
              <Form.ControlLabel>Display Name</Form.ControlLabel>
              <Form.Control
                name="display Name"
                type="name"
                onChange={(e) => setDisplayName(e)}
                placeholder={expertProfile.displayName}
              />
            </Form.Group>
            <Form.Group controlId="experience">
              <Form.ControlLabel>Years of Experience</Form.ControlLabel>
              <Form.Control
                name="experience"
                htmlFor='experience'
                rows={1}
                autoComplete="off"
                onChange={(e) => setExperience(e)}
                placeholder={expertProfile.experience}
              />
            </Form.Group>
            <Form.Group controlId="expertTitle">
              <Form.ControlLabel>Job Title</Form.ControlLabel>
              <Form.Control
                name="expertTitle"
                htmlFor='expertTitle'
                rows={1}
                autoComplete="off"
                onChange={(e) => setExpertTitle(e)}
                placeholder={expertProfile.expertTitle}
              />
            </Form.Group>
            <Form.Group controlId="location">
              <Form.ControlLabel>Location</Form.ControlLabel>
              <Form.Control
                name="location"
                htmlFor='location'
                rows={1}
                autoComplete="off"
                onChange={(e) => setLocation(e)}
                placeholder={expertProfile.expertTitle}
              />
            </Form.Group>
            <Form.Group controlId="avatar">
              <Form.ControlLabel>Credendtial files</Form.ControlLabel>
              <input
                type="file"
                multiple
                onChange={addFiles}
              />
              <Form.HelpText>Must be png, jpeg, doc, or pdf</Form.HelpText>
            </Form.Group>
          </div>
          <Logo />
          <Form.Group>
            <ButtonToolbar className="d-flex flex-column">
              <Button
                block
                appearance="primary"
                disabled={loading}
                type="submit"
                className="blue-background br-rounded"
              >
                Submit
              </Button>
            </ButtonToolbar>
          </Form.Group>
        </Form>
      </FormLayout>
    </NavigationLayout>
  );
}
