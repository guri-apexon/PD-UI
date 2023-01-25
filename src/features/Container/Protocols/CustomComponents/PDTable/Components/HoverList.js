const HoverList = ({ data, handleOperation, index }) => {
  const handleClick = (operation) => {
    handleOperation(operation, index);
  };
  return (
    <div className="pd-dropdown">
      <ul>
        {data.map((item) => (
          <li key={item.id} onClick={() => handleClick(item.id)}>
            <div
              className="pd-arrow-icon"
              dangerouslySetInnerHTML={{ __html: item.image }}
            ></div>
            <div className="sd-text">{item.text}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default HoverList;
