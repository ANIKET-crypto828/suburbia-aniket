"use client"

import { Content } from "@prismicio/client";
import { createContext, ReactNode, useContext, useMemo, useState } from "react"

type CustomizerControlsContext = {
  selectedWheel?: Content.BoardCustomizerDocumentDataWheelsItem;
  setWheel: (wheel: Content.BoardCustomizerDocumentDataWheelsItem) => void;
  selectedDeck?: Content.BoardCustomizerDocumentDataDecksItem;
  setDeck: (deck: Content.BoardCustomizerDocumentDataDecksItem) => void;
  selectedTruck?: Content.BoardCustomizerDocumentDataMetalsItem;
  setTruck: (truck: Content.BoardCustomizerDocumentDataMetalsItem) => void;
  selectedBolt?: Content.BoardCustomizerDocumentDataMetalsItem;
  setBolt: (bolts: Content.BoardCustomizerDocumentDataMetalsItem) => void;
}

const defaultContext: CustomizerControlsContext = {
  setWheel: () => {},
  setDeck: () => {},
  setTruck: () => {},
  setBolt: () => {},
};

const CustomizerControlsContext = createContext(defaultContext);

type CustomizerControlsProviderProps = {
  defaultWheel?: Content.BoardCustomizerDocumentDataWheelsItem;
  defaultDeck?: Content.BoardCustomizerDocumentDataDecksItem;
  defaultTruck?: Content.BoardCustomizerDocumentDataMetalsItem;
  defaultBolt?: Content.BoardCustomizerDocumentDataMetalsItem;
  children?: ReactNode;
}

export function CustomizerControlsProvider({ 
  defaultWheel,
  defaultDeck,
  defaultTruck,
  defaultBolt,
  children,
 }: CustomizerControlsProviderProps) {
const [selectedWheel, setSelectedWheel] = useState(defaultWheel);
const [selectedDeck, setSelectedDeck] = useState(defaultDeck);
const [selectedTruck, setSelectedTruck] = useState(defaultTruck);
const [selectedBolt, setSelectedBolt] = useState(defaultBolt);

  const setDeck = (deck: Content.BoardCustomizerDocumentDataDecksItem) => {
    setSelectedDeck(deck);
  };
  
  const setWheel = (wheel: Content.BoardCustomizerDocumentDataWheelsItem) => {
    setSelectedWheel(wheel);
  };

  const setTruck = (truck: Content.BoardCustomizerDocumentDataMetalsItem) => {
    setSelectedTruck(truck);
  };

  const setBolt = (bolts: Content.BoardCustomizerDocumentDataMetalsItem) => {
    setSelectedBolt(bolts);
  };


  const value = useMemo(() => {
    return {
      selectedWheel, 
      setWheel,
      selectedDeck,
      setDeck,
      selectedTruck,
      setTruck,
      selectedBolt,
      setBolt,
    };
  }, [selectedWheel, selectedDeck, selectedTruck, selectedBolt]);

  return (
    <CustomizerControlsContext.Provider value={value}>
      {children}
    </CustomizerControlsContext.Provider>
  );
}

export function useCustomizerControls() {
  return useContext(CustomizerControlsContext);
}