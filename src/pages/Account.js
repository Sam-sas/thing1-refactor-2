import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import NavigationLayout from "../components/layouts/NavigationLayout";
import { useAuth } from "../utilities/contexts/authContext";
import { db } from "../utilities/Firebase";
import blankAvatar from "../images/blank-profile-picture.png";
import { Button, Col, FlexboxGrid, Loader, Message, Row } from "rsuite";
import { Link } from "react-router-dom";
import OpenModal from "../components/OpenModal";
import ExpertApproval from "../components/authforms/ExpertApproval";

export default function Account() {
  const { currentUser } = useAuth();
  const [user, setUser] = useState({});
  const [expert, setExpertise] = useState(null);
  const [expertCheckList, setExpertCheckList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [avatarUrl, setAvatarUrl] = useState(blankAvatar);

  const getExpertList = async (user) => {
    let expertList = [];
    if (user && user.isAdmin) {
      try {
        const expertsRef = collection(db, "experts");
        const expertCheckQuery = query(
          expertsRef,
          where("toBeReviewed", "==", true)
        );
        const expertCheckSnapshot = await getDocs(expertCheckQuery);
        expertCheckSnapshot.forEach((expertToBeCheckedFound) => {
          expertList.push(expertToBeCheckedFound.data());
        });
        setExpertCheckList(expertList);
      } catch (err) {
        console.log(err.Message);
      }
    }
  };

  const setImg = (user) => {
    if (user && user.avatarUrl && user.avatar !== blankAvatar) {
      setAvatarUrl(user.avatarUrl);
      return avatarUrl;
    } else {
      return avatarUrl;
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
          setUser(currentProfile);
          getExpert(currentProfile);
          getExpertList(currentProfile);
        });
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(err.message);
        setLoading(false);
      }
      subscription.unsubscribe();
    };

    const getExpert = async (user) => {
      const subscription = { unsubscribe: () => undefined };

      if (user && user.isExpert) {
        try {
          const expertRef = collection(db, "experts");
          const expertQuery = query(
            expertRef,
            where("loginUid", "==", currentUser.uid)
          );
          const expertQuerySnapshot = await getDocs(expertQuery);
          expertQuerySnapshot.forEach((profileFound) => {
            setExpertise(profileFound.data());
          });
        } catch (err) {
          console.log(err.Message);
        }
      }
      subscription.unsubscribe();
    };

    getUser();
    return () => {
      subscription.unsubscribe();
    };
  }, [currentUser.uid]);

  return (
    <div>
      <NavigationLayout>
        {loading && <Loader size="md" center speed="slow" />}
        {error && <Message type="error">{error}</Message>}
        <div>
          <img src={setImg(user)} alt="avatar of you" className="w-100 h-200" />
        </div>
        <Row className="d-flex justify-content-between">
          {/* isExpert --> check expert collection */}
          <Col>
            <div>hello {user.name}</div>
            {user.isExpert && expert && (
              <>
                <div>{expert.expertTitle}</div>
                <div>{expert.location}</div>
                <div>{expert.experience}</div>
              </>
            )}
          </Col>
          <Col>
            <Button>
              <Link to="/update-profile">Update Profile</Link>
            </Button>
          </Col>
        </Row>
        {user.isAdmin && (
          <>
            <Row>
              <div>
                <h3>Experts to be reviewed</h3>
                {expertCheckList && expertCheckList.length > 0 && (
                  <div>
                    {expertCheckList.map((expert) => (
                      <div key={expert.loginUid}>
                        <ExpertApproval expert={expert} />
                      </div>
                    ))}
                  </div>
                )}

                {(!expertCheckList || (expertCheckList && expertCheckList.length === 0)) && (
                  <p>No experts to be reviewed</p>
                )}
              </div>
            </Row>
          </>
        )}
        <Row>
          <div>
            <h3>Upcoming Sessions:</h3>
            {user.sessions && <p>Sessions available</p>}
            {!user.sessions && (
              <>
                <p>
                  No upcoming sessions.
                  <span>
                    <Link to="/expert-search"> Find an expert</Link>
                  </span>
                </p>
              </>
            )}
          </div>
        </Row>
        {user.isExpert && expert && (
          <>
            <Row>
              <div>
                <h3>Reviews Recieved</h3>
                {user.isExpert && expert.reviews && (<p>reviews here</p>)}
                {user.isExpert && !expert.reviews && (
                  <p>Currently no reviews.</p>
                )}
              </div>
            </Row>
          </>
        )}
      </NavigationLayout>
    </div>
  );
}
