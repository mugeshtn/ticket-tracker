import { Button, Card, CardBody } from "@heroui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { Lock } from "lucide-react"; // Lucide-react for icons
import Header from "../components/Header";

const Unauthorized = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
    <Header />
    <div className="flex items-center justify-center min-h-[450px] bg-gray-100 p-4">
      <Card className="w-full max-w-md p-6 shadow-xl text-center">
        <CardBody>
          <div className="flex flex-col items-center">
            <Lock size={50} className="text-red-500 mb-4" />
            <h1 className="text-2xl font-bold text-gray-800">Access Denied</h1>
            <p className="text-gray-600 mt-2">
              You don't have permission to view this page.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <Button
              color="primary"
              className="w-full"
              onClick={() => location.state?.from ? navigate(location.state.from) : navigate("/")}
            >
              Go Back
            </Button>
            <Button
              color="danger"
              variant="light"
              className="w-full"
              onClick={() => navigate("/")}
            >
              Go to Homepage
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
    </>
  );
};

export default Unauthorized;
