import React from "react";

type FormContextType = {
   headerText: string;
   setHeaderText: (text: string) => void;
   emailText: string;
   setEmailText: (text: string) => void;
   headerSize: number;
   setHeaderSize: (size: number) => void;
};

export const FormContext = React.createContext<FormContextType>({
   headerText: "",
   setHeaderText: () => {},
   emailText: "",
   setEmailText: () => {},
   headerSize: 1.1,
   setHeaderSize: () => {},
});
