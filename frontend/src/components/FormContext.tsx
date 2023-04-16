import React from "react";

type FormContextType = {
   headerText: string;
   setHeaderText: (text: string) => void;

   emailText: string;
   setEmailText: (text: string) => void

   headerSize: number;
   setHeaderSize: (size: number) => void;
   nameSize: number;
   setNameSize: (size: number) => void;

   firstNameText: string;
   setFirstNameText: (text: string) => void;
   lastNameText: string;
   setLastNameText: (text: string) => void;
};

export const FormContext = React.createContext<FormContextType>({
   headerText: "",
   setHeaderText: () => {},

   emailText: "",
   setEmailText: () => {},

   headerSize: 1.1,
   setHeaderSize: () => {},
   nameSize:1,
   setNameSize: () => {},

   firstNameText: "",
   setFirstNameText: () => {},
   lastNameText: "",
   setLastNameText: () => {},
});
