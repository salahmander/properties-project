import InfoBox from "./InfoBox/InfoBox";

const InfoBoxes = () => {
  const InfoBoxesContent = [
    {
      className: "bg-gray-100 text-gray-800",
      description: "Find your dream rental home. Save properties and contact landlords directly.",
      heading: "For Renters",
      button: {
        text: "Browse Properties",
        link: "/properties",
        className: "bg-black",
      }
    },
    {
      className: "bg-blue-100 text-gray-800",
      description: "List your property and connect with potential tenants. Let as a short-term holiday home or for long-term stays.",
      heading: "For Landlords",
      button: {
        text: "Add Property",
        link: "/properties/add",
        className: "bg-blue-500",
      }
    },
  ];
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          {InfoBoxesContent.map((infoBox, index) => (
            <InfoBox key={index} {...infoBox} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
