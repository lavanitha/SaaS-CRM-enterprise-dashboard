const CaseColumn = ({ title }) => {
  return (
    <div
      style={{
        flex: 1,
        background: "#1a1a1a",
        padding: "12px",
        borderRadius: "6px",
      }}
    >
      <h3>{title}</h3>

      <div
        style={{
          background: "#2a2a2a",
          padding: "10px",
          borderRadius: "4px",
          marginTop: "10px",
        }}
      >
        Sample Case
      </div>
    </div>
  );
};

export default CaseColumn;
