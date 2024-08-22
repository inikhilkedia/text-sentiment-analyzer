import { useReducer } from "react";

const initialState = {
  userInput: "",
  analysisResult: "",
  currentUser: "Admin",
  analyses: {
    Admin: [],
    User1: [],
    User2: [],
  },
};

function reducer(state, action) {
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
      const updatedAnalyses = {
        ...state.analyses,
        [state.currentUser]: [
          ...state.analyses[state.currentUser],
          { text: state.userInput, result: state.analysisResult },
        ],
      };
      return {
        ...state,
        analyses: updatedAnalyses,
      };
    case "RESET_ANALYSIS_RESULT":
      return {
        ...state,
        analysisResult: "",
      };
    default:
      return state;
  }
}

export function useTextAnalyzer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setUserInput = (text) => {
    dispatch({ type: "SET_USER_INPUT", payload: text });
  };

  const setAnalysisResult = (result) => {
    dispatch({ type: "SET_ANALYSIS_RESULT", payload: result });
  };

  const setCurrentUser = (user) => {
    dispatch({ type: "SET_CURRENT_USER", payload: user });
  };

  const addAnalysis = () => {
    dispatch({ type: "ADD_ANALYSIS" });
  };

  const resetAnalysisResult = () => {
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
