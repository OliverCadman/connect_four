interface PanelContainerProps {
  children: React.ReactNode;
  isCTAPanel: boolean;
}

const PanelContainer: React.FC<PanelContainerProps> = ({
  children,
  isCTAPanel,
}) => {
  return (
    <div
      className={`panel__container ${
        isCTAPanel ? "panel__container-purple" : "panel__container-white"
      }`}
    >
      {children}
    </div>
  );
};

export default PanelContainer;
