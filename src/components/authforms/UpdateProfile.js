import React, { useEffect, useState } from "react";
import { Button, ButtonToolbar, Form, Message, toaster } from "rsuite";
import { useAuth } from "../../utilities/contexts/authContext";
import { db, storage } from "../../utilities/Firebase";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { UPDATEUSERLINKS } from "../../utilities/utilities";
import FormLayout from "../layouts/FormLayout";
import NavigationLayout from "../layouts/NavigationLayout";
import Logo from "../Logo";
import SinglePageNavigation from "../navigation/SinglePageNavigation";

export default function UpdateProfile() {
  const { currentUser } = useAuth();
  const initialUser = {
    name: '',
    phoneNumber: '',
    avatarUrl: '',
  }
  let avatarUrl;
  const [userProfile, setUserProfile] = useState(initialUser);
  const [userDoc, setUserDoc] = useState('');
  const [newDisplayName, setNewDisplayName] = useState(userProfile.name);
  const [newAvatar, setNewAvatar] = useState('');
  const [newPhoneNumber, setPhoneNumber] = useState(userProfile.phone);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  const uploadImgFiles = () => {
    try {
        if (userProfile && newAvatar) {
          console.log("new Avatart", newAvatar);
            const uploadTask = storage.ref(`${currentUser.uid}/avatar-image/`).put(newAvatar);
            uploadTask.on(
                "state_changed",
                snapshot => {
                  console.log("snapshot", snapshot);
                },
                error => {
                    console.log(error);
                },
                () => {
                    storage.ref(`${currentUser.uid}`).child('avatar-image').getDownloadURL().then(url => {
                      console.log('File available at', url);
                      try {
                        const userDocRef = doc(db, 'profiles', userDoc);
                        updateDoc(userDocRef, {
                          avatarUrl: url
                        });
                      } catch(err) {
                        console.log(err);
                      }
                    
                    });
                }
            );
        }
    } catch(err) {
        console.log(err);
    }  
};

useEffect(() => {
  const subscription = { unsubscribe: () => undefined };

  const getUser = async () => {

    let currentProfile;
    setLoading(true);
    try {
      const profilesRef = collection(db, "profiles");
      const profileQuery = query(
        profilesRef,
        where("loginUid", "==", currentUser.uid)
      );
      const profileQuerySnapshot = await getDocs(profileQuery);
      profileQuerySnapshot.forEach((profileFound) => {
        currentProfile = profileFound.data();
          setUserProfile(currentProfile);
          setUserDoc(profileFound.id);
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
}, [currentUser, setUserDoc, setUserProfile]);

  const handleUpdateProfile = async () => {
    uploadImgFiles();
    console.log(avatarUrl);
    try {
      const newData = {
        name: newDisplayName,
        phoneNumber: newPhoneNumber,
      }
      const userDocRef = doc(db, 'profiles', userDoc);
      await updateDoc(userDocRef, newData);
      toaster.push(
        <Message type="info" closable>
          Updated! {userProfile.name} {userProfile.phoneNumber}
        </Message>
      );
    } catch (err) {
      <Message type="error" closable>
          Could not update!
        </Message>
      console.log(err);
    }

  };

  return (
    <NavigationLayout>
      <SinglePageNavigation links={UPDATEUSERLINKS} />
        <FormLayout>
          <Form onSubmit={handleUpdateProfile}>
            <div className="d-flex justify-content-center flex-column align-items-center">
              <Form.Group controlId="name">
                <Form.ControlLabel>Display Name</Form.ControlLabel>
                <Form.Control
                  name="display Name"
                  type="name"
                  onChange={(e) => setNewDisplayName(e)}
                  // placeholder={userProfile.name}
                />
              </Form.Group>
              <Form.Group controlId="PhoneNumber">
                <Form.ControlLabel>Phone Number</Form.ControlLabel>
                <Form.Control
                  name="Phone Number"
                  type="tel"
                  autoComplete="off"
                  onChange={(e) => setPhoneNumber(e)}
                />
              </Form.Group>
              <Form.Group controlId="avatar">
                <Form.ControlLabel>Avatar Image</Form.ControlLabel>
                <input type="file" onChange={(e)=>{setNewAvatar(e.target.files[0])}} />
                <Form.HelpText>Must be png or jpeg</Form.HelpText>
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
