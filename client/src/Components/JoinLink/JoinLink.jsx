import React, { useState } from "react";
import Logo from "../Logo/Logo";
import { useHistory, withRouter } from "react-router-dom";
import { postUser, readGame } from "../../services/games";
import "../CreateRoom/CreateRoom.css";

function JoinLink(props) {
  sessionStorage.setItem("gameStatus", "lobby");
  sessionStorage.setItem("lastUrl", `${window.location.pathname}`);

  if (props.cableApp?.game) {
    window.location.reload();
  }
  const [isLoading, setIsLoading] = useState(false);
  let previousName = sessionStorage.getItem("username");
  let standIn = previousName === null ? "" : previousName;
  const [formData, setFormData] = useState({
    id: "",
    username: standIn,
    initiative: "",
    code: props.match.params.code,
    is_admin: false,
  });

  const [formFilled, setFormFilled] = useState({
    username: true,
    initiative: true,
    code: true,
  });

  const handleChange = (e) => {
    e.persist();
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const history = useHistory();

  const checkForUser = (user, room) => {
    let exists = room.users.filter((username) => username.username === user);
    if (exists.length === 0) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async () => {
    let userStorage;
    try {
      setIsLoading(true);
      let roomId = await readGame(formData.code.toUpperCase());
      if (roomId.in_combat === true) {
        if (
          window.confirm(
            "This combat is in progress, would you like to rejoin?"
          )
        ) {
          if (checkForUser(formData.username, roomId)) {
            history.push(
              `/combat/${formData.code.toUpperCase()}/player/${
                formData.username
              }`
            );
          } else {
            userStorage = sessionStorage.getItem("username");
            history.push(
              `/combat/${formData.code.toUpperCase()}/player/${userStorage}`
            );
            return false;
          }
        } else {
          history.push("/");
        }
      } else {
        sessionStorage.setItem("username", formData.username);
        await postUser({
          username: formData.username,
          game_id: roomId.id,
          initiative: formData.initiative,
          is_admin: false,
        });
        history.push(
          `/game/${formData.code.toUpperCase()}/user/${formData.username}`
        );
      }
    } catch (error) {
      if (error) {
        alert("Game not found. Please check your Game Code and try again");
        sessionStorage.removeItem("gameStatus");
        sessionStorage.removeItem("lastUrl");
        history.push("/");
      }
    }
  };

  async function handleEnterRoom(e) {
    if (
      formData.username === "" ||
      formData.initiative === "" ||
      formData.code === "" ||
      isNaN(formData.initiative)
    ) {
      if (formData.username === "") {
        setFormFilled({ ...formFilled, username: false });
        e.preventDefault();
      }
      if (formData.code === "") {
        setFormFilled({ ...formFilled, code: false });
        e.preventDefault();
      }
      if (formData.initiative === "" || isNaN(formData.initiative)) {
        setFormFilled({ ...formFilled, initiative: false });
        e.preventDefault();
      }
    } else {
      handleSubmit();

      e.preventDefault();
    }
  }

  const noInfo = {
    color: "red",
    textAlign: "center",
    margin: "0",
  };

  return (
    <div>
      <Logo />
      <form className="create-user">
        <label className="enter-label">
          {formFilled.code ? (
            ""
          ) : (
            <p style={noInfo}>Please enter a game code</p>
          )}
          <input
            className={formFilled.username ? "user-input" : "user-input-empty"}
            name="username"
            type="text"
            value={formData.username}
            maxLength="20"
            onChange={handleChange}
            placeholder={formFilled.username ? "Character Name" : "Enter-name"}
          />
          {formFilled.username ? (
            ""
          ) : (
            <p style={noInfo}>Please enter your character name</p>
          )}
          <input
            className={
              formFilled.initiative ? "user-input" : "user-input-empty"
            }
            name="initiative"
            type="text"
            maxLength="3"
            value={formData.initiative}
            onChange={handleChange}
            placeholder={
              formFilled.initiative ? "Initiative" : "Enter initiative"
            }
          />
          {formFilled.initiative ? (
            ""
          ) : (
            <p style={noInfo}>Please enter your initiative</p>
          )}
        </label>
        <button disabled={isLoading} onClick={handleEnterRoom}>
          {isLoading ? "Entering Room" : "Enter Room"}
        </button>
      </form>
    </div>
  );
}

export default withRouter(JoinLink);
