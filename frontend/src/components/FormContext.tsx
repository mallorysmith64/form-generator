import React from "react";

export type AlignType = "left" | "center" | "right";


type FormContextType = {
   headerText: string;
   setHeaderText: (text: string) => void;

   emailText: string;
   setEmailText: (text: string) => void;

   headerSize: number;
   setHeaderSize: (size: number) => void;
   nameSize: number;
   setNameSize: (size: number) => void;

   alignHeader: AlignType;
   setAlignHeader: (align: AlignType) => void;

   alignEmail: AlignType;
   setAlignEmail: (align: AlignType) => void;

   alignName: AlignType;
   setAlignName: (align: AlignType) => void;

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
   nameSize: 1,
   setNameSize: () => {},

   alignHeader: "left",
   setAlignHeader: () => {},

   alignEmail: "left",
   setAlignEmail: () => {},

   alignName: "left",
   setAlignName: () => {},

   firstNameText: "",
   setFirstNameText: () => {},
   lastNameText: "",
   setLastNameText: () => {},
});
