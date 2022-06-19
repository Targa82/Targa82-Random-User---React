import React, { useState, useEffect } from "react";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";
const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";
function App() {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState(null);
  const [title, setTitle] = useState("name");
  const [header, setHeader] = useState("Test");

  const getRandomUser = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const person = data.results[0];
    const { phone, email } = person;
    const { large: image } = person.picture;
    const {
      login: { password },
    } = person;
    const { first, last } = person.name;
    const {
      dob: { age },
    } = person;
    const {
      street: { number, name },
    } = person.location;
    const newPerson = {
      image,
      phone,
      email,
      password,
      age,
      street: `${number} ${name}`,
      name: `${first} ${last}`,
    };
    setPerson(newPerson);
    setLoading(false);
    setTitle("name");
    setHeader(newPerson.name);
  };

  const headerHandler = (e) => {
    if (e.target.classList.contains("icon")) {
      const newValue = e.target.dataset.label;
      setTitle(newValue);
      setHeader(person[newValue]);
    }
  };

  useEffect(() => {
    getRandomUser();
  }, []);

  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img src={(person && person.image) || defaultImage} alt="person" />
          <p className="user-title">My {title} is</p>
          <p className="user-value">{header}</p>
          <div className="values-list">
            <div
              className="icon"
              data-label="email"
              onMouseOver={headerHandler}
            >
              <FaEnvelopeOpen />
            </div>
            <div className="icon" data-label="name" onMouseOver={headerHandler}>
              <FaUser />
            </div>
            <div className="icon" data-label="age" onMouseOver={headerHandler}>
              <FaCalendarTimes />
            </div>
            <div
              className="icon"
              data-label="street"
              onMouseOver={headerHandler}
            >
              <FaMap />
            </div>
            <div
              className="icon"
              data-label="phone"
              onMouseOver={headerHandler}
            >
              <FaPhone />
            </div>
            <div
              className="icon"
              data-label="password"
              onMouseOver={headerHandler}
            >
              <FaLock />
            </div>
          </div>

          <button className="btn" type="button" onClick={getRandomUser}>
            {loading ? "loading..." : "random user"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
