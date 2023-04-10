import React from "react";

type FormContextType = {
   headerText: string;
   setHeaderText: (text: string) => void;
   emailText: string;
   setEmailText: (text: string) => void;
};

export const FormContext = React.createContext<FormContextType>({
   headerText: "",
   setHeaderText: () => {},
   emailText: "",
   setEmailText: () => {},
});
