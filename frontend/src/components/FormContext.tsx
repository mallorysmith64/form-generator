import React from "react";

type FormContextType = {
   headerText: string;
   setHeaderText: (text: string) => void;
   emailText: string;
   setEmailText: (text: string) => void;
   defaultHeaderSize: number;
   defaultFontSize: number;
};

export const FormContext = React.createContext<FormContextType>({
   headerText: "",
   setHeaderText: () => {},
   emailText: "",
   setEmailText: () => {},
   defaultHeaderSize: 21,
   defaultFontSize: 2
});
