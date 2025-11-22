// import React from "react";
import React, { Dispatch, SetStateAction } from "react"; // <--- IMPORT THESE
export type AlignType = "left" | "center" | "right";

//added 11/20/25 from gemini
export type FormElement = {
  id: string | number;
  type?: string;
  [key: string]: any; // Allows any other properties
};

type FormContextType = {

   //added formElements 11/20/25 from gemini
   formElements: FormElement[];
   setFormElements: Dispatch<SetStateAction<FormElement[]>>;

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
//gemini formElements added 11/20/25
   formElements: [],
   setFormElements: () => {},  // This stays as an empty function default

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
