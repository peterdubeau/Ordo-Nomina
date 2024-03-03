import React from "react";
import "./FAQ.css";

export default function FAQ() {
  return (
    <>
      <div className="faq">
        <div className="faq-header">
          <img
            className="logo"
            alt="Ordo Nomina Logo"
            style={{ height: "50px" }}
            src="https://res.cloudinary.com/dyrvlnond/image/upload/v1608509018/Tracker/Artboard_1_llwk43.png"
          />
          <h1 className="faq">FAQ</h1>
        </div>
        <h2 className="pete">Created by Pete Du Beau</h2>
        <br />
        <h2>Q: What is Ordo Nomina?</h2>
        <h3>
          A: Ordo Nomina is an initiative tracker for D&D (or any tabletop RPG)
          that allows players to easily track their initiative across a game
          session with real-time updates to their browser.
        </h3>

        <h2>What does Ordo Nomina mean?</h2>
        <h3>
          Ordo Nomina is Latin for "Order of names." It seems fitting and I
          think it sounds like the name of an ancient tome, which is pretty
          cool.
        </h3>

        <h2>
          Q: What makes Ordo Nomina stand out from other initiative trackers?
        </h2>
        <h3>
          A: Ordo Nomina is an easy-to-use initiative tracker that allows the DM
          and players to follow combat turn order in real-time. Each game has a
          unique five character code that the DM can give to the party or share
          via a direct link. Players can enter their PC’s name and initiative
          roll, and the DM can then sort accordingly. This allows the DM to set
          up enemies and NPC's while the players manage their initiative.
        </h3>

        <h2>Q: On what Platforms does Ordo Nomina work?</h2>
        <h3>
          A: Ordo Nomina is a web app that works on mobile and desktop in any
          browser. No downloads or user registration required! The DM creates a
          game, shares the link or code, and you’re ready to play.
        </h3>

        <h2>Q: Why did you make Ordo Nomina?</h2>
        <h3>
          A: I’ve been playing D&D for almost 20 years, and it’s one of my
          biggest passions. Over the years, I’ve noticed that player attention
          span gets varying mileage, and I’ve found that letting players know
          when their turn is coming is essential to smooth combat flow. I wanted
          to create something that allows players to follow initiative order
          without asking the DM for updates, or the DM having to remind players
          who is on deck. Ordo Nomina will enable players to see the entire
          initiative order as it progresses through combat in real time.
        </h3>

        <h2>Q: What’s next for Ordo Nomina?</h2>

        <h3>A: I have a few additional features that I'll be adding soon</h3>
        <h3>
          {" "}
          - Audio/vibration notifications: This will give players the option to
          minimize their browser or put their phone down, and receive a
          notification when they’re next in combat. It’ll be an easy way of
          saying, “Hey! You’re up next.”
        </h3>
        <h3> - Adding additional enemies or PC to ongoing combat</h3>
      </div>
    </>
  );
}
