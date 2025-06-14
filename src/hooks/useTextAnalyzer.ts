import { useReducer } from "react";
import { Analysis, AnalysisResult } from "../types";

interface State {
  userInput: string;
  analysisResult: AnalysisResult | null;
  currentUser: string;
  analyses: Record<string, Analysis[]>;
}

type Action =
  | { type: "SET_USER_INPUT"; payload: string }
  | { type: "SET_ANALYSIS_RESULT"; payload: AnalysisResult | null }
  | { type: "SET_CURRENT_USER"; payload: string }
  | { type: "ADD_ANALYSIS" }
  | { type: "RESET_ANALYSIS_RESULT" };

const initialState: State = {
  userInput: "",
  analysisResult: null,
  currentUser: "Admin",
  analyses: {
    Admin: [],
    User1: [],
    User2: [],
  },
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_USER_INPUT":
      return {
        ...state,
        userInput: action.payload,
      };
    case "SET_ANALYSIS_RESULT":
      return {
        ...state,
        analysisResult: action.payload,
      };
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
        userInput: "",
      };
    case "ADD_ANALYSIS":
      if (!state.userInput || !state.analysisResult) return state;

      const newAnalysis: Analysis = {
        id: crypto.randomUUID(),
        text: state.userInput,
        result: state.analysisResult,
        timestamp: new Date().toISOString(),
        user: state.currentUser
      };

      const updatedAnalyses = {
        ...state.analyses,
        [state.currentUser]: [
          ...state.analyses[state.currentUser],
          newAnalysis,
        ],
      };
      return {
        ...state,
        analyses: updatedAnalyses,
      };
    case "RESET_ANALYSIS_RESULT":
      return {
        ...state,
        analysisResult: null,
      };
    default:
      return state;
  }
}

export function useTextAnalyzer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setUserInput = (text: string): void => {
    dispatch({ type: "SET_USER_INPUT", payload: text });
  };

  const setAnalysisResult = (result: AnalysisResult | null): void => {
    dispatch({ type: "SET_ANALYSIS_RESULT", payload: result });
  };

  const setCurrentUser = (user: string): void => {
    dispatch({ type: "SET_CURRENT_USER", payload: user });
  };

  const addAnalysis = (): void => {
    dispatch({ type: "ADD_ANALYSIS" });
  };

  const resetAnalysisResult = (): void => {
    dispatch({ type: "RESET_ANALYSIS_RESULT" });
  };

  return {
    state,
    setUserInput,
    setAnalysisResult,
    setCurrentUser,
    addAnalysis,
    resetAnalysisResult,
  };
} 