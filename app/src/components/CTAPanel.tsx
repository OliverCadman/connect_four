import { ReactComponent as Logo } from "../assets/images/logo.svg";
import { ReactComponent as PlayerVsPlayerIcon } from "../assets/images/player-vs-player.svg";
import { ReactComponent as PlayerVsCPUIcon } from "../assets/images/player-vs-cpu.svg";
import CTAButton from "./GameArena/CTAButton";

const CTAPanel = () => {
  return (
    <div className="cta-panel__container">
      <div className="cta-panel__header flex justify-center">
        <Logo />
      </div>
      <div className="cta-button__container flex centered column">
        <CTAButton
          isLink={true}
          classNames={[
            "flex",
            "justify-between",
            "align-center",
            "btn-yellow",
            "border-shadowed",
          ]}
          text="PLAY VS PLAYER"
          icon={<PlayerVsPlayerIcon />}
          path="/game-arena"
          state={{ mode: "player" }}
        />
        <CTAButton
          isLink={true}
          classNames={[
            "flex",
            "justify-between",
            "align-center",
            "btn-pink",
            "border-shadowed",
          ]}
          text="PLAY VS CPU"
          path="/game-arena"
          state={{ mode: "cpu" }}
          icon={<PlayerVsCPUIcon />}
        />
        <CTAButton
          isLink={true}
          classNames={[
            "flex",
            "justify-between",
            "align-center",
            "btn-white",
            "border-shadowed",
            "game-rule-btn",
          ]}
          text="GAME RULES"
        />
      </div>
    </div>
  );
};

export default CTAPanel;
