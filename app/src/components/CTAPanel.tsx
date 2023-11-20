import { ReactComponent as Logo } from "../assets/images/logo.svg";
import { ReactComponent as PlayerVsPlayerIcon } from "../assets/images/player-vs-player.svg";
import { ReactComponent as PlayerVsCPUIcon } from "../assets/images/player-vs-cpu.svg";
import CTAButton from "./GameArena/CTAButton";
import PanelContainer from "./shared/PanelContainer";

const CTAPanel = () => {
  return (
    <PanelContainer isCTAPanel={true}>
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
            icon={<PlayerVsPlayerIcon />}
            path="/connect_four/game_arena"
            state={{ mode: "player" }}
          >
            PLAY VS PLAYER
          </CTAButton>
          <CTAButton
            isLink={true}
            classNames={[
              "flex",
              "justify-between",
              "align-center",
              "btn-pink",
              "border-shadowed",
            ]}
            path="/connect_four/game_arena"
            state={{ mode: "cpu" }}
            icon={<PlayerVsCPUIcon />}
          >
            PLAY VS CPU
          </CTAButton>
          <CTAButton
            isLink={true}
            path="/connect_four/game_rules"
            classNames={[
              "flex",
              "justify-between",
              "align-center",
              "btn-white",
              "border-shadowed",
              "game-rule-btn",
            ]}
          >
            GAME RULES
          </CTAButton>
        </div>
      </div>
    </PanelContainer>
  );
};

export default CTAPanel;
