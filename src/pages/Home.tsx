import { Card, CardHeader, CardBody, Image } from "@heroui/react";
import Header from "../components/Header";

const Home = () => {
  return (
    <>
      <Header />

      <div id="home-bg" className="flex justify-center sm:p-12 items-center sm:items-start sm:justify-start">
        <Card className="py-4 sm:min-w-[490px] ">
          <CardHeader className="pb-0 pt-2 px-4 gap-1 flex-col items-start">
            <p className="text-lg uppercase font-bold">Assist Ticket</p>
            <h4 className="font-bold text-3xl">Ticket tracker</h4>
            <small className="text-default-500 text-medium">Raise issue tickets</small>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
              <Image
                alt="Card background"
                className="object-cover object-top rounded-xl hidden sm:block"
                src="https://thumbs.dreamstime.com/z/technical-support-center-customer-service-internet-business-technology-concept-technical-support-center-customer-service-internet-102190919.jpg?ct=jpeg"
                width={460}
                height={280}
              />
              <Image
                alt="Card background"
                className="object-cover object-center rounded-xl sm:hidden block"
                src="https://thumbs.dreamstime.com/z/digital-illustration-woman-headset-vibrant-colors-bokeh-background-profile-view-modern-technology-communication-digital-354337231.jpg?ct=jpeg"
                width={280}
                height={360}
              />

          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Home;
