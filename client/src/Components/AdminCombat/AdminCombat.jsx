import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import LongMenuCombat from "../LongMenu/LongMenuCombat";
import CombatMenuGuide from "../MenuGuide/CombatMenuGuide";
import GameWebSocket from "../GameWebSocket/GameWebSocket";
import { Flipped, Flipper } from "react-flip-toolkit";
import {
  takeTurn,
  destroyGame,
  removeCombatants,
  toLobby,
} from "../../services/games";
import "../AdminCombat/AdminCombat.css";

export default function AdminCombat(props) {
  sessionStorage.setItem("gameStatus", "combat");
  sessionStorage.setItem("lastUrl", `${window.location.pathname}`);

  const history = useHistory();

  function handleTakeTurn(arr) {
    arr.combatants.push(arr.combatants.shift());
    takeTurn(game.code, arr);
  }

  const { game } = props.gameData;
  const userMap = game?.users?.reduce((map, user) => {
    map[user.id] = user;
    return map;
  }, {});

  function removeCombatant(id) {
    game.combatants.splice(game.combatants?.indexOf(id), 1);
    removeCombatants(props.match.params.code, game.combatants);
  }

  function sendToLobby() {
    if (window.confirm("Are you sure you want to end combat?")) {
      sessionStorage.setItem("gameStatus", "none");
      sessionStorage.setItem("lastUrl", "none");
      toLobby(game.code, []);
      history.push(`/game/${game.code}/DM/${props.match.params.username}`);
      window.location.reload();
    }
  }

  function endCombat() {
    if (
      window.confirm(
        "Are you sure you want to end your session? This will delete all users and the current game"
      )
    ) {
      sessionStorage.setItem("gameStatus", "none");
      sessionStorage.setItem("lastUrl", "none");
      destroyGame(game.code);
      history.push("/");
      window.location.reload();
    }
  }

  const [hasViewedGuide, setHasViewedGuide] = useState(
    JSON.parse(localStorage.getItem("hasViewedCombatGuide"))
  );
  const showTutorial = () => {
    if (hasViewedGuide !== "true") {
      setHasViewedGuide(true);
      localStorage.setItem("hasViewedCombatGuide", "true");
    }
  };

  if (props.gameData.game.status === 500) {
    // setTimeout(function () {
    //   window.location.reload(1);
    // }, 500);

    return (
      <>
        <GameWebSocket
          cableApp={props.cableApp}
          updateApp={props.updateApp}
          getGameData={props.getGameData}
          code={props.match.params.code}
        />
        <h2
          style={{
            textAlign: "center",
            topMargin: "40px",
          }}
        >
          Something went Wrong. Please try agian.
        </h2>
        <button className="create-join">
          <Link className="link-style" to="/create-room">
            {" "}
            Create Combat
          </Link>
        </button>
      </>
    );
  } else {
    return (
      <>
        <GameWebSocket
          cableApp={props.cableApp}
          updateApp={props.updateApp}
          getGameData={props.getGameData}
          code={props.match.params.code}
        />
        <div className="code-container">
          <img
            alt="Ordo Nomina Logo"
            style={{ height: "50px" }}
            src="https://res.cloudinary.com/dyrvlnond/image/upload/v1608509018/Tracker/Artboard_1_llwk43.png"
          />
          <h3 className="room-code">Code: {game.code}</h3>
        </div>
        <Flipper
          className="combat-container"
          key={"flipper-thing"}
          flipKey={props.gameData}
          spring={"wobble"}
        >
          <div className="exit-buttons">
            <button onClick={() => handleTakeTurn(game)} className="next-turn">
              Next Turn
            </button>
          </div>
          <div className="user-list">
            {game.combatants?.map((id) => (
              <Flipped
                key={userMap[id].id + `flipped guy`}
                flipId={userMap[id].id}
              >
                <div className="user-details" key={userMap[id].id}>
                  <button
                    className="delete-user-combat"
                    onClick={() => removeCombatant(userMap[id].id)}
                  >
                    X
                  </button>
                  <span>{userMap[id].username}</span>{" "}
                  <span>{userMap[id].initiative}</span>
                </div>
              </Flipped>
            ))}
          </div>
        </Flipper>
        <div className="menu">
          <LongMenuCombat
            gameData={props.gameData}
            lobby={sendToLobby}
            exit={endCombat}
          />
          {hasViewedGuide ? " " : <CombatMenuGuide close={showTutorial} />}
        </div>
      </>
    );
  }
}
