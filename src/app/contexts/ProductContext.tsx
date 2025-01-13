"use client"
import React, { createContext, useReducer, ReactNode, Dispatch } from "react";
import Firestore from "../handlers/firestore";

const { readDocs } = Firestore;

interface ExtraIngredient {
  ingredient: string;
  price: number;
}

interface Size {
  size: string;
  price: number;
}

interface InputState {
  title: string;
  file: File | null;
  path: string | null;
  description: string;
  withoutOptions: string[];
  extraIngredients: ExtraIngredient[];
  sizes: Size[];
  quantity: number;
}

interface State {
  items: InputState[];
  count: number;
  inputs: InputState;
  isCollapsed: boolean;
}

type Action =
  | { type: "setItem" }
  | { type: "setItems"; payload: { items: InputState[] } }
  | { type: "setInputs"; payload: { value: React.ChangeEvent<HTMLInputElement> } }
  | { type: "updatePrice"; payload: { index: number; value: string; type: keyof Pick<InputState, 'extraIngredients' | 'sizes'> } }
  | { type: "updateArray"; payload: { name: keyof InputState; value: { size: string; price: number }[] } }
  | { type: "updateSide"; payload: { sideIndex: number; sideValue: string } }
  | { type: "updateSize"; payload: { sizeIndex: number; sizeValue: string } }
  | { type: "addSides" }
  | { type: "addSize" }
  | { type: "collapse"; payload: { bool: boolean } };

export const ProductContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
  read: () => Promise<void>;
} | undefined>(undefined);

const photos: InputState[] = [];

const initialState: State = {
  items: photos,
  count: photos.length,
  inputs: {
    title: "",
    file: null,
    path: null,
    description: "",
    withoutOptions: [],
    extraIngredients: [],
    sizes: [],
    quantity: 1,
  },
  isCollapsed: false,
};

const handleOnChange = (state: State, e: React.ChangeEvent<HTMLInputElement>): InputState => {
  const { name, value, files } = e.target;
  if (name === "file" && files && files.length > 0) {
    const file = files[0];
    return {
      ...state.inputs,
      file: file,
      path: URL.createObjectURL(file),
    };
  } else {
    return {
      ...state.inputs,
      [name]: value,
    };
  }
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "setItem":
      return {
        ...state,
        items: [state.inputs, ...state.items],
        count: state.items.length + 1,
        inputs: initialState.inputs,
      };
    case "setItems":
      return {
        ...state,
        items: action.payload.items,
      };
    case "setInputs":
      return {
        ...state,
        inputs: handleOnChange(state, action.payload.value),
      };
    case "updatePrice":
      const { index, value, type } = action.payload;
      const inputArray = state.inputs[type];

      if (Array.isArray(inputArray)) {
        return {
          ...state,
          inputs: {
            ...state.inputs,
            [type]: inputArray.map((item, i) =>
              i === index ? { ...item, price: parseFloat(value) } : item
            ),
          },
        };
      }
      return state;
    case "updateArray":
      const { name, value: sizeOptions } = action.payload;
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [name]: sizeOptions,
        },
      };
    case "updateSide":
      const { sideIndex, sideValue } = action.payload;
      return {
        ...state,
        inputs: {
          ...state.inputs,
          extraIngredients: state.inputs.extraIngredients.map((ingredient, i) =>
            i === sideIndex ? { ...ingredient, ingredient: sideValue } : ingredient
          ),
        },
      };
    case "updateSize":
      const { sizeIndex, sizeValue } = action.payload;
      return {
        ...state,
        inputs: {
          ...state.inputs,
          sizes: state.inputs.sizes.map((size, i) =>
            i === sizeIndex ? { ...size, size: sizeValue } : size
          ),
        },
      };
    case "addSides":
      return {
        ...state,
        inputs: {
          ...state.inputs,
          extraIngredients: [...state.inputs.extraIngredients, { ingredient: "", price: 0 }],
        },
      };
    case "addSize":
      return {
        ...state,
        inputs: {
          ...state.inputs,
          sizes: [...state.inputs.sizes, { size: "", price: 0 }],
        },
      };
    case "collapse":
      return {
        ...state,
        isCollapsed: action.payload.bool,
      };
    default:
      return state;
  }
}

interface ProductProviderProps {
  children: ReactNode;
}

const ProductProvider = ({ children }: ProductProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const read = async () => {
    const items = await readDocs("products");
    dispatch({ type: "setItems", payload: { items } });
  };

  return (
    <ProductContext.Provider value={{ state, dispatch, read }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
