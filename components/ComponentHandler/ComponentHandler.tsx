import useUser from "@/hooks/react-query/useUser";

type ComponentHandlerProps = {
  children: React.ReactNode;
};

const ComponentHandler = ({ children }: ComponentHandlerProps) => {
  useUser();
  
  return <div>{children}</div>;
};

export default ComponentHandler;
