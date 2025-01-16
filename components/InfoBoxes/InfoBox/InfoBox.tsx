type InfoBoxProps = {
  className?: string;
  description: string;
  heading: string;
  button: {
    text: string;
    link: string;
    className?: string;
  }
};

const InfoBox = ({
  description,
  heading,
  button,
  className = "bg-gray-100 text-gray-800",
}: InfoBoxProps) => {
  return (
    <div className={`${className} p-6 rounded-lg shadow-md`}>
      <h2 className="text-2xl font-bold">{heading}</h2>
      <p className="mt-2 mb-4">{description}</p>
      <a
        href={button.link}
        className={`inline-block ${button.className || "bg-black"} text-white rounded-lg px-4 py-2 hover:bg-gray-700`}
      >
        {button.text}
      </a>
    </div>
  );
};

export default InfoBox;
